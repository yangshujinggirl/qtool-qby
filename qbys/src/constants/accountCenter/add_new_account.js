import React from 'react';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col} from 'antd';
import UserTags from './usertags';

const FormItem = Form.Item;
const Option = Select.Option;

class AddNewAccountForm extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			hasUserTags:true
		}
	}

	//修改数据初始化页面
  	initDateEdit = (value) =>{
		  //请求用户信息
  		this.props.dispatch({type:'account/infofetch',payload:value})
    	this.props.dispatch({ type: 'tab/loding', payload:true})
	}

	//删除当前tab
	deleteTab=()=>{
		const pane = eval(sessionStorage.getItem("pane"));
		if(pane.length<=1){
			return
		}
		if(this.props.data){
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:'130000edit'+this.props.data.wsUrUserId
			  });
		}else{
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:'130000edit'
			  });
		}
	}

	//刷新账号列表
	refreshAccountList=()=>{
		this.props.dispatch({
            type:'account/fetch',
            payload:{code:'qerp.web.ws.ur.user.query',values:{limit:this.props.limit,currentPage:0}}
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
	//初始化urRoleIds
	initUrRoleIds = () =>{
		this.props.dispatch({
            type:'account/initUrRoleIds',
            payload:{}
		})
	}
	//保存
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
			  if(this.props.urRoleIds.length){
				  this.setState({
					hasUserTags:true
				  });
				values.urRoleIds=this.props.urRoleIds;
				if(this.props.data){
					values.wsUrUserId=this.props.data.wsUrUserId
				}else{
					values.wsUrUserId = null;
				}
				const newvalues={urUser:values}
				const result=GetServerData('qerp.web.ws.ur.user.save',newvalues)
				result.then((res) => {
					return res;
				}).then((json) => {
					if(json.code=='0'){
						if(json.password){
							//显示新创建的用户信息
							this.showNewUserInfoModal('账户创建成功',json);
						}else{
							message.success('信息修改成功',.8);
							this.deleteTab();
							this.refreshAccountList();
						}
					}
				})
			  }else{
				this.setState({
					hasUserTags:false
				  });
				 return false;
			  }
		  }
		});
	}

	//取消
	hindCancel=()=>{
		this.deleteTab()
		this.refreshAccountList()
	}

	//保存成功后显示账号的用户名密码信息
	showNewUserInfoModal = (title,userInfo)=> {
		const self = this;
		Modal.success({
		  title: title,
		  content: (
			  <div>
				<p>用户名：{userInfo.username}</p>
				<p>密码：{userInfo.password}</p>
			  </div>
		  ),
		  okText: '确定',
		  onOk() {
			self.deleteTab();
			self.refreshAccountList();
			
		  }
		});
	}

	//重置密码
	resetPassword = () =>{
		const values={wsUrUserId:this.props.data.wsUrUserId}
		const result=GetServerData('qerp.web.ws.ur.user.resetpwd',values);
		result.then((res) => {
			  return res;
		}).then((json) => {
			if(json.code=='0'){
				//显示修改
				this.showNewUserInfoModal('信息修改成功',json);
			}
		
		});
	}

	 //请求仓库列表
	 wsList=()=>{
        this.props.dispatch({
            type:'IndexPage/wslistfetch',
            payload:{code:'qerp.web.ws.warehouse.all.list',values:{}}
        })
	}
	
	//请求不同仓库的权限
	wsidChange=(value)=>{
		//清除权限
		this.initUrRoleIds();
		const payload={code:'qerp.web.ws.ur.role.list',values:{'wsWarehouseId':value}}
		this.props.dispatch({type:'account/rolelist',payload:payload})
	}

	//判断是否选择了用户权限
	changeHasTagStatus = () =>{
		this.setState({
			hasUserTags:true
		  });
	}

  	render(){
		const { getFieldDecorator } = this.props.form;
		const adminType=eval(sessionStorage.getItem('adminType'));
     	return(
          	<Form className="addUser-form">
				<FormItem
					label="用户名"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: '请输入用户名'},{pattern:/^.{1,30}$/,message:'请输入1-30字用户名'}],
						initialValue:this.props.urUser.username
					})(
						<Input placeholder="请输入账户名称" disabled={this.props.data?true:false}/>
					)}
				</FormItem>
				<FormItem
					label="姓名"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: '请输入姓名' },{pattern:/^.{1,10}$/,message:'请输入1-10字姓名'}],
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
						rules: [{pattern:/^.{1,10}$/,message:'请输入1-10字职位名'}],
						initialValue:this.props.urUser.job
					})(
						<Input placeholder="请输入职位"/>
					)}
				</FormItem>
				<FormItem
					label="手机号"
					labelCol={{ span: 3,offset: 1}}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('mobile', {
						rules: [{pattern:/^[0-9]{1,20}$/,message:'输入正确手机号'}],
						initialValue:this.props.urUser.mobile
					})(
						<Input placeholder="请输入手机号"/>
					)}
				</FormItem>
				{
					adminType=='10'?
					<FormItem 
					label='所属身份'
					labelCol={{ span: 3,offset: 1}}
					wrapperCol={{ span: 6 }}
					>
					{getFieldDecorator('wsWarehouseId',{
						rules: [{ required: true, message: '请选择所属身份'}],
						initialValue:this.props.wsWarehouseId?this.props.wsWarehouseId:'-1',
						onChange:this.wsidChange
					})(
						<Select>
							 <Option value='-1'>总部管理</Option>
							{
								this.props.warehouses.map((item,index)=>{
									return  <Option value={item.wsWarehouseId} key={index}>{item.name}</Option>
								})
							}
						</Select>
					)}
				</FormItem>
				:null
                }
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
					wrapperCol={{ span: 8 }}
					  >
					<UserTags changeHasTagStatus={this.changeHasTagStatus.bind(this)}/>
					{
						!this.state.hasUserTags
						?
						<p className="error-info">请选择分配权限</p>
						:
						null
					}
            	</FormItem>
            	<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
              		<Button className='mr30' onClick={this.hindCancel.bind(this)}>取消</Button>
					<Button className={this.props.data?'mr30':'hide'} onClick={this.resetPassword.bind(this)}>重置密码</Button>
              		<Button htmlType="submit" type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
            	</FormItem>
          	</Form>
      	)
  	}
  	componentDidMount(){
		this.wsList();
    	if(this.props.data){
			  const payload={code:'qerp.web.ws.ur.user.detail',values:{'wsUrUserId':this.props.data.wsUrUserId}}
			  //请求用户信息
			this.initDateEdit(payload)
		}
  	}
}
function mapStateToProps(state) {
	const {accountInfo,urUser,urRoleIds,wsWarehouseId} = state.account;
	const {warehouses}=state.IndexPage;
    return {accountInfo,urUser,warehouses,urRoleIds,wsWarehouseId};
}

const AddNewAccount = Form.create()(AddNewAccountForm);
export default connect(mapStateToProps)(AddNewAccount);