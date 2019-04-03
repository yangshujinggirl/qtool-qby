import { Component } from 'react'
import { Modal, Form, Input, Select, message} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
import LogoUpload from "./logoImgUpload.js"
import ActUpload from "./actImgUpload.js"
import '../index.less'

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
        if(values.eventStatus == 10){ //上架图片必填
          if(!(this.props.logoUrl)){
            message.warning('请上传品牌图片',1);
          }else{
            this.props.onOk(values,this.clearForm)
          };
        }else{
          this.props.onOk(values,this.clearForm)
        };
      };
    })
  }
  onCancel =()=>{
    this.props.onCancel(this.clearForm);
  }
  changeLogoImg =(logoUrl)=> {
    this.props.changeLogoImg(logoUrl)
  }
  changeActImg =(actUrl)=> {
    this.props.changeActImg(actUrl)
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {logoUrl,actUrl,name,rank,status,eventStatus,configureCode} = this.props;
    return(
      <div>
      <Modal
         title={this.props.title}
         visible={this.props.visible}
         onOk={this.onOk}
         onCancel={this.onCancel}
         wrapClassName='add_brand'
       >
       <Form>
           <FormItem
               label="品牌图片"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 16 }}>
               <LogoUpload
                 name='imgFile'
                 action='/erpWebRest/qcamp/upload.htm?type=brand'
                 logoUrl = {logoUrl}
                 changeLogoImg = {this.changeLogoImg}
               />
               <ActUpload
                 name='imgFile'
                 action='/erpWebRest/qcamp/upload.htm?type=brand'
                 actUrl = {actUrl}
                 changeActImg = {this.changeActImg}
               />
           </FormItem>
           <FormItem
               label="品牌名称"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 12 }}>
               {
                 getFieldDecorator("name",{
                   rules:[{required:true,message:"请输入品牌名称",}],
                   initialValue:name?name:null,
                 })(
                    <Input placeholder='请输入品牌名称' autoComplete="off"/>
                 )
               }
           </FormItem>
           <FormItem
               label="品牌权重"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 12 }}>
               {
                 getFieldDecorator("rank",{
                   initialValue:typeof(rank)=="number"?rank:null,
                   rules:[
                     {pattern:/^(?:[0-9]{0,2}|100)$/,message:"请输入0-100整数"},
                     {required:true,message:"请输入0-100整数，数值越大权重越高"}]
                 })(
                    <Input maxLength='15' placeholder='请输入0-100整数，数值越大权重越高' autoComplete="off"/>
                 )
               }
           </FormItem>
           <FormItem
               label="跳转页面编码"
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 12 }}>
               {
                 getFieldDecorator("configureCode",{
                   initialValue:configureCode ? configureCode :null,
                 })(
                    <Input placeholder='请输入跳转页面编码' autoComplete="off"/>
                 )
               }
           </FormItem>
           <FormItem
             label="品牌状态"
             labelCol={{ span: 5 }}
             wrapperCol={{ span: 12 }}>
             {getFieldDecorator('status',{
               initialValue:typeof(status)=='number'?status:null,
               rules:[{required:true,message:'请选择品牌状态'}],
             })(
               <Select allowClear={true} placeholder="请选择品牌状态" className='select'>
                 <Option value={1}>启用</Option>
                 <Option value={0}>禁用</Option>
               </Select>
             )}
           </FormItem>
           <FormItem
             label="C端品牌馆"
             labelCol={{ span: 5 }}
             wrapperCol={{ span: 12 }}>
             {getFieldDecorator('eventStatus',{
               initialValue:eventStatus?eventStatus:20,
               rules:[{required:true,message:'请选择状态'}],
             })(
               <Select allowClear={true} placeholder="请选择C端品牌馆" className='select'>
                 <Option value={10}>上架</Option>
                 <Option value={20}>下架</Option>
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
