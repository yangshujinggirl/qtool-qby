import React,{ Component } from 'react'
import { Button, Modal, Form, Input,Select ,message} from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class AddBill extends Component{
  //弹窗消失，清空数据
  clear =()=>{
      this.props.form.resetFields(['customServiceTheme','remark','source','waiterTel']);
  }
  //点击确定
  onOk =()=>{
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        this.props.onOk && this.props.onOk(values,this.clear);
      }
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Modal
          visible= {this.props.visible}
          title='新增工单'
          okText="确定"
          onCancel= {this.props.onCancel}
          onOk = {this.onOk}
        >
          <Form>
            <FormItem
                label="客服主题"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
                {getFieldDecorator('customServiceTheme', {
                    rules: [{ required: true, message: '请输入客服主题' }],
                })(
                    <Input placeholder='请输入15字以下' maxLength='15' autoComplete="off"/>
                )}
            </FormItem>
            <FormItem
                label="详细内容"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
                {getFieldDecorator('remark', {
                    rules: [{ required: true, message: '请输入详细内容' }],
                })(
                    <TextArea  rows={5} placeholder='最多支持200字' maxLength='200' autoComplete="off"/>
                )}
            </FormItem>
            <FormItem
                label="部门/用户/门店"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
                {getFieldDecorator('source', {
                })(
                    <Input placeholder='请输入64字以下' maxLength='64' autoComplete="off"/>
                )}
            </FormItem>
            <FormItem
                label="联系方式"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
                {getFieldDecorator('waiterTel', {
                })(
                    <Input placeholder='请输入32字以下' maxLength='32' autoComplete="off"/>
                )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
const AddBills = Form.create()(AddBill);
export default AddBills;
