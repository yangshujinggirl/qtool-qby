import { connect } from 'dva';
import EditableTableInfo from '../../components/table/table_info';
import Cardlist from '../../components/table/cardlist';

class WarehouseInfo extends React.Component{
	constructor(props) {
		super(props);
		this.columns1 = [{
			title: '商品条码',
			dataIndex: 'pdSpuBarcode'
		}, {
			title: '库位',
			dataIndex: 'binCode'
		}, {
			title: '批次',
			dataIndex: 'productDate'
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

	infoFetch=(wsAsnId)=>{
		this.props.dispatch({
			type:'warehouse/infofetch',
			payload:{code:'qerp.web.ws.order.info',values:{wsOrderId:wsAsnId}}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}

	detailFetch=(wsAsnId)=>{
		this.props.dispatch({
			type:'warehouse/detailfetch',
			payload:{code:'qerp.web.ws.order.detail.page',values:{wsOrderId:wsAsnId}}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}
	render(){
		return(
			<div>
				<div className='mb10'><Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/></div>
				<div className='mb10'><EditableTableInfo columns={this.columns1} data={this.props.details} title={this.props.detailstitle}/></div>
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
	const {cardtitle,cardlist,logstitle,logs,expressInfostit,expressInfos,detailstitle,details} = state.warehouse;
	return {cardtitle,cardlist,logstitle,logs,expressInfostit,expressInfos,detailstitle,details};
}

export default connect(mapStateToProps)(WarehouseInfo);
