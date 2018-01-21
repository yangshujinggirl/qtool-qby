
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs } from 'antd';
import { connect } from 'dva';
import '../../style/dataws.css';
import DatasporderIndex from './sporder/index';
import DataposorderIndex from './posorder/index';



const TabPane = Tabs.TabPane;


class DataorderIndex extends React.Component{
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
                    <TabPane tab="门店订单" key="1">
                        {this.state.key == 1 && <DatasporderIndex/>} 
                    </TabPane>
                    <TabPane tab="POS订单" key="2">
                        {this.state.key == 2 && <DataposorderIndex/>} 
                    </TabPane>
                </Tabs>
        	</div>
      	)
  	}
}

export default connect()(DataorderIndex);
