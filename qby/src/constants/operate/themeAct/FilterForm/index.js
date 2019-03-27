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
import {removeSpace} from '../../../../utils/meth';
import '../index.css'
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker

class NormalForm extends Component{
  //点击搜索
  handleSubmit = (e) => {
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      removeSpace(values);
      this.props.submit && this.props.submit(values);
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
              <FormItem label='优惠券名称'>
                {getFieldDecorator('couponName')(
                    <Input placeholder='请输入优惠券名称' autoComplete="off"/>
                  )}
              </FormItem>
              <FormItem label='优惠券批次号'>
                {getFieldDecorator('couponCode')(
                  <Input placeholder='请输入批次号' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem label='创建人'>
                {getFieldDecorator('creater')(
                  <Input placeholder='请输入创建人' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem label='发放方式'>
                  {getFieldDecorator('couponUseScene')(
                  <Select allowClear={true} placeholder="请选择发放方式">
                      {/* <Option value='10'>待发货</Option> */}
                      <Option value='1'>注册领取</Option>
                      <Option value='3'>手动领取</Option>
                      <Option value='2'>注券</Option>
                  </Select>
                  )}
              </FormItem>
              <FormItem label='优惠券状态'>
                  {getFieldDecorator('status')(
                  <Select allowClear={true} placeholder="请选择优惠券状态">
                      {/* <Option value='10'>待发货</Option> */}
                      <Option value='1'>发放中</Option>
                      <Option value='2'>发放完</Option>
                      <Option value='3'>熔断</Option>
                  </Select>
                  )}
              </FormItem>
            </div>
          </div>
          <div className="search-submit-btn">
              <Button
                htmlType="submit"
                type="primary"
                size='large'
                onClick={()=>this.handleSubmit()}>
                  搜索
              </Button>
          </div>
        </Form>
      </div>
    )
  }
}

const FilterForm = Form.create({})(NormalForm)
function mapStateToProps(state){
  const { coupon } = state;
  return {coupon}
}
export default connect(mapStateToProps)(FilterForm)
