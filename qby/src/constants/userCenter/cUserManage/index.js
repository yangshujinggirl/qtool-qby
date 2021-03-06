import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table} from 'antd'
import Qtable from '../../../components/Qtable/index';
import Qpagination from '../../../components/Qpagination/index';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';
import {timeForMats} from '../../../utils/meth';
import moment from 'moment';
const confirm = Modal.confirm;

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues:{
        userId:'',
        mobile:'',
        name:'',
        unionId:'',
        createTimeST:'',
        createTimeET:'',
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
     createTimeST:startRpDate,
     createTimeET:endRpDate
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
  changePage = (current) => {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage}
    this.props.dispatch({
      type:'cUserManage/fetchList',
      payload: values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'cUserManage/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'cUserManage/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    });
  }
  render() {
    const { dataList } = this.props.cUserManage;
    return (
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}/>
        {
          dataList.length>0 &&
          <Qtable
            dataSource={dataList}
            onOperateClick = {this.handleOperateClick.bind(this)}
            columns = {Columns}/>
        }
        {
          dataList.length>0?
          <Qpagination
            data={this.props.cUserManage}
            onChange={this.changePage}
            onShowSizeChange = {this.onShowSizeChange}
          />:null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { cUserManage } = state;
  return {cUserManage};
}

export default connect(mapStateToProps)(UserManage);
