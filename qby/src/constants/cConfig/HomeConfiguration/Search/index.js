import React, { Component } from "react";
import { Modal, message } from "antd";
import CommonUpload from "../components/UploadImg";

class Search extends Component {
  render() {
    const { visible, imageUrl, changeImg, onCancel, onOk } = this.props;
    return (
      <Modal width='500' visible={visible} okText="保存" onCancel={onCancel} onOk={onOk}>
        <CommonUpload
          title="设置背景图片"
          describe="背景图尺寸为750*199px，格式为png、大小在2m以内"
          imageUrl={imageUrl}
          changeImg={changeImg}
          exampleImg=""
          width={750}
          height={199}
        />
      </Modal>
    );
  }
}

export default Search;
