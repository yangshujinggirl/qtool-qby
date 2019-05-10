import React, { Component } from 'react';
import {connect} from 'dva'
import {Button} from 'antd'
import Columns from './columns/index'
import Qtable from '../../../../components/Qtable/index'; //表单
import Qpagination from '../../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
class CouponManage extends Component{
  constructor(props){
    super(props);
    this.state ={
      couponCode:"",
      inputValues:{}
    }
  }

  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'coupon/fetchManageList',
      payload:values
    });
    const _values = {...this.state.inputValues,...values};
    this.setState({
      inputValues:_values
    });
  }

  //点击分页
  changePage =(current)=> {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage}
    this.props.dispatch({
      type:'coupon/fetchManageList',
      payload:values
    })
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'coupon/fetchManageList',
      payload:{currentPage,limit}
    });
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    const {rangePicker,..._values} = values;
    if(rangePicker&&rangePicker[0]){
      _values.voucherTimeStart =  moment(new Date(rangePicker[0]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');
      _values.voucherTimeEnd = moment(new Date(rangePicker[1]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');
    }
    this.setState({inputValues:_values});
  }
  //初始化数据
  componentWillMount(){
    if(this.props.data){
      this.props.dispatch({
        type:'coupon/fetchManageList',
        payload:{couponCode:this.props.data.couponCode}
      });
      this.setState({
        couponCode:this.props.data.couponCode
      })
    }else{
      this.props.dispatch({
        type:'coupon/fetchManageList',
        payload:{}
      })
    }
  }
  handleOperateClick=(record)=>{
    const paneitem = {
      title:'修改券包',
      key:`${this.props.componkey}editpack`+record.couponPackageId,
      componkey:`${this.props.componkey}editpack`,
      data:{
        inputValues:this.state.inputValues,
        couponPackageId:record.couponPackageId,
        couponPackageName:record.couponPackageName,
        couponCodes:record.couponCodes,
        updateUserId:record.updateUserId,
        updateUserName:record.updateUserName,
        couponBatchNo:record.couponBatchNo,
      },
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    });
  }
  addCouponPack =()=> {
    const paneitem = {
      title:'创建券包',
      key:`${this.props.componkey}editpack`,
      componkey:`${this.props.componkey}editpack`,
      data:{
        inputValues:this.state.inputValues,
      }
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  render(){
    const { dataList } = this.props.coupon.data3;
    return(
      <div  className='qtools-components-pages'>
        <FilterForm
          couponCode={this.state.couponCode}
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div className="handel-btn-lists">
          <Button type='primary' onClick={this.addCouponPack}>创建券包</Button>
        </div>
        <div style={{marginTop:'15px'}}>
          <Qtable
            onOperateClick = {this.handleOperateClick}
            dataSource = {dataList}
            columns = {Columns}/>
        </div>
        {
          dataList.length>0?
          <Qpagination
            data={this.props.coupon.data3}
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
export default connect(mapStateToProps)(CouponManage);
