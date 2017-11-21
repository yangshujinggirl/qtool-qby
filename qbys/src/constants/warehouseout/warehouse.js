import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import '../../style/account_center.css';
import WarehouseIndexTable from './warehouse_table';
import WrappedAdvancedSearchForm from './search';

class WarehouseIndex extends React.Component{
  	addNewAccount = () =>{
		const paneitem={title:'新增账号',key:'601000edit',componkey:'601000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
	  	})
  	}
  	render(){
     	return(
        	<div className='content_box'>
                <WrappedAdvancedSearchForm/>
					<Button 
						type="primary" 
						onClick={this.addNewAccount.bind(this)}
						size='large'
						className='mt30'
					>
						打印配货单
					</Button>
             		<div className='mt30'><WarehouseIndexTable/></div>
        	</div>
      	)
  	}
}

export default connect()(WarehouseIndex);
