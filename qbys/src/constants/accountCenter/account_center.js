import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import '../../style/account_center.css';
import AccountIndexTable from '../accountCenter/account_table';

class AccountIndex extends React.Component{
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
					<Button 
						type="primary" 
						onClick={this.addNewAccount.bind(this)}
						size='large'
					>
						<Icon type="plus" className='icon_add'/>新增账号
					</Button>
             		<div className='mt30'><AccountIndexTable/></div>
        	</div>
      	)
  	}
}

export default connect()(AccountIndex);
