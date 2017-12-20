import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//search
import OrdercgSearch from './search';
//table
import OrdercgTable from './table';

class OrdercgIndex extends React.Component{
	state = {};

  	render(){
     	return(
        	<div className='content_box'>
                <OrdercgSearch/>
					<Button 
						type="primary" 
						size='large'
						className='mt20'
					>
						新建采购单
					</Button>
                    <Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
					>
						打印采购单
					</Button>
					<Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
					>
						导出数据
					</Button>
             		<div className='mt15'><OrdercgTable/></div>
        	</div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(OrdercgIndex);
