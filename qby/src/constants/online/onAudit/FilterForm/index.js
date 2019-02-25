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
import {removeSpace} from '../../../../utils/meth';

import './index.less'
import {wshouse} from "../data.js"

const FormItem = Form.Item;
const Option =  Select.Option;
const RangePicker = DatePicker.RangePicker


class NormalForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { rangePicker, ..._values } = values;
      if(rangePicker&&rangePicker[0]){
        _values.payTimeST =  moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
        _values.payTimeET =  moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
      };
      removeSpace(_values);
      this.props.submit && this.props.submit(_values);
    });
  }


  render() {
    const defaultTime = [moment(timeForMats(30).t2), moment(timeForMats(30).t1)]
    const {pdTaxWarehouses} = this.props
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='子订单号'>
                 {getFieldDecorator('ecSuborderNo')(
                   <Input placeholder="请输入子订单号" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='平台订单号'>
                 {getFieldDecorator('outNo')(
                   <Input placeholder="请输入有赞订单号" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='商品编码'>
                 {getFieldDecorator('code')(
                   <Input placeholder="请输入商品编码" autoComplete="off"/>
                 )}
               </FormItem>
               <FormItem label='商品名称'>
                  {getFieldDecorator('name')(
                    <Input placeholder="请输入商品名称" autoComplete="off"/>
                  )}
                </FormItem>
              <FormItem label='收货电话'>
                 {getFieldDecorator('recTelephone')(
                   <Input placeholder="请输入收货电话" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='收货人'>
                 {getFieldDecorator('recName')(
                    <Input placeholder="请输入收货人" autoComplete="off"/>
                 )}
               </FormItem>
               <FormItem label='身份证号'>
                  {getFieldDecorator('idCardNo')(
                     <Input placeholder="请输入身份证号" autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem label='推送仓库'>
                  {getFieldDecorator('warehouseId')(
                  <Select allowClear={true} placeholder="请选择">
                      {
                          pdTaxWarehouses.map((item,index)=>{
                              return <Option value={item.pdTaxWarehouseId} key={index}>{item.name}</Option>
                          })
                      }
                  </Select>
                  )}
                 </FormItem>
                <FormItem label='下单时间'>
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

const FilterForm = Form.create({})(NormalForm);

export default FilterForm;
