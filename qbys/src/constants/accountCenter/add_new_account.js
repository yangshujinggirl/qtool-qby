import React from 'react';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col} from 'antd';
import UserTags from './usertags';

const FormItem = Form.Item;
const Option = Select.Option;

class AddNewAccountForm extends React.Component{
	//修改数据初始化页面
  	initDateEdit = (value) =>{
  		this.props.dispatch({type:'account/infofetch',payload:value})
    	this.props.dispatch({ type: 'tab/loding', payload:true})
	}

	//删除当前tab
	deleteTab=()=>{
		const pane = eval(sessionStorage.getItem("pane"));
		if(pane.length<=1){
			return
		}
		this.props.dispatch({
            type:'tab/initDeletestate',
            payload:'601000edit'+this.props.data.urUserId
		  });
	}

	//刷新账号列表
	refreshAccountList=()=>{
		this.props.dispatch({
            type:'account/fetch',
            payload:{code:'qerp.web.ur.user.query',values:{limit:this.props.limit,currentPage:0}}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}


	//初始化state
	initState=()=>{
		this.props.dispatch({
            type:'account/initState',
            payload:{}
		})
	}
	//保存
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
			  console.log(values)
			  values.urRoleIds=this.props.urUser.urRoleIds
				if(this.props.data){
					values.urUserId=this.props.data.urUserId
				}
			const newvalues={urUser:values}
			const result=GetServerData('qerp.web.ur.user.save',newvalues)
			result.then((res) => {
				return res;
			}).then((json) => {
				if(json.code=='0'){
					this.deleteTab()
					this.refreshAccountList()
				}
			})

		  }
		});
		
	}

	//取消
	hindCancel=()=>{
		this.deleteTab()
		this.refreshAccountList()
	}

  	render(){
    	const { getFieldDecorator } = this.props.form;
     	return(
          	<Form onSubmit={this.handleSubmit}>
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
						initialValue:this.props.urUser.status
					})(
						<Select placeholder="请选择账户状态">
							<Option value="1">启用</Option>
							<Option value="0">禁用</Option>
						</Select>
              		)}
            	</FormItem>
				<FormItem
              		label="权限分配"
              		labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
					  >
						<Row>
							<Col span={8}><UserTags/></Col>
						</Row>
            	</FormItem>
            	<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
              		<Button style = {{marginRight:'30px'}} onClick={this.hindCancel.bind(this)}>取消</Button>
              		<Button htmlType="submit" type="primary">保存</Button>
            	</FormItem>
          	</Form>
      	)
  	}
  	componentDidMount(){
    	if(this.props.data){
	  		const payload={code:'qerp.web.ur.user.get',values:{'urUserId':this.props.data.urUserId}}
			this.initDateEdit(payload)
		}
  	}
}
function mapStateToProps(state) {
    const {accountInfo,urUser} = state.account;
    return {accountInfo,urUser};
}

const AddNewAccount = Form.create()(AddNewAccountForm);
export default connect(mapStateToProps)(AddNewAccount);