import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio,Select } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;
class AddModelForm extends Component {
	renderForm(form) {
		const { type } =this.props;
		const { detailData } =this.props.internalSort;
		const { getFieldDecorator } =form;
		switch(type) {
			case '1':
				return <div>
										<FormItem
											label="一级分类名称"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('pdCategory1Name', {
													rules: [{ required: true, message: '请输入分类名称' }],
													initialValue:detailData.pdCategory1Name
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
												getFieldDecorator('status', {
													rules: [{ required: true, message: '请选择' }],
													initialValue:detailData.status
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
												getFieldDecorator('pdCategory2Name', {
													rules: [{ required: true, message: '请输入分类名称' }],
													initialValue:detailData.pdCategory2Name
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
												getFieldDecorator('pdCategory1Id', {
													rules: [{ required: true, message: '请选择' }],
													initialValue:detailData.pdCategory1Id
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
												getFieldDecorator('status', {
													rules: [{ required: true, message: '请选择' }],
													initialValue:detailData.status
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
													initialValue:detailData.pdCategory3Name
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
												getFieldDecorator('pdCategory1Id', {
													rules: [{ required: true, message: '请选择' }],
													initialValue:detailData.pdCategory1Id
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
												getFieldDecorator('pdCategory2Id', {
													rules: [{ required: true, message: '请选择' }],
													initialValue:detailData.pdCategory2Id
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
												getFieldDecorator('status', {
													rules: [{ required: true, message: '请选择' }],
													initialValue:detailData.status
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
											getFieldDecorator('pdCategory4Name', {
												rules: [{ required: true, message: '请输入分类名称' }],
												initialValue:detailData.pdCategory4Name
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
											getFieldDecorator('pdCategory1Id', {
												rules: [{ required: true, message: '请选择' }],
												initialValue:detailData.pdCategory1Id
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
											getFieldDecorator('pdCategory2Id', {
												rules: [{ required: true, message: '请选择' }],
												initialValue:detailData.pdCategory2Id
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
											getFieldDecorator('pdCategory3Id', {
												rules: [{ required: true, message: '请选择' }],
												initialValue:detailData.pdCategory3Id
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
											getFieldDecorator('status', {
												rules: [{ required: true, message: '请选择' }],
												initialValue:detailData.status
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
function mapStateToProps(state) {
	const { internalSort } = state;
	return { internalSort };
}

export default connect(mapStateToProps)(AddModel);
