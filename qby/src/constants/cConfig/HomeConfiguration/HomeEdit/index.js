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
import Line from './components/Line';
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
      params:{},
      confirmLoading:false
    }
  }
  componentDidMount() {
    this.getInfo();
    this.goPreview()
  }
  componentWillReceiveProps(props) {
    // console.log(props)
  }
  getInfo=()=> {
    const { homepageId } = this.props.data;
    this.props.dispatch({
      type: "homeEdit/reSetData",
      payload: {}
    });
    this.props.dispatch({
      type: "homeEdit/fetchInfo",
      payload: {
        homepageId: homepageId
      }
    });
  }
  //隐藏
  toggleShow=(homepageModuleId,isDisplay)=> {
    isDisplay=isDisplay?0:1;
    getStatusApi({homepageModuleId,isDisplay})
    .then((res) => {
      if(res.code == 0) {
        this.getInfo()
      }
    })
  }
  //二维码生成
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

  releaseHome=(value)=>{
    const { homepageId } = this.props.data;
    let params = {
        type:value.key,
        homepageId
      }
    this.setState({ visible:true, params })
  }
  getSaveRelease=(value)=> {
    const { params } =this.state;
    value = {...value,...params};
    this.setState({ confirmLoading:true })
    getReleaseApi(value)
    .then((res) => {
      const { checkResult, code } =res;
      let msg = value.type=='1'?'发布成功':'立即发布设置成功';
      if(res.code=='0') {
        message.success(msg)
      } else if(res.code=='260'){
        this.props.dispatch({
          type:'homeEdit/getCheckResult',
          payload:checkResult
        })
      }
      this.setState({ visible:false, params:{}, confirmLoading:false })
    })
  }
  onOk=(value)=>{
    this.getSaveRelease(value)
  }
  onCancel=()=>{
    this.setState({ visible:false })
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
    const { urlCode, visible, params, confirmLoading } =this.state;
    let { productDisplay, multilineProduct, picMix, themeActivity, homepageInfoVo } =this.props.info;
    return (
      <div className="home-configuration-edit-pages">
        <div className="part-head">
          <p className="pl">{homepageInfoVo.versionName}</p>
          <div className="pr">
            <Popover content={<img src={urlCode}/>} title={null} trigger="click">
              <p className="preview" onClick={this.goPreview}>预览</p>
            </Popover>
            { !this.props.data.info&&
              <Dropdown overlay={menu} trigger={["click"]}>
                <p>|保存并发布</p>
              </Dropdown>
            }

          </div>
        </div>
        <div className="part-mods">
          <SearchMod {...this.props} callback={this.getInfo}/>
          <BannerMod {...this.props} callback={this.getInfo}/>
          <BrandMod {...this.props} callback={this.getInfo} toggleShow={this.toggleShow}/>
          <IconMod {...this.props} callback={this.getInfo} toggleShow={this.toggleShow}/>
          <NewUserMod {...this.props} callback={this.getInfo} toggleShow={this.toggleShow}/>
          {
            !!productDisplay.isDisplaySplitLine&&<Line />
          }
          <GoodsMod {...this.props} callback={this.getInfo} toggleShow={this.toggleShow}/>
          {
            !!picMix.isDisplaySplitLine&&<Line />
          }
          <MorePicMod {...this.props} callback={this.getInfo} />
          {
            !!multilineProduct.isDisplaySplitLine&&<Line />
          }
          <MoreGoodsMod {...this.props} callback={this.getInfo} />
          {
            !!themeActivity.isDisplaySplitLine&&<Line />
          }
          <ThemeMod {...this.props} callback={this.getInfo} />
          <Line />
          <ClassifyMod {...this.props} callback={this.getInfo} />
        </div>
        <ReleaseModal
          confirmLoading={confirmLoading}
          type={params.type}
          visible={visible}
          onCancel={this.onCancel}
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
