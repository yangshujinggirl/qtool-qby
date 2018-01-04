
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs } from 'antd';
import { connect } from 'dva';
import '../../style/dataws.css';
import DatacglistIndex from './datacglist/index';


const TabPane = Tabs.TabPane;


class DatacgIndex extends React.Component{
	state = {};

  	render(){       
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="采购分析" key="1">
                        <DatacglistIndex/>
                    </TabPane>
                </Tabs>
        	</div>
      	)
  	}
}

export default connect()(DatacgIndex);
