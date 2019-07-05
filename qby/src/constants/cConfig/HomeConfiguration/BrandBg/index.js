import React, { Component } from "react";
import { Modal, Input } from "antd";
import UploadImg from "../components/UploadImg";

class BrandBg extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      visible,
      imageUrl,
      changeImg,
      onCancel,
      onOk,
      colorChange,
      color
    } = this.props;
    return (
      <div>
        <Modal
          width="500"
          visible={visible}
          okText="保存"
          onCancel={onCancel}
          onOk={onOk}
        >
          <UploadImg
            title="设置内容图片"
            describe="内容图尺寸为750*32px，格式为png、大小在2m以内"
            imageUrl={imageUrl}
            changeImg={changeImg}
            exampleImg=""
            width={750}
            height={32}
          />
          <p style={{margin:'15px 0'}}>设置模块背景色号</p>
          <Input
            style={{width:'290px'}}
            value={color}
            onChange={colorChange}
            placeholder="标题颜色的色号，常用色号可在示例中查看"
          />
          <p style={{margin:'15px 0'}}>请填写#+六位数字</p>
        </Modal>
      </div>
    );
  }
}

export default BrandBg;
