import React from 'react';
import '../../style/user.css';
import { Menu, Dropdown, Icon } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);


  

class User extends React.Component {
  render() {
    return(
      <Dropdown overlay={menu} trigger={['click']}>
              <div className='user'>Qtools | 大湿湿<Icon type="down" /></div> 
        </Dropdown>
      )
  }



}

export default User
