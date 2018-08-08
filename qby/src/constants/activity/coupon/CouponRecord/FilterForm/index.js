import React, { Component } from 'react'
import {connect} from 'dva'
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  DatePicker
}from 'antd'
import '../index.css'
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker

class NormalForm extends Component{
  //点击搜索
  handleSubmit = (e) => {
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const{rangePicker,..._values} = values;
      if(rangePicker&&rangePicker[0]){
        _values.voucherTimeStart =  moment(new Date(rangePicker[0]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');;
        _values.voucherTimeEnd = moment(new Date(rangePicker[1]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');
      }
      this.props.submit && this.props.submit(_values);
    })
  }
  //初始化
  render(){
    const { getFieldDecorator }= this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
              <div className="search-form-wrap">
                <FormItem label='优惠券批次号'>
                  {getFieldDecorator('couponCode')(
                      <Input placeholder='反馈编号' autoComplete="off"/>
                    )}
                </FormItem>
                <FormItem label='用户手机'>
                  {getFieldDecorator('userMobile')(
                    <Input placeholder='请输入联系人' autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem label='注券人'>
                  {getFieldDecorator('voucher')(
                    <Input placeholder='请输入联系人' autoComplete="off"/>
                  )}
                </FormItem>
              <FormItem label='优惠券场景'>
                  {getFieldDecorator('couponUseScene')(
                  <Select allowClear={true} placeholder="请选择订单状态" className='select'>
                      <Option value='1'>新用户注册</Option>
                      <Option value='2'>注券</Option>
                  </Select>
                  )}
              </FormItem>
              <FormItem  label='注券状态'>
                  {getFieldDecorator('voucherStatus')(
                  <Select allowClear={true} placeholder="注券状态" className='select'>
                      <Option value={0}>成功</Option>
                      <Option value={1}>失败</Option>
                  </Select>
                  )}
              </FormItem>
              <FormItem
                  label="注券时间"
              >
                {getFieldDecorator('rangePicker')(
                  <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                )}
              </FormItem>
            </div>
          </div>
          <div className="search-submit-btn">
              <Button
                type="primary"
                onClick={()=>this.handleSubmit()}>
                  搜索
              </Button>
          </div>
        </Form>
      </div>
    )
  }
}
const FilterForm = Form.create({
  onValuesChange:(props, changedValues, allValues) => {
    props.onValuesChange(allValues);
  }
})(NormalForm)
function mapStateToProps(state){
  const { coupon } = state;
  return {coupon}
}
export default connect(mapStateToProps)(FilterForm)
