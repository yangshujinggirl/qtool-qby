import React, { Component } from 'react';
import {Button,message,Modal} from 'antd'
import {connect} from 'dva'
import {Columns} from './columns/index'
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
      confirmLoading:false,
      couponId:'',
      isFuseVisible:false,//熔断弹窗是否显示
      isVisible:false,
      componkey:this.props.componkey,
      inputValues:{},
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
      type:'coupon/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'coupon/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
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
        inputValues:this.state.inputValues
      }
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
  setConfirmLoading =(value)=> {
    this.setState({
      confirmLoading:value
    });
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
        message.success(res.message);
        resetFiledsFunc();//清除数据
        this.props.dispatch({ //刷新列表
          type:'coupon/fetchList',
          payload:{}
        });
        this.setState({isVisible:false,confirmLoading:false});
      }else{
          this.setState({confirmLoading:false});
      };
    });
  }
  //操作
  handleOperateClick(record,type) {
    switch(type) {
      case "info":
        this.goInfo(record);
        break;
      case "inject":
        this.goInject(record);
        break;
      case "edit":
        this.goEdit(record);
        break;
      case "supplyAgain":
        this.goSupplyAgain(record);
        break;
    }
    // if(type == "info"){
    //   const paneitem = {
    //     title:'优惠券详情',
    //     key:`${this.state.componkey}editInfo`+record.couponId,
    //     componkey:`${this.state.componkey}info`,
    //     data:{
    //       couponId:record.couponId,
    //       inputValues:this.state.inputValues
    //     }
    //   }
    //   this.props.dispatch({
    //     type:'tab/firstAddTab',
    //     payload:paneitem
    //   });
    // }else if(type == 'inject'){ //注券记录
    //   const paneitem = {
    //     title:'注券记录',
    //     key:`${this.state.componkey}editconfig`+record.couponId,
    //     componkey:`${this.state.componkey}editconfig`,
    //     data:{
    //       pdSpuId:record.couponId,
    //       couponCode:record.couponCode
    //     },
    //   };
    //   this.props.dispatch({
    //       type:'tab/firstAddTab',
    //       payload:paneitem
    //   });
    // }else if(type == 'edit'){
    //   const paneitem = {
    //     title:'修改优惠券',
    //     key:`${this.state.componkey}edit`+record.couponId,
    //     componkey:`${this.state.componkey}edit`,
    //     data:{
    //       couponId:record.couponId,
    //     },
    //   };
    //   this.props.dispatch({
    //       type:'tab/firstAddTab',
    //       payload:paneitem
    //   });
    // }
  }
  goInfo(record) {
    const paneitem = {
      title:'优惠券详情',
      key:`${this.state.componkey}editInfo`+record.couponId,
      componkey:`${this.state.componkey}info`,
      data:{
        couponId:record.couponId,
        inputValues:this.state.inputValues
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  goInject(record) {
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
  }
  goEdit(record) {
    const paneitem = {
      title:'修改优惠券',
      key:`${this.state.componkey}edit`+record.couponId,
      componkey:`${this.state.componkey}edit`,
      data:{
        couponId:record.couponId,
      },
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    });
  }
  goSupplyAgain(record) {
    const paneitem = {
      title:'补发优惠券',
      key:`${this.state.componkey}edit`+record.couponId,
      componkey:`${this.state.componkey}edit`,
      data:{
        srcCouponId:record.couponId,
      },
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    });
  }
  //券包管理
  couponManage=()=>{
    const paneitem = {
      title:'券包管理',
      key:`${this.state.componkey}manage`,
      componkey:`${this.state.componkey}manage`,
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  render(){
    const {menus} = this.props;
    const operation = menus.find(item=>(item.type=="operation") );
    const bact = operation.children.find(item=>(item.code=="401200"))
    const rolelists = ( bact.children.find(item=>(item.code=='1003000')) ).children;
    const {dataList} = this.props.coupon.data1;
    //创建优惠券
    const addCoupon = rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.coupon.save"
    })
    //注券
    const inject = rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.coupon.create"
    })
    //注券记录
    const injectRecord = rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.coupon.record"
    })
    //熔断
    const fuse = rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.coupon.break"
    });
    //券包管理
    const qubao = rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.coupon.package.query"
    });
    dataList.map((item)=>{
      item.injectRecord = injectRecord;
      item.addCoupon = addCoupon;
    })
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
        />
        <div className="handel-btn-lists">
          {
            addCoupon &&
            <Button onClick={this.createCoupon}  size='large' type='primary'>创建优惠券</Button>
          }
          {
            inject &&
            <Button onClick={this.addCouponToUser}  size='large' type='primary'>注券</Button>
          }
          {
            injectRecord &&
            <Button onClick={this.addCouponToUserRecord}  size='large' type='primary'>注券记录</Button>
          }
          {
            fuse &&
            <Button onClick={this.fuseCoupon} type='primary' size='large'>熔断</Button>
          }
          {
            qubao &&
            <Button type='primary' size='large' onClick={this.couponManage}>券包管理</Button>
          }

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
          setConfirmLoading={this.setConfirmLoading}
          confirmLoading={this.state.confirmLoading}
          visible={this.state.isVisible}
          onCancel={this.onCancel}
          onOk={this.onOk}
        />
        <Qtable
          injectRecord={injectRecord}
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
  const {menus} = state.tab;
  return {coupon,menus};
}
export default connect(mapStateToProps)(Coupon);
