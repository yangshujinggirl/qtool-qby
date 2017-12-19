import {  Button, message } from 'antd';
import { connect } from 'dva';
import WarehouseIndexTable from './table';
import WrappedAdvancedSearchForm from './search';
import {GetLodop} from '../../utils/print';

class WarehouseIndex extends React.Component{
	printClick=()=>{
		if(this.props.selectedRows.length<1){
			message.error('请选择配货单',.8)
		}else{
			//判断系统
			if(navigator.platform == "Windows" || navigator.platform == "Win32" || navigator.platform == "Win64"){
				for (var i = 0; i < this.props.selectedRows.length; i++) {
					GetLodop(this.props.selectedRows[i].wsOrderId,'wsOrder', this.props.selectedRows[i].orderNo)
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
			type:'warehouse/select',
			payload:{selectedRowKeys,selectedRows}
		})
	}

	render(){
		const adminType=eval(sessionStorage.getItem('adminType'));
		return(
			<div className='content_box'>
				<WrappedAdvancedSearchForm/>
				<div>
					{
						adminType=='10'
						?null
						:
						<Button 
							type="primary" 
							onClick={this.printClick.bind(this)}
							size='large'
							className='mt20'
						>
							打印配货单
						</Button>

					}
					{
						adminType=='10'?null:<div className='btnlist_r'>共{this.props.total}条</div>
					}
				</div>
				<div className='mt15'>
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

export default connect(mapStateToProps)(WarehouseIndex);
