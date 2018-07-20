import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio,Select } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;
class AddModelForm extends Component {
	renderForm(form) {
		const { type } =this.props;
		const { getFieldDecorator } =form;
		switch(type) {
			case '1':
				return <div>
										<FormItem
											label="一级分类名称"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('name', {
													rules: [{ required: true, message: '请输入分类名称' }],
												})(
													<Input/>
												)
											}
										</FormItem>
										<FormItem
											label="一级分类状态"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('type', {
													rules: [{ required: true, message: '请选择' }],
												})(
													<Select placeholder="请选择">
														<Option value='1'>启用</Option>
														<Option value='2'>关闭</Option>
													</Select>
												)
											}
										</FormItem>
							</div>
				break;
			case '2':
				return <div>
										<FormItem
											label="二级分类名称"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('name', {
													rules: [{ required: true, message: '请输入分类名称' }],
												})(
													<Input/>
												)
											}
										</FormItem>
										<FormItem
											label="所属一级分类"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('type', {
													rules: [{ required: true, message: '请选择' }],
												})(
													<Select placeholder="请选择">
														<Option value='1'>启用</Option>
														<Option value='2'>关闭</Option>
													</Select>
												)
											}
										</FormItem>
										<FormItem
											label="二级分类状态"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('type', {
													rules: [{ required: true, message: '请选择' }],
												})(
													<Select placeholder="请选择">
														<Option value='1'>启用</Option>
														<Option value='2'>关闭</Option>
													</Select>
												)
											}
										</FormItem>
							</div>
				break;
			case '3':
				return <div>
										<FormItem
											label="三级分类名称"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('name', {
													rules: [{ required: true, message: '请输入分类名称' }],
												})(
													<Input/>
												)
											}
										</FormItem>
										<FormItem
											label="所属一级分类"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('type', {
													rules: [{ required: true, message: '请选择' }],
												})(
													<Select placeholder="请选择">
														<Option value='1'>启用</Option>
														<Option value='2'>关闭</Option>
													</Select>
												)
											}
										</FormItem>
										<FormItem
											label="所属二级分类"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('type', {
													rules: [{ required: true, message: '请选择' }],
												})(
													<Select placeholder="请选择">
														<Option value='1'>启用</Option>
														<Option value='2'>关闭</Option>
													</Select>
												)
											}
										</FormItem>
										<FormItem
											label="三级分类状态"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('type', {
													rules: [{ required: true, message: '请选择' }],
												})(
													<Select placeholder="请选择">
														<Option value='1'>启用</Option>
														<Option value='2'>关闭</Option>
													</Select>
												)
											}
										</FormItem>
							</div>
				break;
			case '4':
				return <div>
									<FormItem
										label="四级分类名称"
										labelCol={{ span: 5 }}
										wrapperCol={{ span: 12 }}>
										{
											getFieldDecorator('name', {
												rules: [{ required: true, message: '请输入分类名称' }],
											})(
												<Input/>
											)
										}
									</FormItem>
									<FormItem
										label="所属一级分类"
										labelCol={{ span: 5 }}
										wrapperCol={{ span: 12 }}>
										{
											getFieldDecorator('type', {
												rules: [{ required: true, message: '请选择' }],
											})(
												<Select placeholder="请选择">
													<Option value='1'>启用</Option>
													<Option value='2'>关闭</Option>
												</Select>
											)
										}
									</FormItem>
									<FormItem
										label="所属二级分类"
										labelCol={{ span: 5 }}
										wrapperCol={{ span: 12 }}>
										{
											getFieldDecorator('type', {
												rules: [{ required: true, message: '请选择' }],
											})(
												<Select placeholder="请选择">
													<Option value='1'>启用</Option>
													<Option value='2'>关闭</Option>
												</Select>
											)
										}
									</FormItem>
									<FormItem
										label="所属三级分类"
										labelCol={{ span: 5 }}
										wrapperCol={{ span: 12 }}>
										{
											getFieldDecorator('type', {
												rules: [{ required: true, message: '请选择' }],
											})(
												<Select placeholder="请选择">
													<Option value='1'>启用</Option>
													<Option value='2'>关闭</Option>
												</Select>
											)
										}
									</FormItem>
									<FormItem
										label="四级分类状态"
										labelCol={{ span: 5 }}
										wrapperCol={{ span: 12 }}>
										{
											getFieldDecorator('type', {
												rules: [{ required: true, message: '请选择' }],
											})(
												<Select placeholder="请选择">
													<Option value='1'>启用</Option>
													<Option value='2'>关闭</Option>
												</Select>
											)
										}
									</FormItem>
							</div>
				break;
		}
	}
	getTitle() {
    let title;
    switch(this.props.type) {
      case '1':
        title = '新增一级分类';
        break;
      case '2':
        title = '新增二级分类';
        break;
      case '3':
        title = '新增三级分类';
        break;
      case '4':
        title = '新增四级分类';
        break;
    }
    return title;
  }
	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
				this.props.onSubmit&&this.props.onSubmit(values)
      }
    });
  }
	render(){
		const { visible, onCancel, onSubmit } = this.props;
		const { form } = this.props;
		return (
			<Modal
				visible={visible}
				title={this.getTitle()}
				okText="确定"
				onCancel={onCancel}
				onOk={this.handleSubmit}>
				<Form >
					{this.renderForm(form)}
				</Form>
			</Modal>
		);
	}
}
const AddModel = Form.create()(AddModelForm);


export default connect()(AddModel);
