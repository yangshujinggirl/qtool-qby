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
  DatePicker,
  AutoComplete
} from 'antd';
const FormItem = Form.Item;
const Option =  Select.Option;
const { RangePicker } = DatePicker;
const statusOptions = [{
    key:0,
    value:'开启'
  },{
    key:1,
    value:'已解决'
  },{
    key:2,
    value:'已关闭'
  },{
    key:3,
    value:'解决中'
  }]
const timeOptions = [{
    key:0,
    value:'0-5h'
  },{
    key:1,
    value:'5-24h'
  },{
    key:2,
    value:'24h以上'
  }]
const priorityOptions = [{
    key:0,
    value:'紧急'
  },{
    key:1,
    value:'高'
  },{
    key:2,
    value:'标准'
  },{
    key:3,
    value:'低'
  }]

class NormalForm extends Component {
  constructor(props) {
    super(props);
  }
  //提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const {creatertime,...params} = values;
      if(creatertime) {
        params.createTimeST = moment(creatertime[0]).format('YYYY-MM-DD');
        params.createTimeET = moment(creatertime[1]).format('YYYY-MM-DD');
      }
      this.props.submit && this.props.submit(params)
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='工单id'>
                 {getFieldDecorator('udeskTicketId')(
                   <Input placeholder="请输入工单id" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='工单主题'>
                 {getFieldDecorator('subject')(
                   <Input placeholder="请输入工单主题" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='工单状态'>
                 {getFieldDecorator('status')(
                   <Select placeholder="请选择工单状态" allowClear={true}>
                     {
                      statusOptions.map((el) => (
                         <Select.Option
                           value={el.key}
                           key={el.key}>{el.value}</Select.Option>
                       ))
                     }
                   </Select>
                 )}
               </FormItem>
              <FormItem label='优先级'>
                 {getFieldDecorator('priority')(
                   <Select allowClear={true} placeholder="请选择优先级">
                     {
                       priorityOptions.map((el,index) => (
                         <Select.Option
                           value={el.key}
                           key={el.key}>{el.value}</Select.Option>
                       ))
                     }
                   </Select>
                 )}
               </FormItem>
               <FormItem label='受理客服'>
                  {getFieldDecorator('agentGroupname')(
                    <Input placeholder="请输入受理客服" autoComplete="off"/>
                  )}
                </FormItem>
               <FormItem label='用户电话'>
                  {getFieldDecorator('cellphone')(
                    <Input placeholder="请输入用户电话" autoComplete="off"/>
                  )}
                </FormItem>
              <FormItem label='处理时长'>
                 {getFieldDecorator('handleTimeType')(
                   <Select allowClear={true} placeholder="请选择处理时长">
                     {
                       timeOptions.map((el,index) => (
                         <Select.Option
                           value={el.key}
                           key={el.key}>{el.value}</Select.Option>
                       ))
                     }
                   </Select>
                 )}
               </FormItem>
              <FormItem label='创建时间'>
                 {getFieldDecorator('creatertime')(
                   <RangePicker  />
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
