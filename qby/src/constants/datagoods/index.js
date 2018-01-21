
import { Tabs } from 'antd';
import DatagodesIndex from './datagodes/index';
import DataclassdesIndex from './dataclassdes/index';
import DatasIndex from './datas/index';

const TabPane = Tabs.TabPane;

class DatagoIndex extends React.Component{
    state={
        key:'1'
    }
    tabChange = (index)=>{
        this.setState({
            key:index
        })
    }
  	render(){       
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1" onTabClick={this.tabChange.bind(this)}>
                    <TabPane tab="商品分析" key="1">
                        {this.state.key == 1 && <DatagodesIndex/>} 
                    </TabPane>
                    <TabPane tab="分类分析" key="2">
                        {this.state.key == 2 && <DataclassdesIndex/>} 
                    </TabPane>
                    <TabPane tab="商品数据" key="3">
                        {this.state.key == 3 && <DatasIndex/>} 
                    </TabPane>
                </Tabs>
        	</div>
      	)
  	}
}

export default DatagoIndex;
