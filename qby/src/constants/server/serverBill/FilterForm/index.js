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
      <div>
        <Form className="qtools-condition-form">
          <div className="search-form-wrap">
            <FormItem  label='客服单号'>
              {getFieldDecorator('customServiceNo')(
                  <Input placeholder='客服单号' autoComplete="off"/>
                )}
            </FormItem>
            <FormItem  label='客服主题'>
              {getFieldDecorator('customServiceTheme')(
                <Input placeholder='请输入客服主题' autoComplete="off"/>
              )}
            </FormItem>
            <FormItem  label='客服人员'>
              {getFieldDecorator('waiter')(
                <Input placeholder='请输入客服人员' autoComplete="off"/>
              )}
            </FormItem>
            <FormItem  label='客服状态'>
                {getFieldDecorator('status')(
                <Select allowClear={true} placeholder="请选择订单状态" className='select'>
                    {/* <Option value='10'>待发货</Option> */}
                    <Option value='1'>待处理</Option>
                    <Option value='2'>处理中</Option>
                    <Option value='3'>已处理</Option>
                </Select>
                )}
            </FormItem>
            <FormItem  label='处理时长'>
                {getFieldDecorator('handleTime')(
                <Select allowClear={true} placeholder="处理时长" className='select'>
                    {/* <Option value='10'>待发货</Option> */}
                    <Option value='1'>0-5h</Option>
                    <Option value='2'>5-24h</Option>
                    <Option value='3'>24h以上</Option>
                </Select>
                )}
            </FormItem>
            <FormItem
                label="开始时间"
            >
              {getFieldDecorator('rangePicker')(
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
              )}
            </FormItem>
            <div className="search-submit-btn">
                <Button
                  type="primary"
                  size='large'
                  onClick={()=>this.handleSubmit()}>
                    搜索
                </Button>
            </div>
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
  const { serverBill } = state;
  return { serverBill }
}
export default connect(mapStateToProps)(FilterForm)
