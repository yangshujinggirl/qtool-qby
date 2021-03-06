import React, { Component } from 'react';
import {connect} from 'dva'
import Columns from './columns/index'
import Qtable from '../../../../components/Qtable/index'; //表单
import Qpagination from '../../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import moment from 'moment';
class CouponRecord extends Component{
  constructor(props){
    super(props);
    this.state ={
      componkey:this.props.componkey,
      couponCode:"",
      field:{
        couponCode:'',
        userMobiles:'',
        voucher:'',
        couponUseScene:'',
        status:'',
        voucherTimeStart:'',
        voucherTimeEnd:''
      }
    }
  }

  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'coupon/fetchAddCouponList',
      payload:values
    })
  }

  //点击分页
  changePage =(current)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'coupon/fetchAddCouponList',
      payload:values
    })
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
    if(rangePicker&&rangePicker[0]){
      _values.voucherTimeStart =  moment(new Date(rangePicker[0]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');
      _values.voucherTimeEnd = moment(new Date(rangePicker[1]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');
    }
    this.setState({field:_values});
  }
  //初始化数据
  componentWillMount(){
    if(this.props.data){
      this.props.dispatch({
        type:'coupon/fetchAddCouponList',
        payload:{couponCode:this.props.data.couponCode}
      });
      this.setState({
        couponCode:this.props.data.couponCode
      })
    }else{
      this.props.dispatch({
        type:'coupon/fetchAddCouponList',
        payload:{}
      })
    }
  }
  render(){
    const { dataList } = this.props.coupon.data2;
    return(
      <div>
        <FilterForm
          couponCode={this.state.couponCode}
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div style={{marginTop:'15px'}}>
          <Qtable
            dataSource = {dataList}
            columns = {Columns}/>
        </div>
        {
          dataList.length>0?
          <Qpagination
            data={this.props.coupon.data2}
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
export default connect(mapStateToProps)(CouponRecord);
