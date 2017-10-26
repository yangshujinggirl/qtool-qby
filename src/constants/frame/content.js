import React from 'react';
import { connect } from 'dva';
// import { Layout } from 'antd';
// import User from '../frame/userinfo';
// import Tab from '../frame/tab';
// import Siders from '../frame/sider';
import '../../style/content.css';



class Content extends React.Component {
    render() {
        console.log(this)
        console.log(this.props.countkey)
        return (   
    		<div>
                <div className='counter'>
                {
                    this.props.countkey=='1'
                    ?
                        123
                    :
                        456

                }

                </div>
                <div className='footer'>
                    Ant Design ©2016 Created by Ant UED
                </div>
  			</div>
        )
    }
}

export default Content;

