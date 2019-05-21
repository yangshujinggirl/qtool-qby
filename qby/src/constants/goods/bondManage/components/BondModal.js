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
      if(!err){
        values.name = values.name.trim();
        values.cname = values.cname.trim();
        values.dispExp = values.dispExp.trim();
        this.props.onOk(values,this.clearForm)
      };
    })
  }
  onCancel =()=>{
    this.props.onCancel(this.clearForm);
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {title,visible,name,cname,dispExp,pushPlatform,status,shipmentType} = this.props;
    return(
      <div>
      <Modal
         title={title}
         visible={visible}
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
                   initialValue:name?name:null,
                   rules:[{
                     required:true,message:"请输入仓库名称，15字以内"
                   }]
                 })(
                    <Input maxLength='15' placeholder='请输入名称，15字以内' autoComplete='off'/>
                 )
               }
           </FormItem>
           <FormItem
               label="C端显示名称"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 12 }}>
               {
                 getFieldDecorator("cname",{
                   initialValue:cname?cname:null,
                   rules:[{
                     required:true,message:"请输入名称，15字以内"
                   }]
                 })(
                    <Input maxLength='15' placeholder='请输入名称，15字以内' autoComplete='off'/>
                 )
               }
           </FormItem>
           <FormItem
               label="C端配送说明"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 12 }}>
               {
                 getFieldDecorator("dispExp",{
                   initialValue:dispExp?dispExp:null,
                   rules:[{
                     required:true,message:"请输入名称，20字以内"
                   }]
                 })(
                    <Input maxLength='20' placeholder='请输入名称，20字以内' autoComplete='off'/>
                 )
               }
           </FormItem>
           <FormItem
               label="推送平台"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 12 }}>
               {
                 getFieldDecorator("pushPlatform",{
                   initialValue:pushPlatform ? Number(pushPlatform) : null,
                   rules:[
                     {required:true,message:"请选择推送平台"}]
                 })(
                   <RadioGroup>
                     <Radio value={10}>管家</Radio>
                     <Radio value={20}>丰趣</Radio>
                     <Radio value={30}>无</Radio>
                   </RadioGroup>
                 )
               }
           </FormItem>
           <FormItem
               label="出货方式"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 12 }}>
               {
                 getFieldDecorator("shipmentType",{
                   initialValue:shipmentType ? Number(shipmentType) : undefined,
                   rules:[
                     {required:true,message:"请选择出货方式"}]
                 })(
                   <Select allowClear={true} placeholder="请选择出货方式" className='select'>
                     <Option value={1}>保税仓发货</Option>
                     <Option value={2}>海外直邮</Option>
                     <Option value={3}>虚拟发货</Option>
                   </Select>
                 )
               }
           </FormItem>
           <FormItem
             label="状态"
             labelCol={{ span: 5 }}
             wrapperCol={{ span: 12 }}>
             {getFieldDecorator('status',{
               initialValue:typeof(status)=='number'?status:null,
               rules:[{required:true,message:'请选择状态'}],
             })(
               <Select allowClear={true} placeholder="请选择状态" className='select'>
                 <Option value={1}>启用</Option>
                 <Option value={0}>禁用</Option>
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
