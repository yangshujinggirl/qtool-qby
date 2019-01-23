import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table,Icon} from 'antd'
import Qtable from '../../../../components/Qtable/index';
import Qpagination from '../../../../components/Qpagination/index';
import { exportDataApi } from '../../../../services/financeCenter/shareManage/shareMail'
import FilterForm from './FilterForm/index'
import Columns from './columns/index';
import { timeForMats } from '../../../../utils/meth';
import moment from 'moment';
const confirm = Modal.confirm;

class ShareMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues:{
        shopName:'',
        orderNo:'',
        shareType:'',
        createST:'',
        createET:''
      },
    }
  }
  componentWillMount() {
    this.getNowFormatDate()
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
  handleOperateClick(record) {
    const paneitem = {
      title:'订单详情',
      key:`${this.props.componkey}edit`+record.orderId,
      componkey:`${this.props.componkey}edit`,
      data:{
        pdSpuId:record.orderId,
      }
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  //点击分页
  changePage = (current,limit) => {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage,limit}
    this.props.dispatch({
      type:'shareMail/fetchList',
      payload: values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'shareMail/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //点击搜索
  searchData = (values)=> {
    const {inputValue} = this.state
    this.props.dispatch({
      type:'shareMail/fetchList',
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
    const values = {type:101,downloadParam:inputValues};
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
        <p>• 分润收款金额：商品金额-商品成本+用户支付快递费-仓库发货快递费</p>
        <p>• 分润扣款金额：退货商品金额-退货商品成本</p>
      </div>
      ),
      onOk() {},
    });
  };
  render() {
    const { dataList=[] } = this.props.shareMail;
    return (
      <div className='qtools-components-pages'>
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
          columns = {Columns}/>
        {
            dataList.length>0?
            <Qpagination
              data={this.props.shareMail}
              onChange={this.changePage}
              onShowSizeChange = {this.onShowSizeChange}
            />:null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { shareMail } = state;
  return {shareMail};
}

export default connect(mapStateToProps)(ShareMail);
