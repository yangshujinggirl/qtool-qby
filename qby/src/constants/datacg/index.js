
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs } from 'antd';
import { connect } from 'dva';
import '../../style/dataws.css';
import DatacglistIndex from './datacglist/index';


const TabPane = Tabs.TabPane;


class DatacgIndex extends React.Component{
	state = {
		key:'1'
	};
	tabChange = (index)=>{
        this.setState({
            key:index
        })
    }

  	render(){       
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1" onTabClick={this.tabChange.bind(this)}>
                    <TabPane tab="采购分析" key="1">
						{this.state.key == '1' && <DatacglistIndex/>} 
                    </TabPane>
                </Tabs>
        	</div>
      	)
  	}
}

export default connect()(DatacgIndex);
