import React,{ Component }from 'react'
import { connect } from 'dva'
import {Modal,Form,Input,message} from 'antd'
const FormItem = Form.Item;
const TextArea = Input.TextArea;

class MarkStar extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  clearForm =()=> {
    this.props.form.resetFields(['iconTypeRemark']);
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
    const {visible,iconTypeRemark} = this.props;
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
          <Form>
            <FormItem {...formItemLayout} label='请输备注内容'>
              {getFieldDecorator("iconTypeRemark",{
                initialValue:iconTypeRemark,
                rules:[{required:true,message:"请输入备注内容"}]
              })(
                <TextArea  rows={5} placeholder='请输入30字以内' maxLength='30' autoComplete="off"/>
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}
const MarkStars = Form.create()(MarkStar);
export default MarkStars
