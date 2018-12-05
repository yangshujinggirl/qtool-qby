import { Component } from 'react'
import { Modal, Form, Input, Select} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;


class ExplainModal extends Component{
  constructor(props){
    super(props)
  }
  clearForm =()=> {
    this.props.form.resetFields();
  }
  onOk =()=> {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        this.props.onOk(values,this.clearForm)
      };
    })
  }
  onCancel =()=>{
    this.props.onCancel(this.clearForm);
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {visible,title,name,text,rank,status} = this.props;
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
               label="简称"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 12 }}>
               {
                 getFieldDecorator("name",{
                   initialValue:name?name:null,
                   rules:[{
                     required:true,message:"请输入请输入简称，15字以内"
                   }]
                 })(
                    <Input maxLength='15' placeholder='请输入请输入简称，15字以内' autoComplete="off"/>
                 )
               }
           </FormItem>
           <FormItem
               label="详细说明"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 12 }}>
               {
                 getFieldDecorator("text",{
                   initialValue:text?text:null,
                   rules:[{
                     required:true,message:"请输入详细说明，100字以内"
                   }]
                 })(
                    <TextArea maxLength='100' placeholder='请输入详细说明，100字以内' autoComplete="off"/>
                 )
               }
           </FormItem>
           <FormItem
               label="权重"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 12 }}>
               {
                 getFieldDecorator("rank",{
                   initialValue:rank?rank:null,
                   rules:[
                     {pattern:/^(?:[0-9]{0,2}|100)$/,message:"请输入0-100整数"},
                     {required:true,message:"请输入0-100整数，数值越大权重越高"}]
                 })(
                    <Input maxLength='15' placeholder='请输入0-100整数，数值越大权重越高' autoComplete="off"/>
                 )
               }
           </FormItem>
           <FormItem
             label="状态"
             labelCol={{ span: 5 }}
             wrapperCol={{ span: 12 }}>
             {getFieldDecorator('status',{
               initialValue:status?status:null,
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
const ExplainModals = Form.create()(ExplainModal)
export default ExplainModals
