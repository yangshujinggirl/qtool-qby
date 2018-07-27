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
const Option = Select.Option;

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
                 <Input placeholder="请输入商品编码" />
               )}
             </FormItem>
            <FormItem label='商品名称'>
               {getFieldDecorator('bname')(
                 <Input placeholder="请输入商品名称" />
               )}
             </FormItem>
            <FormItem label='商品品牌'>
               {getFieldDecorator('brandName')(
                 <Input placeholder="请输入商品品牌" />
               )}
             </FormItem>
            <FormItem label='一级分类'>
               {getFieldDecorator('pdCategory1Name')(
                 <Input placeholder="请输入一级分类" />
               )}
             </FormItem>
            <FormItem label='售卖状态'>
               {getFieldDecorator('status')(
                 <Select placeholder="请选择售卖状态">
                   <Option value={20} key={20}>售卖</Option>
                   <Option value={10} key={10}>停售</Option>
                 </Select>
               )}
             </FormItem>
            <FormItem label='上新商品'>
               {getFieldDecorator('isNew')(
                 <Select allowClear={true} placeholder="请选择是否上新">
                     <Option value="true" key={true}>是</Option>
                     <Option value="false" key={false}>否</Option>
                 </Select>
               )}
             </FormItem>
            <FormItem label='畅销商品'>
               {getFieldDecorator('isHot')(
                 <Select allowClear={true} placeholder="请选择是否畅销">
                     <Option value="true" key={true}>是</Option>
                     <Option value="false" key={false}>否</Option>
                 </Select>
               )}
             </FormItem>
            <FormItem label='预售商品'>
               {getFieldDecorator('isPresell')(
                 <Select allowClear={true} placeholder="请选择预售商品">
                     <Option value={1} key={1}>是</Option>
                     <Option value={0} key={0}>否</Option>
                 </Select>
               )}
             </FormItem>
            <FormItem label='直邮商品'>
               {getFieldDecorator('isDirectExpress')(
                 <Select allowClear={true} placeholder="请选择直邮商品">
                     <Option value={1} key={1}>是</Option>
                     <Option value={0} key={0}>否</Option>
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