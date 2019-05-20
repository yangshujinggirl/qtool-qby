import { message, Button } from 'antd';
import { connect } from 'dva';
import {GetServerData} from '../../../services/services';
import {dismissAuditApi} from "../../../services/online/orderuser"
import EditableTable from '../../../components/table/tablebasic';
import EditableTableInfo from '../../../components/table/table_info';
import Cardlist from '../../../components/table/cardlist';
import Cardlists from './cardlistedit';
import Shipeditmodel from './shipedit';



import './orderuser.css';

class Tabletitle extends React.Component {
	// 驳回审核
	dismissAudit =()=> {
		const {ecSuborderId} = this.props;
		dismissAuditApi({status:4,ecSuborderId})
		.then(res => {
			if(res.code == "0"){
				message.success("驳回审核成功");
				this.props.infofetch({ecOrderId:this.props.id}); //刷新详情
			};
		})
	}
	render() {
		return (
			<div>
				<div className='clearfix' style={{height:'32px',lineHeight:"32px"}}>
					<div className='fl'>子单{this.props.listindex}信息</div>
					{
						(this.props.editChange && this.props.isdelivery)?
						<div className='fr'>
							<Shipeditmodel
								modeltit={'子单'+this.props.listindex+'信息'}
								ecOrderId={this.props.ecOrderId}
								ecSuborderNo={this.props.ecSuborderNo}
								infofetch={this.props.infofetch}
								ecSuborderId={this.props.ecSuborderId}/>
						</div>:null
					}
				</div>
				<div className='clearfix'>
					<div className='cardlist_item fl'><label>子单号：</label><span>{this.props.ecSuborderNo}</span></div>
					<div className='cardlist_item fl'><label>保税仓库：</label><span>{this.props.warehouseStr}</span></div>
					<div className='cardlist_item fl'><label>子单状态：</label><span>{this.props.statusStr}</span></div>
					{ (this.props.pushPlatform == 10) && (this.props.status == 2 || this.props.status == 6 || this.props.status == 8 || this.props.status == 9)
							? <Button type="primary" className="dismiss_audit" onClick={this.dismissAudit}>驳回审核</Button>
							: null
					}
				</div>
      </div>
		);
	}
}



