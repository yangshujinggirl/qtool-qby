import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table,Icon} from 'antd'
import Qtable from '../../../../components/Qtable/index';
import Qpagination from '../../../../components/Qpagination/index';
import { exportDataApi } from '../../../../services/datapos/shReport/thList'
import { timeForMat } from '../../../../utils/meth';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';
import moment from 'moment';
const confirm = Modal.confirm;
import './index.less'

class ThList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues:{}
    }
  }
  componentWillMount() {
    this.getNowFormatDate();
  }
  getNowFormatDate = () => {
   const startRpDate = timeForMat(30).t2;
   const endRpDate = timeForMat(30).t1;
   this.searchData({
     createtimeST:startRpDate,
     createtimeET:endRpDate,
     returnType:0
   });
 }

  //操作
  handleOperateClick(record) {
    const paneitem = {
      title:'订单详情',
      key:`${this.props.componkey}edit`+record.wsAsnId,
      componkey:`${this.props.componkey}infoTh`,
      data:{
        wsAsnId:record.wsAsnId,
        spShopId:record.wsAsnId,
        spOrderNo:record.spOrderNo,
        qtySum:record.qtySum,
        statusStr:record.statusStr,
        createTime:record.createTime,
        updateTime:record.updateTime,
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
      type:'thList/fetchList',
      payload: values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'thList/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //点击搜索
  searchData = (values)=> {
    values.spShopId = Number(this.props.shopId);
    this.props.dispatch({
      type:'thList/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    })
  }
  render() {
    const { dataList=[]} = this.props.thList;
    return (
      <div className='qtools-components-pages md_divide'>
        <FilterForm
          submit={this.searchData}
        />
        <Qtable
          dataSource={dataList}
          onOperateClick = {this.handleOperateClick.bind(this)}
          columns = {Columns}/>
        {
            dataList.length>0?
            <Qpagination
              data={this.props.thList}
              onChange={this.changePage}
              onShowSizeChange = {this.onShowSizeChange}
            />:null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { thList } = state;
  return {thList};
}

export default connect(mapStateToProps)(ThList);
