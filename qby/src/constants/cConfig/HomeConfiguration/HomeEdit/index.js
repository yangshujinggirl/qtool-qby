import react, { Component } from "react";
import { Dropdown, Menu } from "antd";
import { connect } from "dva";
import SearchMod from "./components/SearchMod";
import BannerMod from "./components/BannerMod";
import BrandMod from "./components/BrandMod";
import IconMod from "./components/IconMod";
import GoodsMod from "./components/GoodsMod";
import NewUserMod from "./components/NewUserMod";
import MorePicMod from "./components/MorePicMod";
import MoreGoodsMod from "./components/MoreGoodsMod";
import ThemeMod from "./components/ThemeMod";
import ClassifyMod from "./components/ClassifyMod";
import { getStatusApi } from "../../../../services/cConfig/homeConfiguration/homeEdit";
import "./index.less";

class HomeEdit extends Component {
  componentDidMount() {
    this.fetchInfo()
  }
  componentWillReceiveProps(props) {
    // console.log(props)
  }
  fetchInfo=()=> {
    const { homepageId } = this.props.data;
    this.props.dispatch({
      type: "homeEdit/fetchInfo",
      payload: {
        homepageId: homepageId
      }
    });
  }
  toggleShow=(homepageModuleId,isDisplay)=> {
    isDisplay=isDisplay?0:1;
    getStatusApi({homepageModuleId,isDisplay})
    .then((res) => {
      if(res.code == 0) {
        this.fetchInfo()
      }
    })
  }
  render() {
    const menu = (
      <Menu className="home-configuration-menu">
        <Menu.Item key="0">
          <p>立即发布</p>
        </Menu.Item>
        <Menu.Item key="1">
          <p>定时发布</p>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="home-configuration-edit-pages">
        <div className="part-head">
          <p className="pl">520要发的首页</p>
          <div className="pr">
            <Dropdown overlay={menu} trigger={["click"]}>
              <p>预览|保存并发布</p>
            </Dropdown>
          </div>
        </div>
        <div className="part-mods">
          <SearchMod {...this.props} callback={this.fetchInfo}/>
          <BannerMod {...this.props} callback={this.fetchInfo}/>
          <BrandMod {...this.props} callback={this.fetchInfo} toggleShow={this.toggleShow}/>
          <IconMod {...this.props} callback={this.fetchInfo} toggleShow={this.toggleShow}/>
          <NewUserMod {...this.props} callback={this.fetchInfo} toggleShow={this.toggleShow}/>
          <GoodsMod {...this.props} callback={this.fetchInfo} toggleShow={this.toggleShow}/>
          <MorePicMod {...this.props} callback={this.fetchInfo} />
          <MoreGoodsMod {...this.props} callback={this.fetchInfo} />
          <ThemeMod {...this.props} callback={this.fetchInfo} />
          <ClassifyMod {...this.props} callback={this.fetchInfo} />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { homeEdit } = state;
  return homeEdit;
}
export default connect(mapStateToProps)(HomeEdit);
