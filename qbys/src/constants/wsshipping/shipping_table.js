import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button ,Table,message } from 'antd';

class EditableTable extends React.Component {
    constructor(props) {
      super(props);
      this.a=1
      this.dataSourcees=[]
      this.columns = [{
        title: '配货单号',
        dataIndex: 'orderNo'
      }, {
        title: '物流公司',
        dataIndex: 'wsExpressName'
      }, {
        title: '物流单号',
        dataIndex: 'expressMailno'
      },{
        title: '物流费用',
        dataIndex: 'shippingFee'
      },{
        title: '操作',
        dataIndex: 'operation',
        render: (text, record,index) => {
          return (
            this.state.dataSource.length > 0 ?
            (
              <div onClick = {this.onDelete.bind(this,index)} style={{color: '#35bab0', cursor:'pointer'}}>删除</div>
            ) : null
          );
        }
      }];
      this.state = {
        dataSource: [],
        count: 2
      };
    }
    onCellChange = (index, key) => {
      return (value) => {
        const dataSource = [...this.state.dataSource];
        dataSource[index][key] = value;
        this.setState({ dataSource });
      };
    }
    //删除按钮
    onDelete = (index) => {
      let dataSourcees=this.dataSourcees
      dataSourcees.splice(index, 1);
      this.setState({
        dataSource:dataSourcees
      },function(){
        const Hinddataback=this.props.Hinddataback;
        Hinddataback(this.state.dataSource)
      });
    }
    clearDataSource = ()=>{
      this.setState({
          dataSource:[]
        });
      this.dataSourcees=[]
    }
    setmessage=(message)=>{
      this.a=this.a+1
      message.key=this.a
      let dataSourcees=this.dataSourcees
      dataSourcees.unshift(message)
      for (var i = 0; i < dataSourcees.length; i++) {
        dataSourcees[i].key = i+1;
      }
      this.setState({
        dataSource:dataSourcees
      },function(){
        const Hinddataback=this.props.Hinddataback;
        Hinddataback(this.state.dataSource)
      })
    }
    render() {
      const { dataSource } = this.state;
      const columns = this.columns;
      return (
        <div>
          <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
        </div>
      );
    }
  }
  export default connect()(EditableTable);