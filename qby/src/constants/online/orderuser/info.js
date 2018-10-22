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
				this.props.infofetch(this.props.id); //刷新详情
			};
		})
	}
	render() {
		return (
			<div>
				<div className='clearfix' style={{height:'32px',lineHeight:"32px"}}>
					<div className='fl'>子单{this.props.listindex}信息</div>
					{
						(this.props.postgood && this.props.isdelivery)?
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
					{ this.props.status == 5 || this.props.status == 6 || this.props.status == 8 || this.props.status == 9
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
				dataIndex: 'amount'
			},
			{
				title: '实付价格',
				dataIndex: 'payAmount'
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
	}
    //获取订单信息列表
	infofetch=(id)=>{
		const values={ecOrderId:id}
		this.props.dispatch({ type: 'tab/loding', payload:true});
    const result=GetServerData('qerp.web.ec.od.userOrder.detail',values)
    result.then((res) => {
       return res;
    }).then((json) => {
			this.props.dispatch({ type: 'tab/loding', payload:false});
      if(json.code=='0'){
				const orderInfos=json.orderInfo
				const orderinfo=[
					{lable:'订单号',text:orderInfos.orderNo},
					{lable:'有赞订单',text:orderInfos.outNo},
					{lable:'下单时间',text:orderInfos.payTime},
					{lable:'订单状态',text:orderInfos.statusStr},
					{lable:'归属门店',text:orderInfos.shopName},
					{lable:'订单金额',text:orderInfos.amount},
					{lable:'实际支付金额',text:orderInfos.payAmount}
				]
				//收货信息
				const receiptinfo=[
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
			   	})
			}
    })
  }
	render(){
		console.log(this.state.newClearLogs)
		let {newClearLogs} = this.state;
		return(
			<div>
				<div className='mb10'>
					<Cardlist cardtitle='订单信息' cardlist={this.state.orderinfo}/>
				</div>
        <div className='mb10 list-cad'>
					<Cardlists cardtitle='收货信息'
						cardlist={this.state.receiptinfo}
						canedit={this.state.canedit}
						ecOrderId={this.props.data.id}
						recProvince={this.state.recProvince}
						recCity={this.state.recCity}
						recDistrict={this.state.recDistrict}
						recAddress={this.state.recAddress}
						infofetch={this.infofetch.bind(this)}
						editorder={this.props.data.editorder}
					/>
				</div>
				<div className='mb10'>
					<EditableTable
						columns={this.column1}
						dataSource={this.state.goodinfo}
            title='商品信息'
            bordered={true}
						footer={false}
					/>
				</div>
        {
					this.state.subOrderInfos.length>0
					?
					this.state.subOrderInfos.map((item,index)=>{
						return (
							<div className='mb10' key={index}>
								<EditableTable
									columns={this.column1}
									dataSource={item.subOrderinfo}
									title={<Tabletitle
											dispatch={this.props.dispatch}
											listindex={index+1}
											isdelivery={item.isDelivery}
											ecSuborderNo={item.ecSuborderNo}
											warehouseStr={item.warehouseStr}
											statusStr={item.statusStr}
											status={item.status}
											ecOrderId={this.props.data.id}
											infofetch={this.infofetch.bind(this)}
											postgood={this.props.data.postgood}
											id={this.props.data.id}
											ecSuborderId={item.ecSuborderId}
											/>}
									bordered={true}
									footer={false}/>
							</div>
						)
					})
					:null
                }
				<div className='mb10'>
					<EditableTable
						columns={this.column2}
						dataSource={this.state.logisticsInfos}
                        title="物流信息"
                        bordered={true}
						footer={false}/>
				</div>
        <div className='mb10'>
					<EditableTable
						columns={this.column3}
						dataSource={this.state.logs}
            title="订单日志"
            bordered={true}
						footer={false}/>
				</div>
				<div className='mb10'>
					<EditableTable
						columns={this.column3}
						dataSource={this.state.AuditLogs}
            title="杭州仓审核日志"
            bordered={true}
						footer={false}/>
				</div>
				{
					newClearLogs.map((item,index)=>{
						let title = "杭州仓清关日志（子单" + index+1 + ")";
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
	componentDidMount(){
		console.log(this.props.data)
		this.infofetch(this.props.data.id)
	}
}

function mapStateToProps(state) {
    const {headTitle,headTit,details,logs} = state.ordercg;
	return {headTitle,headTit,details,logs};
}
export default connect(mapStateToProps)(OrderuserInfo);
