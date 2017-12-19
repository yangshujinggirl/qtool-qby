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
             	<div className='mt30'><BatchTransactionTable/></div>
        	</div>
      	)
  	}
}

export default connect()(BatchTransactionIndex);
