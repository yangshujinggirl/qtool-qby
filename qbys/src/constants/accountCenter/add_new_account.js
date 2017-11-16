import React from 'react';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col} from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;

class AddNewAccountForm extends React.Component{
	//修改数据初始化
  	initDateEdit = (value) =>{
  		this.props.dispatch({type:'account/infofetch',payload:value})
    	this.props.dispatch({ type: 'tab/loding', payload:true})
	}
	//新增初始化
	initDate=(value)=>{
		this.props.dispatch({type:'account/cleardata',payload:value})
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
						rules: [{ required: true, message: '请输入账号名称' }],
						initialValue:this.props.urUser.username
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
						rules: [{ required: true, message: '请输入姓名' }],
						initialValue:this.props.urUser.name
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
						rules: [{ required: true, message: '请输入职位' }],
						initialValue:this.props.urUser.job
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
						rules: [{ required: true, message: '请输入邮箱' }],
						initialValue:this.props.urUser.email
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
						rules: [{ required: true, message: '请输入手机号' }],
						initialValue:this.props.urUser.mobile
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
						rules: [{ required: true, message: '请选择账户状态' }],
						initialValue:String(this.props.urUser.status)
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
    	if(this.props.data){
	  		const payload={code:'qerp.web.ur.user.get',values:{'urUserId':this.props.data.urUserId}}
			this.initDateEdit(payload)
    	}else{
			const initurUser={
				username:null,
				name:null,
				job:null,
				email:null,
				mobile:null,
				status:''
			}
			this.initDate(initurUser)
		}
  	}
}
function mapStateToProps(state) {
    const {accountInfo,urUser} = state.account;
    return {accountInfo,urUser};
}

const AddNewAccount = Form.create()(AddNewAccountForm);
export default connect(mapStateToProps)(AddNewAccount);