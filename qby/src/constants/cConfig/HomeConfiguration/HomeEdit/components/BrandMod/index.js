import react, { Component } from "react";
import { connect } from 'dva';
import { Button, message } from "antd";
import BrandBgModal from "../../../BrandBg";
import { saveBgPicApi } from "../../../../../../services/cConfig/homeConfiguration/brandBg";

class BrandMod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      imageUrl: "",
      color: ""
    };
  }
  onEdit = () => {
    this.setState({
      visible: true
    });
  };
  //保存
  onOk = () => {
    const { imageUrl, color } = this.state;
    if (!imageUrl) {
      return message.error("请先上传图片", 0.8);
    }
    const values = {
      homepageModuleId: 1,
      backgroundPicUrl: color,
      contentPicUrl: imageUrl
    };
    saveBgPicApi(values).then(res => {
      if (res.code == "0") {
        message.success("保存成功");
        this.setState({
          visible: false,
          imageUrl: "",
          color: ""
        });
      }
    });
  };
  //取消保存
  onCancel = () => {
    this.setState({
      visible: false,
      imageUrl: "",
      color: ""
    });
  };
  //修改背景颜色
  colorChange = e => {
    this.setState({
      color: e.target.value
    });
  };
  //修改图片
  changeImg = imageUrl => {
    this.setState({
      imageUrl
    });
  };
  render() {
    const { visible, imageUrl, color } = this.state;
    return (
      <div className="common-sty search-mod">
        <p>品版背书</p>
        <div className="handle-btn-action">
          <Button>查看</Button>
          <Button onClick={this.onEdit}>编辑</Button>
          <Button>隐藏</Button>
        </div>
        <BrandBgModal
          visible={visible}
          imageUrl={imageUrl}
          color={color}
          colorChange={this.colorChange}
          changeImg={this.changeImg}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
export default BrandMod;
