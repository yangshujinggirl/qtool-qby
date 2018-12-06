import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Select ,
  DatePicker
} from 'antd';
import moment from 'moment';
import './index.less'


const FormItem = Form.Item;
const Option =  Select.Option;
const RangePicker = DatePicker.RangePicker

class NormalForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      this.props.submit && this.props.submit(values);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='用户id'>
                 {getFieldDecorator('spShopName')(
                   <Input placeholder="请输入用户id" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='昵称'>
                 {getFieldDecorator('orderNo')(
                   <Input placeholder="请输入昵称" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='手机号'>
                 {getFieldDecorator('pdSpuName')(
                   <Input placeholder="请输入手机号" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='注册平台'>
                 {getFieldDecorator('platform')(
                   <Select allowClear={true} placeholder="请选择注册平台">
                         <Option value={1}>Qtools</Option>
                         <Option value={2}>小程序</Option>
                   </Select>
                 )}
               </FormItem>
              <FormItem label='注册时间'>
                 {getFieldDecorator('rangePicker')(
                   <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                 )}
              </FormItem>
             </div>
           </div>
           <div className="search-submit-btn">
             <Button type="primary" htmlType="submit" size='large' onClick={this.handleSubmit.bind(this)}>搜索</Button>
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
})(NormalForm);

export default FilterForm;
