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
    const { categoryList } =this.props;
    return(
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
          <div className="search-form-wrap">
              <FormItem label='商品编码'>
                 {getFieldDecorator('code')(
                   <Input placeholder="请输入商品编码" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='商品名称'>
                 {getFieldDecorator('cname')(
                   <Input placeholder="请输入商品名称" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='商品品牌'>
                 {getFieldDecorator('pdBrandName')(
                   <Input placeholder="请输入商品品牌" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='一级分类'>
                 {getFieldDecorator('pdCategory1Id')(
                   <Select placeholder="请选择一级分类" allowClear={true}>
                     {
                      categoryList.length>0&&categoryList.map((el) => (
                         <Select.Option
                           value={el.pdCategoryId}
                           key={el.pdCategoryId}>{el.name}</Select.Option>
                       ))
                     }
                   </Select>
                 )}
               </FormItem>
              <FormItem label='上线状态'>
                 {getFieldDecorator('cstatus')(
                   <Select allowClear={true} placeholder="请选择上线状态" autoComplete="off">
                     <Option value={20} key={20}>下线</Option>
                     <Option value={10} key={10}>上线</Option>
                   </Select>
                 )}
               </FormItem>
               <FormItem label='NEW商品'>
                  {getFieldDecorator('isNew')(
                    <Select allowClear={true} placeholder="请选择是否上新" autoComplete="off">
                        <Option value={1} key={1}>是</Option>
                        <Option value={0} key={0}>否</Option>
                    </Select>
                  )}
                </FormItem>
               <FormItem label='HOT商品'>
                  {getFieldDecorator('isHot')(
                    <Select allowClear={true} placeholder="请选择是否畅销" autoComplete="off">
                        <Option value={1} key={1}>是</Option>
                        <Option value={0} key={0}>否</Option>
                    </Select>
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
