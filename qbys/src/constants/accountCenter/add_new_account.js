import React from 'react';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col} from 'antd';
import UserJurisdiction from '../accountCenter/user_jurisdiction.js';

const FormItem = Form.Item;
const Option = Select.Option;

class AddNewAccountForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    const { getFieldDecorator } = this.props.form;
     return(
          <Form>
            <FormItem
              label="账号名称"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入账号名称' }]
              })(
                <Input placeholder="请输入账户名称"/>
              )}
            </FormItem>
            <FormItem
              label="姓名"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入姓名' }]
              })(
                <Input placeholder="请输入姓名"/>
              )}
            </FormItem>
            <FormItem
              label="职位"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('job', {
                rules: [{ required: true, message: '请输入职位' }]
              })(
                <Input placeholder="请输入职位"/>
              )}
            </FormItem>
            <FormItem
              label="邮箱"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入邮箱' }]
              })(
                <Input placeholder="请输入邮箱"/>
              )}
            </FormItem>
            <FormItem
              label="手机号"
              labelCol={{ span: 3,offset: 1}}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('mobile', {
                rules: [{ required: true, message: '请输入手机号' }]
              })(
                <Input placeholder="请输入手机号"/>
              )}
            </FormItem>
            <FormItem
              label="账户状态"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('status', {
                rules: [{ required: true, message: '请选择账户状态' }]
              })(
                <Select placeholder="请选择账户状态">
                  <Option value="1">启用</Option>
                  <Option value="0">禁用</Option>
                </Select>
              )}
            </FormItem>
            <FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
              <Button style = {{marginRight:'30px'}} className='button-performance cancel-color'>取消</Button>
              <Button htmlType="submit" className='button-performance save-color'>保存</Button>
            </FormItem>
          </Form>
      )
  }
  componentDidMount(){
    
  }
}


const AddNewAccount = Form.create()(AddNewAccountForm);

export default AddNewAccount;