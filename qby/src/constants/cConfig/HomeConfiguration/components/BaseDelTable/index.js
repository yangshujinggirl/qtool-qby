import React, { Component } from 'react';
import { Table, Input, Button, Form, InputNumber, Modal  } from 'antd';
import './index.less';

const FormItem = Form.Item;

class BaseDelTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key:this.props.dataSource.length+1,
    }
  }
  //绑定方法
  processData(data) {
    if(!this.props.onOperateClick) {
      return data;
    }
    data && data.map((item, i) => {
        item.onOperateClick = (type) => { this.props.onOperateClick(item, type) };
    })
    return data;
  }
  //新增
  handleAdd=()=> {
    let { key } =this.state;
    let { dataSource} =this.props;
    dataSource.push({
      key,
      isFrame:true
    });
    this.setState({ key:key+1 });
    this.props.handleCallback(dataSource)
  }
  //表单change
  handleChange=(type,name,e,index)=> {
    let value;
    switch(type) {
      case 'input':
        value = e.target.value;
        break;
      case 'select':
        value = e;
        break;
      case 'fileList':
        value = e;
        break;
    }
    let { dataSource } =this.props;
    if(!value) {
      dataSource[index][name]=null;
    } else {
      dataSource[index][name]=value;
    }
    this.props.handleCallback(dataSource)
  }
  render() {
    let columnsTable = this.props.columns(this.props.form,this.handleChange);
    let { dataSource } =this.props;
    dataSource = this.processData(dataSource);
    return (
      <Table
        className="banner-set-tables"
        footer={()=><Button type="default" onClick={this.handleAdd}>+新增</Button>}
        bordered
        pagination={false}
        onRow={(record)=> {
          return{
            'data-row-key':record.key
          }
        }}
        columns={columnsTable}
        dataSource={dataSource}>
      </Table>
    )
  }
};
export default BaseDelTable;
