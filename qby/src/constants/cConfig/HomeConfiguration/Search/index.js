import React, { Component } from "react";
import { Modal, message } from "antd";
import CommonUpload from "../components/UploadImg";

class Search extends Component {
  beforeUpload = file => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error("png格式", 0.8);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("上传内容大于2M，请选择2M以内的文件", 0.8);
    }
    return isPNG && isLt2M;
  };
  onOk =()=> {
    
  }
  render() {
    const { visible, imageUrl, changeImg } = this.props;
    return (
      <Modal visible={visible} okText="保存" onOk={this.onOk}>
        <CommonUpload
          title="设置背景图片"
          describe="背景图尺寸为750*199px，格式为png、大小在2m以内"
          name="imgFile"
          action="/erpWebRest/qcamp/upload.htm?type=brand"
          beforeUpload={this.beforeUpload}
          imageUrl={imageUrl}
          changeImg={changeImg}
          exampleImg=""
        />
      </Modal>
    );
  }
}

export default Search;
