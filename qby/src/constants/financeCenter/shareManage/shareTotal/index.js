import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table,Icon} from 'antd'
import Qtable from '../../../../components/Qtable/index';
import Qpagination from '../../../../components/Qpagination/index';
import { exportDataApi } from '../../../../services/financeCenter/shareManage/shareTotal'
import { timeForMats } from '../../../../utils/meth';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';
import moment from 'moment';
const confirm = Modal.confirm;

class ShareTotal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues:{
        shopName:'',
        createET:'',
        createST:'',
      },
    }
  }
  componentWillMount() {
    this.getNowFormatDate();
  }
  getNowFormatDate = () => {
   const startRpDate=timeForMats(30).t2;
   const endRpDate=timeForMats(30).t1;
   this.searchData({
     createST:startRpDate,
     createET:endRpDate
   });
 }
  //操作
  handleOperateClick(record,type) {
    let paneitem = {};
    if(type=="detail1"){
      //用户退单详情
      paneitem = {
        title:'订单详情',
        key:`${this.props.componkey}edit`+record.orderId,
        componkey:`${this.props.componkey}info`,
        data:{
          pdSpuId:record.orderId,
        }
      }
    }else{
      //用户订单详情
      paneitem={
        title:'订单详情',
        key:`${this.props.componkey}edit`+ record.outId + 'info27',
        data:{pdSpuId:record.orderId},
        componkey:'207000edit'
      }
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
      type:'shareTotal/fetchList',
      payload: values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'shareTotal/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //点击搜索
  searchData = (values)=> {
    const {inputValues} = this.state;
    this.props.dispatch({
      type:'shareTotal/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    });
  }
  //导出数据
  exportData =()=> {
    const {inputValues} = this.state;
    for(var i in inputValues){
      if(!inputValues[i]){ //职位undefined的，也要存在
        inputValues[i] = ''
      };
    };
    const values = {type:100,downloadParam:inputValues}
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
				<p>• 直邮分润收款：该门店在查询时间范围内的，直邮分润中，类型为分润收款的总和</p>
				<p>• 直邮分润扣款：该门店在查询时间范围内的，直邮分润中，类型为分润退款的总和</p>
				<p>• 保税分润收款：该门店在查询时间范围内的，保税分润中，类型为分润收款的总和</p>
				<p>• 保税分润扣款：该门店在查询时间范围内的，保税分润中，类型为分润退款的总和</p>
				<p>• 总分润=直邮分润收款+直邮分润扣款+保税分润收款+保税分润扣款</p>
			</div>
			),
			onOk() {},
		});
	};
  //创建退单
  createTorder =()=> {

  }
  render() {
    // //导出数据按钮是否显示
		// const exportUserorderData=this.props.data.rolelists.find((currentValue,index)=>{
		// 	return currentValue.url=="qerp.web.sys.doc.task"
		// })
    const { dataList=[] } = this.props.shareTotal;
    return (
      <div className='qtools-components-pages shareTotal'>
        <FilterForm
          submit={this.searchData}
        />
      <div className='clearfix mb10 introModal'>
          <p className='fr pointer' onClick={this.desinfo} >计算规则
            <Icon type="question-circle-o" style={{color:"#ED6531",marginLeft:"4px"}}/>
          </p>
        </div>
        <div className="handel-btn-lists">
            <Button
              type='primary'
              size='large'
              onClick={this.exportData}
            >导出数据
            </Button>
        </div>
        <Qtable
          dataSource={dataList}
          onOperateClick = {this.handleOperateClick.bind(this)}
          columns = {Columns}
          />
        {
            dataList.length>0?
            <Qpagination
              data={this.props.shareTotal}
              onChange={this.changePage}
              onShowSizeChange = {this.onShowSizeChange}
            />:null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { shareTotal } = state;
  return {shareTotal};
}
export default connect(mapStateToProps)(ShareTotal);
