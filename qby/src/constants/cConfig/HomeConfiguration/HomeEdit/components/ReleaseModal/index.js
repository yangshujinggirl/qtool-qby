import { Modal, DatePicker, Form } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const dateFormat = 'YYYY-MM-DD HH:mm';

class ReleaseModalF extends Component {
  handleOk=(e)=> {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let timingReleaseTime = moment(values.timingReleaseTime).format(dateFormat);
        console.log(timingReleaseTime);
        this.props.onOk({timingReleaseTime})
      }
    });
  }
  handleCancel=()=> {

  }
  render() {
    const { getFieldDecorator } =this.props.form;

    return(
      <Modal
        title="定时发布"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <div>
          <Form.Item label="定时发布时间" {...formItemLayout}>
            {getFieldDecorator('timingReleaseTime')(
              <DatePicker  format={dateFormat}/>
            )}
          </Form.Item>
          <p>亲，建议定时发布时间避开流量高峰哦</p>
        </div>
      </Modal>
    )
  }
}
const ReleaseModal = Form.create()(ReleaseModalF);
export default ReleaseModal;
