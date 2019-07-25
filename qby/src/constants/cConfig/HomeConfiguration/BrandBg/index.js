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
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <Modal
          width={600}
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
              describe="686*32"
              fileList={fileList}
              changeImg={changeImg}
              exampleImg=""
              width={686}
              height={32}
            />
          </FormItem>
          <FormItem labelCol={{ span: 5 }} label="设置模块背景色号">
            {
              getFieldDecorator('bg',{
                initialValue:color,
                onChange:colorChange,
                rules:[
                  {pattern:/^[a-zA-Z\d]+$/,message:'格式错误，请填写六位数字+字母组合'}
                ]
              })(
                <Input
                  maxLength='6'
                  style={{ width: "260px" }}
                  placeholder="请填写六位数字+字母组合"
                />
              )
            }
          </FormItem>
        </Modal>
      </div>
    );
  }
}
const BrandBgs = Form.create({})(BrandBg)
export default BrandBgs;
