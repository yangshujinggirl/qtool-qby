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
  submit() {
    this.props.onOk("1");
    this.onCancel();
  }
  onOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.submit();
      }
    });
  };
  onCancel = () => {
    this.setState({ radioVal: 1 });
    this.props.form.resetFields();
    this.props.onCancel();
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
            {getFieldDecorator("code", {
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
            <FormItem label="选择你要复制的版本" {...formItemLayout}>
              {getFieldDecorator("status")(
                <Select placeholder="选择你要复制的版本" allowClear={true}>
                  {versionList.map(el => (
                    <Select.Option value={el.value} key={el.key}>
                      {el.value}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>
          )}
          <FormItem label="版本名称" {...formItemLayout}>
            {getFieldDecorator("name", {
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
