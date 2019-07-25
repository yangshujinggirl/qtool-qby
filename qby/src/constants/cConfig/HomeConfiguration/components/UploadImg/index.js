import React, { Component } from "react";
import { Modal, Upload, Icon, message, Form } from "antd";
const FormItem = Form.Item;
import "./index.less";
class CommonUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: ""
    };
  }
  //关闭示例
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  //更改图片
  handleChange = ({ fileList }) => {
    if (!fileList[0] || (fileList[0] && fileList[0].status)) {
      this.props.changeImg(fileList);
    }
  };
  beforeUpload = file => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error("图片格式不正确，请修改后重新上传！", 0.8);
      return isPNG
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(file.name + "图片大小超出限制，请修改后重新上传", 0.8);
      return isLt2M
    }
    const isSize = this.isSize(file);
    return isPNG && isLt2M && isSize;
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
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };
  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const { describe, fileList } = this.props;
    const { previewVisible, previewImage } = this.state;
    return (
      <div className="home_upload">
        <div className="outer_wrapper">
          <Upload
            name="imgFile"
            action="/erpWebRest/qcamp/upload.htm?type=brand"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
          >
            {fileList&&fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
          <div>
            <p className="suffix_tips">
              图片尺寸为{describe}px，格式为png、大小在2m以内
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CommonUpload;
