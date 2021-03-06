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
import NP from 'number-precision'

class AddThOrder extends Component{
	constructor(props) {
		super(props);
		this.state = {
			returnType:null,
			productList:[],
			freightQuota:null,
			loading:false,
			returnWay:null,
			uOrderChange:null
		};
	}
	//通过订单得到订单信息
	getOrderInfo =(e)=> {
		this.props.form.resetFields();
		const value = e.target.value;
		this.props.form.setFieldsValue({orderNo:value})
		if(value){
			this.setState({ //用户订单重新输入--->商品信息输入框重置
				uOrderChange:true,
			});
			getOrderInfoApi({orderNum:value})
			.then(res=>{
				if(res.code == '0'){
				res.productList[0]&&res.productList.map((item,index)=>{
					item.key = index
				});
				this.setState({
					returnType:res.returnType,
					orderType:res.orderType,
					productList:res.productList||[],
					freightQuota:res.freightQuota,
					recName:res.recName,
					recTelephone:res.recTelephone,
					recAddress:res.recAddress,
					orderId:res.orderId
				});
			};
		})
	 };
	}
	//合计退款
	getReturnSumQuota =()=> {
		const {productList=[],returnType,freightQuota} = this.state;
		let [haveReturnTotalCount,applyTotalCount,totalBuyCount,totalReturnMoney] = [0,0,0,0]
		productList&&productList.map( (item,index)=> {
			 haveReturnTotalCount = NP.plus( Number(item.returnCount),haveReturnTotalCount);//总的已退数量
			 totalBuyCount = NP.plus(Number(item.buyCount),totalBuyCount);//总的购买数量
			if(item.applyReturnCount) applyTotalCount = NP.plus(Number(item.applyReturnCount),applyTotalCount) ;//总的要退的数量
			if(item.applyReturnQuota) totalReturnMoney = NP.plus(Number(item.applyReturnQuota),totalReturnMoney) ;//总的退款金额
		});
		if(totalBuyCount == NP.plus(haveReturnTotalCount,applyTotalCount) && returnType==1){ //全退且是售中 + 运费
			if(totalReturnMoney >= 0){
				return NP.plus(totalReturnMoney,Number(freightQuota))
			}else{
				return null
			};
		}else{
			if(totalReturnMoney >= 0){
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
				this.setState({loading:true})
				for(var key in values){ //去除无用的参数
					if(key.includes('apply')){
						delete values[key]
					};
				};
				const {productList} = this.state;
				const goodsList = _.cloneDeep(productList);
				if(values.returnType && values.returnType=='售中退款')values.returnType = 1
				if(values.returnType && values.returnType=='售后退款')values.returnType = 2
				values.orderId = this.state.orderId;
				values.orderType = this.state.orderType;
				const newArr = 	goodsList.filter((item,index)=>{//需要检测退款数量有木有输入-->没有输入的数据不向后台输出
						return Boolean(item.applyReturnCount && (String(item.applyReturnQuota)!='') ) //applyReturnQuota可以为0不能为空
			 	});
				if(newArr[0]){ // 数量为0的 金额也为0
					// const isExistZero = newArr.find(item=>(
					// 	item.applyReturnQuota == 0
					// ));
					// if(isExistZero){
					// 	message.error('退款金额需大于0')
					// 	this.setState({loading:false})
					// }else{
						values.productList = newArr;
						this.sendRequest(values);
					// };
				}else{
					message.error('数据不完整，无法创建退单',.8)
					this.setState({loading:false})
				};
			};
		})
	}
	//发送请求
	sendRequest =(values)=> {
		saveThApi(values)
		.then(res=>{
			if(res.code =='0'){
				message.success('保存成功');
				this.props.dispatch({
						type:'tab/initDeletestate',
						payload:this.props.componkey
				});
				this.props.dispatch({
					type:'allth/fetchList',
					payload:{}
				});
				this.setState({loading:false});
			}else{
				this.setState({loading:false})
			}
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
	componentDidMount =()=> {
		console.log(NP.plus(2.3,2.4))
	}
	render(){
			const { getFieldDecorator } = this.props.form
			const {
				orderType,
				returnType,
				productList=[],
				loading,
				returnWay,
				freightQuota,
				recName,
				recTelephone,
				recAddress,
			} = this.state
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
                    {getFieldDecorator('orderNo', {
                        rules: [{ required: true, message: '请选择用户订单'}],
                    })(
											<Input onBlur={this.getOrderInfo}  autoComplete="off" placeholder='请输入仓库直邮订单号或保税子单号'/>
                    )}
                </FormItem>
								<FormItem
										label="退款类型"
										labelCol={{ span: 3,offset: 1 }}
										wrapperCol={{ span: 6 }}>
										{getFieldDecorator('returnType', {
											initialValue:returnType != null ? (returnType==2 ?'售后退款':'售中退款') : null
										})(
											<Input placeholder='请输入退款类型'  disabled autoComplete="off"/>
										)}
									</FormItem>
								{
									returnType==2||returnType==null?
										<FormItem
											label="退款方式"
											labelCol={{ span: 3,offset: 1 }}
											wrapperCol={{ span: 6 }}>
											{getFieldDecorator('returnWay', {
												onChange:this.onChange,
												rules: [{ required: true, message: '请输入退款方式'}],
											})(
												<RadioGroup>
									        <Radio style={radioStyle} value={1}>仅退款</Radio>
													<Radio style={radioStyle} value={2}>退货退款</Radio>
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
												initialValue:1
											})(
												<RadioGroup>
													<Radio style={radioStyle} value={1}>仅退款</Radio>
												</RadioGroup>
											)}
										</FormItem>
								}
								{
									returnWay==2?
									<div>
										<FormItem
											label="退货地址"
											labelCol={{ span: 3,offset: 1}}
											wrapperCol={{ span: 6 }}>
											{getFieldDecorator('acceptReturnOrderUserName', {
												rules: [{ required: true, message: '请输入姓名'}],
												initialValue:recName && orderType==4 ? recName : ''
											})(
												<Input placeholder="请输入姓名" autoComplete="off"/>
											)}
										</FormItem>
										<FormItem
											wrapperCol={{ span: 6,offset: 4}}>
											{getFieldDecorator('acceptReturnOrderUserPhone', {
													rules: [{ required: true, message: '请输入联系电话'}],
													initialValue:recTelephone && orderType==4 ?recTelephone:''
											})(
												<Input placeholder="请输入联系电话" autoComplete="off"/>
											)}
										</FormItem>
										<FormItem
											wrapperCol={{ span: 16,offset: 4 }}>
											{getFieldDecorator('returnPdAddress', {
												rules: [{ required: true, message: '请输入地址'}],
												initialValue:recAddress && orderType==4 ?recAddress:''
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
											form={this.props.form}
											FormItem={FormItem}
											productList = {productList}
											columns={1}
											returnType={returnType}
											productListChange={this.productListChange}
										/>
								</FormItem>
								{
							 		(returnType==1||orderType==5)&&
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
								<FormItem
									label="退单原因"
									labelCol={{ span: 3,offset: 1}}
									wrapperCol={{ span: 6 }}>
									{getFieldDecorator('returnReason', {
										rules: [{ required: true, message: '请输入退单原因' }]
									})(
										<Input placeholder="请输入退款原因、50字符以内" maxLength='50' autoComplete="off"/>
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
