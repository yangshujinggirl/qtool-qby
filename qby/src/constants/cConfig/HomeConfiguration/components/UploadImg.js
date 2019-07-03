import React, { Component } from "react";
import { Modal } from "antd";
import UploadImg from "../../../../components/UploadImg/onlyOneImg";

class CommonUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  lookExample = () => {
    this.setState({
      visible: true
    });
  };
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    console.log(this.props);
    const fileDomain = JSON.parse(sessionStorage.getItem("fileDomain"));
    const { visible } = this.state;
    const {
      title,
      describe,
      imageUrl,
      name,
      action,
      beforeUpload,
      exampleImg,
      changeImg
    } = this.props;
    console.log(this.props);
    return (
      <div>
        <div>
          <p style={{ margin: "10px 0" }}>
            {title}
            <a
              style={{ "text-decoration": "underline" }}
              className="theme-color"
              onClick={this.lookExample}
            >
              查看示例
            </a>
          </p>
          <p style={{ margin: "10px 0" }}>{describe}</p>
          <UploadImg
            imageUrl={imageUrl}
            name={name}
            action={action}
            beforeUpload={beforeUpload}
            changeImg={changeImg}
          />
        </div>
        <Modal visible={visible} onCancel={this.onCancel} footer={null}>
          <img src={fileDomain + exampleImg} />
        </Modal>
      </div>
    );
  }
}

export default CommonUpload;
