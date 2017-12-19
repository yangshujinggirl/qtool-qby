import { Input,Button,message} from 'antd';
import { connect } from 'dva';
import Cardlist from '../../components/table/cardlist';
import TableCanEdit from '../../components/table/table_edit';
import {GetServerData} from '../../services/services';

class WscheckEditdiff extends React.Component {
constructor(props) {
	super(props);
	this.columns =[{
			title: '序号',
			dataIndex: 'index'
		}, {
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
			dataIndex: 'wsBinCode'
		},{
			title: '盘点数量',
			dataIndex: 'qtyCheck'
		},{
			title: '差异数量',
			dataIndex: 'qtyDiff'
		}];
}
	infofetch=(id)=>{
		this.props.dispatch({
			type:'wscheck/infofetch',
			payload:{code:'qerp.web.ws.check.info',values:{wsCheckId:id}}
		})
	}
	
	checkClick=()=>{
			const wsCheckId=this.props.data.wsCheckId
			let values={wsCheckId:wsCheckId}
			const result=GetServerData('qerp.web.ws.check.adjust',values)
			result.then((res) => {
			return res;
			}).then((json) => {
			if(json.code=='0'){
				message.success('生成损益单（如无差异不生成）',.8);
				this.delecttab()
				const paneitem={title:'损益管理',key:'80000',componkey:'80000',data:null}
				this.props.dispatch({
					type:'tab/firstAddTab',
					payload:paneitem
				})
				this.refresh()
				this.refresCheck({},this.props.limit,this.props.currentPage)
			}
		})

	}

	delecttab=()=>{
		this.props.dispatch({
			type:'wscheck/delete',
			payload:'70000edit'+this.props.data.wsCheckId+'diff'
		})
	}


	//刷新损益单
	refresh=()=>{
		this.initWarehouseList({},this.props.limit,0)
	}

	//刷新盘点单
	refresCheck=(values,limit,currentPage)=>{
		this.initcheckList(values,limit,currentPage)
	}


	initWarehouseList=(values,limit,currentPage)=>{
		values.limit=limit
		values.currentPage=currentPage
		this.props.dispatch({
			type:'adjust/fetch',
			payload:{code:'qerp.web.ws.adjust.query',values:values}
		})
	}

	initcheckList=(values,limit,currentPage)=>{
		values.limit=limit
		values.currentPage=currentPage
		this.props.dispatch({
			type:'wscheck/fetch',
			payload:{code:'qerp.web.ws.check.query',values:values}
		})
	}


	recheckOut=()=>{
		const wsCheckId=this.props.data.wsCheckId
		let values={wsCheckId:wsCheckId}
		const result=GetServerData('qerp.web.ws.check.recheck',values)
		result.then((res) => {
		return res;
		}).then((json) => {
		if(json.code=='0'){
			message.success('生成盘点单（如无差异不生成）',.8);
			this.delecttab()
			this.refresCheck({},this.props.limit,this.props.currentPage)
		}
	})

	}
	render() {
		return (
			<div>
				<Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/>
				<div className='mt10 mb10'><TableCanEdit columns={this.columns} dataSources={this.props.details}/></div>
				<Button onClick={this.recheckOut.bind(this)}>复盘</Button>
				<Button  type="primary" className='ml10' onClick={this.checkClick.bind(this)}>生成损益单</Button>
			</div>
		);
	}
	componentDidMount(){
		this.infofetch(this.props.data.wsCheckId)
	}
}

function mapStateToProps(state) {
	const {cardtitle,cardlist,detailstitle,details,limit,currentPage} = state.wscheck;
	return {cardtitle,cardlist,detailstitle,details,limit,currentPage};
}

export default connect(mapStateToProps)(WscheckEditdiff);



