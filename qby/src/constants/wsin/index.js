import {GetServerData} from '../../services/services';
import {GetLodop} from '../../utils/print';
import { Button,message} from 'antd';
import { connect } from 'dva';
import WarehouseinIndexTable from './table';
import WrappedAdvancedSearchForm from './search';


import EditableTable from '../../components/table/tablebasic';

// coercionOver = () =>{
// 	if (this.props.selectedRowKeys.length < 1) {
// 	  message.error('请选择需要强制完成的入库单',.8)
// 	  return;
// 	}
// 	this.props.dispatch({
// 		type:'wsin/getAsnFinish',
// 		payload:{code:'qerp.web.ws.asn.finish',values:{wsAsnId:this.props.selectedRowKeys[0]}}
// 	})
// 	this.props.dispatch({type:'tab/loding',payload:true})
// }
// printClick=()=>{
// 	if(this.props.selectedRows.length<1){
// 		message.error('请选择入库单',.8)
// 	}else{
// 		//判断系统
// 		if(navigator.platform == "Windows" || navigator.platform == "Win32" || navigator.platform == "Win64"){
// 			for (var i = 0; i < this.props.selectedRows.length; i++) {
// 				GetLodop(this.props.selectedRows[i].wsAsnId,'wsAsn', this.props.selectedRows[i].asnNo)
// 			}
// 			this.initselect()
// 		}else{
// 			message.error('请在Windows操作下使用打印功能',.8)
// 		}
// 	}
// }

// initselect=()=>{
// 	const selectedRows=[]
// 	const selectedRowKeys=[]
// 	this.props.dispatch({
// 		type:'wsin/select',
// 		payload:{selectedRowKeys,selectedRows}
// 	  })
// }

//   render(){
// 	const adminType=eval(sessionStorage.getItem('adminType'));
// 	 return(
// 		<div className='content_box'>
// 			<WrappedAdvancedSearchForm/>
// 				{
// 					adminType=='10'?null:<Button 
// 					type="primary" 
// 					onClick={this.coercionOver.bind(this)}
// 					size='large'
// 					className='mt20'
// 				>
// 					强制完成
// 				</Button>
// 				}
// 				{
// 					adminType=='10'?null:<Button 
// 					type="primary" 
// 					onClick={this.printClick.bind(this)}
// 					size='large'
// 					className='mt20 ml10'
// 				>
// 					打印
// 				</Button>
// 				}
// 				 <div className='mt15'><WarehouseinIndexTable/></div>
// 		</div>
// 	  )
//   }










class WarehouseinIndex extends React.Component{
	

	render(){
		return(
			<div>
				<EditableTable/>
			</div>
		)
	}
}
function mapStateToProps(state) {
    const {selectedRows,selectedRowKeys} = state.wsin;
    return {selectedRows,selectedRowKeys};
}

export default connect(mapStateToProps)(WarehouseinIndex);
