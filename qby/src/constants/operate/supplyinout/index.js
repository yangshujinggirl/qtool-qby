import React, { Component } from 'react';
import { Button, Modal, message } from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import moment from 'moment';
import { changeStatusApi } from '../../../services/operate/supplyinout'

class Supplyinout extends Component{
  constructor(props){
    super(props);
    this.state ={
      bPushId:'',
      bPushName:'',
      isPushVisible:false,
      componkey:this.props.componkey,
      field:{
        settlementNo:'',
        name:'',
        type:'',
        status:'',
        userName:'',
        payType:'',
        startTime:'',
        endTime:''
      },
      rowSelection:{
         type:'radio',
         selectedRowKeys:this.props.supplyinout.selectedRowKeys,
         onChange:this.onChange
       },
    }
  }
  //初始化数据
  componentWillMount(){
    this.initData()
  }
  //初始数据
  initData =()=> {
    this.props.dispatch({
      type:'supplyinout/fetchList',
      payload:{}
    })
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
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'bPush/fetchList',
      payload:values
    })
  }
  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage,limit}
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
  onChange =(selectedRowKeys, selectedRows)=> {
    const {rowSelection} = this.state
    this.setState({
      rowSelection:Object.assign({},rowSelection,{selectedRowKeys}),
      selectedRows:selectedRows[0],
    })
  }
  componentWillReceiveProps(props){
    this.setState({
      rowSelection:{
         type:'radio',
         selectedRowKeys:this.props.supplyinout.selectedRowKeys,
         onChange:this.onChange
       },
    })
  }
  //处理表格的点击事件
  handleOperateClick(record,type){
    switch(type) {
      case "billdetail":
        this.getbillDetail(record)
        break;
      case "orderDetail":
        this.getorderDetail(record)
        break;
    }
  }
  //点击跳转结算单明细页
  getbillDetail(record){
    const paneitem = {
      title:'结算单明细',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
      data:{
        pdSettlementId:record.pdSettlementId,
        status:record.status
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //点击跳转订单详情页
  getorderDetail(record){
    const spOrderId=String(record.pdSettlementId)
    const paneitem = {
      title:'订单详情',
      key:'201000edit'+spOrderId+'info',
      data:{
        spOrderId:spOrderId,
      },
      componkey:'201000info'
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //改变结算的状态
  changeCountStatus(type,status){ //status结算的状态，type:已结/待结
    if(this.state.selectedRows){ //如果已经选中
      if(type == 'hadCount'){ //点击已结算,如果是已结算再改变return
        if(this.state.selectedRows.status == 1){
          message.warning('已经是已结算状态，无需更改',.8);
          this.onChange([],[])
        }else{
          this.changeStatusApi(status); //发送请求
        };
      }else{ //已经是待结算状态无需更改
        if(this.state.selectedRows.status == 0){
          message.warning('已经是待结算状态，无需更改',.8);
          this.onChange([],[])
        }else{
          this.changeStatusApi(status); //发送请求
        };
      };
    }else{
      message.warning('请选择要改变状态的选项');
    };
  }
  //状态更改的请求
  changeStatusApi =(status)=> {
    const {pdSettlementId} = this.state.selectedRows;
    changeStatusApi({pdSettlementId,status:status})
    .then(res => {
      if(res.code == '0'){
        message.success(res.message);
        this.initData();
      };
    })
  }
  render(){
    console.log(this.state.rowSelection)
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
            <Button
              size='large'
              type='primary'
              onClick={()=>this.changeCountStatus('hadCount',1)}>
              已结算
            </Button>
            <Button
              size='large'
              type='primary'
              onClick={()=>this.changeCountStatus('onCount',0)}>
              待结算
            </Button>
            <Button size='large' type='primary'>导出数据</Button>
            <Button size='large' type='primary'>导出请款表</Button>
        </div>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick.bind(this)}
          select
          rowSelection = {this.state.rowSelection}
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
