import React, { Component } from 'react';
import { Table, Input, Button, Form  } from 'antd';
import './index.less';
// import { Button } from 'antd';

class BaseEditTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource:this.props.dataSource,
      key:this.props.dataSource.length,
    }
  }
  //接收异步数据
  componentWillReceiveProps(props) {
    this.setState({
      dataSource:props.dataSource,
    })
  }
  //新增
  handleAdd=()=> {
    let { dataSource,key } =this.state;
    key++;
    dataSource.push({
      key,
    });
    this.setState({ dataSource, key });
  }
  //删除
  handleDelete=(index)=> {
    let { dataSource, key } =this.state;
    dataSource.splice(index,1);
    if(dataSource.length==0) {
      key = 0;
    }
    this.setState({ dataSource, key });
    this.props.resetForm&&this.props.resetForm(index,dataSource)
  }
  //初始化删除columns
  initColumns=()=> {
    let columns = this.props.columns;
    let idx = columns.findIndex((value,index) => {
      return value.key == 'delete';
    })
    if(idx == -1) {
      columns.push({
        title:'操作',
        key:'delete',
        width:'10%',
        align:'center',
        render:(text,record,index)=> {
          return <span
                  className="brandColor handle-delete"
                  onClick={()=>this.handleDelete(record.key)}>
                    删除
                 </span>
        }
      })
    }
    // if(this.state.dataSource.length>1) {
    //   if(index == -1) {
    //     columns.push({
    //       title:'操作',
    //       key:'delete',
    //       width:'10%',
    //       align:'center',
    //       render:(text,record,index)=> {
    //         return <span
    //                 className="brandColor handle-delete"
    //                 onClick={()=>this.handleDelete(index)}>
    //                   删除
    //                </span>
    //       }
    //     })
    //   }
    // } else if(index !== -1){
    //   columns.splice(index,1);
    // }
    return columns;
  }
  render() {
    const { dataSource } =this.state;
    const { btnText } =this.props;

    return (
      <Table
        className="edit-table-component"
        footer={()=><Button type="default" onClick={this.handleAdd}>+{btnText}</Button>}
        bordered
        pagination={false}
        columns={this.initColumns()}
        dataSource={dataSource}>
      </Table>
    )
  }
};
export default BaseEditTable;
