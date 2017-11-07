import React from 'react';
import { connect } from 'dva';
import '../../style/content.css';
//引入组件
import AccountIndex from '../accountCenter/account_center.js';

class Content extends React.Component {
    render() {
        return (   
    		<div className='counter'>
                <div className='counter_con'>
                { 
                    this.props.activeKey == '601000'
                    ?
                    <AccountIndex/>
                    :
                    null
                }
                </div>
                <div className='footer'>
                    Ant Design ©2016 Created by Ant UED
                </div>
  			</div>
        )
    }
}

function mapStateToProps(state) {
    const {activeKey} = state.tab;
    console.log(activeKey);
    return {activeKey};
}

export default connect(mapStateToProps)(Content);

