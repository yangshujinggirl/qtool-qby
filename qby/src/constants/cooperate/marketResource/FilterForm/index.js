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
import '../index.css'
const FormItem = Form.Item;
const Option = Select.option;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
//marketResource 搜索栏
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
                    <Row>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='联系人'>
                              {getFieldDecorator('userName')(
                                  <Input placeholder='请输入联系人'/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='联系电话'>
                              {getFieldDecorator('name')(
                                <Input placeholder='请输入联系人'/>
                              )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='公司名称'>
                              {getFieldDecorator('shopName')(
                                  <Input placeholder='请输入联系人'/>
                              )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='资源类型'>
                              {getFieldDecorator('recTel')(
                                <Input placeholder='请输入联系人'/>
                              )}
                            </FormItem>
                        </Col>
                        <Col className='submit'>
                            <FormItem {...formItemLayout}>
                                <Button
                                  type="primary"
                                  disabled={this.props.marketResource.disabled}
                                  onClick={this.handleSubmit.bind(this)}>
                                    搜索
                                </Button>
                            </FormItem>
                        </Col>
                      </Row>
                </Form>
            </div>
        )
    }
}

  function mapStateToProps(state){
    const { marketResource } = state;
    return { marketResource }
  }

  const FilterForm = Form.create({
    onFieldsChange(props, changedFields) {
      props.onChange(changedFields);
    },
    mapPropsToFields(props){
        return {
          userName: Form.createFormField({
            ...props.userName,
            value: props.userName.value,
          }),
          name: Form.createFormField({
            ...props.name,
            value: props.name.value,
          }),
          shopName: Form.createFormField({
            ...props.shopName,
            value: props.shopName.value,
          }),
          pdCategory1Name: Form.createFormField({
            ...props.recTel,
            value: props.recTel.value,
          })
        };
      }
  })(NormalForm);

export default connect(mapStateToProps)(FilterForm)
