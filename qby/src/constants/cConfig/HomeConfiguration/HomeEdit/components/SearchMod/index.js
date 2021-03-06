import react, { Component } from "react";
import { connect } from "dva";
import { Input, Icon, Button, message } from "antd";
import CommonMod from '../CommonMod';
import "./index.less";
import {
  savePicApi,
  searchPicApi
} from "../../../../../../services/cConfig/homeConfiguration/search";
import SearchUpload from "../../../Search/index";

class SearchMod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fileList: [],
      loading: false
    };
  }
  //编辑
  onEdit = () => {
    const { homepageModuleId } = this.props.info.search;
    searchPicApi({ homepageModuleId }).then(res => {
      //查询
      if (res.code == "0") {
        const fileDomain = JSON.parse(sessionStorage.getItem("fileDomain"));
        const { backgroundPicUrl,contentPicUrl,noFullScreenBackGroundPic } = res.searchQueryVo;
        this.handleResult(fileDomain, backgroundPicUrl,contentPicUrl,noFullScreenBackGroundPic);
      }
    });
  };
  //结果数据处理
  handleResult = (fileDomain, backgroundPicUrl,contentPicUrl,noFullScreenBackGroundPic) => {
    let [fileList,fileList2,fileList3] = [[],[],[]]
    if (backgroundPicUrl) {
      fileList = [
        {
          uid: "-1",
          status: "done",
          url: fileDomain + backgroundPicUrl
        }
      ];
    }
    if (contentPicUrl) {//小程序
      fileList3 = [
        {
          uid: "-1",
          status: "done",
          url: fileDomain + contentPicUrl
        }
      ];
    }
    if (noFullScreenBackGroundPic) {//非全面屏
      fileList2 = [
        {
          uid: "-1",
          status: "done",
          url: fileDomain + noFullScreenBackGroundPic
        }
      ];
    }
    this.setState(
      {
        fileList,
        fileList2,
        fileList3,
        imageUrl: backgroundPicUrl,
        imageUrl2: noFullScreenBackGroundPic,
        imageUrl3: contentPicUrl,
      },
      () => {
        this.setState({
          visible: true
        });
      }
    );
  };
  //全面屏发生变化时
  changeImg = fileList => {
    let imageUrl = ''
    if (fileList[0] && fileList[0].status == "done" && fileList[0].response.code == "0") {
      imageUrl = fileList[0].response.data[0];
    };
    this.setState({
      fileList,
      imageUrl
    });
  };
  //非全面屏发生变化时
  changeImg2 = fileList => {
    let imageUrl2 = ''
    if (fileList[0] && fileList[0].status == "done" && fileList[0].response.code == "0") {
      imageUrl2 = fileList[0].response.data[0];
    };
    this.setState({
      fileList2:fileList,
      imageUrl2
    });
  };
  //小程序发生变化时
  changeImg3 = fileList => {
    let imageUrl3 = ''
    if (fileList[0] && fileList[0].status == "done" && fileList[0].response.code == "0") {
      imageUrl3 = fileList[0].response.data[0];
    };
    this.setState({
      fileList3:fileList,
      imageUrl3
    });
  };
  //背景图片保存
  onOk = () => {
    const { imageUrl,imageUrl2,imageUrl3 } = this.state;
    const { homepageModuleId } = this.props.info.search;
    const values = {
      homepageModuleId,
      backgroundPicUrl: imageUrl,
      noFullScreenBackGroundPic: imageUrl2,
      contentPicUrl: imageUrl3,

    };
    this.setState({
      loading: true
    });
    savePicApi(values).then(res => {
      if (res.code == "0") {
        message.success("设置成功");
        this.setState({
          fileList: [],
          visible: false,
          loading: false
        });
        this.props.callback();
      }else{
        this.setState({
          loading:false
        });
      };
    });
  };
  onCancel = () => {
    this.setState({
      fileList: [],
      visible: false
    });
  };
  render() {
    const { visible, fileList,fileList2,fileList3, loading } = this.state;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    let { backgroundPicUrl, homepageModuleId } = this.props.info.search;
    const { homepageInfoVo } =this.props.info;
    backgroundPicUrl = `${fileDomain}${backgroundPicUrl}`;
    return (
      <CommonMod
        homepageModuleId={homepageModuleId}
        className="search-mod hasLine"
        style={{'background':`#fff url(${backgroundPicUrl}) center`}}>
        <div>
          <Input
            addonBefore={<Icon type="search" />}
            addonAfter={<Icon type="scan" />}
          />
          <div className="handle-btn-action">
            {
              !this.props.data.info&&homepageInfoVo&&!!homepageInfoVo.releasable&&
              <Button onClick={this.onEdit}>编辑</Button>
            }

          </div>
          <SearchUpload
            fileList={fileList}
            fileList2={fileList2}
            fileList3={fileList3}
            changeImg={this.changeImg}
            changeImg2={this.changeImg2}
            changeImg3={this.changeImg3}
            visible={visible}
            loading={loading}
            onOk={this.onOk}
            onCancel={this.onCancel}
          />
        </div>
      </CommonMod>
    );
  }
}
function mapStateToProps(state) {
  const { homeEdit } = state;
  return homeEdit;
}
export default connect(mapStateToProps)(SearchMod);
