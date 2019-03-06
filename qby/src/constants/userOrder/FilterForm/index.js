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
import {getStatusListApi} from '../../../services/orderCenter/userOrders'
import {removeSpace} from '../../../utils/meth';
import { ProcesasStatusOption, DeliveryOption, PlatformOption } from '../../../components/FixedDataSource.js'
import './index.less'


const FormItem = Form.Item;
const Option =  Select.Option;
const RangePicker = DatePicker.RangePicker

class NormalForm extends Component {
  constructor(props){
    super(props)
    this.state={
      flowStatus:[],
      typeValue:'',
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const{rangePicker,..._values} = values;
      if(rangePicker&&rangePicker[0]){
        _values.dateTimeST =  moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
        _values.dateTimeET = moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
      }
      removeSpace(_values);
      this.props.submit && this.props.submit(_values);
    });
  }
  onSelect=(value)=>{
    this.setState({typeValue:value});
    this.props.form.resetFields('orderStatus');
    getStatusListApi({orderType:value})
    .then(res=>{
      if(res.code == 0){
        this.setState({
          flowStatus:res.orderStatusList
        });
      };
    })
    //根据订单类型查询订单状态接口
    const flowStatus = [];
    this.setState({
      flowStatus
    })
  }
  onChange =(value)=> {
    console.log(value)
    this.setState({typeValue:value});
  }
  render() {
    const defaultTime = [moment(timeForMats(30).t2), moment(timeForMats(30).t1)]
    const {flowStatus,typeValue} = this.state
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
                  {getFieldDecorator('qbOrderStatus')(
                    <Select allowClear={true} placeholder="请选择订单状态">
                      {
                        ProcesasStatusOption.map((el) => (
                          <Option value={el.key} key={el.key}>{el.value}</Option>
                        ))
                      }
                    </Select>
                  )}
                </FormItem>
                <FormItem label='订单类型'>
                   {getFieldDecorator('orderType',{
                   })(
                     <Select
                       allowClear={true}
                       placeholder="请选择订单类型"
                       onSelect={this.onSelect}
                       onChange={this.onChange}
                       >
                         <Option value={1} key={1}>门店自提</Option>
                         <Option value={2} key={2}>同城配送</Option>
                         <Option value={3} key={3}>快递邮寄</Option>
                         <Option value={4} key={4}>仓库直邮</Option>
                         <Option value={5} key={5}>保税直邮</Option>
                     </Select>
                   )}
                 </FormItem>
                 <FormItem label='流程状态'>
                    {getFieldDecorator('orderStatus')(
                      <Select disabled={!typeValue} allowClear={true} placeholder="请选择流程状态">
                        {
                          flowStatus.map((el) => (
                            <Option value={el.orderStatus} key={el.orderStatus}>{el.orderStatusStr}</Option>
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
                 <FormItem label='支付方式'>
                    {getFieldDecorator('payType')(
                      <Select allowClear={true} placeholder="请选择支付方式">
                            <Option value={31} key={31}>支付宝</Option>
                            <Option value={41} key={41}>微信</Option>
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
