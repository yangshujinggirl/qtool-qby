import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs } from 'antd';
import { connect } from 'dva';
import '../../style/stock_manage.css';
const TabPane = Tabs.TabPane;

import StockIndex from './stock/stockIndex';
import BatchStockIndex from './batchStock/batchStockIndex';
import TransactionIndex from './transaction/transactionIndex';
import BatchTransactionIndex from './batchTransaction/batchTransactionIndex';

class StockManageIndex extends React.Component{
	state = {};

  	render(){       
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="库存" key="1">
                        <StockIndex/>
                    </TabPane>
                    <TabPane tab="批次库位库存" key="2">
                        <BatchStockIndex/>
                    </TabPane>
                    <TabPane tab="库存交易" key="3">
                        <TransactionIndex/>
                    </TabPane>
                    <TabPane tab="批次库位库存交易" key="4">
                        <BatchTransactionIndex/>
                    </TabPane>
                </Tabs>
        	</div>
      	)
  	}
}

export default connect()(StockManageIndex);
