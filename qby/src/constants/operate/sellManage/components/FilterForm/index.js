import React, { Component } from 'react';
import moment from 'moment';
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
import { DeliveryOption } from '../../../../../components/FixedDataSource';

const FormItem = Form.Item;
const Option =  Select.Option;
const { RangePicker } = DatePicker;

class NormalForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        const {time,...params} =values;
        if(time&&time.length>0) {
          params.dateTimeST = moment(time[0]).format('YYYY-MM-DD');
          params.dateTimeET = moment(time[1]).format('YYYY-MM-DD');
        }
        this.props.submit && this.props.submit(params)
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryList } =this.props;
    return(
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='商品名称'>
                 {getFieldDecorator('spShopName')(
                   <Input placeholder="请输入商品名称" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='配送方式'>
                 {getFieldDecorator('deliveryType')(
                   <Select allowClear={true} placeholder="请选择是否完整">
                     {
                       DeliveryOption.map((el,index)=>(
                         <Option value={el.key} key={el.key}>{el.value}</Option>
                       ))
                     }
                   </Select>
                 )}
               </FormItem>
              <FormItem label='时间选择'>
                 {getFieldDecorator('time')(
                   <RangePicker
                     showTime
                     format="YYYY-MM-DD HH:mm:ss"/>
                 )}
               </FormItem>
             </div>
          </div>
          <div className="search-submit-btn">
             <Button
               type="primary"
               htmlType="submit"
               size='large'
               onClick={this.handleSubmit.bind(this)}>搜索</Button>
          </div>
        </Form>
    )
  }
}
const FilterForm = Form.create({
  onValuesChange:(props, changedValues, allValues) => {
    props.onValuesChange(allValues);
  }
})(NormalForm);

export default FilterForm;
