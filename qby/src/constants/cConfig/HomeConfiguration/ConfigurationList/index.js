import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import Qtable from '../../../../components/Qtable';
import Qpagination from '../../../../components/Qpagination';
import FilterForm from './components/FilterForm';
import AddModal from './components/AddModal';
import { IndexColumns } from './columns';

import './index.less'
class ConfigurationList extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      dataSource:[],
      versionList:[],
    }
  }
  componentDidMount() {
    this.getList()
  }
  getList() {
    const dataSource=[{
      name:'520要发的首页',
      auth:'yj',
      code:'v2019053101',
      stime:'2017-08-31 23:17:52',
      etime:'2017-08-31 23:17:52',
      status:0,
      key:0,
      btnList:[
        {
          type:'info',
          name:'查看'
        },{
          type:'edit',
          name:'编辑'
        },{
          type:'ban',
          name:'禁用'
        },{
          type:'log',
          name:'日志'
        }]
    },{
      name:'520要发的首页',
      auth:'yj',
      code:'v2019053101',
      stime:'2017-08-31 23:17:52',
      etime:'2017-08-31 23:17:52',
      status:0,
      key:1,
      btnList:[{
        type:'info',
        name:'查看'
      },{
        type:'ban',
        name:'禁用'
      },{
        type:'log',
        name:'日志'
      }]
    }]
    this.setState({ dataSource });
  }
  //操作区
  onOperateClick=(record,type)=> {
    switch(type) {
      case 'info':
        this.goInfo(record);
        break;
      case 'edit':
        this.goEdit(record.key);
        break;
      case 'ban':
        this.goBan(record);
        break;
      case 'log':
        this.goLog(record);
        break;
    }
  }
  //查看详情
  goInfo(record) {
    console.log(record)
  }
  //编辑
  goEdit=(key)=> {
    const { componkey } = this.props;
    const paneitem={
      title:'商品编辑',
      key:`${componkey}home`,
      componkey:`${componkey}home`,
      data:{}
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  //禁用
  goBan(record) {
    console.log(record)
  }
  //日志
  goLog(record) {
    console.log(record)
  }
  //新建
  goAdd=()=> {
    let versionList=[{
      key:0,
      value:'版本001'
    },{
      key:1,
      value:'版本002'
    },{
      key:2,
      value:'版本003'
    }]
    this.setState({ visible:true, versionList })
  }
  onOk=()=>{
    this.setState({ visible:false })
  }
  onCancel=()=>{
    this.setState({ visible:false })
  }
  render() {
    const { dataSource, visible, versionList } =this.state;
    return(
      <div className="qtools-components-pages configuration-List-pages">
        <FilterForm />
        <div className="handel-btn-lists">
          <Button
            size="large"
            type="primary"
            onClick={this.goAdd}>新增首页版本</Button>
        </div>
        <Qtable
          onOperateClick={this.onOperateClick}
          dataSource={dataSource}
          columns={IndexColumns}/>
        <AddModal
          versionList={versionList}
          onOk={this.goEdit}
          onCancel={this.onCancel}
          visible={visible}
        />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(ConfigurationList);
