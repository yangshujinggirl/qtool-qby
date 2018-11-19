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
        couponName:'',
        couponCode:'',
        creater:'',
        couponUseScene:'',
        status:'',
        createTimeST:'',
        createTimeET:'',
      },
      rowSelection : {
        selectedRowKeys:this.props.coupon.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      },
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      rowSelection : {
        selectedRowKeys:props.coupon.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      }
    })
  }

  onChange =(selectedRowKeys,selectedRows)=> {
    const {rowSelection}=this.state;
    this.setState({
      rowSelection:Object.assign({},rowSelection,{selectedRowKeys})
    })
    if(selectedRows[0]){
      this.setState({couponId:selectedRows[0].couponId})
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
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage,limit}
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
    const paneitem = {
      title:'注券记录',
      key:`${this.state.componkey}editconfig`,
      componkey:`${this.state.componkey}editconfig`,
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
      const {dataList} = this.props.coupon.data1;
      const hadFuse = dataList.filter((item,index)=>{
        return item.couponId == this.state.couponId
      });
      if(hadFuse[0].status == 3){
        message.warning('该优惠券已经熔断',.8)
        this.state.rowSelection.onChange([],[]);//取消选中
      }else{
        this.setState({isFuseVisible:true})
      };
    };
  }
  //确认熔断
  onfuseOk =()=>{
    const couponId = this.state.couponId;
    fuseCouponApi({couponId:couponId})
      .then(res=>{
        if(res.code=="0"){
          this.props.dispatch({
            type:'coupon/fetchList',
            payload:{}
          })
          this.setState({couponId:null});
          this.setState({isFuseVisible:false})
          message.success(res.message,.8);
        }
      })
  }
  //取消熔断
  onfuseCancel =()=> {
    this.setState({isFuseVisible:false})
    this.state.rowSelection.onChange([],[]);//取消选中
  }
  //注券
  addCouponToUser =()=> {
    this.setState({isVisible:true})
  }
  //注券点击取消
  onCancel =(resetFiledsFunc)=> {
    this.setState({isVisible:false})
    resetFiledsFunc()
  }
  //注券点击确定
  onOk =(values,resetFiledsFunc)=> {
    InjectCouponApi(values)
    .then((res) => {
      if(res.code == '0'){
        this.setState({isVisible:false});
        message.success(res.message);
        resetFiledsFunc();//清除数据
        this.props.dispatch({ //刷新列表
          type:'coupon/fetchList',
          payload:{}
        });
      };
    },err=>{
        message.error(err.message);
        resetFiledsFunc();//清除数据
    });
  }
  //操作
  handleOperateClick(record,type) {
    if(type == "info"){
      const paneitem = {
        title:'优惠券详情',
        key:`${this.state.componkey}info`,
        componkey:`${this.state.componkey}info`,
        data:{
          pdSpuId:record.couponId,
        }
      }
      this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
      });
    }else if(type == 'edit'){
      const paneitem = {
        title:'注券记录',
        key:`${this.state.componkey}editconfig`+record.couponId,
        componkey:`${this.state.componkey}editconfig`,
        data:{
          pdSpuId:record.couponId,
          couponCode:record.couponCode
        },
      };
      this.props.dispatch({
          type:'tab/firstAddTab',
          payload:paneitem
      });
    };
  }

  render(){
    const {dataList} = this.props.coupon.data1;
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
            bodyStyle={{'fontSize':'24px','textAlign':'center','padding':'50px'}}
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
          rowSelection = {this.state.rowSelection}
        />

        {
          dataList.length>0?
          <Qpagination
            data={this.props.coupon.data1}
            onChange={this.changePage}
            onShowSizeChange = {this.onShowSizeChange}
          />:null
        }
      </div>
    )
  }
}
function mapStateToProps(state){
  const {coupon} = state;
  return {coupon};
}
export default connect(mapStateToProps)(Coupon);
