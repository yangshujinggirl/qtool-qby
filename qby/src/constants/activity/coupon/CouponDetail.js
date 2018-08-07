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
    const { couponInfo }= this.state
    return(
      <div className='couponDetail'>
        <p className='tail'>代金券名称：　　{couponInfo.couponName}</p>
        <p className='tail'>代金券场景：　　{couponInfo.couponUseScene}</p>
        <p className='tail'>券有效期：　　{
            couponInfo.couponValidDay
            ?
            <span><input type='radio' checked/> 用户领取时间起　　{couponInfo.couponValidDay}天</span>
            :
            <span><input type='radio' checked/> 特定时间到　　{couponInfo.couponValidDate}天</span>
          }
        </p>
        <p className='tail'>代金券金额：　　{couponInfo.couponMoney}元</p>
        <p className='tail'>使用门槛：　　满　{couponInfo.couponFullAmount}　可用</p>
        <p className='tail'>代金券数：　　{couponInfo.couponCount}　张</p>
        <p className='tail'>代金券备注：　　{couponInfo.couponRemark}</p>
      </div>
    )
  }
}
export default CouponDetail
