import { Modal, Button, InputNumber, Form, message } from 'antd';
import React, { Component } from 'react';
import './index.less';

class App extends React.Component {
  onOk=()=> {
    this.props.form.validateFields(['frameNum'],(err, values) => {
      const { frameNum } =values;
      if(frameNum == this.props.activiKey) {
        message.error('不可选择当前帧位')
        return;
      }
      this.props.onOk(frameNum);
    });
  }
  render() {
    const { visible, confirmLoading } = this.props;
    const { getFieldDecorator } =this.props.form;
    return (
      <Modal
        confirmLoading={confirmLoading}
        className="frame-modal-wrap"
        visible={visible}
        onOk={this.onOk}
        confirmLoading={confirmLoading}
        onCancel={this.props.onCancel}>
        <div>
          将当前banner调整至第
          <Form.Item className="frame-item">
            {getFieldDecorator('frameNum', {
              initialValue: 1
            })(
              <InputNumber min={1} max={5} />
            )}
          </Form.Item>
          帧
        </div>
      </Modal>
    );
  }
}
export default App;
