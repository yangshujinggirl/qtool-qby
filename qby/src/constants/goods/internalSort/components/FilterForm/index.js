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
    const { type } =this.props;
    return(
      <div>
        <Form className="qtools-condition-form">
          <Row wrap>
            <Col span={6}>
              <FormItem label='一级名称' {...formItemLayout}>
                 {getFieldDecorator('name')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            {
              type == '1'&&
              <Col span={6}>
                <FormItem label='一级状态' {...formItemLayout}>
                   {getFieldDecorator('name')(
                     <Input placeholder="Username" />
                   )}
                 </FormItem>
              </Col>
            }
            {
              type != '1'&&
              <Col span={6}>
                <FormItem label='二级名称' {...formItemLayout}>
                   {getFieldDecorator('name')(
                     <Input placeholder="Username" />
                   )}
                 </FormItem>
              </Col>
            }
            {
              type ==2&&
              <Col span={6}>
                <FormItem label='二级状态' {...formItemLayout}>
                   {getFieldDecorator('name')(
                     <Input placeholder="Username" />
                   )}
                 </FormItem>
              </Col>
            }
            {
              type ==2&&
              <Col span={6}>
                <FormItem label='二级类型' {...formItemLayout}>
                   {getFieldDecorator('name')(
                     <Input placeholder="Username" />
                   )}
                 </FormItem>
              </Col>
            }
            {
              type!='1'&&type!='2'&&
              <Col span={6}>
                <FormItem label='三级名称' {...formItemLayout}>
                   {getFieldDecorator('name')(
                     <Input placeholder="Username" />
                   )}
                 </FormItem>
              </Col>
            }
            {
              type=='3'&&
              <Col span={6}>
                <FormItem label='三级状态' {...formItemLayout}>
                   {getFieldDecorator('name')(
                     <Input placeholder="Username" />
                   )}
                 </FormItem>
              </Col>
            }
            {
              type=='4'&&
              <Col span={6}>
                <FormItem label='四级名称' {...formItemLayout}>
                   {getFieldDecorator('name')(
                     <Input placeholder="Username" />
                   )}
                 </FormItem>
              </Col>
            }
            {
              type == '4'&&
              <Col span={6}>
                <FormItem label='四级状态' {...formItemLayout}>
                   {getFieldDecorator('name')(
                     <Input placeholder="Username" />
                   )}
                 </FormItem>
              </Col>
            }
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
