import React,{ Component } from 'react';
import { Form, Select, Input, Button , Row, Col,DatePicker,Radio} from 'antd';
import { addCouponApi } from '../../../services/activity/coupon'
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
class AddCoupon extends Component {
  constructor(props){
    super(props);
  }
  state={
    dayDisable:true,
    timeDisable:true,
  }
  //保存
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {

      if(!err){
        addCouponApi(values).then(res => {

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
    const { getFieldDecorator } = this.props.form;
    const { cBanner } =this.props;
    return(
      <div>
        	<Form className="addUser-form operatebanner-form">
            <FormItem
              label="代金券名称"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('couponName', {
                  rules: [{ required: true, message: '请输入代金券名称'}],
                })(
                  <Input placeholder="请输入10字以内代金券名称" maxLength='10' autoComplete="off"/>
              )}
            </FormItem>
            <FormItem
              label="代金券场景"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
            {getFieldDecorator('couponUseScene', {
              rules: [{ required: true, message: '请选择代金券场景' }],
            })(
              <Select placeholder="请选择banner状态">
                  <Option value="1">新用户专享券</Option>
                  <Option value="0">注券</Option>
              </Select>
            )}
            </FormItem>
            <FormItem
              label="券有效期"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 8 }}
            >
              {getFieldDecorator('couponValid',{
                  rules: [{ required: true, message: '请选择券有效期' }],
              })(
                <RadioGroup onChange={this.choice}>
                  <Radio value="1" checked >
                      {getFieldDecorator('couponValidDay',{
                      })(
                        <div style={{display:'inline-block'}}>用户即日起　<Input style={{width:'60%'}} disabled={this.state.dayDisable} />　天</div>
                      )}
                  </Radio>
                   <Radio value="2">
                       {getFieldDecorator('couponValidDate',{
                       })(
                         <div style={{display:'inline-block'}}>特定时间到　<DatePicker style={{width:'60%'}} showTime format="YYYY-MM-DD HH:mm:ss" disabled={this.state.timeDisable}/>　止</div>
                       )}
                   </Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              label="代金券金额"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
            {getFieldDecorator('couponMoney', {
              rules: [{required: true, message: '请输入代金券金额'},{pattern:/^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/,message: '请输入最多2位小数正数'}],
            })(
              <div><Input style={{width:'80%'}} placeholder = '请输入代金券金额'/>　元</div>
            )}
            </FormItem>
            <FormItem
              label='使用门槛'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('couponFullAmount', {
                rules: [{required: true, message: '请输入代金券金额'},{pattern:/^[^[+]{0,1}(\d+)$/,message: '请输入正整数'}],
              })(
                <div><span>满　</span><Input style={{width:'50%'}} />　元可用</div>
              )}
            </FormItem>
            <FormItem
              label='代金券数'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
            {getFieldDecorator('couponCount', {
              rules: [{required: true, message: '请输入代金券金额'},{pattern:/^10000$|^(\d|[1-9]\d)$/,message: '0-10000之间的正整数'}],
            })(
              <div><Input placeholder='请输入小于10000的正整数' style={{width:'80%'}}/>　张</div>
            )}
            </FormItem>
            <FormItem
              label='代金券备注'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
            {getFieldDecorator('couponRemark', {
            })(
                <TextArea placeholder='请输入300字以下代金券备注' maxLength='300' rows={6} />
            )}
            </FormItem>
          	<FormItem wrapperCol={{ offset: 3}}>
            		<Button style={{marginRight:'100px'}}>取消</Button>
            		<Button type="primary" onClick={this.handleSubmit}>保存</Button>
          	</FormItem>
        	</Form>
        	)
      </div>
    )
  }
}
const AddcBanner = Form.create()(AddCoupon);


export default AddcBanner;
