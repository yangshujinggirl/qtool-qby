import React , { Component } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import './index.less';

const FormItem = Form.Item;

class CountryManageForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false
    }
  }
  handleOk() {

  }
  handleCancel() {

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="country-manage-components">
        <div className="handle-add-btn-wrp">
          <Button type="primary">新增国家</Button>
        </div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input  placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input  type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit">
                Log in
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
const CountryManage = Form.create()(CountryManageForm);
export default CountryManage;
