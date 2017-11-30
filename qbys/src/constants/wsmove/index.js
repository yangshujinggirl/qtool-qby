import {  Button, message } from 'antd';
import { connect } from 'dva';
import WarehouseIndexTable from './table';
import WrappedAdvancedSearchForm from './search';
import {GetLodop} from '../../utils/postedit'

class WsmoveIndex extends React.Component{
	printClick=()=>{
		console.log(this.props.selectedRows)
		//判断系统
		if(navigator.platform == "Windows" || navigator.platform == "Win32" || navigator.platform == "Win64"){
			//判断是否打印
			if (this.props.selectedRows.length < 1) {
				message.error('请选择配货单')
				return;
			}
			for (var i = 0; i < this.props.selectedRows.length; i++) {
				GetLodop(this.props.selectedRows[i].wsOrderId,'wsOrder', this.props.selectedRows[i].orderNo)
			}
			this.initselect()
		}else{
			message.error('请在Windows操作下使用打印功能')
		}
	}
	initselect=()=>{
		const initselectedRows=[]
		const initselectedRowKeys=[]
		this.props.dispatch({
			type:'warehouse/select',
			payload:{initselectedRowKeys,initselectedRows}
		})
	}

	neworderClick=()=>{
		const paneitem={title:'新建移库单',key:'504100edit',componkey:'504100edits',data:null}
		this.props.dispatch({
			type:'tab/firstAddTab',
			payload:paneitem
		})
	}

	


	render(){
		return(
			<div className='content_box'>
				<WrappedAdvancedSearchForm/>
				<div>
					<Button type="primary" onClick={this.printClick.bind(this)} size='large' className='mt30'>
						打印配货单
					</Button>
					<Button type="primary" onClick={this.neworderClick.bind(this)} size='large' className='mt30 ml10'>
						新建移库单
					</Button>
				</div>
				<div className='mt30'>
					<WarehouseIndexTable/>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	const {total,selectedRows} = state.warehouse;
	return {total,selectedRows};
}

export default connect(mapStateToProps)(WsmoveIndex);
