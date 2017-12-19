import {  Button, message } from 'antd';
import { connect } from 'dva';
import WarehouseIndexTable from './table';
import WrappedAdvancedSearchForm from './search';
import {GetLodop} from '../../utils/print';

class WsmoveIndex extends React.Component{

	printClick=()=>{
		if(this.props.selectedRows.length<1){
			message.error('请选择配货单',.8)
		}else{
			//判断系统
			if(navigator.platform == "Windows" || navigator.platform == "Win32" || navigator.platform == "Win64"){
				for (var i = 0; i < this.props.selectedRows.length; i++) {
					GetLodop(this.props.selectedRows[i].wsMoveId,'wsMove', this.props.selectedRows[i].moveNo)
				}
				this.initselect()
			}else{
				message.error('请在Windows操作下使用打印功能',.8)
			}
		}
	}

	initselect=()=>{
		const selectedRows=[]
		const selectedRowKeys=[]
		this.props.dispatch({
			type:'wsmove/select',
			payload:{selectedRowKeys,selectedRows}
		})
	}

	neworderClick=()=>{
		const paneitem={title:'新建移库单',key:'60000edit',componkey:'60000edits',data:null}
		this.props.dispatch({
			type:'tab/firstAddTab',
			payload:paneitem
		})
		this.props.dispatch({
			type:'wsmove/initneweditdata',
			payload:{}
		})
	}

	render(){
		const adminType=eval(sessionStorage.getItem('adminType'));
		return(
			<div className='content_box'>
				<WrappedAdvancedSearchForm/>
				{
					adminType=='10'?null:
					<div>
					<Button type="primary" onClick={this.neworderClick.bind(this)} size='large' className='mt20'>
						新建移库单
					</Button>
					<Button type="primary" onClick={this.printClick.bind(this)} size='large' className='mt20 ml10'>
						打印
					</Button>
					
				</div>
				}
				<div className='mt15'>
					<WarehouseIndexTable/>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	const {total,selectedRows} = state.wsmove;
	return {total,selectedRows};
}

export default connect(mapStateToProps)(WsmoveIndex);
