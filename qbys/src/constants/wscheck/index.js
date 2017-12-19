import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon,message } from 'antd';
import { connect } from 'dva';
import '../../style/account_center.css';
import WarehouseinIndexTable from './table';
import WrappedAdvancedSearchForm from './search';
import {GetLodop} from '../../utils/print';

class WscheckIndex extends React.Component{
	newOrder = () =>{
		const paneitem={title:'新建盘点单',key:'70000edit',componkey:'70000edit',data:null}
		this.props.dispatch({
		  	type:'tab/firstAddTab',
		  	payload:paneitem
		})
		this.props.dispatch({
			type:'wscheck/initstate',
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
					GetLodop(this.props.selectedRows[i].wsCheckId,'wsCheck', this.props.selectedRows[i].checkNo)
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
			type:'wscheck/select',
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
						onClick={this.newOrder.bind(this)}
						size='large'
						className='mt20'
					>
						新建盘点单
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
    const {selectedRows,selectedRowKeys} = state.wscheck;
    return {selectedRows,selectedRowKeys};
}

export default connect(mapStateToProps)(WscheckIndex);
