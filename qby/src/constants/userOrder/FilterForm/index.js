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
import { ProcesasStatusOption, DeliveryOption, PlatformOption } from '../../../components/FixedDataSource.js'
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
              <FormItem label='门店名称'>
                 {getFieldDecorator('spShopName')(
                   <Input placeholder="请输入门店名称" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='订单号'>
                 {getFieldDecorator('orderNo')(
                   <Input placeholder="请输入订单号" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='商品名称'>
                 {getFieldDecorator('pdSpuName')(
                   <Input placeholder="请输入商品名称" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='商品编码'>
                 {getFieldDecorator('code')(
                   <Input placeholder="请输入商品编码" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='用户电话'>
                 {getFieldDecorator('mobilePhone')(
                   <Input placeholder="请输入用户电话" autoComplete="off"/>
                 )}
               </FormItem>
               <FormItem label='订单状态'>
                  {getFieldDecorator('orderStatus')(
                    <Select allowClear={true} placeholder="请选择订单状态">
                      {
                        ProcesasStatusOption.map((el) => (
                          <Option value={el.key} key={el.key}>{el.value}</Option>
                        ))
                      }
                    </Select>
                  )}
                </FormItem>
              <FormItem label='下单平台'>
                 {getFieldDecorator('platform')(
                   <Select allowClear={true} placeholder="请选择下单平台">
                     {
                       PlatformOption.map((el) => (
                         <Option value={el.key} key={el.key}>{el.value}</Option>
                       ))
                     }
                   </Select>
                 )}
               </FormItem>
              <FormItem label='配送方式'>
                 {getFieldDecorator('delivery')(
                   <Select allowClear={true} placeholder="请选择配送方式">
                     {
                       DeliveryOption.map((el) => (
                         <Option value={el.key} key={el.key}>{el.value}</Option>
                       ))
                     }
                   </Select>
                 )}
               </FormItem>
              <FormItem label='订单时间'>
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
