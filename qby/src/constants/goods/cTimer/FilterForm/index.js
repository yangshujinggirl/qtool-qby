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
    this.props.form.validateFieldsAndScroll((err, values) => {
      this.props.submit && this.props.submit(values);
    });
  }
  //初始化
  render(){
    const { getFieldDecorator }= this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem  label='商品编码'>
                {getFieldDecorator('code')(
                    <Input placeholder='请输入商品编码' autoComplete='off'/>
                )}
              </FormItem>
              <FormItem label='最后修改人'>
                {getFieldDecorator('updateUserName')(
                  <Input placeholder='请输入最后修改人' autoComplete='off'/>
                )}
              </FormItem>
              <FormItem label='定时操作'>
                  {getFieldDecorator('opstatus')(
                  <Select allowClear={true} placeholder="请选择定时操作" className='select'>
                      <Option value='1'>上线</Option>
                      <Option value='2'>下线</Option>
                      <Option value='3'>NEW</Option>
                      <Option value='4'>下NEW</Option>
                      <Option value='5'>HOT</Option>
                      <Option value='6'>下HOT</Option>
                  </Select>
                  )}
              </FormItem>
              <FormItem label='状态'>
                  {getFieldDecorator('status')(
                  <Select allowClear={true} placeholder="请选择状态" className='select'>
                      <Option value='1'>待执行</Option>
                      <Option value='2'>已执行</Option>
                      <Option value='3'>无效</Option>
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
  const { serverBill } = state;
  return { serverBill }
}
export default connect(mapStateToProps)(FilterForm)
