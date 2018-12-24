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
  getNowFormatDate = () => {
   const startRpDate=timeForMats(30).t2;
   const endRpDate=timeForMats(30).t1;
   const {field} = this.state;
   this.setState({
     field:{
       ...field,
       startDate:startRpDate,
       endDate:endRpDate,
     }
   },function(){
       this.searchData({
         startDate:startRpDate,
         endDate:endRpDate
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
          type:'detail'
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
      _values.startDate =  moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
      _values.endDate = moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
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
    confirm({
      content:'是否确认此操作',
      onOk:()=>{
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
      },
      onCancel:()=>{
        this.props.dispatch({
          type:'allth/clearSelect',
          payload:{selectedRowKeys:null}
        });
      },
    })
  }
  render() {
    // //创建退单
		// const createChargeBack=this.props.data.rolelists.find((currentValue,index)=>{
		// 	return currentValue.url=="qerp.web.sys.doc.task"
		// })
    // //确认收货
    // const makeSureGet=this.props.data.rolelists.find((currentValue,index)=>{
		// 	return currentValue.url=="qerp.web.sys.doc.task"
		// })
    // //强制取消
    // const forceCancel=this.props.data.rolelists.find((currentValue,index)=>{
		// 	return currentValue.url=="qerp.web.sys.doc.task"
		// })
    // const { dataList=[] } = this.props.allth;
    const dataList = [{
      orderReturnId:'111',
      orderReturnNo:'222',
      orderNo:'333',
      userMoblie:'17701799531',
      returnTypeStr:'售中退款',
      returnWayStr:'仅退款',
      returnStatusStr:'待审核',
      payMount:'100',
      expectAmount:'50',
      actualAmount:'50',
      actualAmount:'100',
      qtySum:'3',
      createTime:'20181224',
    }]
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
