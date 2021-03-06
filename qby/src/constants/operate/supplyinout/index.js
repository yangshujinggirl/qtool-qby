import React, { Component } from 'react';
import { Button, Modal, message } from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import moment from 'moment';
import {timeForMat} from '../../../utils/meth';
import { changeStatusApi } from '../../../services/operate/supplyinout'
import { exportDataApi } from '../../../services/orderCenter/userOrders'
const confirm = Modal.confirm;

class Supplyinout extends Component{
  constructor(props){
    super(props);
    this.state ={
      bPushId:'',
      bPushName:'',
      isPushVisible:false,
      componkey:this.props.componkey,
      inputValues:{},
      rowSelection:{
         type:'radio',
         selectedRowKeys:this.props.supplyinout.selectedRowKeys,
         onChange:this.onChange
       },
    }
  }
  componentWillMount() {
    this.getNowFormatDate();
  }
  getNowFormatDate = () => {
   const startRpDate=timeForMat(30).t2;
   const endRpDate=timeForMat(30).t1;
   this.searchData({
     dateStart:startRpDate,
     dateEnd:endRpDate
   });
 }
  //导出数据
  exportData =(type)=> {
    const values ={type:type,downloadParam:this.state.inputValues}
    exportDataApi(values)
    .then(res => {
      if(res.code == '0'){
        confirm({
          title: '数据已经进入导出队列',
          content: '请前往下载中心查看导出进度',
          cancelText:'稍后去',
          okText:'去看看',
          onOk:()=> {
            const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
            this.props.dispatch({
              type:'tab/firstAddTab',
              payload:paneitem
            });
            this.props.dispatch({
              type:'downlaod/fetch',
              payload:{code:'qerp.web.sys.doc.list',values:{limit:15,currentPage:0}}
            });
          },
        });
      }
    },err => {
      message.error('导出数据失败')
    })
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'supplyinout/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    });
  }
  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage,limit}
    this.props.dispatch({
      type:'supplyinout/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'supplyinout/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
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
    const rolelists = this.props.data.rolelists;
    const paneitem = {
      title:'结算单明细',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
      data:{
        pdSettlementId:record.pdSettlementId,
        status:record.status,
        rolelists:rolelists
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //点击跳转订单详情页
  getorderDetail(record){
    const spOrderId=String(record.outId)
    if(String(record.type).slice(0,1) == 2){ //type以2开头采购
      const paneitem = {
        title:'采购单详情',
        key:`${this.props.componkey}edit`+spOrderId,
        data:{
          wsAsnId:spOrderId,
        },
        componkey:'202000info'
      };
      this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
      })
    }else{ //以1开头采退
      const paneitem = {
        title:'采退单详情',
        key:`${this.props.componkey}edit`+spOrderId,
        data:{
          spCtorderId:spOrderId,
        },
        componkey:'204000info'
      };
      this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
      })
    }

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
        message.success('状态更改成功',.8);
        this.initData();
      };
    })
  }
  render(){
    const rolelists = this.props.data.rolelists;
    //已结算
    const hadClose = rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.settle.update1"
		})
    //待结算
    const noClose = rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.settle.update1"
		})
    //导出数据
    const exportData = rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.settle.export"
		})
    //导出请款表
    const exportList = rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.settle.funds.export"
		})
    const {dataList} = this.props.supplyinout;
    return(
      <div className='qtools-components-pages supplyinout'>
        <FilterForm
          submit={this.searchData}
        />
        <div className="handel-btn-lists">
          {
            hadClose
            ?
              <Button
                size='large'
                type='primary'
                onClick={()=>this.changeCountStatus('hadCount',1)}>
                已结算
              </Button>
            : null
          }
          {
            noClose
            ?
              <Button
                size='large'
                type='primary'
                onClick={()=>this.changeCountStatus('onCount',0)}>
                待结算
              </Button>
            : null
          }


            {
              exportData
              ?
                <Button
                  size='large'
                  onClick={()=>{this.exportData(22)}}
                  type='primary'>
                  导出数据
                </Button>
              : null

            }
            {
              exportList
              ?
                <Button
                  size='large'
                  onClick={()=>{this.exportData(23)}}
                  type='primary'>
                  导出请款表
                </Button>
              : null
            }
        </div>
        <div className='total-account'>
          共 {this.props.supplyinout.totalStatusNo} 条收支未结算
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
