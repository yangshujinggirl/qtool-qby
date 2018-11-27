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
      field:{
        feedbackNo:'',
        telephone:'',
        status:'',
        handleTimeType:'',
        createTimeST:"",
        createTimeET:""
      }
    }
  }
  componentWillMount() {
    this.getNowFormatDate();
  }
  getNowFormatDate = () => {
   const startRpDate=timeForMat(30).t2;
   const endRpDate=timeForMat(30).t1;
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
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'userFeedBack/fetchList',
      payload:values
    })
  }

  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage,limit}
    this.props.dispatch({
      type:'userFeedBack/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'userFeedBack/fetchList',
      payload:{currentPage,limit}
    })
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    const {rangePicker,..._values} = values;
    if(rangePicker&&rangePicker[0]){
      _values.createTimeST =  moment(new Date(rangePicker[0]._d).getTime()).format('YYYY-MM-DD');
      _values.createTimeET = moment(new Date(rangePicker[1]._d).getTime()).format('YYYY-MM-DD');
    }
    this.setState({field:_values});
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
          onValuesChange = {this.searchDataChange}
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
