import react, { Component } from "react";
import { Dropdown, Menu, Modal, Popover, Button, message } from "antd";
import { connect } from "dva";
import QRCode from 'qrcode';
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
import ReleaseModal from './components/ReleaseModal';
import {
  getStatusApi,
  getReleaseApi
} from "../../../../services/cConfig/homeConfiguration/homeEdit";
import "./index.less";

class HomeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlCode:'',
      visible:false,
      params:{}
    }
  }
  componentDidMount() {
    this.fetchInfo();
    this.goPreview()
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
  goPreview=()=> {
    const { homepageId } = this.props.data;
    let urlCode = `https://www.baidu.com/homepageId=${homepageId}`
    QRCode.toDataURL(urlCode)
    .then(url => {
      this.setState({ urlCode:url })
    })
    .catch(err => {
      // console.error(err)
    })
  }
  handleCancel=()=>{
    this.setState({ visible:false })
  }
  releaseHome=(value)=>{
    const { homepageId } = this.props.data;
    let params = {
        type:value.key,
        homepageId
      }
    if(value.key == '1') {
      this.getSaveRelease(params);
    } else {
      this.setState({ visible:true, params })
    }
  }
  getSaveRelease=(value)=> {
    const { params } =this.state;
    value = {...value,...params};
    getReleaseApi(value)
    .then((res) => {
      const { checkResult, code } =res;
      let msg = values.type=='1'?'发布成功':'立即发布设置成功';
      if(res.code=='0') {
        message.success(msg)
      } else {
        console.log(checkResult)
      }
    })
  }
  onOk=(value)=>{
    this.getSaveRelease(value)
  }
  render() {
    const menu = (
      <Menu className="home-configuration-menu" onClick={this.releaseHome}>
        <Menu.Item key="1">
          <p>立即发布</p>
        </Menu.Item>
        <Menu.Item key="2">
          <p>定时发布</p>
        </Menu.Item>
      </Menu>
    );
    const { urlCode, visible } =this.state;
    return (
      <div className="home-configuration-edit-pages">
        <div className="part-head">
          <p className="pl">520要发的首页</p>
          <div className="pr">
            <Popover content={<img src={urlCode}/>} title={null} trigger="click">
              <p className="preview" onClick={this.goPreview}>预览</p>
            </Popover>
            <Dropdown overlay={menu} trigger={["click"]}>
              <p>|保存并发布</p>
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
        <ReleaseModal
          visible={visible}
          onOk={this.onOk}/>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { homeEdit } = state;
  return homeEdit;
}
export default connect(mapStateToProps)(HomeEdit);
