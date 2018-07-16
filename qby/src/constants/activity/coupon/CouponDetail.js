import React,{ Component } from 'react';
import { couponInfoApi } from '../../../services/activity/coupon'
class CouponDetail extends Component{
  componentWillMount(){
    const couponId = this.props.data.pdSpuId;
couponInfoApi().then()
  }
  render(){
    return(
      <div>111</div>
    )
  }
}
export default CouponDetail
