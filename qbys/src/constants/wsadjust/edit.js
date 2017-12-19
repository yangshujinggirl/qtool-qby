import {Button,message} from 'antd';
import { connect } from 'dva';
import Cardlist from '../../components/table/cardlist';
import TableCanEdit from '../../components/table/table_edit';
import {GetServerData} from '../../services/services';

class WsjustEdit extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '商品条码',
			dataIndex: 'pdSkuBarcode'
		}, {
			title: '商品名称',
			dataIndex: 'pdSpuName'
		}, {
			title: '规格',
			dataIndex: 'pdSkuDisplayName'
		},{
			title: '批次',
			dataIndex: 'wsLotProductDate'
		},{
			title: '库位',
			dataIndex: 'fromBinCode'
		},{
			title: '损益数量',
			dataIndex: 'qtyAdjust'
		}];
	}

	infofetch=(id)=>{
		this.props.dispatch({
			type:'adjust/infofetch',
			payload:{code:'qerp.web.ws.adjust.info',values:{wsAdjustId:id}}
		})
	}


	initWarehouseList=(values,limit,currentPage)=>{
		values.limit=limit
		values.currentPage=currentPage
		this.props.dispatch({
			type:'adjust/fetch',
			payload:{code:'qerp.web.ws.adjust.query',values:values}
		})
	}

	editAdjust=()=>{
		const values={wsAdjustId:this.props.data.wsAdjustId}
		const result=GetServerData('qerp.web.ws.adjust.finish',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				message.success('损益完成',.8);
				this.delecttab()
				this.refresh()	
			}
		})
	}
	refresh=()=>{
		this.initWarehouseList(this.props.values,this.props.limit,0)
	}
	delecttab=()=>{
		this.props.dispatch({
			type:'adjust/delete',
			payload:'80000edit'+this.props.data.wsAdjustId
		})
	}


	Hindclickcanse=()=>{
		this.delecttab()
	}
	render() {
		return (
			<div>
				<Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/>
				<div className='mt10 mb10'><TableCanEdit columns={this.columns} dataSources={this.props.details}/></div>
				<Button onClick={this.Hindclickcanse.bind(this)}>取消</Button>
				<Button  type="primary" className='ml10' onClick={this.editAdjust.bind(this)}>确定</Button>
			</div>
		);
	}
	componentDidMount(){
		this.infofetch(this.props.data.wsAdjustId)
	}
	
}

function mapStateToProps(state) {
	const {cardtitle,cardlist,details,values,limit} = state.adjust;
	return {cardtitle,cardlist,details,values,limit};
}

export default connect(mapStateToProps)(WsjustEdit);



