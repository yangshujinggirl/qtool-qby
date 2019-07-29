import { Modal, Button, InputNumber, Form, message, Select } from 'antd';
import React, { Component } from 'react';
import './index.less';

const optionBannerData=[{
    key:1,
  },{
    key:2,
  },{
    key:3,
  },{
    key:4,
  },{
    key:5,
  }]
const optionIconData=[{
    key:1,
  },{
    key:2,
  },{
    key:3,
  },{
    key:4,
  }]
const { Option } = Select;
class App extends React.Component {
  onOk=()=> {
    this.props.form.validateFields(['frameNum'],(err, values) => {
      const { frameNum } =values;
      let tx =this.props.modName=='icon'?'坑位':'帧位';
      if(frameNum == this.props.activiKey) {
        message.error(`不可选择当前${tx}`,1)
        return;
      }
      this.props.onOk(frameNum);
    });
  }
  render() {
    const { visible, confirmLoading, modName } = this.props;
    const { getFieldDecorator } =this.props.form;
    let text, optionData, unit;
    if(modName=='icon') {
      text='将当前icon调整至第';
      optionData = optionIconData;
      unit="坑"
    } else {
      text='将当前banner调整至第';
      optionData = optionBannerData;
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
            {getFieldDecorator('frameNum',{
              initialValue:1
            })(
              <Select>
                {
                  optionData.map((el,index) =>(
                    <Option key={el.key} value={el.key}>{el.key}</Option>
                  ))
                }
              </Select>
            )}
          </Form.Item>
          {unit}
        </div>
      </Modal>
    );
  }
}
export default App;
