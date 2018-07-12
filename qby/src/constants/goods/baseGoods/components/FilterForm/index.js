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
    // console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <Row wrap>
            <Col span={6}>
              <FormItem label='商品编码' {...formItemLayout}>
                 {getFieldDecorator('code')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='商品名称' {...formItemLayout}>
                 {getFieldDecorator('name')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='商品品牌' {...formItemLayout}>
                 {getFieldDecorator('brandName')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='一级分类' {...formItemLayout}>
                 {getFieldDecorator('pdCategory1Name')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='是否完整' {...formItemLayout}>
                 {getFieldDecorator('infoStatus')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='商品归属' {...formItemLayout}>
                 {getFieldDecorator('source')(
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

const FilterForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      code: Form.createFormField({
        ...props.code,
        value: props.code.value,
      }),
      name: Form.createFormField({
        ...props.name,
        value: props.name.value,
      }),
      brandName: Form.createFormField({
        ...props.brandName,
        value: props.brandName.value,
      }),
      pdCategory1Name: Form.createFormField({
        ...props.pdCategory1Name,
        value: props.pdCategory1Name.value,
      }),
      infoStatus: Form.createFormField({
        ...props.infoStatus,
        value: props.infoStatus.value,
      }),
      source: Form.createFormField({
        ...props.source,
        value: props.source.value,
      }),
    };
  }
})(NormalForm);

export default FilterForm;
