import react, { Component } from 'react';
import { Dropdown, Menu } from 'antd';
import SearchMod from './components/SearchMod';
import './index.less';


class HomeEdit extends Component {
  render() {
    const menu = (
      <Menu className='home-configuration-menu'>
        <Menu.Item key="0">
          <p>立即发布</p>
        </Menu.Item>
        <Menu.Item key="1">
          <p>定时发布</p>
        </Menu.Item>
      </Menu>
    );
    return(
      <div className="home-configuration-edit-pages">
        <div className="part-head">
          <p className="pl">520要发的首页</p>
          <div className="pr">
            <Dropdown overlay={menu} trigger={['click']}>
              <p>预览|保存并发布</p>
            </Dropdown>
          </div>
        </div>
        <div className="part-mods">
          <SearchMod />
        </div>
      </div>
    )
  }
}
export default HomeEdit;
