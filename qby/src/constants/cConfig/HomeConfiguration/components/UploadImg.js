import React, { Component } from "react";
import { Modal, Upload, Icon, message } from "antd";
import './UploadImg.less'
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
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(file.name + "图片大小超出限制，请修改后重新上传", 0.8);
    }
    //检测尺寸
    const isSize = this.isSize(file);
    console.log(isSize);
    return isPNG && isLt2M;
  };
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
    const {
      title,
      describe,
      imageUrl,
      exampleImg,
      width,
      height
    } = this.props;
    return (
      <div className='home_upload'>
        <div>
          <p className='text'>
            {title}
            <a
              style={{ "text-decoration": "underline" }}
              className="theme-color"
              onClick={this.lookExample}
            >
              查看示例
            </a>
          </p>
          <p className='text'>{describe}</p>
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
                style={{ width:'290px', height:'105px' }}
                src={fileDomain + imageUrl}
                alt="avatar"
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <Modal visible={visible} onCancel={this.onCancel} footer={null}>
          <img src={fileDomain + exampleImg} />
        </Modal>
      </div>
    );
  }
}

export default CommonUpload;
