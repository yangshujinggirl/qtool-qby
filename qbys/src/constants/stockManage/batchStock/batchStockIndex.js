import React from 'react';
import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import BatchStockTable from './batchTable';
import BatchStockSearch from './batchSearch';
import {Getexpont} from '../../../services/expont';

class BatchStockIndex extends React.Component{
	state = {};

	//导出数据
	exportData = () => {
		const data=this.props.values;
		const result=Getexpont('qerp.web.ws.inv.bin.export',data)
	}
	
  	render(){
     	return(
        	<div>
                <BatchStockSearch/>
				<Button 
						type="primary" 
						size='large'
						className='mt20'
						onClick={this.exportData}
					>
                        导出数据
					</Button>
             	<div className='mt15'><BatchStockTable/></div>
        	</div>
      	)
  	}
}


function mapStateToProps(state) {
	const {values} = state.batchStock;
	return {values};
}
export default connect(mapStateToProps)(BatchStockIndex);
