import React,{ Component } from 'react';
import './index.css'

class CpushDetail extends Component{
render(){
    const {title,pushTime,msgContent,alertTypeStr,pushPerson} = this.props.data;
    return(
      <div className='couponDetail'>
        <p className='tail'>推送主题：　　{title}</p>
        <p className='tail'>推送时间：　　{pushTime}</p>
        <p className='tail'>推送内容：　　{msgContent}</p>
        <p className='tail'>推送类型：　　{alertTypeStr}</p>
        <p className='tail'>推送人群：　　{pushPerson}</p>
      </div>
    );
  }
}
export default CpushDetail
