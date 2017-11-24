import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import '../../style/account_center.css';
import WarehouseinIndexTable from './warehousein_table';
import WrappedAdvancedSearchForm from './search';

class WarehouseinIndex extends React.Component{
	coercionOver = () =>{
  		// this.props.dispatch({
	    // 	type:'tab/firstAddTab',
	    // 	payload:paneitem
	  	// })
	  }
	  
	  printClick=()=>{
		const initselectedRows=[]
		const initselectedRowKeys=[]
		this.props.dispatch({
	    	type:'wsin/select',
	    	payload:{initselectedRowKeys,initselectedRows}
	  	})
	  }


  	render(){
     	return(
        	<div className='content_box'>
                <WrappedAdvancedSearchForm/>
					<Button 
						type="primary" 
						onClick={this.coercionOver.bind(this)}
						size='large'
						className='mt30'
					>
						强制完成
					</Button>
                    <Button 
						type="primary" 
						onClick={this.printClick.bind(this)}
						size='large'
						className='mt30 ml10'
					>
						打印
					</Button>
             		<div className='mt30'><WarehouseinIndexTable/></div>
        	</div>
      	)
  	}
}
function mapStateToProps(state) {
	console.log(state)
    const {selectedRows,selectedRowKeys} = state.wsin;
    return {selectedRows,selectedRowKeys};
}

export default connect(mapStateToProps)(WarehouseinIndex);
