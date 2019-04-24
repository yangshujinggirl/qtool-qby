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
import {timeForMats} from '../../../../utils/meth';
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
        _values.startDate =  moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
        _values.endDate =  moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
      }
      this.props.submit && this.props.submit(_values);
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
              <FormItem label='退款单号'>
                 {getFieldDecorator('orderReturnNo')(
                   <Input placeholder="请输入退款单号" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='用户订单'>
                 {getFieldDecorator('orderNo')(
                   <Input placeholder="请输入用户订单" autoComplete="off"/>
                 )}
               </FormItem>
               <FormItem label='退款类型'>
                  {getFieldDecorator('returnType')(
                    <Select allowClear={true} placeholder="请选择退款类型">
                        <Option value={0}>售中退款</Option>
                        <Option value={1}>售后退款</Option>
                    </Select>
                  )}
                </FormItem>
              <FormItem label='退款方式'>
                 {getFieldDecorator('returnWay')(
                   <Select allowClear={true} placeholder="请选择流程状态">
                     <Option value={0}>仅退款</Option>
                     <Option value={1}>退货退款</Option>
                   </Select>
                 )}
               </FormItem>
               <FormItem label='退款状态'>
                  {getFieldDecorator('returnStatus')(
                    <Select allowClear={true} placeholder="请选择流程状态">
                      <Option value={10}>待审核</Option>
                      <Option value={50}>待收货</Option>
                      <Option value={60}>处理中</Option>
                      <Option value={70}>已退款</Option>
                      <Option value={40}>已取消</Option>
                      <Option value={30}>已拒绝</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label='退款渠道'>
                   {getFieldDecorator('returnStatus')(
                     <Select allowClear={true} placeholder="请选择退款渠道">
                       <Option value={10}>微信</Option>
                       <Option value={50}>支付宝</Option>
                       <Option value={60}>线下POS</Option>
                       <Option value={70}>无</Option>
                     </Select>
                   )}
                 </FormItem>
              <FormItem label='用户电话'>
                 {getFieldDecorator('userMoblie')(
                   <Input placeholder="请输入用户电话" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='创建时间'>
                 {getFieldDecorator('rangePicker',{
                   initialValue:defaultTime
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

const FilterForm = Form.create({})(NormalForm);

export default FilterForm;
