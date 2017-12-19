import { Input,message ,Button} from 'antd';
import { connect } from 'dva';
import Cardlist from '../../components/table/cardlist';
import TableCanEdit from '../../components/table/table_edit';
import {GetServerData} from '../../services/services';

class WsmoveUser extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
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
			dataIndex: 'lotStr'
		},{
			title: '库位',
			dataIndex: 'fromBinCode'
		},{
			title: '可移数量',
			dataIndex: 'originalQty'
		},{
			title: '实移数量',
			dataIndex: 'qty',
			render: (text, record,index) => {
				return (
					<div className={record.datasuccess?null:'data_waring'}>
						<Input value={text} onChange={this.qtyChange.bind(this,index)} placeholder='输入数量'/>
					</div>
				);
			}
		},{
			title: '实移库位',
			dataIndex: 'binCode',
			render: (text, record,index) => {
				return (
					<div>
						<Input value={text} onChange={this.toBinCodeChange.bind(this,index)} placeholder='输入库位'/>
					</div>
				);
			}
		}]
	}

	infoFetch=(wsAsnId)=>{
		this.props.dispatch({
			type:'wsmove/infofetch',
			payload:{code:'qerp.web.ws.move.info',values:{wsMoveId:wsAsnId}}
		})
	}
	qtyChange=(index,e)=>{
		const str=/^[0-9]*$/
		const values=e.target.value
		const patt=str.test(values)
		if(patt){
			this.props.dispatch({
				type:'wsmove/successinfodetails',
				payload:{index,values}
			})

		}else{
			this.props.dispatch({
				type:'wsmove/errinfodetails',
				payload:{index,values}
			})
			message.error('数量只能数字',.8);
		}
	}

	toBinCodeChange=(index,e)=>{
		const values=e.target.value
		this.props.dispatch({
			type:'wsmove/detailstoBinCode',
			payload:{index,values}
		})
	}

	initWarehouseList=(values,limit,currentPage)=>{
		values.limit=limit
		values.currentPage=currentPage
		this.props.dispatch({
			type:'wsmove/fetch',
			payload:{code:'qerp.web.ws.move.query',values:values}
		})
	}

	refresh=()=>{
		this.initWarehouseList(this.props.values,this.props.limit,0)
	}

	//删除tab
	delecttab=()=>{
		this.props.dispatch({
			type:'wsmove/delete',
			payload:'60000edit'+this.props.data.wsMoveId
		})
	}
	hindClickcanse=()=>{
		this.delecttab()
	}
	hindClick=()=>{
		const values={
			wsMoveId:this.props.data.wsMoveId,
			wsMoveInputDetails:this.props.details
		}
		const result=GetServerData('qerp.web.ws.move.finish',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				message.success('移库完成',.8);
				this.delecttab()
				this.refresh()	
			}
		})
	}
	render() {
		return (
			<div>
				<Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/>
				<div className='mb10 mt10'><TableCanEdit columns={this.columns} dataSources={this.props.details}/></div>
				<Button onClick={this.hindClickcanse.bind(this)}>取消</Button>
				<Button onClick={this.hindClick.bind(this)} type="primary" className='ml10'>确定</Button>
			</div>
		);
	}
	componentDidMount(){
		this.infoFetch(this.props.data.wsMoveId)
	}
	
}

function mapStateToProps(state) {
	const {cardtitle,cardlist,details,values,limit} = state.wsmove;
	return {cardtitle,cardlist,details,values,limit};
}



export default connect(mapStateToProps)(WsmoveUser);
