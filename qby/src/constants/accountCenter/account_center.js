import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import '../../style/account_center.css';
import AccountIndexTable from '../accountCenter/account_table';
import AccountSearch from './account_search';
class AccountIndex extends React.Component{
	//点击添加按钮添加新用户信息
  	addNewAccount = () =>{
		const paneitem={title:'新增账号',key:'601000edit',componkey:'601000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		  })
		this.props.dispatch({
	    	type:'account/initState',
	    	payload:{}
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
             		<div className='mt15'><AccountIndexTable/></div>
        	</div>
      	)
  	}
}

export default connect()(AccountIndex);
