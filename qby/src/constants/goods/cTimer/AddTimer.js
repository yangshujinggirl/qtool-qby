import React,{ Component } from 'react';
import { Form, Select, Input, Button , message, Row, Col, DatePicker, Radio, Checkbox } from 'antd';
import { createTimerApi } from '../../../services/cTimer/cTimer'
import { connect } from 'dva'
import './index'
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const options = [
  { label: '上线', value: '1' },
  { label: '下线', value: '2' },
  { label: 'NEW', value: '3' },
  { label: '下NEW', value: '4' },
  { label: 'HOT', value: '5' },
  { label: '下HOT', value: '6' },
];;
class AddTimer extends Component {
  constructor(props){
    super(props);
  }

  //保存
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      if(!err){
        createTimerApi(values)
        .then(res => {
        },err => {
          message.error('失败')
        });
      };
    });
  }
  //取消
  cancel =()=> {
    this.props.dispatch({
        type:'tab/initDeletestate',
        payload:this.props.componkey
    });
  }
  //修改时初始化数据
  componentDidMount(){
    const id = this.props.data.pdSpuId
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { cBanner } =this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return(
      <div className='addpush'>
        	<Form className="addUser-form operatebanner-form">
            <FormItem
              label="定时名称"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}
            >
              {getFieldDecorator('pushTheme', {
                  rules: [{ required: true, message: '请输入推送主题'}],
                })(
                  <Input placeholder="请输入10字以内推送主题" maxLength='10' autoComplete="off"/>
              )}
            </FormItem>
            <FormItem
              label='商品编码'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}
            >
            {getFieldDecorator('msgContent', {
              rules: [{ required: true, message: '请选择推送内容' }]
            })(
                <TextArea placeholder='请输入30字以下推送内容' maxLength='30' rows={6} />
            )}
            </FormItem>
            <FormItem
              label="定时时间"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}
            >
              {getFieldDecorator('pushTheme', {
                  rules: [{ required: true, message: '请输入定时时间'}],
                })(
                  <Input placeholder="请输入10字以内推送主题" maxLength='10' autoComplete="off"/>
              )}
            </FormItem>
            <FormItem
              label="定时操作"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}
            >
              {getFieldDecorator('targetObject',{
                  rules: [{ required: true, message: '请输入推送主题'}],
                  initialValue: ['1'],
              })(
                <CheckboxGroup options={options} />
              )}
            </FormItem>
          	<FormItem wrapperCol={{ offset: 3}}>
            		<Button style={{marginRight:'100px'}} onClick={this.cancel}>取消</Button>
            		<Button type="primary" onClick={this.handleSubmit}>保存</Button>
          	</FormItem>
        	</Form>
      </div>
    )
  }
}
const AddTimers = Form.create()(AddTimer);
function mapStateToProps(state){
  const { cTimer } = state;
  return cTimer
}

export default connect(mapStateToProps)(AddTimers);
