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
import {timeForMat} from '../../../../../utils/meth';
import {removeSpace} from '../../../../../utils/meth';
import moment from 'moment';
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
        _values.createTimeST = moment(rangePicker[0]).format('YYYY-MM-DD');
        _values.createTimeET = moment(rangePicker[1]).format('YYYY-MM-DD');
      }
      removeSpace(_values);
      this.props.submit && this.props.submit(_values);
    });
  }

  render() {
    const defaultTime = [moment(timeForMat(30).t2), moment(timeForMat(30).t1)]
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
                <FormItem label='退货时间'>
                   {getFieldDecorator('rangePicker',{
                     initialValue:defaultTime
                   })(
                     <RangePicker format="YYYY-MM-DD"/>
                   )}
                </FormItem>
                <FormItem label='订单状态'>
                    {getFieldDecorator('returnType')(
                    <Select allowClear={true} placeholder="请选择订单状态">
                        <Option value={1}>退货中</Option>
                        <Option value={2}>已退货</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem label='订单号'>
                    {getFieldDecorator('asnNo')(
                      <Input placeholder='请输入订单号'/>
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
