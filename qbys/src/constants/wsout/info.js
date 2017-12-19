import { connect } from 'dva';
import EditableTableInfo from '../../components/table/table_info';
import EditableTable from '../../components/table/tablelimit';
import Cardlist from '../../components/table/cardlist';

class WarehouseInfo extends React.Component{
	constructor(props) {
		super(props);
		this.columns1 = [{
			title: '商品条码',
			dataIndex: 'pdSkuBarcode'
		}, {
			title: '库位',
			dataIndex: 'binCode'
		}, {
			title: '批次',
			dataIndex: 'lotStr'
		}, {
			title: '商品名称',
			dataIndex: 'pdSpuName'
		}, {
			title: '商品规格',
			dataIndex: 'pdSkuDisplayName'
		},{
			title: '配货数量',
			dataIndex: 'planQty'
		}];

		this.columns2 = [{
			title: '快递单号',
			dataIndex: 'expressCode'
		}, {
			title: '快递公司',
			dataIndex: 'expressCompany'
		}, {
			title: '快递费用',
			dataIndex: 'expressFee'
		}];
		
		this.columns3 = [{
			title: '操作',
			dataIndex: 'operateName'
		}, {
			title: '操作时间',
			dataIndex: 'operateTime'
		}, {
			title: '订单状态',
			dataIndex: 'statusStr'
		}, {
			title: '操作人',
			dataIndex: 'operateUser'
		}];
	}

	infoFetch=(id)=>{
		this.props.dispatch({
			type:'warehouse/infofetch',
			payload:{code:'qerp.web.ws.order.info',values:{wsOrderId:id}}
		})
		this.props.dispatch({type:'tab/loding',payload:true})
	}
	detailFetch=(id)=>{
		this.props.dispatch({
			type:'warehouse/detailfetch',
			payload:{code:'qerp.web.ws.order.detail.page',values:{wsOrderId:id,limit:this.props.detallimit,currentPage:0}}
		})
		this.props.dispatch({type:'tab/loding',payload:true})
	}
	pageChange=(page)=>{
		this.props.dispatch({
			type:'warehouse/detailfetch',
			payload:{code:'qerp.web.ws.order.detail.page',values:{wsOrderId:this.props.data.wsOrderId,limit:this.props.detallimit,currentPage:Number(page.current)-1}}
		})
		this.props.dispatch({type:'tab/loding',payload:true})
	}
	render(){
		return(
			<div>
				<div className='mb10'><Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/></div>
				<div className='mb10'><EditableTable columns={this.columns1} dataSource={this.props.details} title={this.props.detailstitle} total={this.props.detaltotol} limit={this.props.detallimit} pageChange={this.pageChange.bind(this)} currentPage={this.props.detalcurrentPage}/></div>
				<div className='mb10'><EditableTableInfo columns={this.columns2} data={this.props.expressInfos} title={this.props.expressInfostit}/></div>
				<div className='mb10'><EditableTableInfo columns={this.columns3} data={this.props.logs} title={this.props.logstitle}/></div>
			</div>
		)
	}
	componentDidMount(){
		this.infoFetch(this.props.data.wsOrderId)
		this.detailFetch(this.props.data.wsOrderId)
	}
}

function mapStateToProps(state) {
	const {cardtitle,cardlist,logstitle,logs,expressInfostit,expressInfos,detailstitle,details,detallimit,detaltotol,detalcurrentPage} = state.warehouse;
	return {cardtitle,cardlist,logstitle,logs,expressInfostit,expressInfos,detailstitle,details,detallimit,detaltotol,detalcurrentPage};
}

export default connect(mapStateToProps)(WarehouseInfo);
