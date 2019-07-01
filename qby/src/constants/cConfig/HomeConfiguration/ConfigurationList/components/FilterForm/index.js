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
const Option =  Select.Option;
const RangePicker = DatePicker.RangePicker;

const StatusOption=[{
    key:0,
    value:'草稿中'
  },{
    key:1,
    value:'待发布'
  },{
    key:2,
    value:'线上版本'
  },{
    key:3,
    value:'已下线'
  }]

class NormalForm extends Component {
  constructor(props){
    super(props)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(values.pdSpuId){
        values.pdSpuId = values.pdSpuId.replace(/\s+/g, "");
      };
      // removeSpace(values);
      this.props.submit && this.props.submit(values)
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='版本名称'>
                 {getFieldDecorator('pdSpuId')(
                   <Input placeholder="版本名称" maxLength='10' autoComplete="off"/>
                 )}
              </FormItem>
              <FormItem label='发布时间'>
                 {getFieldDecorator('code')(
                   <RangePicker
                     format="YYYY-MM-DD HH:mm:ss"/>
                 )}
               </FormItem>

              <FormItem label='版本状态'>
                 {getFieldDecorator('pdCategory1Id')(
                   <Select
                     placeholder="请选择版本状态"
                     allowClear={true}
                     onSelect={this.onSelect}
                     onChange={this.onChange}
                     >
                     {
                      StatusOption.map((el) => (
                         <Select.Option
                           value={el.value}
                           key={el.key}>{el.value}</Select.Option>
                       ))
                     }
                   </Select>
                 )}
               </FormItem>
               <FormItem label='版本编号'>
                  {getFieldDecorator('code')(
                    <Input placeholder="请输入版本编号" autoComplete="off"/>
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
const FilterForm = Form.create({})(NormalForm);

export default FilterForm;
