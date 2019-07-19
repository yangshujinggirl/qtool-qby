import React, { Component } from "react";
import { Table } from "antd";
import {logListApi} from "../../../../services/cConfig/homeConfiguration/configurationList";

class LogList extends Component {
  constructor(props) {
    super(props);
    this.state={
        homepageLogeList:[]
    }
    this.columns = [
      {
        title: "操作类型",
        dataIndex: "operateTypeStr",
        key: "operateTypeStr"
      },
      {
        title: "操作描述",
        dataIndex: "operateContent",
        key: "operateContent"
      },
      {
        title: "操作时间",
        dataIndex: "operateTime",
        key: "operateTime"
      },
      {
        title: "操作人",
        dataIndex: "operateUser",
        key: "operateUser"
      }
    ];
  }
  componentDidMount=()=>{
      const {homepageId} = this.props.data;
    logListApi({homepageId}).then(res=>{
        if(res.code == '0'){
            this.setState({
                homepageLogeList:res.homepageLogeList
            });
        };
    })
  }
  render() {
      const {homepageLogeList} = this.state;
    return (
      <div>
        <Table dataSource={homepageLogeList} columns={this.columns} />;
      </div>
    );
  }
}

export default LogList;
