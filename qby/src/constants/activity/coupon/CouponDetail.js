import React,{ Component } from 'react';
import { couponInfoApi } from '../../../services/activity/coupon' //请求方法
import './index.css'
class CouponDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      couponInfo:{}
    }
  }

  //拿取数据
  componentWillMount(){
    const couponId = this.props.data.pdSpuId;
    couponInfoApi({couponId:couponId})
    .then(res => {
      if(res.code=="0"){
        this.setState({couponInfo:res.couponInfo})
      }
    })
  }

  render(){
    const { couponName,
      couponUseSceneStr,
      couponValidDay,
      couponValidDate,
      couponMoney,
      couponFullAmount,
      couponCount,
      couponRemark,
      couponUseScopeStr
     } = this.state.couponInfo
    return(
      <div className='couponDetail'>
        <p className='tail'>优惠券名称：　{couponName}</p>
        <p className='tail'>优惠券场景：　{couponUseSceneStr}</p>
        <p className='tail'>券有效期：　　{
            couponValidDay
            ?
            <span>用户领取时间起　{couponValidDay}　天</span>
            :
            <span>特定时间到　{couponValidDate}　止</span>
          }
        </p>
        <p className='tail'>优惠券金额：　{couponMoney}元</p>
        <p className='tail'>使用门槛：　　满　{couponFullAmount}　可用</p>
        <p className='tail'>优惠券数：　　{couponCount}　张</p>
        <p className='tail'>使用商品范围：{couponUseScopeStr} </p>
        <p className='tail'>优惠券说明：{couponUseScopeStr} </p>
        <p className='tail'>优惠券备注：　{couponRemark}</p>
      </div>
    )
  }
}
export default CouponDetail
