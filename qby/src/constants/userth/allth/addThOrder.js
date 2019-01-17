import {Component} from 'react';
import { connect } from 'dva';
import { Table,Form, Select, Input, Button ,message,DatePicker,Radio} from 'antd';
import moment from 'moment';
import {saveThApi,getOrderInfoApi} from '../../../services/orderCenter/userth/allth'
import TableList from './components/TableList'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
import './index.less'

class AddThOrder extends Component{
	constructor(props) {
		super(props);
		this.state = {
			returnType:null,
			productList:[],
			freightQuota:null,
			isC:null,
			loading:false,
			returnWay:null,
		};
	}
	//通过订单得到订单信息
	getOrderInfo =(e)=> {
		const value = e.target.value;
		if(value){
			if(value.slice(0,2) == 'YH'){ //有赞
				this.setState({
					isC:false
				});
			}else{
				this.setState({
					isC:true,
					returnWay:null
				});
			};
			getOrderInfoApi({orderNum:value})
			.then(res=>{
				if(res.code == '0'){
				// const response ={
				// 	productList:[
				// 		{ pdSpuId:'111',
				// 			pdSkuId:'222',
				// 			pdCode:1111111111,
				// 			pdName:'有wefwefcweffsdfsdssss',
				// 			displayName:1,
				// 			buyCount:3,
				// 			returnCount:1,
				// 			orderQuota:20,
				// 			canReturnQuota:2,
				// 			returnQuota:6.67,
				// 			applyReturnCount:null,
				// 			applyReturnQuota:null,
				// 		},
				// 		{
				// 			pdSpuId:'111',
				// 			pdSkuId:'222',
				// 			pdCode:1111121, //商品code
				// 			pdName:'有wefdfsdssss', //商品名称
				// 			displayName:1, //规格
				// 			buyCount:3, //购买数量
				// 			returnCount:1, //已退数量
				// 			orderQuota:10, //实付金额
				// 			canReturnQuota:2, //可退金额
				// 			returnQuota:3.33 //已退金额
				// 		},
				// 	],
				// 		returnType:0, //退款类型 0售中  1售后
				// 		freightQuota:2 //运费
				// };
				res.productList.map((item,index)=>{
					item.key = index
				});
				this.setState({
					returnType:response.returnType,
					productList:response.productList,
					freightQuota:response.freightQuota
				});
			};
		})
	 };
	}
	//合计退款
	getReturnSumQuota =()=> {
		const {productList,returnType,freightQuota} = this.state;
		let [surplusTotalCount,applyTotalCount,totalReturnMoney] = [0,0,0]
		productList.map( (item,index)=> {
			if(item.buyCount && item.returnCount) surplusTotalCount += (item.buyCount-item.returnCount);
			if(item.applyReturnCount) applyTotalCount += item.applyReturnCount
			if(item.applyReturnQuota) totalReturnMoney += item.applyReturnQuota
		});
		if(surplusTotalCount == applyTotalCount && !returnType){ //全退且是售中 + 运费
			if(totalReturnMoney > 0){
				return totalReturnMoney + freightQuota
			}else{
				return null
			}
		}else{
			if(totalReturnMoney > 0){
				return totalReturnMoney
			}else{
				return null
			};
		};
	}
	//保存
	handleSubmit =()=> {
		this.props.form.validateFieldsAndScroll((err, values) => {
			if(!err){
				for(var key in values){
					if(key.includes('apply')){
						delete values[key]
					};
				};
				if(values.returnType&&values.returnType=='售中退款')values.returnType=0
				if(values.returnType&&values.returnType=='售后退款')values.returnType=1
				values.productList = this.state.productList;
				this.sendRequest(values)
			};
		})
	}
	//发送请求
	sendRequest =(values)=> {
		this.setState({loading:true})
		saveThApi(values)
		.then(res=>{
			if(res.code =='0'){
				this.setState({loading:false})
				message.success('保存成功')
			};
		})
	}
	//取消
	onCancel =()=> {
		this.props.dispatch({
				type:'tab/initDeletestate',
				payload:this.props.componkey
		});
	}
	//退款方式辩护
	onChange =(e)=> {
		const {value} = e.target;
		this.setState({
			returnWay:value
		})
	}
	productListChange =(productList)=> {
		this.setState({
		  productList
		});
	}
	render(){
			const { getFieldDecorator } = this.props.form
			const {returnType,productList,loading,isC,returnWay,freightQuota} = this.state
			const radioStyle = {
	      display: 'block',
	      height: '30px',
	      lineHeight: '30px',
	    };

     	return(
          	<Form className="addUser-form addcg-form addThorder">
                <FormItem
                    label="用户订单"
                    labelCol={{ span: 3,offset: 1 }}
                    wrapperCol={{ span: 6 }}
                >
                    {getFieldDecorator('orderNum', {
                        rules: [{ required: true, message: '请选择用户订单'}],
                    })(
											<Input onBlur={this.getOrderInfo}  autoComplete="off"/>
                    )}
                </FormItem>
								{
									isC ?
										<div>
											<FormItem
													label="退款类型"
													labelCol={{ span: 3,offset: 1 }}
													wrapperCol={{ span: 6 }}>
													{getFieldDecorator('returnType', {
														initialValue:returnType != null ? (returnType ?'售后退款':'售中退款') : null
													})(
														<Input placeholder='请输入退款类型'  disabled autoComplete="off"/>
													)}
												</FormItem>
											{
												returnType||returnType==null?
													<FormItem
														label="退款方式"
														labelCol={{ span: 3,offset: 1 }}
														wrapperCol={{ span: 6 }}>
														{getFieldDecorator('returnWay', {
															onChange:this.onChange,
															rules: [{ required: true, message: '请输入退款方式'}],
														})(
															<RadioGroup>
												        <Radio style={radioStyle} value={0}>仅退款</Radio>
												        <Radio style={radioStyle} value={1}>退货退款</Radio>
												      </RadioGroup>
														)}
													</FormItem>
												:
													<FormItem
														label="退款方式"
														labelCol={{ span: 3,offset: 1 }}
														wrapperCol={{ span: 6 }}>
														{getFieldDecorator('returnWay', {
															rules: [{ required: true, message: '请输入退款方式'}],
															initialValue:0
														})(
															<RadioGroup>
																<Radio style={radioStyle} value={0}>仅退款</Radio>
															</RadioGroup>
														)}
													</FormItem>
											}
											{
												returnWay?
												<div>
													<FormItem
														label="退货地址"
														labelCol={{ span: 3,offset: 1}}
														wrapperCol={{ span: 6 }}>
														{getFieldDecorator('acceptReturnOrderUserName', {
															rules: [{ required: true, message: '请输入姓名'}],
														})(
															<Input placeholder="请输入姓名" autoComplete="off"/>
														)}
													</FormItem>
													<FormItem
														wrapperCol={{ span: 6,offset: 4}}>
														{getFieldDecorator('acceptReturnOrderUserPhone', {
																rules: [{ required: true, message: '请输入联系电话'}],
														})(
															<Input placeholder="请输入联系电话" autoComplete="off"/>
														)}
													</FormItem>
													<FormItem
														wrapperCol={{ span: 6,offset: 4 }}>
														{getFieldDecorator('returnPdAddress', {
															rules: [{ required: true, message: '请输入地址'}],
														})(
															<Input placeholder="请输入地址" autoComplete="off"/>
														)}
													</FormItem>
												</div>
												:null
											}
			                <FormItem
												label="商品信息"
												labelCol={{ span: 3,offset: 1 }}
												wrapperCol={{ span: 24 }}>
													<TableList
														productList = {productList}
														columns={1}
														returnType={returnType}
														productListChange={this.productListChange}
													/>
											</FormItem>
											{
										 		returnType==0&&
												<FormItem
												 label="运费"
												 labelCol={{ span: 3,offset: 1 }}
												 wrapperCol={{ span: 6 }}>
												 	{freightQuota}
												</FormItem>
											}

			                <FormItem
			              		label="合计退款"
			              		labelCol={{ span: 3,offset: 1 }}
			              		wrapperCol={{ span: 6 }}>
												{getFieldDecorator('returnSumQuota', {
													initialValue:this.getReturnSumQuota()
												})(
													<Input disabled placeholder="请输入合计退款" autoComplete="off"/>
			              		)}
			            		</FormItem>
										</div>
									:
											<FormItem
												label="商品信息"
												labelCol={{ span: 3,offset: 1 }}
												wrapperCol={{ span: 16 }}>
														<TableList
															productList = {productList}
															columns={2}
															returnType={returnType}
															productListChange={this.productListChange}
														/>
											</FormItem>
								}
								<FormItem
									label="退单原因"
									labelCol={{ span: 3,offset: 1}}
									wrapperCol={{ span: 6 }}>
									{getFieldDecorator('returnReason', {
										rules: [{ required: true, message: '请输入退单原因' }]
									})(
										<Input placeholder="请输入退单原因"  autoComplete="off"/>

									)}
								</FormItem>
	            	<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
	              		<Button className='mr30' onClick={this.onCancel}>取消</Button>
	              		<Button type="primary" onClick={this.handleSubmit} loading={loading}>保存</Button>
	            	</FormItem>
          	</Form>

      	)
  	}
}
function mapStateToProps(state){
  const { allth } = state;
  return { allth }
}
const AddThOrders = Form.create()(AddThOrder);
export default connect(mapStateToProps)(AddThOrders);
