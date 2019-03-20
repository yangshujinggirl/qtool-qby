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
import {removeSpace} from '../../../../../utils/meth';
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
      removeSpace(values);
      this.props.submit && this.props.submit(values)
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='商品 ID'>
                 {getFieldDecorator('udeskTicketId')(
                   <Input placeholder="请输入商品 ID" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='商品名称'>
                 {getFieldDecorator('subject')(
                   <Input placeholder="请输入商品名称" autoComplete="off"/>
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
