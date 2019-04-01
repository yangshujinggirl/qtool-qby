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
    this.props.form.resetFields(['reason']);
  }
  onCancel =()=> {
    this.props.onCancel(this.clearForm)
  }
  onOk =()=> {
    this.props.form.validateFieldsAndScroll((err,values) => {
      if(!err){
        this.props.changeLoading(true);
        this.props.onOk(values,this.clearForm);
      }
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {visible,confirmLoading,name,beginTime,endTime} = this.props;
    const formItemLayout = {
      labelCol: {span:7},
      wrapperCol: {span:14},
    };
    return(
      <Modal
        width={450}
        title='强制失效'
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        confirmLoading={confirmLoading}
      >
        <div>
          <Form>
            <FormItem {...formItemLayout} label='活动'>
              <p>{name}</p>
            </FormItem>
            <FormItem {...formItemLayout} label='生效时间'>
              <p>{beginTime} ~ {endTime}</p>
            </FormItem>
            <FormItem {...formItemLayout} label='强制失效原因'>
              {getFieldDecorator("reason",{
                rules:[{required:true,message:"请输入强制失效原因"}]
              })(
                <TextArea  rows={4} placeholder='请输入强制失效原因,30字以内' maxLength='30' autoComplete="off"/>
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
