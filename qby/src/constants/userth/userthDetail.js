import React from 'react';
import EditableTable from '../../components/table/tablebasic';
import { Button,Icon,Form,Select,Input,Card,message,Radio,Modal} from 'antd';
import { getInfoApi } from '../../services/orderCenter/userth/allth'
import { auditApi } from '../../services/orderCenter/userth/toAudit'
import { connect } from 'dva';
import Imgmodel from '../../components/model/modelimg';
import './index.less'

const TextArea = Input.TextArea;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

class UserthDetail extends React.Component{
	constructor(props) {
		super(props);
    this.state={
      value:'',
			backInfos:{},
			goodInfos:[],
			orderLogs:[],
			describes:{},
			recInformation:{
				recAddress:'',
				recName:'',
				recTelephone:'',
				orderType:''
			}
    },
		this.columns1 = [{
			title: '商品名称',
			dataIndex: 'spuName',
      key:'1'
		}, {
			title: '商品规格',
			dataIndex: 'displayName',
      key:'2'
		}, {
			title: '商品编码',
			dataIndex: 'code',
      key:'3'
		}, {
			title: '购买数量',
			dataIndex: 'qty',
      key:'4'
		},{
			title: '实付金额',
			dataIndex: 'qty',
      key:'5'
		},{
			title: '退款数量',
			dataIndex: 'qty',
      key:'6'
		}, {
			title: '退款金额',
			dataIndex: 'returnPrice',
      key:'7',
			render:(text,record,index)=>{

				const handlePrice =(rule,value,callback)=> {
					if(value && value > record.returnPrice){
						message.error('修改范围为（0，'+record.returnPrice+')');
					};
				};
				const { getFieldDecorator } = this.props;
				return(
					record.returnType ?
					<Form>
						<FormItem>
							{
								getFieldDecorator('currentPrice',{
									rules:[
										{ pattern:/^\d+(\.\d{0,2})?$/,message:'请输入小于等于两位小数的数字' },
										{ validator:this.handlePrice }
									],
									initialValue:record.returnPrice
								})(
									<Input onBlur={(e)=>this.getCurrentPrice(index)}/>
								)
							}
						</FormItem>
					</Form>
					: <div>{text}</div>
				)
			}
		}];

		this.columns2 = [{
			title: '操作',
			dataIndex: 'qerpAction',
			key:'1'
		}, {
			title: '操作时间',
			dataIndex: 'createTime',
			key:'2'
		}, {
			title: '操作人',
			dataIndex: 'user',
			key:'3'
		}, {
			title: '备注',
			dataIndex: 'remark',
			key:'4'
		}];
}
//初始化
componentWillMount(){
	const {orderReturnId} = this.props.data;
	getInfoApi({orderReturnId}).then(res => {
		if(res.code=='0' && res.pdOrderReturnDetailPage){
			this.setState({
				backInfos:res.pdOrderReturnDetailPage.returnOrderBaseInfo,
	      goodInfos:res.pdOrderReturnDetailPage.pdOrderReturnDetail,
				orderLogs:res.pdOrderReturnDetailPage.pdOrderReturnLog,
				describes:res.pdOrderReturnDetailPage.pdOrderReturnDetailDescribe,
				recInformation:res.pdOrderReturnDetailPage.recInformation||this.state.recInformation,
			},()=>{
				const {goodInfos} = this.state;
				let orderDetails = [];
				goodInfos.map((item,index)=>{
					let {pdSpuId,pdSkuId} = item;
					orderDetails[index] = {pdSpuId,pdSkuId,currentPrice:item.returnPrice}
				});
				this.setState({
					orderDetails
				});
			})
		}
	},err => {
		message.error(err.message)
	})
}
//获取金额
getCurrentPrice =(e,index)=> {
	const currentPrice = e.target.value;
}
//单选按钮 的变化
onChange = (e) => {
  console.log('radio checked', e.target.value);
  this.setState({
    value: e.target.value,
  });
}
//拒绝买家退款
refuse =()=> {
	this.props.form.validateFieldsAndScroll((err,values)=>{
		if(!err){
			if(!values.refuseReason){
				message.error('请输入拒绝原因,50字符以内')
			}else{
				confirm({
					content:'是否确认此操作',
					onOk:()=>{
						this.sendRequest(values)
					},
				});
			};
		};
	});
}
sendRequest =(values)=> {
	auditApi(values)
	.then(res=>{
		if(res.code == 0){
			const componkey = this.props.componkey.replace('info','');
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:`${componkey}edit`+this.props.data.orderId
			});
			this.props.dispatch({
        type:'toAudit/fetchList',
        payload:{}
	    });
			message.success("审核完成")
		};
	})
}
//同意买家退款
agree =()=> {
	this.props.form.validateFieldsAndScroll((err,values)=>{
		const {orderDetails} = this.state;
		const {orderReturnId} = this.props.data;
		values.orderType = this.props.data.type;
		const params = {orderDetails,orderReturnId,opType:1,...values}
		if(!err){
			if(this.props.data.type == 2 && !values.returnWay){//是售后才会有退款方式才需要校验
				message.error('请选择退款方式')
			}else{
				confirm({
					content:'是否确认此操作',
					onOk:()=>{
						this.sendRequest(params)
					},
				});
			};
		};
	});
}
render(){
	console.log(this.state.orderDetails)
  const {backInfos,goodInfos,orderLogs,describes,value} = this.state;
	const {recAddress,recName,recTelephone,orderType} = this.state.recInformation
	const fileDomain = eval(sessionStorage.getItem('fileDomain'));
	if(orderLogs && orderLogs[0]){
		orderLogs.map((item,index)=>{
			item.key = index;
			return item;
		});
	}
  const {getFieldDecorator} = this.props.form;
	const { type } = this.props.data;//type---->  1:审核售中 2：审核售后  detail:单纯的详情
  const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
	return(
			<div className='userth-detail'>
        <div className='mb10'>
					<Card title='退单信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>退单号：</label><span>{backInfos.orderReturnNo}</span></div>
                <div className='cardlist_item'><label>用户订单号：</label><span>{backInfos.orderNo}</span></div>
                <div className='cardlist_item'><label>用户手机号：</label><span>{backInfos.userMoblie}</span></div>
                <div className='cardlist_item'><label>用户昵称：</label><span>{backInfos.userName}</span></div>
                <div className='cardlist_item'><label>生成时间：</label><span>{backInfos.createTime}</span></div>
                <div className='cardlist_item'><label>退款类型：</label><span>{backInfos.returnTypeStr}</span></div>
                <div className='cardlist_item'><label>退款方式：</label><span>{backInfos.returnWayStr }</span></div>
                <div className='cardlist_item'><label>退单状态：</label><span>{backInfos.returnStatusStr}</span></div>
                <div className='cardlist_item'><label>退款总金额：</label><span>{backInfos.actualAmount}</span></div>
                <div className='cardlist_item'><label>退款原因：</label><span>{backInfos.returnReason}</span></div>
                <div className='cardlist_item'><label>快递单号：</label><span>{backInfos.orderExpressNo}</span></div>
                <div className='cardlist_item'><label>退款地址：</label><span>{backInfos.userAddress}</span></div>
            </div>
          </Card>
        </div>
        <div className='mb20'>
          <EditableTable
            columns={this.columns1}
            title='商品信息'
            bordered={true}
            dataSource = { goodInfos }
          />
        </div>
				{ type == '1' &&
	        <div style={{padding:'10px 0',border:'1px solid #e8e8e8',margin:'10px 0',marginBottom:"10px"}}>
						<p style={{borderBottom:'1px solid #e8e8e8',padding:'5px 10px 15px'}}>详细描述</p>
						<Form className='mt20'>
							<FormItem
								label="退款原因"
								labelCol={{ span: 2 }}
								wrapperCol={{ span: 12 }}
							>
								<div>{describes.returnReason}</div>
							</FormItem>
	            <FormItem
								label="详细描述"
								labelCol={{ span: 2 }}
								wrapperCol={{ span: 12 }}
							>
								<div>{describes.detailedDescription}</div>
							</FormItem>
							<FormItem
								label="图片"
								labelCol={{ span: 2 }}
								wrapperCol={{ span: 12 }}
							>
									{
										describes.picUrl && describes.picUrl.map(item=>(
											<Imgmodel picUrl={fileDomain+item}/>
										))
									}
							</FormItem>
	  				</Form>
					</div>
				}
				{
					(type == '1'|| type == '0') &&
					<div style={{padding:'10px 0',border:'1px solid #e8e8e8',marginBottom:"10px"}}>
						<p style={{borderBottom:'1px solid #e8e8e8',padding:'5px 10px 15px'}}>退单处理</p>
						<Form className='mt20'>
							{
								type == '1' &&
								<div>
										<FormItem
											label="退款方式"
											labelCol={{ span: 2 }}
											wrapperCol={{ span: 12 }}
										>
					            {getFieldDecorator('returnWay',{
					              initialValue:value
						            })(
						              <RadioGroup onChange={this.onChange}>
						                <Radio style={radioStyle} value={0}>仅退款</Radio>
						                <Radio style={radioStyle} value={1}>退货退款</Radio>
						              </RadioGroup>
					            	)}
										</FormItem>
										{value == 1 &&
											<div>
												<FormItem
													label="退货地址"
													labelCol={{ span: 3,offset: 1}}
													wrapperCol={{ span: 6 }}>
													{getFieldDecorator('returnName', {
														rules: [{ required: true, message: '请输入姓名'}],
														initialValue:recName && orderType==4 ? recName : ''
													})(
														<Input placeholder="请输入姓名" autoComplete="off"/>
													)}
												</FormItem>
												<FormItem
													wrapperCol={{ span: 6,offset: 4}}>
													{getFieldDecorator('returnMobile', {
															rules: [{ required: true, message: '请输入联系电话'}],
															initialValue:recTelephone && orderType==4 ?recTelephone:''
													})(
														<Input placeholder="请输入联系电话" autoComplete="off"/>
													)}
												</FormItem>
												<FormItem
													wrapperCol={{ span: 16,offset: 4 }}>
													{getFieldDecorator('returnAddress', {
														rules: [{ required: true, message: '请输入地址'}],
														initialValue:recAddress && orderType==4 ?recAddress:''
													})(
														<Input placeholder="请输入地址" autoComplete="off"/>
													)}
												</FormItem>
											</div>}
									</div>
								}
								<FormItem
									label="拒绝原因"
									labelCol={{ span: 2 }}
									wrapperCol={{ span: 12 }}
								>
		            {getFieldDecorator('refuseReason',{
		            })(
		              <TextArea rows={4}   placeholder='限制50字符以内' maxLength='200'/>
		            )}
								</FormItem>
		  				</Form>
							<div className='reason-btn'>
								<Button size='large' className='btn' onClick={this.refuse}>拒绝买家退款</Button>
								<Button type="primary" size='large' onClick={this.agree}>同意买家退款</Button>
							</div>
					</div>
				}
				{
					type=='detail' &&
					<div className='mb20'>
	          <EditableTable
	            columns={this.columns2}
	            title='订单日志'
	            bordered={true}
	            dataSource = { orderLogs }
	          />
	        </div>
				}
			</div>
		)}
}

const UserthDetails = Form.create({})(UserthDetail)
function mapStateToProps(state){
	const { toAudit } = state;
	return toAudit;
}
export default connect(mapStateToProps)(UserthDetails);
