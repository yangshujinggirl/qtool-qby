import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs } from 'antd';
import { connect } from 'dva';
import '../../style/stock_manage.css';
const TabPane = Tabs.TabPane;

class StockManageIndex extends React.Component{
	state = {};

  	render(){       
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="库存" key="1">
                        我是tab1的内容内容我是tab1的内容内容我是tab1的内容内容我是tab1的内容内容我是tab1的内容内容
                    </TabPane>
                    <TabPane tab="批次库位库存" key="2">
                        我是tab2的内容内容我是tab1的内容内容我是tab1的内容内容我是tab1的内容内容我是tab1的内容内容
                    </TabPane>
                    <TabPane tab="库存交易" key="3">
                        我是tab3的内容内容我是tab1的内容内容我是tab1的内容内容我是tab1的内容内容我是tab1的内容内容
                    </TabPane>
                </Tabs>
        	</div>
      	)
  	}
}

export default connect()(StockManageIndex);
