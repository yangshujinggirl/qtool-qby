import react, { Component } from 'react';
import { Dropdown, Menu } from 'antd';
import { connect } from 'dva';
import SearchMod from './components/SearchMod';
import BannerMod from './components/BannerMod';
import BrandMod from './components/BrandMod';
import IconMod from './components/IconMod';
import GoodsMod from './components/GoodsMod';
import NewUserMod from './components/NewUserMod';
import MorePicMod from './components/MorePicMod';
import MoreGoodsMod from './components/MoreGoodsMod';
import ThemeMod from './components/ThemeMod';
import ClassifyMod from './components/ClassifyMod';
import './index.less';


class HomeEdit extends Component {
  componentDidMount() {
    const { homepageModuleId } = this.props.data;
    this.props.dispatch({
      type:'homeEdit/fetchInfo',
      payload:{
        homepageId:homepageModuleId
      }
    })
  }
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
    const { componkey } =this.props;
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
          <SearchMod {...this.props}/>
          <BannerMod  {...this.props}/>
          <BrandMod  componkey={componkey}/>
          <IconMod  componkey={componkey}/>
          <NewUserMod  componkey={componkey}/>
          <GoodsMod  componkey={componkey}/>
          <MorePicMod  componkey={componkey}/>
          <MoreGoodsMod  componkey={componkey}/>
          <ThemeMod  componkey={componkey}/>
          <ClassifyMod  componkey={componkey}/>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { moreGoodsSet } = state;
  return moreGoodsSet;
}
export default connect(mapStateToProps)(HomeEdit);
