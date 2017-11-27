import React from 'react';
import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import TransactionTable from './transactionTable';
import TransactionSearch from './transactionSearch';
class TransactionIndex extends React.Component{
	state = {};
	
  	render(){
     	return(
        	<div>
                <TransactionSearch/>
					<Button 
						type="primary" 
						size='large'
						className='mt10 mr10'
					>
                        下载补货需求
					</Button>
                    <Button 
						type="primary" 
						size='large'
						className='mt10'
					>
                        导出数据
					</Button>
             		<div className='mt30'><TransactionTable/></div>
        	</div>
      	)
  	}
}

export default connect()(TransactionIndex);
