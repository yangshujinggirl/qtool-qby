import React, { Component } from 'react';
import {Button} from 'antd'
import {connect} from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
class Coupon extends Component{
  constructor(props){
    super(props);
  }
  state = {
    componkey:this.props.componkey,
    field:{
      customServiceNo:'',
      customServiceTheme:'',
      waiter:'',
      status:'',
      handleTime:'',
    },
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
  //创建优惠券
  createCoupon =()=>{
    console.log(this.state.componkey)
    const paneitem = {
      title:'创建优惠券',
      key:`${this.state.componkey}edit`,
      componkey:`${this.state.componkey}edit`,
      data:{
        pdSpuId:null,
      },
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    });
  }
  //注券
  addCouponToUser(){

  }
  //注券记录
  addCouponToUserRecord =()=> {
    console.log(this.state.componkey)
    const paneitem = {
      title:'创建优惠券',
      key:`${this.state.componkey}editconfig`,
      componkey:`${this.state.componkey}editconfig`,
      data:{
        pdSpuId:null,
      },
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    });
  }
  //熔断优惠券
  fuseCoupon(){

  }


  render(){
    const {dataList} = this.props.coupon;
    return(
      <div className='coupon'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div>
          <Button onClick={this.createCoupon} className='btn' type='primary'>创建优惠券</Button>
          <Button onClick={this.addCouponToUser} className='btn' type='primary'>注券</Button>
          <Button onClick={this.addCouponToUserRecord} className='btn' type='primary'>注券记录</Button>
          <Button onClick={this.fuseCoupon} className='btn' type='primary'>熔断</Button>
        </div>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}/>
        <Qpagination
          data={this.props.coupon}
          onChange={this.changePage}/>
      </div>
    )
  }
}
function mapStateToProps(state){
  const {coupon} = state;
  return {coupon};
}
export default connect(mapStateToProps)(Coupon);
