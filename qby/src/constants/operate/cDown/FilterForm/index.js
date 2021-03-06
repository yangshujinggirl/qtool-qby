import React, { Component } from 'react'
import {connect} from 'dva'
import {
  Form,
  Input,
  Button,
  Select,
}from 'antd'
import {removeSpace} from '../../../../utils/meth';
const FormItem = Form.Item;
const Option = Select.Option;

class NormalForm extends Component{
  //点击搜索
  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      values.type=3 //代表c端直降
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
              <FormItem label='商品编码'>
                {getFieldDecorator('barCode')(
                    <Input placeholder='请输入商品编码' autoComplete="off"/>
                  )}
              </FormItem>
              <FormItem label='商品名称'>
                {getFieldDecorator('name')(
                  <Input placeholder='请输入商品名称' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem label='活动名称'>
                {getFieldDecorator('batchName')(
                  <Input placeholder='请输入活动名称' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem label='活动编号'>
                {getFieldDecorator('batchNo')(
                  <Input placeholder='请输入活动编号' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem label='活动状态'>
                  {getFieldDecorator('status')(
                  <Select allowClear={true} placeholder="请选择活动状态">
                      <Option value={0}>未开始</Option>
                      <Option value={1}>进行中</Option>
                      <Option value={2}>已结束</Option>
                      <Option value={3}>已失效</Option>
                  </Select>
                  )}
              </FormItem>
              <FormItem label='最后修改人'>
                {getFieldDecorator('lastUpdateUser')(
                  <Input placeholder='请输入最后修改人' autoComplete="off"/>
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
export default FilterForm
