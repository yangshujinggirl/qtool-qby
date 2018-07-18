import React,{ Component } from 'react';
import { couponInfoApi } from '../../../services/activity/coupon' //请求方法
import './index.css'
class CouponDetail extends Component{

  //拿取数据
  componentWillMount(){
    const couponId = this.props.data.pdSpuId;
    couponInfoApi(couponId).then()
  }

  render(){
    return(
      <div className='couponDetail'>
        <p className='tail'>代金券名称：　　诚挚歉意</p>
        <p className='tail'>代金券场景：　　注券</p>
        <p className='tail'>券有效期：　　<input type='radio' checked/>用户领取时间起　123　天</p>
        <p className='tail'>代金券金额：　　23元</p>
        <p className='tail'>使用门槛：　　满　50　可用</p>
        <p className='tail'>代金券数：　　1000　张</p>
        <p className='tail'>代金券备注：　　</p>
      </div>
    )
  }
}
export default CouponDetail
