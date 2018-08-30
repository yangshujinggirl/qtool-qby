import React,{ Component } from 'react';
import { Form, Select, Input, Button , message} from 'antd';
import { createBpushApi } from '../../../services/activity/bPush'
import { connect } from 'dva'
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;;
class Addanswer extends Component {
  constructor(props){
    super(props);
    this.state = {
      componkey:this.props.componkey,
      createTime:true,
      fixedTime:false,
      bannerIdNum:true,
      code:false,
      H5Url:false,
      textInfo:false
    }
  }

  //保存
  handleSubmit = (e) => {

  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        	<Form className="addUser-form operatebanner-form">
            <FormItem
              label="问题类型"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}>
              {getFieldDecorator('pushTheme', {
                  rules: [{ required: true, message: '请输入问题类型'}],
                })(
                  <Select allowClear={true} placeholder="请选择问题类型" className='select'>
                      <Option value={10}>运营问题 </Option>
                      <Option value={20}>商品问题</Option>
                      <Option value={30}>设计问题</Option>
                      <Option value={40}>招商问题 </Option>
                      <Option value={50}>系统问题 </Option>
                      <Option value={60}>其他 </Option>
                  </Select>
              )}
            </FormItem>
            <FormItem
              label="问题状态"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}
            >
              {getFieldDecorator('pushTheme', {
                  rules: [{ required: true, message: '请输入问题状态'}],
                })(
                  <Select allowClear={true} placeholder="请选择问题状态" className='select'>
                      <Option value={1}>上线</Option>
                      <Option value={0}>下线</Option>
                  </Select>
              )}
            </FormItem>
            <FormItem
              label="标题"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}
            >
              {getFieldDecorator('pushTheme', {
                  rules: [{ required: true, message: '请输入标题'}],
                })(
                  <Input placeholder="请输入30字以内标题" maxLength='30' autoComplete="off"/>
              )}
            </FormItem>
        	</Form>
      </div>
    )
  }
}
const Addanswers = Form.create()(Addanswer);
function mapStateToProps(state){
  const { bAnswer } = state;
  return bAnswer
}

export default connect(mapStateToProps)(Addanswers);
