import React, { Component } from 'react'
import {connect} from 'dva'
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  DatePicker
}from 'antd'
import {removeSpace} from '../../../../utils/meth';
import '../index.css'
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker

class NormalForm extends Component{
  //点击搜索
  handleSubmit = (e) => {
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      removeSpace(values);
      this.props.submit && this.props.submit(values);
    })
  }
  //初始化
  render(){
    const { getFieldDecorator }= this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='主题名称'>
                {getFieldDecorator('themeName')(
                    <Input placeholder='请输入主题名称' autoComplete="off"/>
                  )}
              </FormItem>
              <FormItem label='最后修改人'>
                {getFieldDecorator('operator')(
                  <Input placeholder='请输入最后修改人' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem label='主题状态'>
                  {getFieldDecorator('couponUseScene')(
                  <Select allowClear={true} placeholder="请选择发放方式">
                      <Option value={0}>未开始</Option>
                      <Option value={1}>进行中</Option>
                      <Option value={2}>注券</Option>
                      <Option value={3}>注券</Option>
                  </Select>
                  )}
              </FormItem>
            </div>
          </div>
          <div className="search-submit-btn">
              <Button
                htmlType="submit"
                type="primary"
                size='large'
                onClick={()=>this.handleSubmit()}>
                  搜索
              </Button>
          </div>
        </Form>
      </div>
    )
  }
}

const FilterForm = Form.create({})(NormalForm)
function mapStateToProps(state){
  const { coupon } = state;
  return {coupon}
}
export default connect(mapStateToProps)(FilterForm)
