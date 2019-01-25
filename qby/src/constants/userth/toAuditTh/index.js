import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table} from 'antd'
import { exportDataApi } from '../../../services/orderCenter/userth/toAudit'
import Qtable from '../../../components/Qtable/index';
import Qpagination from '../../../components/Qpagination/index';
import FilterForm from './FilterForm/index'
import {Columns1,Columns2} from './columns/index';
import moment from 'moment';
const confirm = Modal.confirm;

class ToAudit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues:{
        spShopName:'',
        orderNo:'',
        pdSpuName:'',
        code:'',
        mobile:'',
        orderStatus:'',
        dateTimeST:'',
        dateTimeET:'',
      },
    }
  }
  componentWillMount() {
    this.props.dispatch({
        type:'toAudit/fetchList',
        payload:{}
    });
  }
  //操作
  handleOperateClick(record) {
    const paneitem = {
      title:'退单审核',
      key:`${this.props.componkey}edit`+record.orderReturnId+'audit',
      componkey:`${this.props.componkey}info`,
      data:{
        orderReturnId:record.orderReturnId+'audit',
        orderReturnNo:record.orderReturnNo,
        type:record.returnType
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
      type:'userth/fetchList',
      payload: values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'userth/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'toAudit/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    });
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
  render() {
    //  审核
		const toAudit = this.props.rolelists.find((currentValue,index)=>{
			return currentValue.url == "qerp.web.pd.order.return.audited"
		});
    const { dataList=[] } = this.props.toAudit;
    return (
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        {
          dataList.length>0 &&
          <Qtable
            dataSource={dataList}
            onOperateClick = {this.handleOperateClick.bind(this)}
            columns = {toAudit?Columns1:Columns2}/>
        }
        <Qpagination
          data={this.props.toAudit}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { toAudit } = state;
  return {toAudit};
}

export default connect(mapStateToProps)(ToAudit);
