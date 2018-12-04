import { Component } from 'react'
import { Modal, Form, Input, Select, Radio } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


class BondModal extends Component{
  constructor(props){
    super(props)
  }
  clearForm =()=> {
    this.props.form.resetFields();
  }
  onOk =()=> {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      console.log(values)
      // if(!err){
      //   this.props.onOk(values,this.clearForm)
      // };
    })
  }
  onCancel =()=>{
    this.props.onCancel(this.clearForm);
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
      <Modal
         title={this.props.title}
         visible={this.props.visible}
         onOk={this.onOk}
         onCancel={this.onCancel}
       >
       <Form>
           <FormItem
               label="仓库名称"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 12 }}>
               {
                 getFieldDecorator("name",{
                   rules:[{
                     required:true,message:"请输入仓库名称，15字以内"
                   }]
                 })(
                    <Input maxLength='15' placeholder='请输入名称，15字以内'/>
                 )
               }
           </FormItem>
           <FormItem
               label="C端显示名称"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 12 }}>
               {
                 getFieldDecorator("age",{
                   rules:[{
                     required:true,message:"请输入名称，15字以内"
                   }]
                 })(
                    <Input maxLength='15' placeholder='请输入名称，15字以内'/>
                 )
               }
           </FormItem>
           <FormItem
               label="推送平台"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 12 }}>
               {
                 getFieldDecorator("adre",{
                   rules:[
                     {required:true,message:"请选择推送平台"}]
                 })(
                   <RadioGroup>
                     <Radio value={1}>管家</Radio>
                     <Radio value={2}>丰趣</Radio>
                     <Radio value={3}>无</Radio>
                   </RadioGroup>
                 )
               }
           </FormItem>
           <FormItem
             label="状态"
             labelCol={{ span: 5 }}
             wrapperCol={{ span: 12 }}>
             {getFieldDecorator('wsGroupId',{
               rules:[{required:true,message:'请选择状态'}],
             })(
               <Select allowClear={true} placeholder="请选择状态" className='select'>
                 <Option value={1}>启用</Option>
                 <Option value={2}>禁用</Option>
               </Select>
             )}
           </FormItem>
         </Form>
       </Modal>
      </div>
    )
  }
}
const BondModals = Form.create()(BondModal)
export default BondModals
