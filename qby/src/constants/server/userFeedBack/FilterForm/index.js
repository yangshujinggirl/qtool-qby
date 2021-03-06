import React, { Component } from 'react'
import {connect} from 'dva'
import moment from 'moment';
import {timeForMat} from '../../../../utils/meth';
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
        _values.createTimeST =  moment(new Date(rangePicker[0]._d).getTime()).format('YYYY-MM-DD');
        _values.createTimeET = moment(new Date(rangePicker[1]._d).getTime()).format('YYYY-MM-DD');
      };
      removeSpace(_values);
      this.props.submit && this.props.submit(_values);
    })
  }
  //初始化
  render(){
    const defaultTime = [moment(timeForMat(30).t2), moment(timeForMat(30).t1)]
    const { getFieldDecorator }= this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='反馈编号'>
                {getFieldDecorator('feedbackNo')(
                    <Input placeholder='请输入反馈编号' autoComplete="off"/>
                  )}
              </FormItem>
              <FormItem label='手机号'>
                {getFieldDecorator('telephone')(
                  <Input placeholder='请输入手机号' autoComplete="off"/>
                )}
              </FormItem>
            <FormItem label='反馈状态'>
                {getFieldDecorator('status')(
                <Select allowClear={true} placeholder="请选择反馈状态" className='select'>
                    {/* <Option value='10'>待发货</Option> */}
                    <Option value='10'>待处理</Option>
                    <Option value='20'>处理中</Option>
                    <Option value='30'>已处理</Option>
                </Select>
                )}
            </FormItem>
            <FormItem label='处理时长'>
                {getFieldDecorator('handleTimeType')(
                <Select allowClear={true} placeholder="请选择处理时长" className='select'>
                    {/* <Option value='10'>待发货</Option> */}
                    <Option value='1'>0-5h</Option>
                    <Option value='2'>5-24h</Option>
                    <Option value='3'>24h以上</Option>
                </Select>
                )}
            </FormItem>
            <FormItem
              label="反馈时间"
            >
              {getFieldDecorator('rangePicker',{
                initialValue:defaultTime
              })(
                <RangePicker />
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
  const { userFeedBack } = state;
  return {userFeedBack}
}
export default connect(mapStateToProps)(FilterForm)
