import React, { Component } from "react";
import { Modal, Radio, Input, Select, Form } from "antd";
import "./index.less";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};
class AddModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioVal: 1
    };
  }
  onChange = e => {
    let value = e.target.value;
    this.setState({ radioVal: value });
  };
  resetForm=()=>{
    this.setState({ radioVal: 1 });
    this.props.form.resetFields();
  }
  submit(values) {
    this.props.onOk(values,this.resetForm);
  }
  onOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onOk(values);
      }
    });
  };
  onCancel = () => {
    this.props.onCancel(this.resetForm);
  };
  render() {
    const { visible, versionList } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { radioVal } = this.state;
    return (
      <Modal
        className="add-version-modal"
        title="新增首页版本"
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Form>
          <FormItem {...formItemLayout}>
            {getFieldDecorator("type", {
              initialValue: 1,
              onChange: this.onChange
            })(
              <Radio.Group>
                <Radio value={1}>新增空白首页</Radio>
                <Radio value={2}>从已有版本复制</Radio>
              </Radio.Group>
            )}
          </FormItem>
          {radioVal == 2 && (
            <FormItem label="请输入版本编号" {...formItemLayout}>
            {getFieldDecorator("versionCodename", {
              rules: [
                {
                  required: true,
                  message: "请输入版本编号"
                }
              ]
            })(
              <Input
                placeholder="请输入版本编号"
                autoComplete="off"
              />
            )}
          </FormItem>
          )}
          <FormItem label="版本名称" {...formItemLayout}>
            {getFieldDecorator("versionName", {
              rules: [
                {
                  required: true,
                  message: "请输入版本名称"
                }
              ]
            })(
              <Input
                placeholder="仅供内部参考使用，15个字符以内"
                autoComplete="off"
                maxLength='15'
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const AddModal = Form.create({})(AddModalForm);

export default AddModal;
