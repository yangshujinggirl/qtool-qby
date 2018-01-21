
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs } from 'antd';
import { connect } from 'dva';
import '../../style/dataws.css';
import DatawsonIndex from './datawson/index';
import DatawshisIndex from './datawshis/index';
import DatawstimeIndex from './datawstime/index';

const TabPane = Tabs.TabPane;


class DatawsIndex extends React.Component{
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
                    <TabPane tab="实时库存" key="1">
                        {this.state.key == '1' && <DatawsonIndex/>} 
                    </TabPane>
                    <TabPane tab="历史库存" key="2">
                        {this.state.key == '2' && <DatawshisIndex/>} 
                    </TabPane>
                    <TabPane tab="商品效期" key="3">
                        {this.state.key == '3' && <DatawstimeIndex/>} 
                    </TabPane>
                </Tabs>
        	</div>
      	)
  	}
}

export default connect()(DatawsIndex);
