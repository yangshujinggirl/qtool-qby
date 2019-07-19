import { Modal, Button, InputNumber, Form, message } from 'antd';
import React, { Component } from 'react';
import './index.less';

class App extends React.Component {
  onOk=()=> {
    this.props.form.validateFields(['frameNum'],(err, values) => {
      const { frameNum } =values;
      let tx =this.props.modName=='icon'?'坑位':'帧位';
      if(frameNum == this.props.activiKey) {
        message.error(`不可选择当前${tx}`)
        return;
      }
      this.props.onOk(frameNum);
    });
  }
  render() {
    const { visible, confirmLoading, modName } = this.props;
    const { getFieldDecorator } =this.props.form;
    let text, max, unit;
    if(modName=='icon') {
      text='将当前icon调整至第';
      max = 4;
      unit="坑"
    } else {
      text='将当前banner调整至第';
      max = 5;
      unit="帧"
    }
    return (
      <Modal
        confirmLoading={confirmLoading}
        className="frame-modal-wrap"
        visible={visible}
        onOk={this.onOk}
        confirmLoading={confirmLoading}
        onCancel={this.props.onCancel}>
        <div>
          {text}
          <Form.Item className="frame-item">
            {getFieldDecorator('frameNum', {
              initialValue: 1
            })(
              <InputNumber min={1} max={max}/>
            )}
          </Form.Item>
          {unit}
        </div>
      </Modal>
    );
  }
}
export default App;
