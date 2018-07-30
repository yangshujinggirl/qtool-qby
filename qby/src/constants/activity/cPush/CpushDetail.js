import React,{ Component } from 'react';
import { bPushInfoApi } from '../../../services/activity/bPush' //请求方法
import './index.css'
class CpushDetail extends Component{

  //拿取数据
  componentWillMount(){
    const couponId = this.props.data.pdSpuId;
    bPushInfoApi(couponId).then()
  }

  render(){
    return(
      <div className='couponDetail'>
        <p className='tail'>推送主题：　　诚挚歉意</p>
        <p className='tail'>推送时间：　　注券</p>
        <p className='tail'>推送内容：　　用户领取时间起　123　天</p>
        <p className='tail'>推送类型：　　23元</p>
        <p className='tail'>推送人群：　　满　50　可用</p>
        <p className='tail'>代金券数：</p>
      </div>
    )
  }
}
export default CpushDetail
