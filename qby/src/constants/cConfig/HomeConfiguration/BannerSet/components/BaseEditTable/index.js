import React, { Component } from 'react';
import { Table, Input, Button, Form, InputNumber, Modal  } from 'antd';
import {columns} from '../columns';
import './index.less';

class BaseEditTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key:this.props.dataSource.length+1,
    }
  }
  //绑定方法
  processData(data) {
    if(!this.onOperateClick) {
      return data;
    }
    data && data.map((item, i) => {
        item.onOperateClick = (type) => { this.onOperateClick(item, type) };
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
  //删除
  handleDelete=(record)=> {
    let { dataSource } =this.props;
    dataSource = dataSource.filter(item => item.key !== record.key)
    this.props.handleCallback(dataSource)
  }
  //变帖
  changeFrame=()=> {
    let content=(
      <div>
        将当前banner调整至第
        <InputNumber
          min={1}
          max={5}/>
      </div>
    )
    Modal.confirm({
      content: content,
      onOk:()=>{

      },
      onCancel:()=> {

      },
    });
  }
  //表单事件
  onOperateClick=(record,type)=> {
    switch(type) {
      case 'frame':
        this.changeFrame(record);
        break;
      case 'delete':
        this.handleDelete(record);
        break;
    }
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
    let { dataSource } =this.props;
    const { btnText, form } =this.props;
    dataSource = this.processData(dataSource);
    let columnsTable = columns(form,this.handleChange);
    return (
      <Table
        className="banner-set-tables"
        footer={()=><Button type="default" onClick={this.handleAdd}>+{btnText}</Button>}
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
export default BaseEditTable;
