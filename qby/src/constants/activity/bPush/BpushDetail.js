import React,{ Component } from 'react';
import { bPushInfoApi } from '../../../services/activity/bPush' //请求方法
import './index.css'

class CouponDetail extends Component{
  render(){
    const {title,pushTime,msgContent,alertTypeStr,pushMan} = this.props.data;
    return(
      <div className='couponDetail'>
        <p className='tail'>推送主题：　　{title}</p>
        <p className='tail'>推送时间：　　{pushTime}</p>
        <p className='tail'>推送内容：　　{msgContent}</p>
        <p className='tail'>推送类型：　　{alertTypeStr}</p>
        <p className='tail'>推送人群：　　{pushMan}</p>
      </div>
    );
  }
}
export default CouponDetail
