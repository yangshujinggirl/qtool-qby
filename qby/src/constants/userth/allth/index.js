import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table,Icon} from 'antd'
import { sureGetApi,forceCancelApi } from '../../../services/orderCenter/userth/allth'
import {timeForMats} from '../../../utils/meth';
import Qtable from '../../../components/Qtable/index';
import Qpagination from '../../../components/Qpagination/index';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';
import moment from 'moment';
const confirm = Modal.confirm;

class Allth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSelection : {
        selectedRowKeys:this.props.allth.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      },
      selectedRows:[],
      inputValues:{
        orderReturnNo:'',
        orderNo:'',
        returnWay:'',
        returnStatus:'',
        returnType:'',
        userMoblie:'',
        startDate:'',
        endDate:'',
      },
    }
  }
  componentWillMount() {
    this.getNowFormatDate()
  }
  getNowFormatDate =()=> {
   const startRpDate=timeForMats(30).t2;
   const endRpDate=timeForMats(30).t1;
   this.searchData({
     startDate:startRpDate,
     endDate:endRpDate
   });
 }
  componentWillReceiveProps(props){
    this.setState({
      rowSelection : {
        selectedRowKeys:this.props.allth.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      }
    })
  }
  onChange =(selectedRowKeys,selectedRows)=> {
    const {rowSelection}=this.state;
    this.setState({
      rowSelection:Object.assign({},rowSelection,{selectedRowKeys}),
      selectedRows:selectedRows
    })
    if(selectedRows[0]){
      this.setState({orderReturnId:selectedRows[0].orderReturnId})
    };
  }
  //操作
  handleOperateClick(record,type) {
    let paneitem = {};
    if(type=="detail1"){
      //用户退单详情
      paneitem = {
        title:'订单详情',
        key:`${this.props.componkey}edit`+record.orderReturnId,
        componkey:`${this.props.componkey}info`,
        data:{
          orderReturnId:record.orderReturnId,
          type:'detail'
        }
      }
    }else{
      //用户订单详情
      paneitem={
        title:'订单详情',
        key:`${this.props.componkey}edit`+ record.orderReturnId + 'info27',
        data:{pdSpuId:record.orderId},
        componkey:'207000edit'
      };
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //点击分页
  changePage = (current,limit) => {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage,limit}
    this.props.dispatch({
      type:'allth/fetchList',
      payload: values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'allth/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //点击搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'allth/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    })
  }
  //导出数据
  exportData =()=> {
    const values ={type:12,downloadParam:{...this.state.inputValues}}
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
  desinfo=()=>{
		Modal.info({
			title: '表单说明',
			content: (
			<div className='lists'>
				<p>1、保税仓待收货退单可确认收货</p>
				<p>2、保税仓待收货退单和仓库直邮的待收货退单可强制取消</p>
			</div>
			),
			onOk() {},
		});
	};
  //创建退单
  createTorder =()=> {
    const paneitem = {
      title:'新建退单',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  //确认收货
  sureGet =()=> {
    const {orderReturnId,selectedRows} = this.state;
    if(!selectedRows[0]){ //如果未选择
      message.warning('请选择需要操作的保税订单',.8)
    }else{//只可操作保税仓的待收货订单
      if(selectedRows[0].orderType != 5 || selectedRows[0].returnStatus != 50 ){
        message.error('只可操作保税仓的待收货订单')
      }else{
        sureGetApi( {orderReturnId})
        .then(res => {
          if(res.code == '0'){
            message.success('已确认收货')
            this.props.dispatch({
              type:'allth/clearSelect',
              payload:{selectedRowKeys:null}
            });
          };
        })
      };
    };
  }
  //强制取消
  forceCancel =()=> {
    const {selectedRows} = this.state
    if(!selectedRows[0]){
      message.warning('请选择需要操作的保税订单或仓库直邮订单',.8)
    }else{ //只可操作保税仓和仓库直邮的，待收货退单
      if((selectedRows[0].orderType == 5&&selectedRows[0].returnStatus==50) || (selectedRows[0].orderType==4 && selectedRows[0].returnStatus==50) ){
        confirm({
          content:'是否确认此操作',
          onOk:()=>{
            const {orderReturnId} = this.state;
            forceCancelApi( {orderReturnId})
            .then(res => {
              if(res.code == '0'){
                message.success('强制取消成功')
                this.props.dispatch({
                  type:'allth/clearSelect',
                  payload:{selectedRowKeys:null}
                });
              };
            })
          },
          onCancel:()=>{
            this.props.dispatch({
              type:'allth/clearSelect',
              payload:{selectedRowKeys:null}
            });
          },
        });
      }else{
        message.error('只可操作保税订单或仓库直邮订单的待收货状态的订单')
      };
    };
  }
  render() {
    //创建退单
		const createChargeBack=this.props.rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.order.return.save"
		})
    //确认收货
    const makeSureGet=this.props.rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.order.return.confirm"
		})
    //强制取消
    const forceCancel=this.props.rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.order.return.cancel"
		})
    const { dataList = [] } = this.props.allth;
    return (
      <div className='qtools-components-pages allth'>
        <FilterForm
          submit={this.searchData}
        />
      <div className='clearfix mb10 introModal'>
          <p className='fr pointer' onClick={this.desinfo} >说明
            <Icon type="question-circle-o" style={{color:"#ED6531",marginLeft:"4px"}}/>
          </p>
        </div>
        <div className="handel-btn-lists">
          {
            createChargeBack &&
            <Button
              type='primary'
              size='large'
              onClick={this.createTorder}
            >创建退单
            </Button>
          }
          {
            makeSureGet &&
            <Button
              type='primary'
              size='large'
              onClick={this.sureGet}
            >确认收货
            </Button>
          }
          {
            forceCancel &&
            <Button
              type='primary'
              size='large'
              onClick={this.forceCancel}
            >强制取消
            </Button>
          }
        </div>
        {
          dataList.length>0 &&
          <Qtable
            dataSource={dataList}
            onOperateClick = {this.handleOperateClick.bind(this)}
            columns = {Columns}
            select
            rowSelection = {this.state.rowSelection}
            />
        }
        <Qpagination
          data={this.props.allth}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { allth } = state;
  return {allth};
}

export default connect(mapStateToProps)(Allth);
