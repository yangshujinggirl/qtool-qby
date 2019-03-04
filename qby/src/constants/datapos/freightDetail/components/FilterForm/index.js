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
      if(values.time.length>0) {
        values.startDate = moment(values.time[0]).format('YYYY-MM-DD');
        values.endDate = moment(values.time[1]).format('YYYY-MM-DD');
      }
        this.props.submit && this.props.submit(values)

    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { startDate, endDate } =this.props;
    return(
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='订单时间'>
                 {getFieldDecorator('time',{
                   initialValue:[moment(startDate, 'YYYY-MM-DD'), moment(endDate, 'YYYY-MM-DD')],
                 })(
                   <RangePicker allowClear={false}/>
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
const FilterForm = Form.create({})(NormalForm);

export default FilterForm;
