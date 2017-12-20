import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//table
import OrderdbTable from './table';
//search
import OrderdbSearch from './search';

class OrderdbIndex extends React.Component{
	state = {};
  	render(){
     	return(
        	<div className='content_box'>
                <OrderdbSearch/>
					<Button
						type="primary" 
						size='large'
						className='mt20'
					>
						新建调拨单
					</Button>
					<Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
					>
						导出数据
					</Button>
             		<div className='mt15'><OrderdbTable/></div>
        	</div>
      	)
    }
    
	componentDidMount(){
		
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(OrderdbIndex);
