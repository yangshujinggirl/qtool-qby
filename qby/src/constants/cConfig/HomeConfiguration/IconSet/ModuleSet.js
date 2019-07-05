import React, { Component } from "react";
import { Form, Button, Input, Radio, Row, Col, Modal, message } from "antd";
import { saveModuleApi } from "../../../../services/cConfig/homeConfiguration/iconSet/module";
const FormItem = Form.Item;

class ModuleSet extends Component {
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
  sendRequest = values => {
    saveModuleApi(values).then(res => {
      if (res.code == "0") {
        message.success("保存成功");
      }
    });
  };
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.homepageModuleId = 1;
        this.sendRequest(values);
      }
    });
  };
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form>
          <FormItem
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 5 }}
            label="设置模块背景色号"
          >
            {getFieldDecorator("moduleBackColor", {
              initialValue: "#eee"
            })(
              <Input
                style={{ width: "400px" }}
                placeholder="标题颜色的色号，常用色号可在示例中查看"
              />
            )}
            <p>请填写#+六位数字</p>
          </FormItem>
          <FormItem labelCol={{ span: 3 }} label="标题栏样式">
            {getFieldDecorator("titleColor", {
              rules: [{ required: true, message: "请选择标题栏样式" }],
              initialValue: 0
            })(
              <Radio.Group>
                <Radio value={0}>黑色</Radio>
                <Radio value={1}>白色</Radio>
              </Radio.Group>
            )}
            <a className="theme-color" onClick={this.lookExample}>
              查看示例
            </a>
          </FormItem>
          <Row>
            <Col offset={3}>
              <Button type="primary" onClick={this.handleSubmit}>
                保存设置
              </Button>
            </Col>
          </Row>
        </Form>
        <Modal visible={visible} onCancel={this.onCancel} footer={null}>
          <img src="" />
        </Modal>
      </div>
    );
  }
}

export default Form.create({})(ModuleSet);
