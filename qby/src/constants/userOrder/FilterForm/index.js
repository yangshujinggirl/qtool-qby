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
import './index.less'
const FormItem = Form.Item;
const Option =  Select.Option;
const RangePicker = DatePicker.RangePicker
const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const colspans = {
  xxs: 24,
  xs: 12,
  l: 6,
  xl: 6
};

class NormalForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const{rangePicker,..._values} = values;
      if(rangePicker){
        _values.startTime =  new Date( rangePicker[0]).getTime();
        _values.endTime = new Date(rangePicker[1]).getTime();
      }
      this.props.submit && this.props.submit(_values);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <Row wrap>
            <Col span={6}>
              <FormItem label='门店名称' {...formItemLayout}>
                 {getFieldDecorator('spShopName')(
                   <Input placeholder="请输入门店名称" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='订单号' {...formItemLayout}>
                 {getFieldDecorator('orderNo')(
                   <Input placeholder="亲输入订单号" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='商品名称' {...formItemLayout}>
                 {getFieldDecorator('pdSpuName')(
                   <Input placeholder="请输入商品名称" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='商品编码' {...formItemLayout}>
                 {getFieldDecorator('code')(
                   <Input placeholder="请输入商品编码" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='用户电话' {...formItemLayout}>
                 {getFieldDecorator('mobile')(
                   <Input placeholder="亲输入用户电话" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='流程状态' {...formItemLayout}>
                 {getFieldDecorator('orderStatus')(
                   <Select allowClear={true} placeholder="请选择">
                       <Option value='1'>待推送</Option>
                       <Option value='2'>已推送</Option>
                       <Option value='3'>已撤销</Option>
                   </Select>
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='订单时间' {...formItemLayout}>
                 {getFieldDecorator('rangePicker')(
                   <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                 )}
               </FormItem>
            </Col>
          </Row>
          <FormItem className='submit'>
             <Button type="primary" htmlType="submit" size='large' onClick={this.handleSubmit.bind(this)}>搜索</Button>
           </FormItem>
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
