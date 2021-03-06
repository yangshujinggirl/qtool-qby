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
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option =  Select.Option;
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
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='商品编码'>
                 {getFieldDecorator('pdCode')(
                   <Input placeholder="请输入商品编码" autoComplete="off"/>
                 )}
              </FormItem>
              <FormItem label='活动ID'>
                 {getFieldDecorator('promotionId')(
                   <Input placeholder="请输入活动ID"  autoComplete="off"/>
                 )}
              </FormItem>
              <FormItem label='活动名称'>
                 {getFieldDecorator('name')(
                   <Input placeholder="请输入活动名称" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='活动状态'>
                 {getFieldDecorator('status')(
                   <Select allowClear={true} placeholder="请选择活动状态">
                     <Option value={0} key={0}>全部</Option>
                     <Option value={1} key={1}>待提交</Option>
                     <Option value={2} key={2}>审核中</Option>
                     <Option value={3} key={3}>待开始</Option>
                     <Option value={4} key={4}>进行中</Option>
                     <Option value={5} key={5}>已结束</Option>
                     <Option value={6} key={6}>已作废</Option>
                   </Select>
                 )}
               </FormItem>
              <FormItem label='促销类型'>
                 {getFieldDecorator('type')(
                   <Select allowClear={true} placeholder="请选择促销类型">
                     <Option value={0} key={0}>全部</Option>
                     <Option key={10} value={10}>单品直降</Option>
                     <Option key={11} value={11}>单品多级满赠</Option>
                     <Option key={20} value={20}>专区多级满元赠</Option>
                     <Option key={21} value={21}>专区多级满件赠</Option>
                     <Option key={22} value={22}>专区多级满元减</Option>
                     <Option key={23} value={23}>专区满件减免</Option>
                   </Select>
                 )}
               </FormItem>
              <FormItem label='发起人'>
                 {getFieldDecorator('createUser')(
                   <Input placeholder="请输入发起人" autoComplete="off"/>
                 )}
               </FormItem>
              {/*<FormItem label='活动时间'>
                 {getFieldDecorator('time')(
                   <RangePicker format="YYYY-MM-DD HH:mm:ss"/>
                 )}
               </FormItem>*/}
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
  onValuesChange(props, changedFields) {
    props.onChange(changedFields);
  },
})(NormalForm);

export default FilterForm;
