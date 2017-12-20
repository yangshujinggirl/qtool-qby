import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import '../../style/ordermd.css';
//table
import OrdermdTable from './table';
//search
import OrdermdSearch from './search';

class OrdermdIndex extends React.Component{
	state = {};

  	render(){
     	return(
        	<div className='content_box'>
                <OrdermdSearch/>
					<Button 
						type="primary" 
						size='large'
						className='mt20'
					>
						新增订单
					</Button>
					<Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
					>
						导出数据
					</Button>
             		<div className='mt15'><OrdermdTable/></div>
        	</div>
      	)
	}
	  
	componentDidMount(){
		
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(OrdermdIndex);
