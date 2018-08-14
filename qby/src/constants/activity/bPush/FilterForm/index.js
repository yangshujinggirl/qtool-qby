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
        _values.startTime =  moment(new Date(rangePicker[0]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');
        _values.endTime = moment(new Date(rangePicker[1]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');
      }
      this.props.submit && this.props.submit(_values);
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
                <FormItem label='推送标题'>
                  {getFieldDecorator('title')(
                      <Input placeholder='推送标题' autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem label='创建人'>
                  {getFieldDecorator('creater')(
                    <Input placeholder='请输入创建人' autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem label='推送状态'>
                    {getFieldDecorator('status')(
                    <Select allowClear={true} placeholder="请选择推送状态" className='select'>
                        {/* <Option value='10'>待发货</Option> */}
                        <Option value='1'>待推送</Option>
                        <Option value='2'>已推送</Option>
                        <Option value='3'>已撤销</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem label='推送类型'>
                    {getFieldDecorator('type')(
                    <Select allowClear={true} placeholder="请选择推送类型" className='select'>
                        {/* <Option value='10'>待发货</Option> */}
                        <Option value='1'>banner</Option>
                        <Option value='2'>商品</Option>
                        <Option value='3'>url</Option>
                        <Option value='4'>文本</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem
                    label="推送时间"
                >
                  {getFieldDecorator('rangePicker')(
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
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

const FilterForm = Form.create({
  onValuesChange:(props, changedValues, allValues) => {
    props.onValuesChange(allValues);
  }
})(NormalForm)
function mapStateToProps(state){
  const { userFeedBack } = state;
  return {userFeedBack}
}
export default connect(mapStateToProps)(FilterForm)
