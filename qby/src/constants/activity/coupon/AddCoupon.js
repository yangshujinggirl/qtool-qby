import React,{ Component } from 'react';
import { Form, Select, Input, Button , message, Row, Col,DatePicker,Radio,Checkbox } from 'antd';
import { connect } from 'dva'
import { addCouponApi } from '../../../services/activity/coupon'
import './index.css'
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
class AddCoupon extends Component {
  constructor(props){
    super(props);
    this.state={
      couponValidDay:true,
      couponValidDate:false,
    }
    this.options = [
      { label: '普通商品(不包含品牌直供)', value: '1' },
      { label: '保税仓商品', value: '2' },
      { label: '品牌直供商品', value: '3' },
    ];
  }


  //保存
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      if(!err){
        addCouponApi(values)
        .then(res => {
          if(res.code=='0'){
            this.props.dispatch({
    					type:'coupon/fetchList',
    					payload:{}
    				})
            this.props.dispatch({
    						type:'tab/initDeletestate',
    						payload:this.props.componkey
    				});
            message.success(res.message,.8);
          }
        },err=>{
          message.error('请求失败')
        })
      }
    });
  }
  //单选框选择
  choice =(e)=> {
    const value = e.target.value;
    if(value==1){
      this.setState({couponValidDay:true,couponValidDate:false})
    }else if(value==2){
      this.setState({couponValidDay:false,couponValidDate:true})
    };
    this.props.form.resetFields(['couponValidDay','couponValidDate']);
  }
  //取消
  cancel =()=> {
    this.props.dispatch({
        type:'tab/initDeletestate',
        payload:this.props.componkey
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { cBanner } = this.props;
    return(
      <div className='addCoupon'>
        	<Form className="addUser-form operatebanner-form">
            <FormItem
              label="优惠券名称"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
              {getFieldDecorator('couponName', {
                  rules: [{ required: true, message: '请输入优惠券名称'}],
                })(
                  <div>
                    <Input
                      placeholder="请输入10字以内优惠券名称"
                      style={{width:'280px'}}
                      maxLength='10'
                      autoComplete="off"
                    />　
                    <span className='tips'>该名称将在前端给用户展示，请谨慎填写</span>
                  </div>
              )}
            </FormItem>
            <FormItem
              label="优惠券场景"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
            {getFieldDecorator('couponUseScene', {
              rules: [{ required: true, message: '请选择优惠券场景' }],
            })(
              <Select placeholder="请选择优惠券场景" style={{width:'280px'}}>
                  <Option value="1">新用户专享券</Option>
                  <Option value="2">注券</Option>
              </Select>
            )}
            </FormItem>
            <Row>
              <Col className='radio'>
                <FormItem
                  label="券有效期"
                  labelCol={{ span: 3,offset: 1 }}
                  wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('couponValid',{
                      rules: [{ required: true, message: '请选择券有效期' }],

                  })(
                    <RadioGroup onChange = {this.choice}>
                        <Radio value={1}>用户领取时间起</Radio>
                        <Radio value={2}>特定时间到</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col className='limitDay'>
                <FormItem>
                  {getFieldDecorator('couponValidDay',{
                    rules: [{ required:this.state.couponValidDay, message: '请填写用户领取时间' }],
                  })(
                    <div>
                      <Input style={{width:'140px'}} disabled = {!this.state.couponValidDay} />　天
                      <span className='tips'>0代表领取当天</span>
                    </div>
                  )}

                </FormItem>
                <FormItem>

                   {getFieldDecorator('couponValidDate',{
                       rules: [{ required:this.state.couponValidDate , message: '请填写特定时间' }],
                    })(
                        <DatePicker
                          style={{width:'140px'}}
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          disabled = {!this.state.couponValidDate} />
                   )}
                   　止 <span className='tips'>当天24:00:00截止</span>
                </FormItem>
              </Col>
            </Row>
            <FormItem
              label="优惠券金额"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
            {getFieldDecorator('couponMoney', {
              rules: [
                {required: true, message: '请输入优惠券金额'},
                {pattern:/^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/,
                message: '请输入最多2位小数正数'}
              ],
            })(
              <div><Input style={{width:'255px'}} placeholder = '请输入优惠券金额'/>　元</div>
            )}
            </FormItem>
            <FormItem
              label='使用门槛'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
              {getFieldDecorator('couponFullAmount', {
                rules: [{required: true, message: '请输入优惠券金额'},{pattern:/^[^[+]{0,1}(\d+)$/,message: '请输入正整数'}],
              })(
                <div><span>满　</span><Input style={{width:'205px'}} />　元可用</div>
              )}
            </FormItem>
            <FormItem
              label='优惠券数'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
            {getFieldDecorator('couponCount', {
              rules: [{required: true, message: '请输入优惠券'},{pattern:/^(?:[0-9]{0,4}|10000)$/,message: '0-10000之间的正整数'}],
            })(
              <div><Input placeholder='请输入0-10000的正整数' style={{width:'255px'}}/>　张</div>
            )}
            </FormItem>
            <FormItem
              label='使用商品范围'
              labelCol={{span:3,offset:1}}
              wrapperCol={{span:14}}>
              {
                getFieldDecorator('couponUseScope',{
                })(
                  <CheckboxGroup options={this.options}/>
                )
              }
            </FormItem>
            <FormItem
              label='优惠券说明'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
            {getFieldDecorator('couponExplain', {
            })(
                <TextArea style={{width:'255px'}} placeholder='请输入优惠券说明，50字以内' maxLength='50' rows={6} />
            )}
          </FormItem>
            <FormItem
              label='优惠券备注'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
            {getFieldDecorator('couponRemark', {
            })(
                <TextArea style={{width:'255px'}} placeholder='请输入300字以下优惠券备注' maxLength='300' rows={6} />
            )}
            </FormItem>
          	<FormItem style={{marginLeft:'140px'}}>
            		<Button style={{marginRight:'100px'}} onClick={this.cancel}>取消</Button>
            		<Button type="primary" onClick={this.handleSubmit}>保存</Button>
          	</FormItem>
        	</Form>
      </div>
    )
  }
}
const AddCoupons = Form.create()(AddCoupon);
function mapStateToProps(state){
  const { coupon } = state;
  return coupon
}
export default connect(mapStateToProps)(AddCoupons);
