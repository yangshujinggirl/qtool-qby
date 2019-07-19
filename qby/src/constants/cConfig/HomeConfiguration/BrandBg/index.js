import React, { Component } from "react";
import { Modal, Input, Form } from "antd";
const FormItem = Form.Item;
import UploadImg from "../components/UploadImg";

class BrandBg extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      visible,
      fileList,
      changeImg,
      onCancel,
      onOk,
      colorChange,
      color,
      loading
    } = this.props;
    return (
      <div>
        <Modal
          width="600"
          visible={visible}
          okText="保存"
          onCancel={onCancel}
          onOk={onOk}
          confirmLoading={loading}
        >
          <FormItem
            className="must-pic"
            labelCol={{ span: 5 }}
            label="设置内容图片"
          >
            <UploadImg
              describe="750*32"
              fileList={fileList}
              changeImg={changeImg}
              exampleImg=""
              width={750}
              height={32}
            />
          </FormItem>
          <FormItem labelCol={{ span: 5 }} label="设置模块背景色号">
            <Input
              maxLength='6'
              style={{ width: "260px" }}
              value={color}
              onChange={colorChange}
              placeholder="标题颜色的色号，常用色号可在示例中查看"
            /><span className='suffix_tips'>请填写六位数字</span>
          </FormItem>
        </Modal>
      </div>
    );
  }
}

export default BrandBg;
