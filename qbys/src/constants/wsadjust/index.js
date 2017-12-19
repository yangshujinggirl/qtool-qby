import {GetServerData} from '../../services/services';
import { Button, Icon ,message} from 'antd';
import { connect } from 'dva';
import WarehouseinIndexTable from './table';
import WrappedAdvancedSearchForm from './search';
import {GetLodop} from '../../utils/print';

class WsadjustIndex extends React.Component{
	coercionOver = () =>{
		const paneitem={title:'新建损益单',key:'80000edit',componkey:'80000edit',data:null}
		this.props.dispatch({
		  	type:'tab/firstAddTab',
		  	payload:paneitem
		})
		this.props.dispatch({
			type:'adjust/initstate',
			payload:{}
	  	})
	}
	printClick=()=>{
		if(this.props.selectedRows.length<1){
			message.error('请选择配货单',.8)
		}else{
			//判断系统
			if(navigator.platform == "Windows" || navigator.platform == "Win32" || navigator.platform == "Win64"){
				for (var i = 0; i < this.props.selectedRows.length; i++) {
					GetLodop(this.props.selectedRows[i].wsAdjustId,'wsAdjust', this.props.selectedRows[i].adjustNo)
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
			type:'adjust/select',
			payload:{selectedRowKeys,selectedRows}
		})
	}
  	render(){
		const adminType=eval(sessionStorage.getItem('adminType'));
     	return(
        	<div className='content_box'>
                <WrappedAdvancedSearchForm/>
					{
						adminType=='10'?null:<Button 
						type="primary" 
						onClick={this.coercionOver.bind(this)}
						size='large'
						className='mt20'
					>
						新建损益单
					</Button>
					}
					{
						adminType=='10'?null:<Button 
						type="primary" 
						onClick={this.printClick.bind(this)}
						size='large'
						className='mt20 ml10'
					>
						打印
					</Button>
					}
             		<div className='mt15'><WarehouseinIndexTable/></div>
        	</div>
      	)
  	}
}
function mapStateToProps(state) {
    const {selectedRows,selectedRowKeys} = state.adjust;
    return {selectedRows,selectedRowKeys};
}

export default connect(mapStateToProps)(WsadjustIndex);
