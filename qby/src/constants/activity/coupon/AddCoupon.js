import React,{ Component } from 'react';
import { Form, Select, Input, Button , message, Row, Col,DatePicker,Radio} from 'antd';
import { connect } from 'dva'
import { addCouponApi } from '../../../services/activity/coupon'
import './index.less'
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
class AddCoupon extends Component {
  constructor(props){
    super(props);
    this.state={
      dayDisable:true,
      timeDisable:false,
      dayObject:{required:false,message: '请输入用户领取时间'},
      timeObject:{required:false,message: '请输入用户领取时间'}
    }
  }

  //保存
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      if(!err){
        addCouponApi(values)
        .then(res => {
          message.success('请求成功')
        },err=>{
          message.error('请求失败')
        })
      }
    });
  }
  //单选框选择
  choice =(e)=> {
    const value = e.target.value;
    const{dayObject,timeObject}=this.state
    const _dayObject={...dayObject}
    const _timeObject={...timeObject}
    if(value==1){
      _dayObject.required=true
      _timeObject.required=false
      this.setState({dayDisable:true,timeDisable:false,dayObject:_dayObject,timeObject:_timeObject},()=>{
        this.props.form.resetFields('couponValidDate')
      })

    }else if(value==2){
      _dayObject.required=false
      _timeObject.required=true
      this.setState({dayDisable:false,timeDisable:true,timeObject:_timeObject,dayObject:_dayObject},()=>{
        this.props.form.resetFields('couponValidDay')
      })

    }
  }
  //取消
  cancel =()=> {
    this.props.dispatch({
        type:'tab/initDeletestate',
        payload:this.props.componkey
    });
  }
  componentDidMount(){
    console.log(this.props)
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { cBanner } = this.props;
    const { dayDisable,timeDisable,dayObject,timeObject } = this.state;
    console.log('1:'+ dayDisable)
    console.log('2:'+ timeDisable)
    return(
      <div className='addCoupon'>
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
            <Row>
              <Col className='radio'>
                <FormItem
                  label="券有效期"
                  labelCol={{ span: 3,offset: 1 }}
                  wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('couponValid',{
                      rules: [{ required: true, message: '请选择券有效期' }],
                      onChange:this.choice
                  })(
                    <RadioGroup >
                        <Radio value="1">用户领取时间起</Radio>
                        <Radio value="2">特定时间到</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col className='limitDay'>
                <FormItem>
                  {getFieldDecorator('couponValidDay',{
                    rules: [dayObject],
                  })(
                    <Input disabled = {!dayDisable} />
                  )}
                </FormItem>
                <FormItem>
                   {getFieldDecorator('couponValidDate',{
                       rules:[timeObject]
                    })(
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled = {!timeDisable} />
                   )}
                </FormItem>
              </Col>
            </Row>
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
            		<Button style={{marginRight:'100px'}} onClick={this.cancel}>取消</Button>
            		<Button type="primary" onClick={this.handleSubmit}>保存</Button>
          	</FormItem>
        	</Form>
        	)
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
