import React, { Component } from "react";
import { Form, Button } from "antd";
const FormItem = Form.Item;

class Config extends Component {
  render() {
    const { getFieldDecorator } = this.props;
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    return (
      <div>
        <Form>
          <FormItem label="时间段" {...formLayout}>
            <span>2018-09-08 12:20 ~ 2018-09-09 14:34</span>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create({})(Config);
