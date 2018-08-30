import React, { Component } from 'react'
import {connect} from 'dva'
import {
  Form,
  Input,
  Button,
  Select,
}from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

class NormalForm extends Component{
  //点击搜索
  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
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
              <FormItem label='门店名称'>
                {getFieldDecorator('shopName')(
                    <Input placeholder='请输入门店名称' autoComplete="off"/>
                  )}
              </FormItem>
              <FormItem label='门店类型'>
                  {getFieldDecorator('type')(
                  <Select allowClear={true} placeholder="请选择门店类型" className='select'>
                      <Option value={1}>直营</Option>
                      <Option value={2}>联营</Option>
                      <Option value={3}>加盟</Option>
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
  const { dataspcun } = state;
  return {dataspcun}
}
export default connect(mapStateToProps)(FilterForm)
