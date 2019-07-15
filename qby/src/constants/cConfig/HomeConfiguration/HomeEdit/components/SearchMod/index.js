import react, { Component } from "react";
import { connect } from 'dva';
import { Input, Icon, Button, message } from "antd";
import "./index.less";
import { savePicApi } from "../../../../../../services/cConfig/homeConfiguration/search";
import SearchUpload from "../../../Search/index";

class SearchMod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      imageUrl: ""
    };
  }
  onEdit = () => {
    this.setState({
      visible: true
    });
  };
  changeImg = imageUrl => {
    this.setState({
      imageUrl
    });
  };
  //背景图片保存
  onOk = () => {
    const { imageUrl } = this.state;
    const { homepageModuleId } =this.props.info.search
    if (!imageUrl) {
      return message.error("请先上传图片", 0.8);
    }
    const values = {
      homepageModuleId,
      backgroundPicUrl: imageUrl
    };
    savePicApi(values).then(res => {
      if (res.code == "0") {
        message.success("设置成功");
        this.setState({
          imageUrl: "",
          visible: false
        });
      }
    });
  };
  onCancel = () => {
    this.setState({
      imageUrl: "",
      visible: false
    });
  };
  render() {
    const { visible, imageUrl } = this.state;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    let { backgroundPicUrl } =this.props.info.search;
    backgroundPicUrl = `${fileDomain}${backgroundPicUrl}`;
    return (
      <div className="common-sty search-mod" style={{'background':`#fff url(${backgroundPicUrl})`}}>
        <Input
          addonBefore={<Icon type="search" />}
          addonAfter={<Icon type="scan" />}/>
        <div className="handle-btn-action">
          <Button>查看</Button>
          <Button onClick={this.onEdit}>编辑</Button>
        </div>
        <SearchUpload
          changeImg={this.changeImg}
          imageUrl={imageUrl}
          visible={visible}
          onOk={this.onOk}
          onCancel={this.onCancel}/>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { homeEdit } = state;
  return homeEdit;
}
export default connect(mapStateToProps)(SearchMod);
