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
    labelCol: { span:8   },
    wrapperCol: { span: 16 },
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
        _values.createTimeST =  new Date( rangePicker[0]).getTime();
        _values.createTimeET = new Date(rangePicker[1]).getTime();
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
              <Col span={8}>
                  <FormItem {...formItemLayout} label='优惠券名称'>
                    {getFieldDecorator('feedbackNo')(
                        <Input placeholder='请输入优惠券名称'/>
                      )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='优惠券批次号'>
                    {getFieldDecorator('telephone')(
                      <Input placeholder='请输入批次号'/>
                    )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='创建人'>
                    {getFieldDecorator('telephone')(
                      <Input placeholder='请输入创建人'/>
                    )}
                  </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label='优惠券场景'>
                    {getFieldDecorator('status')(
                    <Select allowClear={true} placeholder="请选择优惠券场景" className='select'>
                        {/* <Option value='10'>待发货</Option> */}
                        <Option value='1'>新用户注册</Option>
                        <Option value='2'>注券</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label='优惠券状态'>
                    {getFieldDecorator('status')(
                    <Select allowClear={true} placeholder="请选择优惠券状态" className='select'>
                        {/* <Option value='10'>待发货</Option> */}
                        <Option value='1'>发放中</Option>
                        <Option value='2'>发放完</Option>
                        <Option value='3'>熔断</Option>
                    </Select>
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
  const { coupon } = state;
  return {coupon}
}
export default connect(mapStateToProps)(FilterForm)
