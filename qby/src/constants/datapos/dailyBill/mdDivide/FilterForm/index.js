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
import {getCurrentTime} from '../../../../../utils/meth';
import {removeSpace} from '../../../../../utils/meth';
import './index.less'


const FormItem = Form.Item;
const Option =  Select.Option;
const RangePicker = DatePicker.RangePicker

class NormalForm extends Component {
  constructor(props){
    super(props)
    this.state={
      flowStatus:[]
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const {rangePicker,..._values} = values;
      if(rangePicker&&rangePicker[0]){
        _values.createtimeST = moment(rangePicker[0]).format('YYYY-MM-DD');
        _values.createtimeET = moment(rangePicker[1]).format('YYYY-MM-DD');
      };
      removeSpace(_values)
      this.props.submit && this.props.submit(_values);
    });
  }

  render() {
    const defaultTime = [moment(getCurrentTime()), moment(getCurrentTime())]
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
                <FormItem label='订单完成时间'>
                   {getFieldDecorator('rangePicker',
                     {initialValue:defaultTime}
                   )(
                     <RangePicker format="YYYY-MM-DD"/>
                   )}
                </FormItem>
                <FormItem label='业务类型'>
                    {getFieldDecorator('orderType')(
                    <Select allowClear={true} placeholder="请选择业务类型">
                        <Option value={4}>仓库直邮订单</Option>
                        <Option value={5}>保税订单</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem label='订单分类'>
                    {getFieldDecorator('shareType')(
                    <Select allowClear={true} placeholder="请选择订单分类">
                        <Option value={1}>销售订单</Option>
                        <Option value={2}>退货订单</Option>
                    </Select>
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
