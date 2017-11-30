import { connect } from 'dva';
import EditableTableInfo from '../../components/table/table_info';
import Cardlist from '../../components/table/cardlist';

class WsmoveInfo extends React.Component{
	constructor(props) {
		super(props);
		this.columns1 = [{
			title: '商品条码',
			dataIndex: 'pdSpuBarcode'
		}, {
			title: '商品名称',
			dataIndex: 'pdSpuName'
		}, {
			title: '规格',
			dataIndex: 'pdSkuDisplayName'
		}, {
			title: '批次',
			dataIndex: 'wsLotProductDate'
		}, {
			title: '库位',
			dataIndex: 'fromBinCode'
		},{
			title: '预计数量',
			dataIndex: 'qty'
		},{
			title: '实移数量',
			dataIndex: 'toBinQty'
		},{
			title: '目标库位',
			dataIndex: 'toBinCode'
		}];

		
		
		this.columns2 = [{
			title: '操作',
			dataIndex: 'operateName',
			key: 'operateName'
		}, {
			title: '操作时间',
			dataIndex: 'operateTime',
			key: 'operateTime'
		}, {
			title: '操作人',
			dataIndex: 'operateUser',
			key: 'operateUser'
		}];
	}

	infoFetch=(wsAsnId)=>{
		this.props.dispatch({
			type:'wsmove/infofetch',
			payload:{code:'qerp.web.ws.move.info',values:{wsMoveId:wsAsnId}}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
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
		this.infoFetch(this.props.data.wsMoveId)
	}
}

function mapStateToProps(state) {
	const {cardtitle,cardlist,logstitle,logs,detailstitle,details} = state.wsmove;
	return {cardtitle,cardlist,logstitle,logs,detailstitle,details};
}

export default connect(mapStateToProps)(WsmoveInfo);
