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
      const{rangePicker,..._values} = values;
      if(rangePicker&&rangePicker[0]){
        _values.pushTimeST =  moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
        _values.pushTimeET = moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
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
                {getFieldDecorator('title')(
                  <Input placeholder='活动ID' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem label='活动名称'>
                {getFieldDecorator('creater')(
                  <Input placeholder='请输入活动名称' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem label='活动状态'>
                  {getFieldDecorator('status')(
                  <Select allowClear={true} placeholder="请选择活动状态">
                    <Option value={1}>待推送</Option>
                    <Option value={2}>已推送</Option>
                    <Option value={3}>已撤销</Option>
                  </Select>
                  )}
              </FormItem>
              <FormItem label='活动类型'>
                  {getFieldDecorator('alertType')(
                  <Select allowClear={true} placeholder="请选择活动类型" className='select'>
                    <Option value={1}>banner</Option>
                    <Option value={2}>商品</Option>
                    <Option value={3}>url</Option>
                    <Option value={4}>文本</Option>
                  </Select>
                  )}
              </FormItem>
              <FormItem label="活动时间">
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

const FilterForm = Form.create({})(NormalForm)
function mapStateToProps(state){
  const { bPromotion } = state;
  return {bPromotion}
}
export default connect(mapStateToProps)(FilterForm)
