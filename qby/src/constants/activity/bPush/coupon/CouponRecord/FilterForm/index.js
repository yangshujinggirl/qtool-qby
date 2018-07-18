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
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker
const formItemLayout = {
    labelCol: { span:9 },
    wrapperCol: { span: 14 },
};
const timerLayout = {
    labelCol: { span:6 },
    wrapperCol: { span: 20 },
};

class NormalForm extends Component{
  //点击搜索
  handleSubmit = (e) => {
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const{rangePicker,..._values} = values;
      if(rangePicker){
        _values.voucherStartDate =  new Date( rangePicker[0]).getTime();
        _values.voucherEndDate = new Date(rangePicker[1]).getTime();
      }
      this.props.submit && this.props.submit(_values);
    })
  }
  //初始化
  render(){
    const { getFieldDecorator }= this.props.form;
    return(
      <div className='form'>
        <Form>
          <Row wrap>
              <Col span={6}>
                  <FormItem {...formItemLayout} label='优惠券批次号'>
                    {getFieldDecorator('couponCode')(
                        <Input placeholder='反馈编号'/>
                      )}
                  </FormItem>
              </Col>
              <Col span={6}>
                  <FormItem {...formItemLayout} label='用户手机'>
                    {getFieldDecorator('userMobiles')(
                      <Input placeholder='请输入联系人'/>
                    )}
                  </FormItem>
              </Col>
              <Col span={6}>
                  <FormItem {...formItemLayout} label='注券人'>
                    {getFieldDecorator('voucher')(
                      <Input placeholder='请输入联系人'/>
                    )}
                  </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} label='优惠券场景'>
                    {getFieldDecorator('couponUseScene')(
                    <Select allowClear={true} placeholder="请选择订单状态" className='select'>
                        {/* <Option value='10'>待发货</Option> */}
                        <Option value='1'>新用户注册</Option>
                        <Option value='2'>注券</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} label='注券状态'>
                    {getFieldDecorator('status')(
                    <Select allowClear={true} placeholder="处理时长" className='select'>
                        {/* <Option value='10'>待发货</Option> */}
                        <Option value='1'>发放中</Option>
                        <Option value='2'>发放完</Option>
                        <Option value='3'>熔断</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                    {...formItemLayout }
                    label="注券时间"
                >
                  {getFieldDecorator('rangePicker')(
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <FormItem>
                <Button
                  className='submit'
                  type="primary"
                  onClick={()=>this.handleSubmit()}>
                    搜索
                </Button>
            </FormItem>
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
  const { userFeedBack } = state;
  return {userFeedBack}
}
export default connect(mapStateToProps)(FilterForm)
