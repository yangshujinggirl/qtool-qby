import React,{ Component }from 'react'
import { connect } from 'dva'
import {Modal,Form,Input,message} from 'antd'
const FormItem = Form.Item;
const TextArea = Input.TextArea;

class Cancel extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  clearForm =()=> {
    this.props.form.resetFields(['cancelReason']);
  }
  onCancel =()=> {
    this.props.onCancel(this.clearForm)
  }
  onOk =()=> {
    this.props.form.validateFieldsAndScroll((err,values) => {
      if(!err){
        this.props.onOk(values,this.clearForm);
      }
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {visible,isLoading} = this.props;
    const formItemLayout = {
      labelCol: {span:7},
      wrapperCol: {span:13},
    };
    return(
      <Modal
        width={420}
        title='取消原因'
        visible={visible}
        confirmLoading={isLoading}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <div>
          <Form>
            <FormItem {...formItemLayout} label='取消原因'>
              {getFieldDecorator("cancelReason",{
                rules:[{required:true,message:"请输入取消原因"}]
              })(
                <TextArea  rows={5} placeholder='请输入取消原因,50字以内' maxLength='50' autoComplete="off"/>
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}
const Cancels = Form.create()(Cancel);
export default Cancels
