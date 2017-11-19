import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Form, Input, Radio } from 'antd';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  	(props) => {
    	const { visible, onCancel, onCreate, form,data } = props;
   	 	const { getFieldDecorator } = form;
     	const username=eval(sessionStorage.getItem('username'));
    	return (
			<Modal
				visible={visible}
				title={username}
				okText="确定"
				onCancel={onCancel}
				onOk={onCreate}
			>
				<Form>
					<FormItem
						label="旧密码"
						labelCol={{ span: 6    }}
						wrapperCol={{ span: 12 }}
						>
						{getFieldDecorator('oldpass', {
							rules: [{ required: true, message: '请输入旧密码' }],
						})(
							<Input />
						)}
					</FormItem>
					<FormItem
						label="新密码"
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 12 }}
						>
						{getFieldDecorator('newpass', {
							rules: [{ required: true, message: '请输入新密码' }],
						})(
							<Input />
						)}
					</FormItem>
					<FormItem
						label="验证新密码"
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 12 }}
						>
						{getFieldDecorator('repnewpass', {
							rules: [{ required: true, message: '请验证新密码' }],
						})(
							<Input />
						)}
					</FormItem>
				</Form>
			</Modal>
    	);
  	}
);

class CollectionsPage extends React.Component {
  	state = {
    	visible: false
  	};
  	showModal = () => {
    	this.setState({ visible: true });
  	}
  	handleCancel = () => {
    	const form = this.form;
    	this.setState({ 
        	visible: false 
    	},function(){
        	form.resetFields();
    	});
  	}
  	handleCreate = () => {
    	const form = this.form;
    	form.validateFields((err, values) => {
      	if (err) {
        	return;
      	}
        var Strdatanume=JSON.stringify(values)
        const result=password(Strdatanume)
           	result.then((res) => {
              	return res;
          	}).then((json) => {
               	if(json.code=='0'){
                	this.setState({
                    	visible: false
                	},function(){
                    	form.resetFields();
                    	message.success('密码修改成功');
                	})
               }
        	})     
    	});
  	}
  	saveFormRef = (form) => {
    	this.form = form;
  	}
  	render() {
    	return (
      		<div>
        		<p onClick={this.showModal}>修改密码</p>
       			<CollectionCreateForm
          			ref={this.saveFormRef}
					visible={this.state.visible}
					onCancel={this.handleCancel}
					onCreate={this.handleCreate}
        		/>
      		</div>
    	);
  	}
}


export default connect()(CollectionsPage);