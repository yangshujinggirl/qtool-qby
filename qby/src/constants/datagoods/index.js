
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs } from 'antd';
import { connect } from 'dva';
import '../../style/dataws.css';
import DatagodesIndex from './datagodes/index';
import DataclassdesIndex from './dataclassdes/index';
import DatasIndex from './datas/index';


const TabPane = Tabs.TabPane;


class DatagoIndex extends React.Component{
	state = {};
  	render(){       
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="商品分析" key="1">
                        <DatagodesIndex/>
                    </TabPane>
                    <TabPane tab="分类分析" key="2">
                        <DataclassdesIndex/>
                    </TabPane>
                    <TabPane tab="商品数据" key="3">
                        <DatasIndex/>
                    </TabPane>
                </Tabs>
        	</div>
      	)
  	}
}

export default connect()(DatagoIndex);
