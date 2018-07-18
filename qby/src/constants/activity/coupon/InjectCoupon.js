import React,{ Component } from 'react'
import { Button, Modal, Form, Input,Select ,message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class InjectCoupon extends Component{
  //点击确定
  onOk =()=>{
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        this.props.onOk && this.props.onOk(values);
      }
    })
  }
// 注券
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Modal
          visible= {this.props.visible}
          title='注券'
          okText="确定"
          onCancel= {this.props.onCancel}
          onOk = {this.onOk}
        >
          <Form>
            <FormItem
                label="优惠券批次"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
                {getFieldDecorator('couponCode', {
                    rules: [{ required: true, message: '请输入优惠券批次' }],
                })(
                    <Input placeholder='请输入15字以下' maxLength='15' autoComplete="off"/>
                )}
            </FormItem>
            <FormItem
                label="用户手机号"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
                {getFieldDecorator('userMobile', {
                    rules: [{ required: true, message: '请输入用户手机号' }],
                })(
                    <TextArea  rows={5} placeholder='最多支持10行' maxLength='200' autoComplete="off"/>
                )}
            </FormItem>
            <FormItem
                label="注券理由"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
                {getFieldDecorator('resonance', {
                    rules: [{ required: true, message: '请输入注券理由' }],
                })(
                  <Select allowClear={true} placeholder="注券理由">
                      <Option value='1'>售后安抚</Option>
                      <Option value='2'>高消费赠送</Option>
                      <Option value='3'>运营活动</Option>
                  </Select>
                )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
const InjectCoupons = Form.create()(InjectCoupon);
export default InjectCoupons;
