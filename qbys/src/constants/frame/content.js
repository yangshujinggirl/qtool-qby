import React from 'react';
import { connect } from 'dva';
import '../../style/content.css';

class Content extends React.Component {
    render() {
        console.log(this.props.countkey)
        return (   
    		<div className='counter'>
                <div className='counter_con'>
                {
                    this.props.countkey == 20100?
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

