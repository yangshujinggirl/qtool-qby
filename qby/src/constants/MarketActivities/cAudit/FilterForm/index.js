import React, { Component } from 'react'
import {connect} from 'dva'
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker
}from 'antd'
import {removeSpace} from '../../../../utils/meth';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker

class NormalForm extends Component{
  //点击搜索
  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      const{time,..._values} = values;
      if(time&&time[0]){
        _values.activityTimeStart =  moment(time[0]).format('YYYY-MM-DD HH:mm:ss');
        _values.activityTimeEnd = moment(time[1]).format('YYYY-MM-DD HH:mm:ss');
      };
      removeSpace(_values);
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
              <FormItem label='活动ID'>
                {getFieldDecorator('promotionId')(
                  <Input placeholder='请输入活动ID' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem label='审核名称'>
                {getFieldDecorator('approvalName')(
                  <Input placeholder='请输入审核名称' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem label='审核状态'>
                  {getFieldDecorator('status')(
                  <Select allowClear={true} placeholder="请选择审核状态">
                    <Option value={0}>待审核</Option>
                    <Option value={1}>审核通过</Option>
                    <Option value={2}>审核不通过</Option>
                  </Select>
                  )}
              </FormItem>
              <FormItem label='活动创建人'>
                {getFieldDecorator('createUser')(
                  <Input placeholder='请输入活动创建人' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem label='审核人'>
                {getFieldDecorator('approvalUser')(
                  <Input placeholder='请输入审核人' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem label="活动时间">
                {getFieldDecorator('time')(
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

const FilterForm = Form.create({})(NormalForm)
function mapStateToProps(state){
  const { bPromotion } = state;
  return {bPromotion}
}
export default connect(mapStateToProps)(FilterForm)
