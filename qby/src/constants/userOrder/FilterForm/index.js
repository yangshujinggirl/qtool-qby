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
import {timeForMats} from '../../../utils/meth';
import { ProcesasStatusOption } from '../../../components/FixedDataSource.js'
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
    const defaultTime = [moment(timeForMats(30).t2), moment(timeForMats(30).t1)]
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
                 {getFieldDecorator('deliveryType')(
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
                 {getFieldDecorator('rangePicker',
                   {initialValue:defaultTime}
                 )(
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
