import {Component} from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import MdSale from './mdSale/index'
import MdDivide from './mdDivide/index'
class DailyBill extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  resetShopId =()=> {
    this.props.resetShopId();
  }
  render(){
    return(
      <Tabs defaultActiveKey="1" className='dailyBill'>
        <TabPane tab="门店销售对账" key="1"><MdSale shopId={this.props.shopId} resetShopId={this.resetShopId}/></TabPane>
        <TabPane tab="门店分成对账" key="2"><MdDivide shopId={this.props.shopId}/></TabPane>
      </Tabs>
    )
  }
}
export default DailyBill
