import { connect } from 'dva';
import { Input,message ,Button} from 'antd';
import Title_search_component from './newusersearch';
import Cardlist from '../../components/table/cardlist';
import TableCanEdit from '../../components/table/table_edit';
import {GetServerData} from '../../services/services';
import  MyUpload from './impontupload';

class WsmoveNewuser extends React.Component{
	constructor(props) {
		super(props);
		this.columns = [{
			title: '序号',
			dataIndex: 'index'
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
			dataIndex: 'lotStr'
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
						<Input value={text} onChange={this.qtyChange.bind(this,index)} placeholder='输入数量'/>
					</div>
				);
			}
		},{
			title: '目标库位',
			dataIndex: 'toBinCode',
			render: (text, record,index) => {
				return (
					<div>
						<Input value={text} onChange={this.toBinCodeChange.bind(this,index)} placeholder='目标库位(选填)'/>
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
				type:'wsmove/successdetails',
				payload:{index,values}
			})

		}else{
			this.props.dispatch({
				type:'wsmove/errdetails',
				payload:{index,values}
			})
			message.error('数量只能数字',.8);
		}
	}

	toBinCodeChange=(index,e)=>{
		const values=e.target.value
		this.props.dispatch({
			type:'wsmove/toBinCode',
			payload:{index,values}
		})

	}

	//删除当前tab
	delecttab=()=>{
		this.props.dispatch({
			type:'wsmove/delete',
			payload:'60000edit'
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
	//刷新列表数据
	refresh=()=>{
		this.initWarehouseList(this.props.values,this.props.limit,0)
	}

	Hindclickcanse=()=>{
		this.delecttab()
	}
	Hindclick=()=>{
		const values={inputDetails:this.props.wsInvSearchs}
		const result=GetServerData('qerp.web.ws.move.save',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				message.success('生成移库单成功',.8);
				this.delecttab()
				this.refresh()	
			}
		})
	}
	download=()=>{
		window.open('../../static/yiku.xls')
	}
	render(){
		return(
			<div>
				<Title_search_component/>
				<div className='btnbox clearfix'>
					<MyUpload/>
					<Button onClick={this.download.bind(this)} type="primary" className='btnmo'>下载导入模板</Button>
				</div>
				<div className='mb10 mt15'><TableCanEdit columns={this.columns} dataSources={this.props.wsInvSearchs}/></div>
				<Button onClick={this.Hindclickcanse.bind(this)}>取消</Button>
				<Button onClick={this.Hindclick.bind(this)} type="primary" className='ml10'>生成移库单</Button>
			</div>
		)
	}
	
}

function mapStateToProps(state) {
	const {wsInvSearchs,values,limit} = state.wsmove;
	return {wsInvSearchs,values,limit};
}

export default connect(mapStateToProps)(WsmoveNewuser);
