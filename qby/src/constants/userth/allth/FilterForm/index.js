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
import { ProcesasStatusOption } from '../../../../components/FixedDataSource.js'
import './index.less'


const FormItem = Form.Item;
const Option =  Select.Option;
const RangePicker = DatePicker.RangePicker

class NormalForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { rangePicker, ..._values } = values;
      if(rangePicker&&rangePicker[0]){
        _values.dateTimeST =  moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
        _values.dateTimeET =  moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
      }
      this.props.submit && this.props.submit(_values);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='退款单号'>
                 {getFieldDecorator('spShopName')(
                   <Input placeholder="请输入退款单号" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='用户订单'>
                 {getFieldDecorator('orderNo')(
                   <Input placeholder="请输入用户订单" autoComplete="off"/>
                 )}
               </FormItem>
               <FormItem label='退款类型'>
                  {getFieldDecorator('orderStatus')(
                    <Select allowClear={true} placeholder="请选择退款类型">
                        <Option value={1}>售中退款</Option>
                        <Option value={2}>售后退款</Option>
                    </Select>
                  )}
                </FormItem>
              <FormItem label='退款方式'>
                 {getFieldDecorator('code')(
                   <Input placeholder="请输入退款方式" autoComplete="off"/>
                 )}
               </FormItem>
               <FormItem label='退款状态'>
                  {getFieldDecorator('orderStatus')(
                    <Select allowClear={true} placeholder="请选择流程状态">
                      <Option value={1}>待审核</Option>
                      <Option value={2}>待收货</Option>
                      <Option value={3}>处理中</Option>
                      <Option value={4}>已退款</Option>
                      <Option value={5}>已取消</Option>
                      <Option value={6}>已拒绝</Option>
                    </Select>
                  )}
                </FormItem>
              <FormItem label='用户电话'>
                 {getFieldDecorator('mobilePhone')(
                   <Input placeholder="请输入用户电话" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='创建时间'>
                 {getFieldDecorator('rangePicker',{
                 })(
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
