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
import {timeForMats} from '../../../../utils/meth';


const FormItem = Form.Item;
const Option =  Select.Option;
const RangePicker = DatePicker.RangePicker

class NormalForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const{rangePicker,..._values} = values;
      if(rangePicker&&rangePicker[0]){
        _values.createTimeST =  moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
        _values.createTimeET = moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
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
              <FormItem label='用户id'>
                 {getFieldDecorator('userId')(
                   <Input placeholder="请输入用户id" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='Qtools昵称'>
                 {getFieldDecorator('name')(
                   <Input placeholder="请输入Qtools昵称" autoComplete="off"/>
                 )}
               </FormItem>
               <FormItem label='微信昵称'>
                  {getFieldDecorator('unionId')(
                    <Input placeholder="请输入微信昵称" autoComplete="off"/>
                  )}
                </FormItem>
              <FormItem label='手机号'>
                 {getFieldDecorator('mobile')(
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

const FilterForm = Form.create({
  onValuesChange:(props, changedValues, allValues) => {
    props.onValuesChange(allValues);
  }
})(NormalForm);

export default FilterForm;
