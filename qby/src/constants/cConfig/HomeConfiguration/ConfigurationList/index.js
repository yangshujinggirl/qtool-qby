import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "dva";
import Qtable from "../../../../components/Qtable";
import Qpagination from "../../../../components/Qpagination";
import FilterForm from "./components/FilterForm";
import AddModal from "./components/AddModal";
import { IndexColumns } from "./columns";

import "./index.less";
class ConfigurationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataSource: [],
      versionList: [],
      inputValues: {}
    };
  }
  componentDidMount() {
    this.getList();
  }
  getList() {
    this.props.dispatch({
      type: "homeConfig/fetchList",
      payload: {}
    });
  }
  //点击搜索
  searchData = values => {
    console.log(this.props)
    this.props.dispatch({
      type: "homeConfig/fetchList",
      payload: values
    });
    this.setState({
      inputValues: values
    });
  };
  //操作区
  onOperateClick = (record, type) => {
    switch (type) {
      case "info":
        this.goInfo(record);
        break;
      case "edit":
        this.goEdit(record.key);
        break;
      case "ban":
        this.goBan(record);
        break;
      case "log":
        this.goLog(record);
        break;
    }
  };
  //查看详情
  goInfo(record) {
    const { componkey } = this.props;
    const paneitem = {
      title: "详情",
      key: `${componkey}homeinfo-search`,
      data: {}
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  }
  //编辑
  goEdit = key => {
    const { componkey } = this.props;
    const paneitem = {
      title: "商品编辑",
      key: `${componkey}home`,
      componkey: `${componkey}home`,
      data: {}
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  //禁用
  goBan(record) {
    console.log(record);
  }
  //日志
  goLog(record) {
    console.log(record);
  }
  //新建
  goAdd = () => {
    let versionList = [
      {
        key: 0,
        value: "版本001"
      },
      {
        key: 1,
        value: "版本002"
      },
      {
        key: 2,
        value: "版本003"
      }
    ];
    this.setState({ visible: true, versionList });
  };
  onOk = () => {
    this.setState({ visible: false });
  };
  onCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    const { visible, versionList } = this.state;
    const { dataList } = this.props;
    return (
      <div className="qtools-components-pages configuration-List-pages">
        <FilterForm submit={this.searchData} />
        <div className="handel-btn-lists">
          <Button size="large" type="primary" onClick={this.goAdd}>
            新增首页版本
          </Button>
        </div>
        <Qtable
          onOperateClick={this.onOperateClick}
          dataSource={dataList}
          columns={IndexColumns}
        />
        <AddModal
          versionList={versionList}
          onOk={this.goEdit}
          onCancel={this.onCancel}
          visible={visible}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { homeConfig } = state;
  return homeConfig;
}
export default connect(mapStateToProps)(ConfigurationList);
