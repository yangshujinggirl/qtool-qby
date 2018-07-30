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
        <Form className="qtools-condition-form">
            <div className="search-form-wrap">
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
              <FormItem label='商品品牌'>
                 {getFieldDecorator('brandName')(
                   <Input placeholder="请输入商品品牌" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='一级分类'>
                 {getFieldDecorator('pdCategory1Name')(
                   <Input placeholder="请选择一级分类" />
                 )}
               </FormItem>
              <FormItem label='是否完整'>
                 {getFieldDecorator('infoStatus')(
                   <Select allowClear placeholder="请选择是否完整">
                     <Option value={0}>是</Option>
                     <Option value={1}>否</Option>
                   </Select>
                 )}
               </FormItem>

              <FormItem label='商品归属'>
                 {getFieldDecorator('source')(
                   <Select allowClear placeholder="请选择商品归属">
                     <Select.Option value={0} key={0}>线上</Select.Option>
                     <Select.Option value={1} key={1}>线下</Select.Option>
                   </Select>
                 )}
               </FormItem>
              <div className="search-submit-btn">
                 <Button type="primary" htmlType="submit" size='large' onClick={this.handleSubmit.bind(this)}>搜索</Button>
               </div>
            </div>
        </Form>
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
