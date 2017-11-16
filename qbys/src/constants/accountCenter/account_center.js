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
	    	type:'tab/addNewTab',
	    	payload:paneitem
	  	})
  	}
  	render(){
     	return(
        	<div className='content_box'>
					<Button 
						type="primary" 
					 	icon="plus" 
					 	className='add-button' 
                     	onClick={this.addNewAccount.bind(this)}
					>
						新增账号
					</Button>
             		<AccountIndexTable/>
        	</div>
      	)
  	}
}

export default connect()(AccountIndex);