import { connect } from 'dva';
import { Input,message ,Button} from 'antd';
import Title_search_component from './newsearch';
import Cardlist from '../../components/table/cardlist';
import TableCanEdit from '../../components/table/table_edit';
import {GetServerData} from '../../services/services';

class Wsadjustnewedit extends React.Component{
	constructor(props) {
		super(props);
		this.columns = [{
			title: '商品条码',
			dataIndex: 'pdBarcode'
		}, {
			title: '商品名称',
			dataIndex: 'pdSpuName'
		}, {
			title: '商品规格',
			dataIndex: 'pdSkuName'
		}, {
			title: '批次',
			dataIndex: 'lotStr'
		},{
			title: '库位',
			dataIndex: 'wsBinCode'
		},{
			title: '库存',
			dataIndex: 'qty'
		},{
			title: '损益数量',
			dataIndex: 'optQty',
			render: (text, record,index) => {
				return (
					<div className={record.datasuccess?null:'data_waring'}>
						<Input defaultValue={text} onBlur={this.qtyChange.bind(this,index)} placeholder='请输入数量（益填整数，损填负数）'/>
					</div>
				);
			}
		}]

		
	}
	qtyChange=(index,e)=>{
		const str=/^(\-|\+)?\d+(\d+)?$/
		const values=e.target.value
		const patt=str.test(values)
		if(values.length>0){
			if(patt){
				this.props.dispatch({
					type:'adjust/successdetails',
					payload:{index,values}
				})
	
			}else{
				this.props.dispatch({
					type:'adjust/errdetails',
					payload:{index,values}
				})
				message.error('数量只能数字',.8);
			}
		}
	}

	


	initWarehouseList=(values,limit,currentPage)=>{
		values.limit=limit
		values.currentPage=currentPage
		this.props.dispatch({
			type:'adjust/fetch',
			payload:{code:'qerp.web.ws.adjust.query',values:values}
		})
	}


	//删除当前tab
	delecttab=()=>{
		this.props.dispatch({
			type:'adjust/delete',
			payload:'80000edit'
		})
	}
	refresh=()=>{
		this.initWarehouseList(this.props.values,this.props.limit,0)
	}
	Hindclickcanse=()=>{
		this.delecttab()
	}
	Hindclick=()=>{
		const values={inputDetails:this.props.wsInvSearchs}
		const result=GetServerData('qerp.web.ws.adjust.save',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				message.success('损益单新建成功',.8);
				this.delecttab()
				this.refresh()	
			}
		})
	}
	render(){
		return(
			<div>
				<Title_search_component/>
				<div className='mb10 mt30'><TableCanEdit columns={this.columns} dataSources={this.props.wsInvSearchs}/></div>
				<Button onClick={this.Hindclickcanse.bind(this)}>取消</Button>
				<Button onClick={this.Hindclick.bind(this)} type="primary" className='ml10'>生成损益单</Button>
			</div>
		)
	}
	
}

function mapStateToProps(state) {
	const {wsInvSearchs,values,limit} = state.adjust;
	return {wsInvSearchs,values,limit};
}

export default connect(mapStateToProps)(Wsadjustnewedit);








 


