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
import { StatusOption } from '../../../../../components/FixedDataSource.js';

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
    const { level } =this.props;
    return(
        <Form className="qtools-condition-form">
          <div className="search-form-outwrap">
            <div className="search-form-wrap">
              <FormItem label='一级名称' {...formItemLayout}>
                 {getFieldDecorator('pdCategory1')(
                   <Input placeholder="请输入名称" autoComplete="off"/>
                 )}
               </FormItem>
              {
                level == '1'&&
                  <FormItem label='一级状态' {...formItemLayout}>
                     {getFieldDecorator('status')(
                       <Select allowClear={true} placeholder="请选择状态" autoComplete="off">
                         {
                           StatusOption.map((el) => (
                             <Select.Option value={el.key} key={el.key}>{el.value}</Select.Option>
                           ))
                         }
                       </Select>
                     )}
                   </FormItem>
              }
              {
                level != '1'&&
                  <FormItem label='二级名称' {...formItemLayout}>
                     {getFieldDecorator('pdCategory2')(
                       <Input placeholder="请输入名称" autoComplete="off"/>
                     )}
                   </FormItem>
              }
              {
                level ==2&&
                  <FormItem label='二级状态' {...formItemLayout}>
                     {getFieldDecorator('status')(
                       <Select allowClear={true} placeholder="请选择状态" autoComplete="off">
                         {
                           StatusOption.map((el) => (
                             <Select.Option value={el.key} key={el.key}>{el.value}</Select.Option>
                           ))
                         }
                       </Select>
                     )}
                   </FormItem>
              }
              {
                level!='1'&&level!='2'&&
                  <FormItem label='三级名称' {...formItemLayout}>
                     {getFieldDecorator('pdCategory3')(
                       <Input placeholder="请输入名称" autoComplete="off"/>
                     )}
                   </FormItem>
              }
              {
                level=='3'&&
                  <FormItem label='三级状态' {...formItemLayout}>
                     {getFieldDecorator('status')(
                       <Select allowClear={true} placeholder="请选择状态" autoComplete="off">
                         {
                           StatusOption.map((el) => (
                             <Select.Option value={el.key} key={el.key}>{el.value}</Select.Option>
                           ))
                         }
                       </Select>
                     )}
                   </FormItem>
              }
              {
                level=='4'&&
                  <FormItem label='四级名称' {...formItemLayout}>
                     {getFieldDecorator('pdCategory4')(
                       <Input placeholder="请输入名称" autoComplete="off"/>
                     )}
                   </FormItem>
              }
              {
                level == '4'&&
                  <FormItem label='四级状态' {...formItemLayout}>
                     {getFieldDecorator('status')(
                       <Select allowClear={true} placeholder="请选择状态" autoComplete="off">
                         {
                           StatusOption.map((el) => (
                             <Select.Option value={el.key} key={el.key}>{el.value}</Select.Option>
                           ))
                         }
                       </Select>
                     )}
                   </FormItem>
              }
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
const FilterForm = Form.create()(NormalForm);
export default FilterForm;
