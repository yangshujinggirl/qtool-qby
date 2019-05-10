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
              <FormItem label='页面名称'>
                 {getFieldDecorator('pageName')(
                   <Input placeholder="请输入页面名称" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='最后修改人'>
                 {getFieldDecorator('updateUser')(
                   <Input placeholder="请输入最后修改人" autoComplete="off"/>
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
