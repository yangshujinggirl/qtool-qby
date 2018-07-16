import React, { Component } from 'react';
import {Button,message} from 'antd'
import {connect} from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import InjectCoupons from './InjectCoupon'
import { InjectCouponApi } from '../../../services/activity/coupon'
class Coupon extends Component{
  constructor(props){
    super(props);
  }
  state = {
    isVisible:false,
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
      type:'coupon/fetchList',
      payload:values
    })
  }
  //点击分页
  changePage =(currentPage)=> {
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'coupon/fetchList',
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
      type:'coupon/fetchList',
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
  //注券记录
  addCouponToUserRecord =()=> {
    console.log(this.state.componkey)
    const paneitem = {
      title:'注券记录',
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

  //注券
  addCouponToUser =()=> {
    this.setState({isVisible:true})
  }
  //注券点击取消
  onCancel =()=> {
    this.setState({isVisible:false})
  }
  //注券点击确定
  onOk =(values)=> {
    InjectCouponApi(values)
    .then((res) => {
      message.success('dfsdf');
      console.log(res);
      if(res.code == '0'){

      }else{
      }
    },err=>{
        message.error('失败');
    });
    this.setState({isVisible:false});
  }
  //操作
  handleOperateClick(record) {
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
        <InjectCoupons
          visible={this.state.isVisible}
          onCancel={this.onCancel}
          onOk={this.onOk}
        />
        <Qtable
          onOperateClick = {this.handleOperateClick.bind(this)}
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
