import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table} from 'antd'
import { exportDataApi } from '../../services/orderCenter/userOrders'
import Qtable from '../../components/Qtable/index';
import Qpagination from '../../components/Qpagination/index';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';
import {timeForMats} from '../../utils/meth';
import moment from 'moment';
const confirm = Modal.confirm;

class UserOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues:{},
    }
  }
  componentWillMount() {
    this.getNowFormatDate();
  }
  getNowFormatDate = () => {
   const startRpDate = timeForMats(30).t2;
   const endRpDate = timeForMats(30).t1;
   this.searchData({
     dateTimeST:startRpDate,
     dateTimeET:endRpDate
   });
 }

  //操作
  handleOperateClick(record) {
    let paneitem = {};
    if(record.orderType == 5){ //如果是保税订单 ------> 跳转保税订单c端详情
      paneitem = {
        title:'订单详情',
        key:`${this.props.componkey}edit`+record.orderId+'info',
        data:{
          record:record,
          orderNo:record.orderNo,
        },
        componkey:'801000info'
      }
    }else{
      paneitem = {
        title:'订单详情',
        key:`${this.props.componkey}edit`+record.orderId,
        componkey:`${this.props.componkey}edit`,
        data:{
          pdSpuId:record.orderId,
        }
      };
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //点击分页
  changePage = (current) => {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage}
    this.props.dispatch({
      type:'userorders/fetchList',
      payload: values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'userorders/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'userorders/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    })
  }
  //导出数据
  exportData =()=> {
    const values ={ type: 12, downloadParam: {...this.state.inputValues}};
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
    //导出数据按钮是否显示
		const exportUserorderData=this.props.data.rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sys.doc.task"
		})
    const { dataList } = this.props.userorders;
    return (
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}/>
        <div className="handel-btn-lists">
        {
          exportUserorderData?
            <Button
              type='primary'
              size='large'
              onClick={this.exportData}>
              导出数据
            </Button>
          : null
        }

        </div>
        <Qtable
          dataSource={dataList}
          onOperateClick = {this.handleOperateClick.bind(this)}
          columns = {Columns}/>
        {
            dataList.length>0?
            <Qpagination
              data={this.props.userorders}
              onChange={this.changePage}
              onShowSizeChange = {this.onShowSizeChange}
            />:null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { userorders} = state;
  return {userorders};
}

export default connect(mapStateToProps)(UserOrder);
