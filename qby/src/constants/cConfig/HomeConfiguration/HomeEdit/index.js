import react, { Component } from "react";
import { Dropdown, Menu, Modal, Popover, Button, message, Form } from "antd";
import { connect } from "dva";
import QRCode from 'qrcode';
import moment from 'moment'
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
      urlCodeApp:'',
      urlCodeWx:'',
      visible:false,
      params:{},
      confirmLoading:false
    }
  }
  componentDidMount() {
    this.getInfo();
    this.goPreview()
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
    let message = !isDisplay?'确认要隐藏此模块么，确认隐藏，此模块将不会在C端App和小程序中显示':'确认要显示此模块么，确认显示，此模块将会在C端App和小程序中显示'
    Modal.confirm({
      title: '温馨提示',
      content: message,
      onOk:()=>{
        this.onOkCallback(homepageModuleId,isDisplay);
      },
      onCancel:()=> {

      },
    });

  }
  onOkCallback=(homepageModuleId,isDisplay)=> {
    // let message = isDisplay?'':''
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
    // let url ='http://vx.qby.testin.qtoolsbaby.net:81/home/index.html';
    let baseUrl = window.location.href;
    console.log(baseUrl)
    let url = '';
    if(baseUrl.indexOf('https') !== -1){//表示线上
      url ='https://'+ window.location.hostname+'home/index.html';
    }else{//测试环境
      url ='http://'+ window.location.host+'home/index.html';
    };
    console.log(url)
    let urlCodeWx = `${url}?homepageId=${homepageId}&platform=1`
    let urlCodeApp = `${url}?homepageId=${homepageId}&platform=2`
    QRCode.toDataURL(urlCodeWx)
    .then(url => {
      this.setState({ urlCodeWx:url })
    })
    .catch(err => {
      // console.error(err)
    })
    QRCode.toDataURL(urlCodeApp)
    .then(url => {
      this.setState({ urlCodeApp:url })
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
  //取消
  goMainPage(){
    const { key } = this.props.data;
    const pane = eval(sessionStorage.getItem("pane"));
    if(pane.length<=1){return}
    this.props.dispatch({
      type:'addGoods/resetData'
    });
    this.props.dispatch({
      type:'tab/initDeletestate',
      payload:key
    });
    this.props.dispatch({
      type: "homeConfig/fetchList",
      payload: {}
    });
  }
  getSaveRelease=(value,form)=> {
    const { params } =this.state;
    value = {...value,...params};
    this.setState({ confirmLoading:true })
    getReleaseApi(value)
    .then((res) => {
      const { checkResult, code } =res;
      let msg = value.type=='1'?'发布成功':'立即发布设置成功';
      if(res.code=='0') {
        message.success(msg);
        this.goMainPage()
      } else if(res.code=='260'){
        this.props.dispatch({
          type:'homeEdit/getCheckResult',
          payload:checkResult
        })
      }
      this.onCancel();
      this.setState({ params:{}, confirmLoading:false })
    })
  }
  onOk=()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let timingReleaseTime = values.timingReleaseTime&&moment(values.timingReleaseTime).format('YYYY-MM-DD HH:mm');
        if(timingReleaseTime) {
          this.getSaveRelease({timingReleaseTime})
        } else {
          this.getSaveRelease();
        }
      }
    });

  }
  onCancel=()=>{
    this.props.form.resetFields();
    this.setState({ visible:false })
  }
  menu = (
   <Menu className="home-configuration-menu" onClick={this.releaseHome}>
     <Menu.Item key="1">
       <p>立即发布</p>
     </Menu.Item>
     <Menu.Item key="2">
       <p>定时发布</p>
     </Menu.Item>
   </Menu>
  );
  render() {
    const { urlCodeApp, urlCodeWx, visible, params, confirmLoading } =this.state;
    let { productDisplay, multilineProduct, picMix, themeActivity, homepageInfoVo } =this.props.info;
    const urlContent = (
      <div className="urlCode-arr">
        <div className="code-item">
          <img src={urlCodeApp}/>
          扫码查看App首页内容
        </div>
        <div className="code-item">
          <img src={urlCodeWx}/>
          扫码查看小程序首页内容
        </div>
      </div>
    )
    return (
      <div className="home-configuration-edit-pages">
        <div className="part-head">
          <p className="pl">{homepageInfoVo.versionName}</p>
          <div className="pr">
            <Popover content={urlContent} title={null} trigger="click">
              <p className="preview" onClick={this.goPreview}>预览</p>
            </Popover>
            { !this.props.data.info&&
              <Dropdown overlay={this.menu} trigger={["click"]}>
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
          form={this.props.form}
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
const HomeEditF = Form.create()(HomeEdit);
export default connect(mapStateToProps)(HomeEditF);
