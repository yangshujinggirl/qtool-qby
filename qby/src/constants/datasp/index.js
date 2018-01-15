
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs } from 'antd';
import { connect } from 'dva';
import '../../style/dataws.css';
import DataspsellIndex from './dataspsell/index';


const TabPane = Tabs.TabPane;


class DataspIndex extends React.Component{
	state = {};
  	render(){       
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="销售数据" key="1">
                        <DataspsellIndex/>
                    </TabPane>
                    <TabPane tab="门店库存" key="2">
                        <DataspsellIndex/>
                    </TabPane>
                    <TabPane tab="历史库存" key="3">
                        <DataspsellIndex/>
                    </TabPane>
                    <TabPane tab="联营分成" key="4">
                        <DataspsellIndex/>
                    </TabPane>
                </Tabs>
        	</div>
      	)
  	}
}

export default connect()(DataspIndex);
