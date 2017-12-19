import { connect } from 'dva';
import { Input,message ,Button} from 'antd';
import Title_search_component from './newsearch';
import Cardlist from '../../components/table/cardlist';
import EditableTable from '../../components/table/tablecompon';
import {GetServerData} from '../../services/services';

class Wschecknewedit extends React.Component{
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
		}]
	}
	

	
	Hindclickcanse=()=>{
		this.delecttab()
	}
	Hindclick=()=>{
		const newselectedRowKeys=this.props.newselectedRowKeys
		if(newselectedRowKeys.length<1){
			message.error('请选择盘点单',.8);
			return
		}
		const values={wsInvBinIds:this.props.newselectedRowKeys}
		const result=GetServerData('qerp.web.ws.check.save',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				message.success('盘点单新建成功',.8);
				this.delecttab()
				this.refresh()	
			}
		})
	}


	//删除
	delecttab=()=>{
		this.props.dispatch({
			type:'wscheck/delete',
			payload:'70000edit'
		})
	}

	//列表数据请求   
	initWarehouseList=(values,limit,currentPage)=>{
		values.limit=limit
		values.currentPage=currentPage
		this.props.dispatch({
			type:'wscheck/fetch',
			payload:{code:'qerp.web.ws.check.query',values:values}
		})
	}
	refresh=()=>{
		this.initWarehouseList(this.props.values,this.props.limit,0)
	}



	// 选择
	selectChange=(newselectedRowKeys,newselectedRows)=>{
		this.props.dispatch({
			type:'wscheck/newselect',
			payload:{newselectedRowKeys,newselectedRows}
		})
	}



	render(){
		return(
			<div>
				<Title_search_component/>
				<div className='mb10 mt30'>
					<EditableTable 
						columns={this.columns} 
						dataSource={this.props.wsInvSearchs}
						selectChange={this.selectChange.bind(this)}
						select={true}
						selectType='checkbox'
						selectedRowKeys={this.props.newselectedRowKeys}
						footer={false}
					/>
				</div>
				<Button onClick={this.Hindclickcanse.bind(this)}>取消</Button>
				<Button onClick={this.Hindclick.bind(this)} type="primary" className='ml10'>生成盘点单</Button>
			</div>
		)
	}
	
}

function mapStateToProps(state) {
	const {wsInvSearchs,newselectedRowKeys,values,limit} = state.wscheck;
	return {wsInvSearchs,newselectedRowKeys,values,limit};
}

export default connect(mapStateToProps)(Wschecknewedit);











