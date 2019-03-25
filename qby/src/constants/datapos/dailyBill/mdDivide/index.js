import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table,Icon} from 'antd'
import Qtable from '../../../../components/Qtable/index';
import Qpagination from '../../../../components/Qpagination/index';
import { exportDataApi } from '../../../../services/datapos/dailyBill/mdDivide'
import { getCurrentTime } from '../../../../utils/meth';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';
import moment from 'moment';
const confirm = Modal.confirm;
import './index.less'

class MdDivide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues:{
        orderType:0,
        shareType:0,
      }
    }
  }
  componentWillMount() {
    this.getNowFormatDate();
  }
  getNowFormatDate = () => {
   const startRpDate = moment().subtract(1, "months").format("YYYY-MM-DD");
   const endRpDate =  moment().format("YYYY-MM-DD");
   this.searchData({
     spShopId:this.props.shopId,
     createtimeST:startRpDate,
     createtimeET:endRpDate
   });
 }

  //操作
  handleOperateClick(record) {
    const paneitem = {
      title:'订单详情',
      key:`${this.props.componkey}edit`+record.orderId,
      componkey:`${this.props.componkey}edit`,
      data:{
        pdSpuId:record.orderId,
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
      type:'mdDivide/fetchList',
      payload: values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'mdDivide/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //点击搜索
  searchData = (values)=> {
    values.spShopId = this.props.shopId;
    this.props.dispatch({
      type:'mdDivide/fetchList',
      payload:values
    });
    const _values={...this.state.inputValues,...values}
    this.setState({
      inputValues:_values
    });
  }
  //导出数据
  exportData =()=> {
    const values ={type:103,downloadParam:{...this.state.inputValues}}
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

  render() {
    const { dataList=[],orderNum,shareProfitSumAmount } = this.props.mdDivide;
    console.log(this.props.mdDivide)
    return (
      <div className='qtools-components-pages md_divide'>
        <FilterForm
          submit={this.searchData}
        />
        <div className="handel-btn-lists">
            <Button
              type='primary'
              size='large'
              onClick={this.exportData}
            >导出数据
            </Button>
        </div>
        <div className='total'>共 {orderNum} 单，合计分成 {shareProfitSumAmount} 元</div>
        <Qtable
          dataSource={dataList}
          onOperateClick = {this.handleOperateClick.bind(this)}
          columns = {Columns}/>
        {
            dataList.length>0?
            <Qpagination
              data={this.props.mdDivide}
              onChange={this.changePage}
              onShowSizeChange = {this.onShowSizeChange}
            />:null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { mdDivide } = state;
  return {mdDivide};
}

export default connect(mapStateToProps)(MdDivide);
