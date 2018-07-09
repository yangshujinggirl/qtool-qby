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
// import './index.scss'
const FormItem = Form.Item;

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
        this.props.submit && this.props.submit(values)
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
                 {getFieldDecorator('name')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='订单号' {...formItemLayout}>
                 {getFieldDecorator('userName')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='商品名称' {...formItemLayout}>
                 {getFieldDecorator('userName')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='商品编码' {...formItemLayout}>
                 {getFieldDecorator('userName')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='用户电话' {...formItemLayout}>
                 {getFieldDecorator('userName')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='流程状态' {...formItemLayout}>
                 {getFieldDecorator('userName')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='订单时间' {...formItemLayout}>
                 {getFieldDecorator('userName')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={6} offset={2}>
              <FormItem label='' {...formItemLayout}>
                 <Button type="primary" htmlType="submit" size='large' onClick={this.handleSubmit.bind(this)}>搜索</Button>
               </FormItem>
            </Col>
          </Row>

        </Form>
      </div>
    )
  }
}

const FilterForm = Form.create()(NormalForm);

export default FilterForm;
