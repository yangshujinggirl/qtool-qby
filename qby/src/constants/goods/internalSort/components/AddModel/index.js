import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio,Select, message } from 'antd';
import { connect } from 'dva';
import { StatusOption } from '../../../../../components/FixedDataSource.js';
import { goodSaveApi } from '../../../../../services/goodsCenter/internalSort';

const FormItem = Form.Item;
const Option = Select.Option;
class AddModelForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			handleName:''
		}
	}

	componentWillReceiveProps(props) {
		if(props.pdCategoryId != this.props.pdCategoryId) {
			this.initModal(props)
		}
	}
	initModal(props) {
		let handleName = '';
		//修改 or 新增
		if(props.pdCategoryId!='') {
			handleName = '修改';
		} else {
			handleName = '新增'
		}
		this.setState({
			handleName
		})
	}
	//表单渲染
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
	//标题渲染
	getTitle() {
		const { level, pdCategoryId } =this.props;
		const { handleName } =this.state;
    let title;

    switch(this.props.level) {
      case '1':
        title = '一级分类';
        break;
      case '2':
        title = '二级分类';
        break;
      case '3':
        title = '三级分类';
        break;
      case '4':
        title = '四级分类';
        break;
    }
		title = `${handleName}${title}`
    return title;
  }
	//提交
	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
			const { pdCategoryId, level } =this.props;
      if (!err) {
				let index = Number(level);
				let name = values[`name${index}`];
				let parentId = values[`pdCategoryId${index-1}`];
				let params = {
					level:level,
					name,
					parentId:parentId?parentId:null,
					status:values.statusModal
				}
				if(pdCategoryId!='') {
					params = {...params,pdCategoryId}
				}
				this.onSubmit(params)
      }
    });
  }
	//提交Api
  onSubmit(values,func) {
		this.setState({
			loading:true
		})
    goodSaveApi({pdCategory:values})
    .then(res => {
      const { code, message } =res;
      if( code == '0') {
        message.success(`${this.state.handleName}成功`,1);
				let payload;
				if(values.pdCategoryId!=''){
					payload = {
						...this.props.listParams,
						level:this.props.level
					}
				} else {
					payload = {
            level:this.props.level
          }
				}
				this.setState({
					loading:false
				})
        this.props.dispatch({
          type:'internalSort/fetchList',
          payload
        })
        this.onCancel();
      }
    },error=> {

    })
  }
	//取消
	onCancel() {
		this.props.form.resetFields();
		this.props.onCancel&&this.props.onCancel()
	}
	render(){
		const { visible, onCancel } = this.props;
		const form = this.props.form;
		return (
			<Modal
				className="goods-handle-modal-wrap"
				visible={visible}
				title={this.getTitle()}
				onCancel={this.onCancel.bind(this)}
				footer={null}>
				<div className="handle-modal-content">
					<Form >
						{this.renderForm(form)}
					</Form>
				</div>
				<div className="handle-modal-footer">
					<Button onClick={this.onCancel.bind(this)}>取消</Button>
					<Button
						type='primary'
						loading={this.state.loading}
						onClick={this.handleSubmit.bind(this)}>确认</Button>
				</div>
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
