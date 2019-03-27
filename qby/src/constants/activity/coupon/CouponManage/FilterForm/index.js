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
import '../index.css'
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker

class NormalForm extends Component{
  //点击搜索
  handleSubmit = (e) => {
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const{rangePicker,..._values} = values;
      if(rangePicker&&rangePicker[0]){
        _values.voucherTimeStart =  moment(new Date(rangePicker[0]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');;
        _values.voucherTimeEnd = moment(new Date(rangePicker[1]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');
      }
      this.props.submit && this.props.submit(_values);
    })
  }
  //初始化
  render(){
    const { getFieldDecorator }= this.props.form;
    const {couponCode} = this.props
    return(
      <div>
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
              <div className="search-form-wrap">
                <FormItem label='券包名称'>
                  {getFieldDecorator('couponPackageName',{
                    initialValue:couponCode
                  })(
                      <Input placeholder='请输入券包名称' autoComplete="off"/>
                    )}
                </FormItem>
                <FormItem label='券包批次号'>
                  {getFieldDecorator('couponBatchNo')(
                    <Input placeholder='请输入券包批次号' autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem label='最后修改人'>
                  {getFieldDecorator('updateUserName')(
                    <Input placeholder='请输入最后修改人' autoComplete="off"/>
                  )}
                </FormItem>
            </div>
          </div>
          <div className="search-submit-btn">
              <Button
                type="primary"
                onClick={()=>this.handleSubmit()}>
                  搜索
              </Button>
          </div>
        </Form>
      </div>
    )
  }
}
const FilterForm = Form.create({
  onValuesChange:(props, changedValues, allValues) => {
    props.onValuesChange(allValues);
  }
})(NormalForm)
function mapStateToProps(state){
  const { coupon } = state;
  return {coupon}
}
export default connect(mapStateToProps)(FilterForm)
