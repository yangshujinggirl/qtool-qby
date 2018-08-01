import React, { Component } from 'react';
import {Button,message,Modal} from 'antd'
import {connect} from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import InjectCoupons from './InjectCoupon'
import { InjectCouponApi } from '../../../services/activity/coupon'
import { fuseCouponApi } from '../../../services/activity/coupon'


class Coupon extends Component{
  constructor(props){
    super(props);
    this.state = {
      couponId:'',
      isFuseVisible:false,//熔断弹窗是否显示
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
    this.rowSelection = {
      type:'radio',
      onChange:(key,selectedRows)=>{
        this.setState({couponId:selectedRows[0].spOrderId})
      }
    }
  }

  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'coupon/fetchList',
      payload:values
    })
  }
  //点击分页
  changePage =(current)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'coupon/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'coupon/fetchList',
      payload:{currentPage,limit}
    });
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
  fuseCoupon =()=> {
    if(!this.state.couponId){
      message.warning('请选择要熔断的优惠券',.5)
    }else{
      this.setState({isFuseVisible:true})
    }
  }
  //确认熔断
  onfuseOk =()=>{
    const couponId = this.state.couponId;
    fuseCouponApi(couponId)
    .then(res=>{
      message.success('熔断成功',.8);
    },err=>{
      message.success('熔断失败',.8);
    })
    this.setState({isFuseVisible:false})
  }
  //取消熔断
  onfuseCancel =()=> {
    this.setState({isFuseVisible:false})
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
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div className="handel-btn-lists">
          <Button onClick={this.createCoupon}  size='large' type='primary'>创建优惠券</Button>
          <Button onClick={this.addCouponToUser}  size='large' type='primary'>注券</Button>
          <Button onClick={this.addCouponToUserRecord}  size='large' type='primary'>注券记录</Button>
          <Button onClick={this.fuseCoupon} type='primary' size='large'>熔断</Button>
        </div>
        <Modal
            bodyStyle={{'font-size':'24px','text-align':'center','padding':'50px'}}
            visible= {this.state.isFuseVisible}
            okText="确认熔断"
            cancelText='不熔断了'
            onCancel= {this.onfuseCancel}
            onOk = {this.onfuseOk}
          >
            <p>你正在熔断代金券</p>
        </Modal>
        <InjectCoupons
          visible={this.state.isVisible}
          onCancel={this.onCancel}
          onOk={this.onOk}
        />
        <Qtable
          onOperateClick = {this.handleOperateClick.bind(this)}
          dataSource = {dataList}
          columns = {Columns}
          select
          rowSelection = {this.rowSelection}
        />
        <Qpagination
          data={this.props.coupon}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}
        />
      </div>
    )
  }
}
function mapStateToProps(state){
  const {coupon} = state;
  return {coupon};
}
export default connect(mapStateToProps)(Coupon);