class OrderuserInfo extends React.Component{
	constructor(props) {
    super(props);
    this.state={
			goodinfo:[],
			subOrderInfos:[],
			logisticsInfos:[],
			logs:[],
			AuditLogs:[],
			cleanLogs:[],
			newClearLogs:[],
			orderinfo:[],
			receiptinfo:[],
			canedit:false, //是否显示修改收货地址按钮
			recProvince:null,
			recCity:null,
			recDistrict:null,
			recAddress:null
    }
    this.column1 = [
			{
      	title: '商品名称',
      	dataIndex: 'name'
			},
			{
      	title: '规格',
      	dataIndex: 'displayName'
			},
			{
      	title: '商品编码',
      	dataIndex: 'skuCode'
			},
			{
      	title: '商品数量',
      	dataIndex: 'qty'
			},
			{
      	title: '商品价格',
      	dataIndex: 'price'
	  	},
			{
				title: '应付价格',
				dataIndex: 'amount',
				render:(text,record,index)=>(
					record.priceType==1
					?<a>{text}(限时秒杀)</a>
					:(record.priceType == 2
						?<a>{text}(限时直降)</a>
						:<a>{text}</a>
						)
				)
			},
			{
				title: '实付价格',
				dataIndex: 'payAmount',
			}
		];
    this.column2 = [
			{
      	title: '子单号',
      	dataIndex: 'ecSuborderNo'
			},
			{
      	title: '保税仓库',
      	dataIndex: 'warehouseStr'
			},
			{
      	title: '物流公司',
      	dataIndex: 'name'
      },
      {
      	title: '物流单号',
      	dataIndex: 'expressNo'
      },
      {
      	title: '获取物流时间',
      	dataIndex: 'shipDate'
			}
    ];
    this.column3 = [
			{
      	title: '操作',
      	dataIndex: 'action'
			},
			{
      	title: '操作时间',
      	dataIndex: 'createTime'
			},
			{
      	title: '操作人',
      	dataIndex: 'user'
      },
      {
      	title: '备注',
      	dataIndex: 'content'
      }
		];
		this.column4 = [
			{
      	title: '商品名称',
      	dataIndex: 'name'
			},
			{
      	title: '规格',
      	dataIndex: 'displayName'
			},
			{
      	title: '商品编码',
      	dataIndex: 'skuCode'
			},
			{
      	title: '商品数量',
      	dataIndex: 'qty'
			},
			{
      	title: '商品价格',
      	dataIndex: 'price'
	  	},
			{
				title: '应付价格',
				dataIndex: 'amount',
				render:(text,record,index)=>(
					record.priceType==1
					?<a>{text}(限时秒杀)</a>
					:(record.priceType == 2
						?<a>{text}(限时直降)</a>
						:<a>{text}</a>
						)
				)
			},
			{
				title: '实付价格',
				dataIndex: 'payAmount',
			},{
				title: '已退数量',
				dataIndex: 'returnQty'
			},{
				title: '已退金额',
				dataIndex: 'returnMoney'
			}
		];
	}
	componentDidMount(){
		const {menus} = this.props.tab;
		const roleLists = (_.find(menus[0].children,{urResourceId:801000})).children;
		const {data} = this.props;
		let values = {};
		if(data.orderNo){ //用户订单页面跳转过来的保税订单
			values = {outNo:data.orderNo}
		};
		if(data.id){
			values = {ecOrderId:data.id}
		};
		this.infofetch(values);
		this.props.dispatch({
			type:'orderuser/setAuthority',
			payload:roleLists
		})
	}
    //获取订单信息列表
	infofetch =(values)=> {
		this.props.dispatch({ type: 'tab/loding', payload:true});
    const result = GetServerData('qerp.web.ec.od.userOrder.detail',values)
    result.then((res) => {
       return res;
    }).then((json) => {
			this.props.dispatch({ type: 'tab/loding', payload:false});
      if(json.code=='0'){
				const orderInfos = json.orderInfo;
				if(orderInfos){
					this.setState({
						ecOrderId:orderInfos.ecOrderId
					});
				};
				let orderinfo = [];
				if( this.props.data.record.channel == 1 ){ //有赞订单
					orderinfo=[
						{lable:'订单号',text:orderInfos.orderNo},
						{lable:'有赞订单',text:orderInfos.outNo},
						{lable:'下单时间',text:orderInfos.payTime},
						{lable:'订单状态',text:orderInfos.statusStr},
						{lable:'归属门店',text:orderInfos.shopName},
						{lable:'订单金额',text:orderInfos.amount},
						{lable:'实际支付金额',text:orderInfos.payAmount}
					];
				}else{ //用户订单(c端) -----> channel=2
					orderinfo=[
						{lable:'订单号',text:orderInfos.orderNo},
						{lable:'下单时间',text:orderInfos.payTime},
						{lable:'订单状态',text:orderInfos.statusStr},
						{lable:'归属门店',text:orderInfos.shopName},
						{lable:'订单金额',text:orderInfos.amount},
						{lable:'优惠金额',text:orderInfos.couponAmount},
						{lable:'优惠券',text:orderInfos.couponMoney},
						{lable:'优惠券批次号',text:orderInfos.couponCode},
						{lable:'来源',text:'c端'},
					];
			 };
			 if(this.props.data.record.channel == 2){
				 if(orderInfos.yzMerOrderNo.slice(0,2) == 'YH'){
					 orderinfo[1] = {lable:'虚拟单号',text:orderInfos.yzMerOrderNo}
				 }else{
					 orderinfo[1] = {lable:'虚拟单号',text:''}
				 };
			 };
				//收货信息
				const receiptinfo = [
					{lable:'姓名',text:orderInfos.idCardName},
					{lable:'身份证号',text:orderInfos.idCardNo},
					{lable:'收货人',text:orderInfos.recName},
					{lable:'收货电话',text:orderInfos.recTelephone},
					{lable:'收货地址',text:orderInfos.address}
				]
				const logs = json.logs;
				const AuditLogs = json.AuditLogs;
				const cleanLogs = json.cleanLogs;
				let [docNo,alldocNo,newClearLogs] = ["",[],[]];
				cleanLogs.map((item,index)=>{ //把出现的docNo放进一个数组中
					if(item.docNo != docNo){
						alldocNo.push(item.docNo);
						docNo = item.docNo;
					};
				});
				alldocNo.map((item,index) => {
					let name = "arr"+index;
					let obj = {
						name:[]
					};
					cleanLogs.map((subItem)=>{
						if(subItem.docNo == item){
							obj.name.push(subItem);
						};
						return subItem;
					});
					newClearLogs.push(obj.name);
					return item;
				});
				newClearLogs.map((item,index) => { //表格中的每个操作加子单数 微信推送失败-->子单3微信推送失败
					let len = item[0].docNo.length;
					let lastTwo = item[0].docNo.slice(len-2,len);
					let newIndex;
					if(Number(lastTwo)<10){
						newIndex = lastTwo.slice(1,2)
					}else{
						newIndex = lastTwo;
					};
					item.newIndex = newIndex;
					item.map(subItem=>{
						subItem.action = "子单"+newIndex+subItem.action;
					});
				});
       	this.setState({
					goodinfo:json.goodinfo,
					subOrderInfos:json.subOrderInfos,
					logisticsInfos:json.logisticsInfos,
					logs,
					AuditLogs,
					newClearLogs,
					orderinfo:orderinfo,
					receiptinfo:receiptinfo,
					canedit:(orderInfos.status=='-1' || orderInfos.status=='-2' || orderInfos.status== 10)?true:false,
					recProvince:orderInfos.recProvince,
					recCity:orderInfos.recCity,
					recDistrict:orderInfos.recDistrict,
					recAddress:orderInfos.recAddress
		   	})
			}else{
				this.setState({
					goodinfo:[],
					subOrderInfos:[],
					logisticsInfos:[],
					logs:[],
					newClearLogs:[],
					AuditLogs:[],
					orderinfo:[],
					receiptinfo:[],
					canedit:false,
					recProvince:null,
					recCity:null,
					recDistrict:null,
					recAddress:null
		   	});
			};
    })
  }
	render(){
		let {newClearLogs,goodinfo,subOrderInfos,ecOrderId} = this.state;
		goodinfo[0]&&goodinfo.map(item=>{ //skuCode不存在就取spuCode
			item.skuCode = item.skuCode || item.spuCode
		});
		subOrderInfos[0]&&subOrderInfos.map(item=>{
			if(item.subOrderDetails&&item.subOrderDetails[0]){
				item.subOrderDetails.map(subItem=>{
					subItem.skuCode = subItem.skuCode || subItem.spuCode
				});
			};
		})
		const {channel} = this.props.data.record;
		console.log(this.props)
		return(
			<div>
				<div className='mb10'>
					<Cardlist cardtitle='订单信息' cardlist={this.state.orderinfo}/>
				</div>
        <div className='mb10 list-cad'>
					<Cardlists cardtitle='收货信息'
						cardlist={this.state.receiptinfo}
						canedit={this.state.canedit}
						ecOrderId={ecOrderId}
						recProvince={this.state.recProvince}
						recCity={this.state.recCity}
						recDistrict={this.state.recDistrict}
						recAddress={this.state.recAddress}
						infofetch={this.infofetch.bind(this)}
						editChange={this.props.editChange}
					/>
				</div>
				<div className='mb10'>
					{
						goodinfo.length>0 &&
						<EditableTable
							columns={channel == 1 ? this.column1 : this.column4}
							dataSource={goodinfo}
	            title='商品信息'
	            bordered={true}
							footer={false}
						/>
					}
				</div>
        {
					subOrderInfos.length>0
					?
					subOrderInfos.map((item,index)=>{
						return (
							<div className='mb10' key={index}>
							{
								item.status != 10 ?
								<EditableTable
									columns={this.column1}
									dataSource={item.subOrderDetails}
									title={<Tabletitle
											dispatch={this.props.dispatch}
											listindex={index+1}
											isdelivery={item.isDelivery}
											ecSuborderNo={item.ecSuborderNo}
											warehouseStr={item.warehouseStr}
											pushPlatform={item.pushPlatform}
											statusStr={item.statusStr}
											status={item.status}
											ecOrderId={item.ecOrderId}
											infofetch={this.infofetch.bind(this)}
											editChange={this.props.editChange}
											id={this.props.data.id}
											ecSuborderId={item.ecSuborderId}
											/>}
									bordered={true}
									footer={false}/> : null
							}

							</div>
						)
					})
					:null
        }
				<div className='mb10'>
					{this.state.logisticsInfos.length>0 &&
						<EditableTable
							columns={this.column2}
							dataSource={this.state.logisticsInfos}
              title="物流信息"
              bordered={true}
							footer={false}/>
					}
				</div>
        <div className='mb10'>
					{this.state.logs.length>0 &&
						<EditableTable
							columns={this.column3}
							dataSource={this.state.logs}
	            title="订单日志"
	            bordered={true}
							footer={false}/>
					}
				</div>
				<div className='mb10'>
					{this.state.AuditLogs.length>0 &&
						<EditableTable
							columns={this.column3}
							dataSource={this.state.AuditLogs}
	            title="杭州仓审核日志"
	            bordered={true}
							footer={false}/>
					}
				</div>
				{
					newClearLogs.map((item,index)=>{
						let title = "杭州仓清关日志（子单" + item.newIndex + ")";
						return (
							<div className='mb10'>
								<EditableTable
									columns={this.column3}
									dataSource={item}
			            title={title}
			            bordered={true}
									footer={false}/>
							</div>
						)
					})
				}
			</div>
		)
	}

}

function mapStateToProps(state) {
	const { tab } =state;
  const {headTitle,headTit,details,logs} = state.ordercg;
	const {editChange} = state.orderuser;
	return {headTitle,headTit,details,logs,editChange,tab};
}
export default connect(mapStateToProps)(OrderuserInfo);
