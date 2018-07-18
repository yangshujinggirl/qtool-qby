import React,{ Component } from 'react';
import { Form, Select, Input, Button , Row, Col, DatePicker, Radio, Checkbox } from 'antd';
import { createBpushApi } from '../../../services/activity/bPush'
import './index'
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const options = [
  { label: '店主', value: '1' },
  { label: '店长', value: '2' },
  { label: '店员', value: '3' },
];;
class AddCoupon extends Component {
  constructor(props){
    super(props);
    this.state = {
      dayDisable:true,
      timeDisable:true,
      error:{
        fixedTime:'',
        bannerIdNum:'',
        code:'',
        H5Url:'',
        textInfo:''
      }
    }
  }

  //保存
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      console.log(values)
      if(values.pushType==2){
        if(!values.fixedTime){
          this.setState({error:{fixedTime:'请选择定时推送时间'}})
        };
      };
      if(values.type==1){
        if(!values.bannerIdNum){
          this.setState({error:{bannerIdNum:'请选择banner_id'}})
        };
      };
      if(values.type==2){
        if(!values.code){
          this.setState({error:{code:'请选择商品编码'}})
        };
      };
      if(values.type==3){
        if(!values.H5Url){
          this.setState({error:{H5Url:'请选择H5链接URL'}})
        };
      };
      if(values.type==4){
        if(!values.textInfo){
          this.setState({error:{textInfo:'请选择定时推送时间'}})
        };
      };
      if(!err){
        createBpushApi(values).then(res => {

        }).catch()
      }

    });
  }
  //单选框选择
  choice =(e)=> {
    const value = e.target.value;
    if(value==1){
      this.setState({dayDisable:false,timeDisable:true})
    }else if(value==2){
      this.setState({dayDisable:true,timeDisable:false})
    }
  }
  render(){
    const { getFieldDecorator,getFieldError } = this.props.form;
    const { cBanner } =this.props;
    return(
      <div>
        	<Form className="addUser-form operatebanner-form">
            <FormItem
              label="推送主题"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 8 }}
            >
              {getFieldDecorator('pushTheme', {
                  rules: [{ required: true, message: '请输入推送主题'}],
                })(
                  <Input placeholder="请输入10字以内推送主题" maxLength='10' autoComplete="off"/>
              )}
            </FormItem>
            <FormItem
              label="推送时间"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 8}}
            >
            {getFieldDecorator('pushType', {
              rules: [{ required: true, message: '请选择推送时间' }],
            })(
              <RadioGroup onChange={this.choice}>
                <Radio value="1">
                    {getFieldDecorator('createTime',{
                    })(
                      <div style={{display:'inline-block'}}>立即推送</div>
                    )}
                </Radio>
                 <Radio value="2">
                     {getFieldDecorator('fixedTime',{
                       rules: [{ required: true, message: '请输入推送主题'}],
                     })(
                       <div style={{display:'inline-block'}}>定时推送　
                         <DatePicker  showTime format="YYYY-MM-DD HH:mm:ss" disabled={this.state.timeDisable}/>
                         <span className='error'>　{this.state.error.fixedTime}</span>
                       </div>
                     )}
                 </Radio>
              </RadioGroup>
            )}
            </FormItem>
            <FormItem
              label='推送内容'
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
              label="推送类型"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 8 }}
            >
              {getFieldDecorator('type',{
                  initialValue: "1",
                  rules: [{ required: true, message: '请选择推送类型' }],
              })(
                <RadioGroup>
                  <Radio value="1">
                      {getFieldDecorator('bannerIdNum',{
                        rules: [{ required: true, message: '请选择推送类型' }],
                      })(
                        <div style={{display:'inline-block'}}>bannerId　　
                          <Input/>
                          <span className='error'>　{this.state.error.bannerIdNum}</span>
                        </div>
                      )}
                  </Radio>
                  <Radio value="2">
                      {getFieldDecorator('code',{
                        rules: [{ required: true, message: '请选择推送类型' }],
                      })(
                        <div style={{display:'inline-block'}}>商品编码　　
                          <Input/>
                          <span className='error'>　{this.state.error.code}</span>
                        </div>
                      )}
                  </Radio>
                  <Radio value="3">
                      {getFieldDecorator('H5Url',{
                        rules: [{ required: true, message: '请选择推送类型' }],
                      })(
                        <div style={{display:'inline-block'}}>H5链接URL　
                          <Input/>
                          <span className='error'>　{this.state.error.H5Url}</span>
                        </div>
                      )}
                  </Radio>
                   <Radio value="4">
                       {getFieldDecorator('textInfo',{
                         rules: [{ required: true, message: '请选择推送类型' }],
                       })(
                         <div style={{display:'inline-block'}}>文本信息　　
                           <TextArea placeholder='请输入300字以下代金券备注' maxLength='300' rows={6}/>
                           <span className='error'>　{this.state.error.textInfo}</span>
                         </div>
                       )}
                   </Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              label="推送内容"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 8 }}
            >
              {getFieldDecorator('msgContent', {
                rules: [{ required: true, message: '请选择推送内容' }]
              })(
                  <TextArea placeholder='请输入30字以下推送内容' maxLength='30' rows={6} />
              )}
            </FormItem>
            <FormItem
              label="推送主题"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 8 }}
            >
              {getFieldDecorator('targetObject',{
                  rules: [{ required: true, message: '请输入推送主题'}],
                  initialValue: ['1'],
              })(
                <Input/>
              )}
            </FormItem>
          	<FormItem wrapperCol={{ offset: 3}}>
            		<Button style={{marginRight:'100px'}}>取消</Button>
            		<Button type="primary" onClick={this.handleSubmit}>保存</Button>
          	</FormItem>
        	</Form>
      </div>
    )
  }
}
const AddcBanner = Form.create()(AddCoupon);


export default AddcBanner;
