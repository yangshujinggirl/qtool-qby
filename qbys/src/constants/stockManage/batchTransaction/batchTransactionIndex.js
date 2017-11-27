import React from 'react';
import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import BatchTransactionTable from './batchTransactionTable';
import BatchTransactionSearch from './batchTransactionSearch';
class BatchTransactionIndex extends React.Component{
	state = {};
	
  	render(){
     	return(
        	<div>
                <BatchTransactionSearch/>
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
             		<div className='mt30'><BatchTransactionTable/></div>
        	</div>
      	)
  	}
}

export default connect()(BatchTransactionIndex);
