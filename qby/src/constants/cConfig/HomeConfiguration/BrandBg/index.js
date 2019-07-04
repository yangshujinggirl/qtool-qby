import React, { Component } from "react";
import { Modal} from "antd";
import UploadImg from "../Components/UploadImg";

class BrandBg extends Component {
    constructor(props){
    super(props)

    }
  render() {
    const { visible, imageUrl, changeImg, onCancel, onOk } = this.props;
    return (
      <Modal width='500' visible={visible} okText="保存" onCancel={onCancel} onOk={onOk}>
        <UploadImg
          title="设置内容图片"
          describe="内容图尺寸为750*32px，格式为png、大小在2m以内"
          imageUrl={imageUrl}
          changeImg={changeImg}
          exampleImg=""
          width={750}
          height={32}
        />
      </Modal>
    );
  }
}

export default BrandBg;
