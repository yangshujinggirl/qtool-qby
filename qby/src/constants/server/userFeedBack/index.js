import React, { Component } from 'react';
import {connect} from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import moment from 'moment';
import {timeForMat} from '../../../utils/meth';

class UserFeedBack extends Component{
  constructor(props){
    super(props);
    this.state ={
      componkey:this.props.componkey,
      inputValues:{}
    }
  }
  componentWillMount() {
    this.getNowFormatDate();
  }
  getNowFormatDate = () => {
   const startRpDate=timeForMat(30).t2;
   const endRpDate=timeForMat(30).t1;
   this.searchData({
     createTimeST:startRpDate,
     createTimeET:endRpDate
   });
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'userFeedBack/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    })
  }

  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage,limit}
    this.props.dispatch({
      type:'userFeedBack/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'userFeedBack/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    })
  }
  //点击跳转详情页
  handleOperateClick(record){
    const paneitem = {
      title:'用户反馈详情',
      key:`${this.state.componkey}edit`+record.feedbackId,
      componkey:`${this.state.componkey}edit`,
      data:{
        pdSpuId:record.feedbackId,
      }
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  render(){
    const {dataList} = this.props.userFeedBack;
    return(
      <div className='qtools-components-pages userfeedback'>
        <FilterForm
          submit={this.searchData}
        />
        <div className = 'userFeed-table'>
            <Qtable
              dataSource = {dataList}
              columns = {Columns}
              onOperateClick={this.handleOperateClick.bind(this)}
            />
        </div>
        {
          dataList.length>0 &&
          <Qpagination
            data={this.props.userFeedBack}
            onChange={this.changePage}
            onShowSizeChange = {this.onShowSizeChange}
          />
      }
      </div>
    )
  }
}
function mapStateToProps(state){
  const {userFeedBack} = state;
  return {userFeedBack};
}
export default connect(mapStateToProps)(UserFeedBack);
