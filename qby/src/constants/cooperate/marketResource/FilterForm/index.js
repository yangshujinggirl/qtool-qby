import React, { Component } from 'react'
import {connect} from 'dva'
import{
    Form,
    Row,
    Col,
    Input,
    Button,
    Select
}from 'antd'
import {removeSpace} from '../../../../utils/meth'
const FormItem = Form.Item;
const Option = Select.Option;

//marketResource 搜索栏
class NormalForm extends Component{
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        removeSpace(values);
        this.props.submit && this.props.submit(values);
      })
    }
    render(){
      const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form className="qtools-condition-form">
                  <div className='search-form-outwrap'>
                    <div className="search-form-wrap">
                      <FormItem  label='联系人'>
                        {getFieldDecorator('name')(
                            <Input placeholder='请输入联系人' autoComplete="off"/>
                          )}
                      </FormItem>
                      <FormItem label='联系电话'>
                        {getFieldDecorator('mobile')(
                          <Input placeholder='请输入联系电话' autoComplete="off"/>
                        )}
                      </FormItem>
                      <FormItem label='公司名称'>
                        {getFieldDecorator('companyName')(
                            <Input placeholder='请输入公司名称' autoComplete="off"/>
                        )}
                      </FormItem>
                      <FormItem label='资源类型'>
                        {getFieldDecorator('marketTypeId')(
                            <Select allowClear={true} placeholder="请选择资源类型">
                              <Option value="1">供应商</Option>
                              <Option value="2">媒体</Option>
                              <Option value="3">品牌商</Option>
                              <Option value="4">其他</Option>
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
                        disabled={this.props.marketResource.disabled}
                        onClick={this.handleSubmit.bind(this)}>
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
  const { marketResource } = state;
  return { marketResource }
}
export default connect(mapStateToProps)(FilterForm)
