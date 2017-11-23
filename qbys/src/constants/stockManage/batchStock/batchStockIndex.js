import React from 'react';
import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import BatchStockTable from './batchTable';
import BatchStockSearch from './batchSearch';
class BatchStockIndex extends React.Component{
	state = {};
	
  	render(){
     	return(
        	<div>
                <BatchStockSearch/>
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
             		<div className='mt30'><BatchStockTable/></div>
        	</div>
      	)
  	}
}

export default connect()(BatchStockIndex);
