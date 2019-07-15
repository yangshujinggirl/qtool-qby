import React, { Component } from 'react';
import { Table, Input, Button, Form, InputNumber, Modal  } from 'antd';
import './index.less';

const FormItem = Form.Item;

class BaseEditTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource:this.props.dataSource,
      key:this.props.dataSource.length,
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      key: props.dataSource.length,
      dataSource: props.dataSource,
    })
  }
  //新增
  handleAdd=()=> {
    let { key } =this.state;
    let { dataSource } =this.state;
    dataSource.push({
      key,
    });
    this.setState({ key:key+1, dataSource });
    // this.props.callback(dataSource)
  }
  //删除
  handleDelete=(key)=> {
    let { dataSource } =this.state;
    dataSource = dataSource.filter(item => item.key !== key)
    this.setState({ dataSource });
  }
  //初始化删除columns
  initColumns=()=> {
    let columns = this.props.columns;
    let index = columns.findIndex((value,index) => {
      return value.key == 'delete';
    })
    if(index == -1) {
      columns.push({
        title:'操作',
        key:'delete',
        width:'10%',
        align:'center',
        render:(text,record,index)=> {
          return <Button
                  className="handle-delete"
                  type="primary"
                  onClick={()=>this.handleDelete(record.key)}>
                    删除
                 </Button>
        }
      })
    }
    return columns;
  }
  render() {
    let { dataSource } =this.state;
    return (
      <Table
        className="delete-set-tables"
        footer={()=><Button type="default" onClick={this.handleAdd}>+新增</Button>}
        bordered
        pagination={false}
        onRow={(record)=> {
          return{
            'data-row-key':record.key
          }
        }}
        columns={this.initColumns()}
        dataSource={dataSource}>
      </Table>
    )
  }
};
export default BaseEditTable;
