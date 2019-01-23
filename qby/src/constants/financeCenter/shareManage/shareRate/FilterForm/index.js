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
import { timeForMats } from '../../../../../utils/meth'
import moment from 'moment';
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
        _values.createST =  moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
        _values.createET =  moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
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
              <FormItem label='门店名称'>
                 {getFieldDecorator('shopName')(
                   <Input placeholder="请输入门店名称" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='订单号'>
                 {getFieldDecorator('orderNo')(
                   <Input placeholder="请输入订单号" autoComplete="off"/>
                 )}
               </FormItem>
               <FormItem label='费用类型'>
                  {getFieldDecorator('shareType')(
                    <Select allowClear={true} placeholder="请选择费用类型">
                      <Option value={1}>分润收款</Option>
                      <Option value={2}>分润退款</Option>
                    </Select>
                  )}
                </FormItem>
              <FormItem label='时间选择'>
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
