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
      field:{
        orderReturnNo:'',
        orderNum:'',
        returnWay:'',
        returnStatus:'',
        returnType:'',
        userPhone:'',
        createTimeST:'',
        createTimeET:'',
      },
    }
  }
  componentWillMount() {
    this.getNowFormatDate()
  }
  getNowFormatDate = () => {
   const startRpDate=timeForMats(30).t2;
   const endRpDate=timeForMats(30).t1;
   const {field} = this.state;
   this.setState({
     field:{
       ...field,
       createTimeST:startRpDate,
       createTimeET:endRpDate,
       }
     },function(){
       this.searchData({
         createTimeST:startRpDate,
         createTimeET:endRpDate
       });
   })
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
      rowSelection:Object.assign({},rowSelection,{selectedRowKeys})
    })
    if(selectedRows[0]){
      this.setState({orderReturnNo:selectedRows[0].orderReturnNo})
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
          orderReturnNo:record.orderReturnNo,
        }
      }
    }else{
      //用户订单详情
      paneitem={
        title:'订单详情',
        key:`${this.props.componkey}edit`+ record.orderReturnId + 'info27',
        data:{pdSpuId:record.orderReturnId},
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
    const values = {...this.state.field,currentPage,limit}
    this.props.dispatch({
      type:'allth/fetchList',
      payload: values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'allth/fetchList',
      payload:{currentPage,limit,...this.state.field}
    });
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    const {rangePicker,..._values} = values;
    if(rangePicker&&rangePicker[0]){
      _values.createTimeST =  moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
      _values.createTimeET = moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
    }
    this.setState({field:_values});
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'allth/fetchList',
      payload:values
    })
  }
  //导出数据
  exportData =()=> {
    const values ={type:12,downloadParam:{...this.state.field}}
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
				<p>1、表单中为所有退单（不包含有赞保税退单）。按创建时间逆序
				【自提、同城、邮寄】的退款单的【退款方式】默认为退货退款</p>
				<p>2、【表头包含字段】：退单号、用户订单、用户电话、退款类型、退款方式、原单支付金额、申请金额、实退金额、退单商品数、退款状态、创建时间</p>
				<p>字段说明:</p>
				<p>• 退款方式：为用户售中退款时，退款方式为仅退款；【自提、同城、邮寄】的售后退款单的【退款方式】均为退货退款；【仓储、保税】的售后退款单按照运营选择结果</p>
				<p>• 申请金额：为用户申请的退款金额，运营或门店申请的为申请的金额</p>
				<p>• 实退金额：为最终退款金额，除“已退款”状态外，其他均为0.00</p>
				<p>3、商品数量，非sku种数</p>
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
    const {orderReturnNo} = this.state;
    sureGetApi( {orderReturnNo})
    .then(res => {
      if(res.code == '0'){
        message.success('已确认收货')
        this.props.dispatch({
          type:'allth/clearSelect',
          payload:{selectedRowKeys:null}
        });
      };
    })
  }
  //强制取消
  forceCancel =()=> {
    const {orderReturnNo} = this.state;
    forceCancelApi( {orderReturnNo})
    .then(res => {
      if(res.code == '0'){
        message.success('强制取消成功')
        this.props.dispatch({
          type:'allth/clearSelect',
          payload:{selectedRowKeys:null}
        });
      };
    })
  }
  render() {
    // //导出数据按钮是否显示
		// const exportUserorderData=this.props.data.rolelists.find((currentValue,index)=>{
		// 	return currentValue.url=="qerp.web.sys.doc.task"
		// })
    const { dataList=[] } = this.props.allth;
    return (
      <div className='qtools-components-pages allth'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
      <div className='clearfix mb10 introModal'>
          <p className='fr pointer' onClick={this.desinfo} >说明
            <Icon type="question-circle-o" style={{color:"#ED6531",marginLeft:"4px"}}/>
          </p>
        </div>
        <div className="handel-btn-lists">
            <Button
              type='primary'
              size='large'
              onClick={this.createTorder}
            >创建退单
            </Button>
            <Button
              type='primary'
              size='large'
              onClick={this.sureGet}
            >确认收货
            </Button>
            <Button
              type='primary'
              size='large'
              onClick={this.forceCancel}
            >强制取消
            </Button>
        </div>
        <Qtable
          dataSource={dataList}
          onOperateClick = {this.handleOperateClick.bind(this)}
          columns = {Columns}
          select
          rowSelection = {this.state.rowSelection}
          />
        {
            dataList.length>0?
            <Qpagination
              data={this.props.allth}
              onChange={this.changePage}
              onShowSizeChange = {this.onShowSizeChange}
            />:null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { allth } = state;
  return {allth};
}

export default connect(mapStateToProps)(Allth);
