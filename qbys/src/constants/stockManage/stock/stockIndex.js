import React from 'react';
import {GetServerData} from '../../../services/services';
import {Getexpont} from '../../../services/expont';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//库存table
import StockTable from './stockTable';
//库区搜索部分
import StockSearch from './stockSearch';
class StockIndex extends React.Component{
	state = {};
	
	//下载补货需求
	downloadRequst = () =>{
		const data=null
		const result=Getexpont('qerp.web.ws.order.waitingallocate.export',data)
	}

	//导出数据
	exportData = () => {
		const data=this.props.values;
		const result=Getexpont('qerp.web.ws.inv.spu.export',data)
	}

  	render(){
		const adminType=eval(sessionStorage.getItem('adminType'));
     	return(
        	<div>
                <StockSearch/>
				{
					adminType!='10'?
					<Button 
					type="primary" 
					size='large'
					className='mt20 mr10'
					onClick={this.downloadRequst}
					>
						下载补货需求
					</Button>
					:
					null
				}
					
                    <Button 
						type="primary" 
						size='large'
						className='mt10'
						onClick={this.exportData}
					>
                        导出数据
					</Button>
             		<div className='mt15'><StockTable/></div>
        	</div>
      	)
  	}
}

function mapStateToProps(state) {
	const {values} = state.stock;
    return {values};
}

export default connect(mapStateToProps)(StockIndex);
