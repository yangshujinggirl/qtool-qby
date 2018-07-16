import React, { Component } from 'react';
import {connect} from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
class UserFeedBack extends Component{
  constructor(props){
    super(props);
    this.state ={
      componkey:this.props.componkey,
      field:{
        customServiceNo:'',
        customServiceTheme:'',
        waiter:'',
        status:'',
        handleTime:'',
      }
    }
  }

  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'userFeedBack/fetchList',
      payload:values
    })
  }

  //点击分页
  changePage =(currentPage)=> {
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'userFeedBack/fetchList',
      payload:values
    })
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    const {rangePicker,..._values} = values;
    if(rangePicker){
      _values.createTimeST =  rangePicker[0]._d.getTime();
      _values.createTimeET = rangePicker[1]._d.getTime();
    }
    this.setState({field:_values});
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'userFeedBack/fetchList',
      payload:{}
    })
  }

  render(){
    const {dataList} = this.props.userFeedBack;
    return(
      <div className='server'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <Qtable
          dataSource = {dataList}
          columns = {Columns}/>
        <Qpagination
          data={this.props.userFeedBack}
          onChange={this.changePage}/>
      </div>
    )
  }
}
function mapStateToProps(state){
  const {userFeedBack} = state;
  return {userFeedBack};
}
export default connect(mapStateToProps)(UserFeedBack);
