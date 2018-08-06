import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio,Select } from 'antd';
import { connect } from 'dva';
import { StatusOption } from '../../../../../components/FixedDataSource.js';

const FormItem = Form.Item;
const Option = Select.Option;
class AddModelForm extends Component {
	renderForm(form) {
		const { level } =this.props;
		const { categoryInfo } =this.props.internalSort;
		const {
			categoryLevelOne,
			categoryLevelTwo,
			categoryLevelThr,
			isLevelTwo,
      isLevelThr,
		} =this.props.internalSort.categoryList;
		const { getFieldDecorator } =form;
		switch(level) {
			case '1':
				return <div>
										<FormItem
											label="一级分类名称"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('name1', {
													rules: [{ required: true, message: '请输入分类名称' }],
													initialValue:categoryInfo.name
												})(
													<Input placeholder="请输入名称" autoComplete="off"/>
												)
											}
										</FormItem>
										<FormItem
											label="一级分类状态"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('statusModal', {
													rules: [{ required: true, message: '请选择状态' }],
													initialValue:categoryInfo.status,
												})(
													<Select placeholder="请选择" autoComplete="off">
														{
		                          StatusOption.map((el) => (
		                            <Select.Option
																	value={el.key}
																	key={el.key}>
																	{el.value}
																</Select.Option>
		                          ))
		                        }
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
												getFieldDecorator('name2', {
													rules: [{ required: true, message: '请输入分类名称' }],
													initialValue:categoryInfo.name
												})(
													<Input placeholder="请输入名称" autoComplete="off"/>
												)
											}
										</FormItem>
										<FormItem
											label="所属一级分类"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('pdCategoryId1', {
													rules: [{ required: true, message: '请选择' }],
													initialValue:categoryInfo.pdCategoryId1,
													onChange:(selected)=>this.props.onChange('2',selected)
												})(
													<Select placeholder="请选择" autoComplete="off">
														{
		                          categoryLevelOne.length>0&&categoryLevelOne.map((el) => (
		                            <Select.Option
																	value={el.pdCategoryId}
																	key={el.pdCategoryId}>
																	{el.name}
																</Select.Option>
		                          ))
		                        }
													</Select>
												)
											}
										</FormItem>
										<FormItem
											label="二级分类状态"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('statusModal', {
													rules: [{ required: true, message: '请选择' }],
													initialValue:categoryInfo.status
												})(
													<Select placeholder="请选择">
														{
		                          StatusOption.map((el) => (
		                            <Select.Option
																	value={el.key}
																	key={el.key}>
																	{el.value}
																</Select.Option>
		                          ))
		                        }
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
												getFieldDecorator('name3', {
													rules: [{ required: true, message: '请输入分类名称' }],
													initialValue:categoryInfo.name,
												})(
													<Input placeholder="请输入名称" autoComplete="off"/>
												)
											}
										</FormItem>
										<FormItem
											label="所属一级分类"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('pdCategoryId1', {
													rules: [{ required: true, message: '请选择' }],
													initialValue:categoryInfo.pdCategoryId1,
													onChange:(selected)=>this.props.onChange(2,selected)
												})(
													<Select placeholder="请选择" autoComplete="off">
														{
		                          categoryLevelOne.length>0&&categoryLevelOne.map((el) => (
		                            <Select.Option
																	value={el.key}
																	key={el.key}>
																	{el.name}
																</Select.Option>
		                          ))
		                        }
													</Select>
												)
											}
										</FormItem>
										<FormItem
											label="所属二级分类"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('pdCategoryId2', {
													rules: [{ required: true, message: '请选择' }],
													initialValue:categoryInfo.pdCategoryId2,
													onChange:(selected)=>this.props.onChange(3,selected)
												})(
													<Select placeholder="请选择" autoComplete="off">
														{
		                          categoryLevelTwo.length>0&&categoryLevelTwo.map((el) => (
		                            <Select.Option
																	value={el.key}
																	key={el.key}>
																	{el.name}
																</Select.Option>
		                          ))
		                        }
													</Select>
												)
											}
										</FormItem>
										<FormItem
											label="三级分类状态"
											labelCol={{ span: 5 }}
											wrapperCol={{ span: 12 }}>
											{
												getFieldDecorator('statusModal', {
													rules: [{ required: true, message: '请选择' }],
													initialValue:categoryInfo.status
												})(
													<Select placeholder="请选择">
														{
		                          StatusOption.map((el) => (
		                            <Select.Option value={el.key} key={el.key}>{el.value}</Select.Option>
		                          ))
		                        }
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
											getFieldDecorator('name4', {
												rules: [{ required: true, message: '请输入分类名称' }],
												initialValue:categoryInfo.name
											})(
												<Input placeholder="请输入名称" autoComplete="off"/>
											)
										}
									</FormItem>
									<FormItem
										label="所属一级分类"
										labelCol={{ span: 5 }}
										wrapperCol={{ span: 12 }}>
										{
											getFieldDecorator('pdCategoryId1', {
												rules: [{ required: true, message: '请选择' }],
												initialValue:categoryInfo.pdCategoryId1,
												onChange:(selected)=>this.props.onChange('2',selected)
											})(
												<Select placeholder="请选择" autoComplete="off">
													{
														categoryLevelOne.length>0&&categoryLevelOne.map((el) => (
															<Select.Option
																value={el.pdCategoryId}
																key={el.pdCategoryId}>
																{el.name}
															</Select.Option>
														))
													}
												</Select>
											)
										}
									</FormItem>
									<FormItem
										label="所属二级分类"
										labelCol={{ span: 5 }}
										wrapperCol={{ span: 12 }}>
										{
											getFieldDecorator('pdCategoryId2', {
												rules: [{ required: true, message: '请选择' }],
												initialValue:categoryInfo.pdCategoryId2,
												onChange:(selected)=>this.props.onChange('3',selected)
											})(
												<Select placeholder="请选择" autoComplete="off" disabled={isLevelTwo}>
													{
														categoryLevelTwo.length>0&&categoryLevelTwo.map((el) => (
															<Select.Option
																value={el.pdCategoryId}
																key={el.pdCategoryId}>
																{el.name}
															</Select.Option>
														))
													}
												</Select>
											)
										}
									</FormItem>
									<FormItem
										label="所属三级分类"
										labelCol={{ span: 5 }}
										wrapperCol={{ span: 12 }}>
										{
											getFieldDecorator('pdCategoryId3', {
												rules: [{ required: true, message: '请选择' }],
												initialValue:categoryInfo.pdCategoryId3,
												onChange:(selected)=>this.props.onChange('4',selected)
											})(
												<Select placeholder="请选择" autoComplete="off" disabled={isLevelThr}>
													{
														categoryLevelThr.length>0&&categoryLevelThr.map((el) => (
															<Select.Option
																value={el.pdCategoryId}
																key={el.pdCategoryId}>
																{el.name}
															</Select.Option>
														))
													}
												</Select>
											)
										}
									</FormItem>
									<FormItem
										label="四级分类状态"
										labelCol={{ span: 5 }}
										wrapperCol={{ span: 12 }}>
										{
											getFieldDecorator('statusModal', {
												rules: [{ required: true, message: '请选择' }],
												initialValue:categoryInfo.status
											})(
												<Select placeholder="请选择">
													{
	                          StatusOption.map((el) => (
	                            <Select.Option value={el.key} key={el.key}>{el.value}</Select.Option>
	                          ))
	                        }
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
    switch(this.props.level) {
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
				let index = Number(this.props.level);
				let name = values[`name${index}`];
				let parentId = values[`pdCategoryId${index-1}`];
				let params = {
					level:this.props.level,
					name,
					parentId:parentId?parentId:null,
					status:values.statusModal
				}
				this.props.onSubmit&&this.props.onSubmit(params)
      }
    });
  }
	onCancel() {
		this.props.form.resetFields();
		this.props.onCancel&&this.props.onCancel()
	}
	render(){
		const { visible, onCancel, onSubmit } = this.props;
		const form = this.props.form;
		return (
			<Modal
				visible={visible}
				title={this.getTitle()}
				okText="确定"
				onCancel={this.onCancel.bind(this)}
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
