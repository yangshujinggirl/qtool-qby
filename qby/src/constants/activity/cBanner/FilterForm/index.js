import React, { Component } from 'react'
import{
    Form,
    Row,
    Col,
    Input,
    Button,
    Select
}from 'antd'

import '../index.css'

const FormItem = Form.Item;
const Option = Select.Option
const formItemLayout = {
    labelCol: { span:6 },
    wrapperCol: { span: 16 },
};
// cBanner 搜索栏
class NormalForm extends Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      this.props.submit && this.props.submit(values);
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div className='form'>
        <Form>
            <Row wrap>
                <Col span={8}>
                    <FormItem {...formItemLayout} label='联系人'>
                      {getFieldDecorator('userName')(
                          <Input placeholder='请输入联系人'/>
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem {...formItemLayout} label='联系电话'>
                      {getFieldDecorator('name')(
                        <Input placeholder='请输入联系人'/>
                      )}
                    </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label='订单状态'>
                      {getFieldDecorator('status')(
                      <Select allowClear={true} placeholder="请选择订单状态" className='select'>
                          {/* <Option value='10'>待发货</Option> */}
                          <Option value='11'>待合单</Option>
                          <Option value='15'>待分配</Option>
                          <Option value='16'>待检核</Option>
                          <Option value='20'>已发货</Option>
                          <Option value='30'>已取消</Option>
                      </Select>
                      )}
                  </FormItem>
                </Col>
              </Row>
              <FormItem>
                  <Button
                    className='submit'
                    type="primary"
                    onClick={this.handleSubmit.bind(this)}>
                      搜索
                  </Button>
              </FormItem>
        </Form>
      </div>
    )
  }
}



const FilterForm = Form.create({

  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },

  mapPropsToFields(props){
    return{
      userName: Form.createFormField({
        ...props.userName,
        value:props.userName.value
      }),
      name: Form.createFormField({
        ...props.name,
        value: props.name.value,
      }),
      status: Form.createFormField({
        ...props.status,
        value: props.status.value,
      }),
    };
  },
})(NormalForm);
export default FilterForm
