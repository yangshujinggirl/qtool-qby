import React from 'react';
import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//库存table
import StockTable from './stockTable';
//库区搜索部分
import StockSearch from './stockSearch';
class StockIndex extends React.Component{
	state = {};
	
  	render(){
     	return(
        	<div>
                <StockSearch/>
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
             		<div className='mt30'><StockTable/></div>
        	</div>
      	)
  	}
}

export default connect()(StockIndex);
