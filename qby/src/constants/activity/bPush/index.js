import React, { Component } from 'react';
import { Button, Modal, message } from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import { bPushRevokeApi } from '../../../services/activity/bPush'
import './index'
class Bpush extends Component{
  constructor(props){
    super(props);
    this.rowSelection = {
       type:'radio',
       onChange:(selectedRowKeys, selectedRows) =>{
         this.setState({bPushName:selectedRows[0].spOrderId})
         this.setState({bPushId:selectedRows[0].spOrderId})
       },
     };
    this.state ={
      bPushId:'',
      bPushName:'',
      isPushVisible:false,
      componkey:this.props.componkey,
      field:{
        title:'',
        creater:'',
        status:'',
        type:'',
      }
    }
  }

  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'bPush/fetchList',
      payload:values
    })
  }

  //点击分页
  changePage =(current)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'bPush/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'bPush/fetchList',
      payload:{currentPage,limit}
    });
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    const {rangePicker,..._values} = values;
    if(rangePicker){
      _values.createTimeST =  rangePicker[0]._d.getTime();
      _values.createTimeET = rangePicker[1]._d.getTime();
    }
    this.setState({field:_values});
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'bPush/fetchList',
      payload:{}
    })
  }
  //新增推送
  addPush =()=> {
    const paneitem = {
      title:'新建推送',
      key:`${this.state.componkey}edit`,
      componkey:`${this.state.componkey}edit`,
      data:{
        pdSpuId:null
      }
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //点击跳转详情页
  getDetail(record){
    const paneitem = {
      title:'推送详情',
      key:`${this.state.componkey}info`,
      componkey:`${this.state.componkey}info`,
      data:{
        pdSpuId:record.spOrderId,
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //修改推送
  getEdit(record){
    const paneitem = {
      title:'修改推送',
      key:`${this.state.componkey}edit`+record.spOrderId,
      componkey:`${this.state.componkey}edit`,
      data:{
        pdSpuId:record.spOrderId,
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //处理表格的点击事件
  handleOperateClick(record,type){
    switch(type) {
      case "detail":
        this.getDetail(record)
        break;
      case "edit":
        this.getEdit(record)
        break;
    }
  }
  //撤销推送
  cancelPush =()=> {
    if(!this.state.bPushId){
      message.warning('请选择要撤销的推送');
    }else{
      this.setState({isPushVisible:true})
    }
  }
  //确定撤销
  onOk =()=>{
    const bPushId = this.state.bPushId
    bPushRevokeApi(bPushId)
    .then(res => {
      message.success('撤销成功')
    },err => {
      message.error('撤销失败')
    })
  }
  //取消撤销
  onCancel =()=>{
    this.setState({isPushVisible:false})
  }


  render(){
    const {dataList} = this.props.bPush;
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div className="handel-btn-lists">
          <Button onClick={this.addPush} size='large' type='primary'>新增推送</Button>
          <Button onClick={this.cancelPush} size='large' type='primary'>撤销推送</Button>
        </div>
        <Modal
            bodyStyle={{fontSize:'24px','padding':'50px'}}
            visible= {this.state.isPushVisible}
            cancelText="不撤销了"
            okText='确定撤销'
            onCancel= {this.onCancel}
            onOk = {this.onOk}
          >
            <p>你正在撤消标题为{this.state.bPushName}的推送，确认撤消？</p>
        </Modal>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick.bind(this)}
          select
          rowSelection = {this.rowSelection}
        />
        <Qpagination
          data={this.props.bPush}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}
        />
      </div>
    )
  }
}
function mapStateToProps(state){
  const {bPush} = state;
  return {bPush};
}
export default connect(mapStateToProps)(Bpush);
