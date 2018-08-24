import React, { Component } from 'react';
import { Button, Modal, message } from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import moment from 'moment';

class Supplyinout extends Component{
  constructor(props){
    super(props);
    this.rowSelection = {
       type:'radio',
       onChange:(selectedRowKeys, selectedRows) =>{
         this.setState({bPushName:selectedRows[0].bPushId})
         this.setState({bPushId:selectedRows[0].bPushId})
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
        startTime:'',
        endTime:'',
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
    if(rangePicker&&rangePicker[0]){
      _values.startTime =  moment(new Date(rangePicker[0]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');;
      _values.endTime = moment(new Date(rangePicker[1]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');;
    }
    this.setState({field:_values});
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'supplyinout/fetchList',
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
        pdSpuId:record.bPushId,
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
      key:`${this.state.componkey}edit`+record.bPushId,
      componkey:`${this.state.componkey}edit`,
      data:{
        pdSpuId:record.bPushId,
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
    const rolelists=this.props.data.rolelists
    //新增推送
    const addPush=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.bPush.save"
		})
    //撤销推送
    const revokePush=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.bPush.revoke"
		})
    const {dataList} = this.props.supplyinout;
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div className="handel-btn-lists">
            <Button size='large' type='primary'>已结算</Button>
            <Button size='large' type='primary'>待结算</Button>
            <Button size='large' type='primary'>导出数据</Button>
            <Button size='large' type='primary'>导出请款表</Button>
        </div>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick.bind(this)}
          select
          rowSelection = {this.rowSelection}
        />
        <Qpagination
          data={this.props.supplyinout}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}
        />
      </div>
    )
  }
}
function mapStateToProps(state){
  const {supplyinout} = state;
  return {supplyinout};
}
export default connect(mapStateToProps)(Supplyinout);
