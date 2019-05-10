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
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker


class NormalForm extends Component{
  //点击搜索
  handleSubmit = (e) => {
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const{rangePicker,..._values} = values;
      if(rangePicker){
        _values.createTimeST =  new Date( rangePicker[0]).getTime();
        _values.createTimeET = new Date(rangePicker[1]).getTime();
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
              <FormItem  label='品牌名称'>
                {getFieldDecorator('name')(
                    <Input placeholder='请输入品牌名称' autoComplete='off'/>
                )}
              </FormItem>
              <FormItem label='品牌状态'>
                  {getFieldDecorator('status')(
                  <Select allowClear={true} placeholder="请选择品牌状态" className='select'>
                      <Option value={1}>启用</Option>
                      <Option value={0}>禁用</Option>
                  </Select>
                  )}
              </FormItem>
              <FormItem label='C端品牌馆'>
                  {getFieldDecorator('eventStatus')(
                  <Select allowClear={true} placeholder="请选择C端品牌馆" className='select'>
                      <Option value={10}>上架</Option>
                      <Option value={20}>下架</Option>
                  </Select>
                  )}
              </FormItem>
              <FormItem label='排序规则'>
                  {getFieldDecorator('sortByFlg',{
                    initialValue:1
                  })(
                  <Select allowClear={true} placeholder="请选择排序规则" className='select'>
                      <Option value={1}>按创建时间倒序</Option>
                      <Option value={2}>按C端品牌馆顺序</Option>
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

const FilterForm = Form.create({
  onValuesChange:(props, changedValues, allValues) => {
    props.onValuesChange(allValues);
  }
})(NormalForm)
function mapStateToProps(state){
  const { serverBill } = state;
  return { serverBill }
}
export default connect(mapStateToProps)(FilterForm)
