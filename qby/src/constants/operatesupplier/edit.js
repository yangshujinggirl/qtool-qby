import React from 'react';
import {GetServerData} from '../../services/services';
import {deepcCloneObj} from '../../utils/commonFc';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col,DatePicker,Radio} from 'antd';
import moment from 'moment';
import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class OperatesupplierEditForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			bill:false,
			good:false,
			isAct:true, //只执行一次的标志
		}
	}
	componentDidMount(){
		this.props.formValue.billDay = null;
		this.props.formValue.goodDay = null;
		if(this.props.data){
			const payload={code:'qerp.web.pd.supplier.info',values:{'pdSupplierId':this.props.data.pdSupplierId}}
			//请求表单信息
			this.initDateEdit(payload)
		};
	}
	//请求页面初始化数据
	initDateEdit = (value) =>{
	  //请求用户信息
		this.props.dispatch({type:'operatesupplier/editfetch',payload:value})
		this.props.dispatch({ type: 'tab/loding', payload:true});
		if(this.props.formValue.billDay){
			this.setState({ bill:true,good:false })
		};
		if(this.props.formValue.goodDay){
			this.setState({ bill:false,good:true })
		};
	}
	componentWillReceiveProps(props){
		if(this.state.isAct){
			if(props.formValue.billDay){
				this.setState({ bill:true,good:false })
			};
			if(props.formValue.goodDay){
				this.setState({ bill:false,good:true })
			};
		}
		this.setState({isAct:false})
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
				payload:'405000edit'+this.props.data.pdSupplierId
			  });
		}else{
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:'405000edit'
			});
		}
	}

	//刷新列表
	refreshList=()=>{
		this.props.dispatch({
            type:'operatesupplier/fetch',
            payload:{code:'qerp.web.pd.supplier.query',values:this.props.values}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true})
	}
	//初始化state
	initState=()=>{
		this.props.dispatch({
      type:'operatesupplier/initState',
      payload:{}
		})
  }

	//保存
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
	    if (!err) {
        let data = values;
        if(values.taxRate == '-1'){
            data.taxRate == null;
        };
        if(this.props.data){
          data.pdSupplierId = this.props.data.pdSupplierId;
        };
				if(values.goodDay||values.billDay){
					values.dayPay = values.goodDay||values.billDay;
				}
				if(values.type==30){
					data.dayPay = 0;
				}
        const result=GetServerData('qerp.web.pd.supplier.save',data);
        result.then((res) => {
            return res;
        }).then((json) => {
          if(json.code=='0'){
						if(this.props.data){
							message.success('修改成功',.8);
						}else{
							message.success('新建成功',.8);
						};
						this.deleteTab();
						this.refreshList();
						this.initState();
          }else{
						message.error(json.message,.8);
					};
	      })
	    }else{
	        return false;
	    };
		});
	}

	//取消
	hindCancel=()=>{
		this.deleteTab()
		this.refreshList()
  }

	//账期类型变化的时候
	typeChange =(e)=> {

		const {value} = e.target;
		if(value == 10){
			this.setState({ bill:false,good:true })
		}else if(value == 20){
			this.setState({ bill:true,good:false })
		}else{
			this.setState({ bill:false,good:false })
		};
		this.props.form.setFields({
			goodDay:{value:null},
			billDay:{value:null}
		});
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
			marginBottom:'10px'
    };
   	return(
			<div className='supplierEdit'>
          	<Form className="addUser-form addcg-form">
                <FormItem
									label="供应商名称"
									labelCol={{ span: 3,offset: 1 }}
									wrapperCol={{ span: 6 }}>
									{getFieldDecorator('name', {
										rules: [{ required: true, message: '请填写供应商名称'}],
										initialValue:this.props.formValue.name
									})(
										<Input placeholder="请填写供应商名称" maxLength='32' autoComplete="off"/>
									)}
								</FormItem>
				                <FormItem
									label="供应商简称"
									labelCol={{ span: 3,offset: 1 }}
									wrapperCol={{ span: 6 }}>
									{getFieldDecorator('shortName', {
				                        rules: [{ required: true, message: '请填写供应商简称' }],
										initialValue:this.props.formValue.shortName
									})(
										<Input placeholder = "请填写供应商简称" autoComplete="off"/>
									)}
								</FormItem>
				                <FormItem
									label="联系人"
									labelCol={{ span: 3,offset: 1 }}
									wrapperCol={{ span: 6 }}>
									{getFieldDecorator('contactName', {
										initialValue:this.props.formValue.contactName
									})(
										<Input placeholder = "请填写联系人" autoComplete="off"/>
									)}
								</FormItem>
                <FormItem
									label="联系电话"
									labelCol={{ span: 3,offset: 1 }}
									wrapperCol={{ span: 6 }}>
									{getFieldDecorator('contactTel', {
										initialValue:this.props.formValue.contactTel
									})(
										<Input placeholder = "请填写联系电话" autoComplete="off"/>
									)}
								</FormItem>
                <FormItem
                    label="开户银行"
                    labelCol={{ span: 3,offset: 1 }}
										wrapperCol={{ span: 6 }}>
                    {getFieldDecorator('bankName', {
                        rules: [{ required: true, message: '请填写开户银行' }],
                        initialValue:this.props.formValue.bankName
                    })(
                        <Input placeholder = "请填写开户银行" autoComplete="off"/>
                    )}
                </FormItem>
                <FormItem
                    label="银行卡号"
                    labelCol={{ span: 3,offset: 1 }}
										wrapperCol={{ span: 6 }}>
                    {getFieldDecorator('bankNo', {
                        rules: [{ required: true, message: '请填写银行卡号' },{ pattern: /^[0-9]*$/, message: '银行卡号只能是数字' }],
                        initialValue:this.props.formValue.bankNo
                    })(
                        <Input placeholder = "请填写银行卡号" autoComplete="off"/>
                    )}
                </FormItem>
                <FormItem
                    label="开户名"
                    labelCol={{ span: 3,offset: 1 }}
										wrapperCol={{ span: 6 }}>
                    {getFieldDecorator('accountName', {
                        rules: [{ required: true, message: '请填写开户名' }],
                        initialValue:this.props.formValue.accountName
                    })(
                        <Input placeholder = "请填写开户名" autoComplete="off"/>
                    )}
                </FormItem>
								<Row>
		              <Col span={8}>
		                <FormItem
		                  label="账期类型"
		                  labelCol={{ span: 3,offset: 1 }}
		                  wrapperCol={{ span: 12 }}
		                >
		                  {getFieldDecorator('type',{
													initialValue:this.props.formValue.type,
		                      rules: [{ required: true, message: '请选择账期类型' }],
		                  })(
		                    <RadioGroup className='radio' onChange={this.typeChange}>
		                      <Radio style={radioStyle} value={30}>现结</Radio>
		                      <Radio style={radioStyle} value={10}>货到</Radio>
		                      <Radio style={radioStyle} value={20}>票到</Radio>
		                    </RadioGroup>
		                  )}
		                </FormItem>
		            </Col>
		            <Col span={6} className='pay'>
		                <FormItem>
		                  {getFieldDecorator('goodDay',{
												initialValue:this.props.formValue.goodDay,
		                    rules: [
													{ required: this.state.good , message: '请填写付款截至天数' },
													{pattern:/^[0-9]*$/,message: '只能输入数字'}
												],
		                  })(
		                      <Input className='daypay' disabled={!this.state.good} autoComplete="off"/>
		                  )}　个自然日付款
		                </FormItem>
		                <FormItem>
		                  {getFieldDecorator('billDay',{
		                    rules: [
													{ required: this.state.bill, message: '请填写付款截至天数' },
													{pattern:/^[0-9]*$/,message: '只能输入数字'}
												],
												initialValue:this.props.formValue.billDay,
		                  })(
		                      <Input className='daypay' disabled={!this.state.bill} autoComplete="off"/>
		                  )}　个自然日付款
		                </FormItem>
		              </Col>
		            </Row>
                <FormItem
                    label="含税税率"
                    labelCol={{ span: 3,offset: 1 }}
										wrapperCol={{ span: 6 }}>
                    {getFieldDecorator('taxRate', {
                        rules: [{ required: true, message: '请选择含税税率' }],
                        initialValue:this.props.formValue.taxRate
                    })(
                        <Select  placeholder="请选择含税税率">
                            <Option value='-1'>不含税</Option>
                            <Option value='0'>0%</Option>
                            <Option value='3'>3%</Option>
                            <Option value='6'>6%</Option>
														<Option value='9'>9%</Option>
														<Option value='10'>10%</Option>
                            <Option value='11'>11%</Option>
														<Option value='13'>13%</Option>
														<Option value='16'>16%</Option>
                            <Option value='17'>17%</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="合作状态"
                    labelCol={{ span: 3,offset: 1 }}
										wrapperCol={{ span: 6 }}>
                    {getFieldDecorator('status', {
                        rules: [{ required: true, message: '请选择合作状态' }],
                        initialValue:this.props.formValue.status
                    })(
                        <Select  placeholder="请选择合作状态">
                            <Option value='10'>合作中</Option>
                            <Option value='20'>待合作</Option>
                            <Option value='21'>停止合作</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="供应商备注"
                    labelCol={{ span: 3,offset: 1 }}
										wrapperCol={{ span: 6 }}>
                    {getFieldDecorator('remark', {
                        initialValue:this.props.formValue.remark
                    })(
                        <Input type="textarea"
													rows={4}
													placeholder="请输入供应商备注，50字符以内"
													maxLength='50'
													autoComplete="off"/>
                    )}
                </FormItem>
	            	<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
	              		<Button className='mr30' onClick={this.hindCancel.bind(this)}>取消</Button>
	              		<Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
	            	</FormItem>
          	</Form>
					</div>
      	)
  	}

}
function mapStateToProps(state) {
    const {values,formValue} = state.operatesupplier;
    return {values,formValue};
}

const OperatesupplierEdit = Form.create()(OperatesupplierEditForm);
export default connect(mapStateToProps)(OperatesupplierEdit);
