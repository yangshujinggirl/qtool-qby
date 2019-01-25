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
import {timeForMats} from '../../../../../utils/meth';
import { DeliveryOption } from '../../../../../components/FixedDataSource';
import {removeSpace} from '../../../../../utils/meth';
const FormItem = Form.Item;
const Option =  Select.Option;
const { RangePicker } = DatePicker;

class NormalForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        const{rangePicker,..._values} = values;
        if(rangePicker&&rangePicker[0]){
          _values.dateTimeST =  moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
          _values.dateTimeET = moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
        }
        removeSpace(_values)
        this.props.submit && this.props.submit(_values)
    });
  }
  render() {
    const defaultTime = [moment(timeForMats(30).t2), moment(timeForMats(30).t1)]
    const { getFieldDecorator } = this.props.form;
    const { categoryList } =this.props;
    return(
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='门店名称'>
                 {getFieldDecorator('spShopName')(
                   <Input placeholder="请输入门店名称" autoComplete="off"/>
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
               <FormItem label='订单状态'>
                  {getFieldDecorator('incomeStatus')(
                    <Select allowClear={true} placeholder="请选择订单状态">
                          <Option value={1} key={1}>已完成</Option>
                          <Option value={2} key={2}>已取消</Option>
                          <Option value={3} key={3}>已退款</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label='费用类型'>
                   {getFieldDecorator('costType')(
                     <Select allowClear={true} placeholder="请选择费用类型">
                       <Option value={1} key={1}>销售收款</Option>
                       <Option value={2} key={2}>销售退款</Option>
                     </Select>
                   )}
                 </FormItem>
              <FormItem label='时间选择'>
                 {getFieldDecorator('rangePicker',{
                   initialValue:defaultTime
                 })(
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
const FilterForm = Form.create({})(NormalForm);

export default FilterForm;
