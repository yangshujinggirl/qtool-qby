import React, { Component } from "react";
import { Modal, Upload, Icon, message, Form } from "antd";
const FormItem = Form.Item;
import "./index.less";
class CommonUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false
    };
  }
  //查看示例
  lookExample = () => {
    this.setState({
      visible: true
    });
  };
  //关闭示例
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  //更改图片
  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      const imageUrl = info.file.response.data[0];
      this.props.changeImg(imageUrl);
      this.setState({
        loading: false
      });
    }
  };
  beforeUpload = file => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error("图片格式不正确，请修改后重新上传！", 0.8);
      return isPNG;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(file.name + "图片大小超出限制，请修改后重新上传", 0.8);
      return isLt2M;
    }
    const isSize = this.isSize(file);
    return isPNG && isLt2M;
  };
  //检测尺寸
  isSize = file => {
    return new Promise((resolve, reject) => {
      let width = this.props.width;
      let height = this.props.height;
      let _URL = window.URL || window.webkitURL;
      let img = new Image();
      img.onload = function() {
        let valid = img.width == width && img.height == height;
        valid ? resolve() : reject();
      };
      img.src = _URL.createObjectURL(file);
    }).then(
      () => {
        return file;
      },
      () => {
        message.error(file.name + "图片尺寸不符合要求，请修改后重新上传！");
        return Promise.reject();
      }
    );
  };
  render() {
    const fileDomain = JSON.parse(sessionStorage.getItem("fileDomain"));
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
      </div>
    );
    const { visible } = this.state;
    const { describe, imageUrl, exampleImg } = this.props;
    return (
      <div className="home_upload">
        <div className="outer_wrapper">
          <Upload
            name="imgFile"
            action="/erpWebRest/qcamp/upload.htm?type=brand"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? (
              <img
                style={{ width: "102", height: "102px" }}
                src={fileDomain + imageUrl}
                alt="avatar"
              />
            ) : (
              uploadButton
            )}
          </Upload>
          <div>
            <a className="look_exam" onClick={this.lookExample}>
              查看示例
            </a>
            <p className="suffix_tips">
              图片尺寸为{describe}px，格式为png、大小在2m以内
            </p>
          </div>
        </div>
        <Modal visible={visible} onCancel={this.onCancel} footer={null}>
          <img src={exampleImg} style={{ width: "472px" }} />
        </Modal>
      </div>
    );
  }
}

export default CommonUpload;
