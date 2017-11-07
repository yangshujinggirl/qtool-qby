import React from 'react';
import '../../style/user.css';
import { connect } from 'dva';
import CollectionsPage from '../frame/pop';

import { Menu, Dropdown, Icon } from 'antd';





class User extends React.Component {
    constructor(props) {
        super(props);
        this.menu=(
            <Menu onClick={this.onClick}>
                <Menu.Item key="0" className='item'>
                    <CollectionsPage/>
                </Menu.Item>
                <Menu.Item key="1" className='item'>
                    注销
                </Menu.Item>
            </Menu>
        );

    }
    onClick=({key})=>{
        if(key=='0'){
            
          }
        if(key=='1'){
            sessionStorage.clear();
            this.props.dispatch({
                type:'users/layout',
                payload:{code:'qerp.web.bs.logout',values:null}
            })
          }
    }



  render() {
    const username=eval(sessionStorage.getItem('username'));
    return(
        <Dropdown overlay={this.menu} trigger={['click']}>
              <div className='user'>Qtools | {username}<Icon type="down" className='icon-down'/></div> 
        </Dropdown>
      )
  }



}
function mapStateToProps(state) {
    return {};
}


export default connect(mapStateToProps)(User);
