import React,{ Component }from 'react'
import { connect } from 'dva'
import {Modal,Form,Input,message} from 'antd'
const FormItem = Form.Item;

class MergeModal extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  clearForm =()=> {
    this.props.form.resetFields(['aSuborderNo','bSuborderNo']);
  }
  onCancel =()=> {
    this.props.onCancel(this.clearForm)
  }
  onOk =()=> {
    this.props.form.validateFieldsAndScroll((err,values) => {
      console.log(values)
      if(!err){
        this.props.onOk(values,this.clearForm);
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {visible} = this.props
    const formItemLayout = {
      labelCol: {span:7},
      wrapperCol: {span:13},
    };
    return(
      <Modal
        width={420}
        title='订单合并'
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <div>
          <p>请输入合并订单号：</p><br/>
          <Form>
            <FormItem {...formItemLayout} label='订单号1'>
              {getFieldDecorator("aSuborderNo",{
                rules:[{required:true,message:"请输入订单号"}]
              })(
                <Input placeholder="请输入订单号" autoComplete="off"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='订单号2'>
              {getFieldDecorator('bSuborderNo',{
                rules:[{required:true,message:"请输入订单号"}]
              })(
                <Input placeholder="请输入订单号" autoComplete="off"/>
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}
const MergeModals = Form.create()(MergeModal);
export default MergeModals
