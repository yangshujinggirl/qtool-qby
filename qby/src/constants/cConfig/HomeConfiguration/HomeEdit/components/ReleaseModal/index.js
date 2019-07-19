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
        let timingReleaseTime = values.timingReleaseTime&&moment(values.timingReleaseTime).format(dateFormat);
        if(timingReleaseTime) {
          this.props.onOk({timingReleaseTime});
        } else {
          this.props.onOk();
        }
        this.props.form.resetFields()
      }
    });
  }
  handleCancel=()=> {
    this.props.onCancel();
    this.props.form.resetFields()
  }
  render() {
    const { getFieldDecorator } =this.props.form;
    const { confirmLoading, type } =this.props;

    return(
      <Modal
        title="定时发布"
        confirmLoading={confirmLoading}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <div>
          {
            type == '2'?
            <div>
              <Form.Item label="定时发布时间" {...formItemLayout}>
                {getFieldDecorator('timingReleaseTime',{
                  rules:[{
                    required:true,message:'请设定发布时间'
                  }]
                })(
                  <DatePicker  format={dateFormat}/>
                )}
              </Form.Item>
              <p>亲，建议定时发布时间避开流量高峰哦</p>
            </div>
            :
            <p>
              您确定立即发布吗？发布成功后此次设置将同步到C端首页，不可撤销
            </p>
          }
        </div>
      </Modal>
    )
  }
}
const ReleaseModal = Form.create()(ReleaseModalF);
export default ReleaseModal;
