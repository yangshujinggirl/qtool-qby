import React, { Component } from 'react';
import { Button } from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import './index'
class Bpush extends Component{
  constructor(props){
    super(props);
    this.state ={
      componkey:this.props.componkey,
      field:{
        title:'',
        creater:'',
        status:'',
        type:'',
      }
    }
  }

  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'bPush/fetchList',
      payload:values
    })
  }

  //点击分页
  changePage =(currentPage)=> {
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'bPush/fetchList',
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
      type:'bPush/fetchList',
      payload:{}
    })
  }
  //新增推送
  addPush =()=> {
    const paneitem = {
      title:'创建推送',
      key:`${this.state.componkey}edit`,
      componkey:`${this.state.componkey}edit`,
      data:{
        pdSpuId:null
      }
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //点击跳转详情页
  handleOperateClick(record){
    const paneitem = {
      title:'优惠券详情',
      key:`${this.state.componkey}info`,
      componkey:`${this.state.componkey}info`,
      data:{
        pdSpuId:record.spOrderId,
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //撤销推送
  render(){
    const {dataList} = this.props.bPush;
    return(
      <div className='bPush'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div>
          <Button onClick={this.addPush} className='btn' type='primary'>新增推送</Button>
          <Button onClick={this.cancelPush} className='btn' type='primary'>撤销推送</Button>
        </div>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick.bind(this)}
        />
        <Qpagination
          data={this.props.bPush}
          onChange={this.changePage}/>
      </div>
    )
  }
}
function mapStateToProps(state){
  const {bPush} = state;
  return {bPush};
}
export default connect(mapStateToProps)(Bpush);
