import { message, Button } from 'antd';
import { connect } from 'dva';
import {GetServerData} from '../../../services/services';
import EditableTable from '../../../components/table/tablebasic';
import EditableTableInfo from '../../../components/table/table_info';
import Cardlist from '../../../components/table/cardlist';
import Cardlists from './cardlistedit';
import Shipeditmodel from './shipedit';


import './orderuser.css';

class Tabletitle extends React.Component {
	render() {
		return (
			<div>
				<div className='clearfix' style={{height:'32px',lineHeight:"32px"}}>
					<div className='fl'>子单{this.props.listindex}信息</div>
					{
						this.props.isdelivery?<div className='fr'><Shipeditmodel modeltit={'子单'+this.props.listindex+'信息'} ecOrderId={this.props.ecOrderId} ecSuborderNo={this.props.ecSuborderNo} infofetch={this.props.infofetch}/></div>:null
					}
				</div>
				<div className='clearfix'>
					<div className='cardlist_item fl'><label>子单号：</label><span>{this.props.ecSuborderNo}</span></div>
					<div className='cardlist_item fl'><label>保税仓库：</label><span>{this.props.warehouseStr}</span></div>
					<div className='cardlist_item fl'><label>子单状态：</label><span>{this.props.statusStr}</span></div>
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
			orderinfo:[],
			receiptinfo:[],
			canedit:false //是否显示修改收货地址按钮
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
        const result=GetServerData('qerp.web.ec.od.userOrder.detail',values)
        result.then((res) => {
           return res;
        }).then((json) => {
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

               	this.setState({
					goodinfo:json.goodinfo,
					subOrderInfos:json.subOrderInfos,
					logisticsInfos:json.logisticsInfos,
					logs:json.logs,
					orderinfo:orderinfo,
					receiptinfo:receiptinfo,
					canedit:(this.props.data.status=='-1' || this.props.data.status=='-2' )?true:false
			   	})
			}else{
				this.setState({
					goodinfo:[],
					subOrderInfos:[],
					logisticsInfos:[],
					logs:[],
					orderinfo:[],
					receiptinfo:[],
					canedit:false
			   	})
			}
        }) 
    }
	render(){
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
					recProvince={this.props.data.record.recProvince} 
					recCity={this.props.data.record.recCity}
					recDistrict={this.props.data.record.recDistrict}
					recAddress={this.props.data.record.recAddress}
					infofetch={this.infofetch.bind(this)}
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
											listindex={index+1} 
											isdelivery={item.isDelivery} 
											ecSuborderNo={item.ecSuborderNo}
											warehouseStr={item.warehouseStr}
											statusStr={item.statusStr}
											status={item.status}
											ecOrderId={this.props.data.id}
											infofetch={this.infofetch.bind(this)}
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
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.id)
	}
}

function mapStateToProps(state) {
    const {headTitle,headTit,details,logs} = state.ordercg;
	return {headTitle,headTit,details,logs};
}
export default connect(mapStateToProps)(OrderuserInfo);

