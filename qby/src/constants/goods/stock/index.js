import {Component} from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import BstockIndex from './bStock/index'
import OnlineIndex from './onlineStock/index'

class Stock extends Component{
  render(){
    return(
      <div>
      <div className='content_box stock-tabs'>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="B端库存" key="1">
            <BstockIndex/>
          </TabPane>
          <TabPane tab="online库存" key="2">
              <OnlineIndex/>
          </TabPane>
        </Tabs>
      </div>
      </div>
    )
  }
}
export default Stock
