import React,{ Component } from 'react';
import { Form, Select, Input, Button ,message,Modal, Row, Col,DatePicker,Radio} from 'antd';
import Avatar from './avatar';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
class AddBanner extends Component {
  constructor(props){
    super(props);
  }
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
        const { cBanner } = this.props;
		    if (!err) {
          //输入框校验
          if(!values.formValue.url){
              message.error('请上传图片',.8)
              return false;
          }
        }else{
          //新增banner保存发送请求
          cBanner.dispatch({
            type:'saveBanner',
            payload:values
          });
        }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { cBanner } =this.props;
    return(
      <div>
        	<Form className="addUser-form operatebanner-form">
            <FormItem
              label="banner名称"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入banner名称'}],
                  initialValue:cBanner.formValue.name
                })(
                  <Input placeholder="请输入banner名称" maxLength='10' autoComplete="off"/>
              )}
            </FormItem>
            <FormItem
              label="banner状态"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
            {getFieldDecorator('status', {
              rules: [{ required: true, message: '请选择banner状态' }],
              initialValue:cBanner.formValue.status
            })(
              <Select placeholder="请选择banner状态">
                  <Option value="1">上线</Option>
                  <Option value="0">下线</Option>
              </Select>
            )}
            </FormItem>
            <FormItem
              label="banner权重"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
            {getFieldDecorator('rank', {
              rules: [{required: true, message: '请输入banner权重'},{pattern:/^100(\.0*)?$|^0*$|^[0-9]?[0-9]?(\.[0-9]*)?$/,message: '权重在0-100之间'}],
              initialValue:cBanner.formValue.rank
            })(
              <Input placeholder = '请输入banner权重' autoComplete="off"/>
            )}
            </FormItem>
            <FormItem
              label='展示App'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
              <Input value='Qtools App' readOnly/>
            </FormItem>
            <FormItem
                label="banner图片"
                labelCol={{ span: 3,offset: 1 }}
                wrapperCol={{ span: 6 }}
            >
            {getFieldDecorator('img', {
            })(
                <Avatar/>
            )}
            </FormItem>
          	<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
            		<Button className='mr30'>取消</Button>
                  <Button className='mr30'>配置页面</Button>
            		<Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
          	</FormItem>
        	</Form>
        	)
      </div>
    )
  }
}
const AddcBanner = Form.create()(AddBanner);
function mapStateToProps(state) {
  const { cBanner } = state;
  return {cBanner};
}

// function mapStateToProps(state) {
//     const {values,formValue} = state.operatebanner;
//     const {configArr,currentItem}= state.h5config;
//     return {values,formValue,configArr,currentItem};
// }
export default connect(mapStateToProps)(AddcBanner);

// export default AddcBanner
