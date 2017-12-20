import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTableInfo from '../../components/table/table_info';
import Cardlist from '../../components/table/cardlist';


class WarehouseinInfo extends React.Component{
	constructor(props) {
		super(props);
		this.columns1 = [{
			title: '商品条码',
			dataIndex: 'pdBarcode'
		},{
			title: '商品名称',
			dataIndex: 'pdName'
		}, {
			title: '商品规格',
			dataIndex: 'pdSkuType'
		},{
			title: '预收数量',
			dataIndex: 'qty'
		},{
			title: '已收数量',
			dataIndex: 'qtyReceived'
		},{
			title: '差异',
			dataIndex: 'qtyDifference'
		}];
		this.columns2 = [{
			title: '操作',
			dataIndex: 'operateName'
		},{
			title: '操作时间',
			dataIndex: 'operateTime'
		}, {
			title: '操作人',
			dataIndex: 'operateUser'
		}];
	}
	infofetch=(wsAsnId)=>{
		this.props.dispatch({
			type:'goods/infofetch',
			payload:{code:'qerp.web.ws.asn.detail',values:{wsAsnId:wsAsnId}}
		}) 
	}
	render(){
		return(
			<div>
				<div className='mb10'><Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/></div>
				<div className='mb10'><EditableTableInfo columns={this.columns1} data={this.props.details} title={this.props.detailstitle}/></div>
				<div className='mb10'><EditableTableInfo columns={this.columns2} data={this.props.logs} title={this.props.logstitle}/></div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.wsAsnId)
	}
}

function mapStateToProps(state) {
	const {cardtitle,cardlist,detailstitle,details,logstitle,logs} = state.goods;
	return {cardtitle,cardlist,detailstitle,details,logstitle,logs};
}
export default connect(mapStateToProps)(WarehouseinInfo);

