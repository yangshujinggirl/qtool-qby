import { connect } from 'dva';
import { Input,message ,Button} from 'antd';
import Title_search_component from './newusersearch';
import Cardlist from '../../components/table/cardlist';
import TableCanEdit from '../../components/table/table_edit';

class WsmoveNewuser extends React.Component{
	constructor(props) {
		super(props);
		this.columns = [{
			title: '序号',
			dataIndex: 'key'
		}, {
			title: '商品条码',
			dataIndex: 'pdBarcode'
		}, {
			title: '商品名称',
			dataIndex: 'pdSpuName'
		}, {
			title: '规格',
			dataIndex: 'pdSkuName'
		},{
			title: '批次',
			dataIndex: 'wsLotProductDate'
		},{
			title: '库位',
			dataIndex: 'wsBinCode'
		},{
			title: '在库数量',
			dataIndex: 'qty'
		},{
			title: '可移数量',
			dataIndex: 'qtyCanMove'
		},{
			title: '移库数量',
			dataIndex: 'optQty',
			render: (text, record,index) => {
				return (
					<div className={record.datasuccess?null:'data_waring'}>
						<Input defaultValue={text} onChange={this.qtyChange.bind(this,index)}/>
					</div>
				);
			}
		},{
			title: '目标库位',
			dataIndex: 'toBinCode',
			render: (text, record,index) => {
				return (
					<div>
						<Input defaultValue={text} onBlur={this.toBinCodeChange.bind(this,index)} placeholder='目标库位(选填)'/>
					</div>
				);
			}
		}]

		
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
				type:'wsmove/errdetails',
				payload:{index,values}
			})
			message.error('数量只能数字');
		}
	}

	toBinCodeChange=(index,e)=>{
		const values=e.target.value
		this.props.dispatch({
			type:'wsmove/toBinCode',
			payload:{index,values}
		})

	}
	Hindclickcanse=()=>{

	}
	Hindclick=()=>{
		const values={inputDetails:this.props.wsInvSearchs}
		this.props.dispatch({
			type:'wsmove/save',
			payload:{code:'qerp.web.ws.bin.query',values:values}
		});
	}



	render(){
		return(
			<div>
				<Title_search_component/>
				<div className='mb10'><TableCanEdit columns={this.columns} dataSources={this.props.wsInvSearchs}/></div>
				<Button style={{margin:'15px'}} onClick={this.Hindclickcanse.bind(this)}>取消</Button>
				<Button style={{margin:'15px 15px 15px 0'}} onClick={this.Hindclick.bind(this)}>生成移库单</Button>
			</div>
		)
	}
	
}

function mapStateToProps(state) {
	const {wsInvSearchs} = state.wsmove;
	return {wsInvSearchs};
}

export default connect(mapStateToProps)(WsmoveNewuser);
