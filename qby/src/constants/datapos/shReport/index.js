import {Component} from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import ShList from './shList/index'
import ThList from './thList/index'
class DailyBill extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  render(){
    console.log(this.props)
    return(
      <Tabs defaultActiveKey="1" className='dailyBill'>
        <TabPane tab="收货列表" key="1"><ShList shopId={this.props.shopId} /></TabPane>
        <TabPane tab="退货列表" key="2"><ThList shopId={this.props.shopId} componkey={this.props.componkey}/></TabPane>
      </Tabs>
    )
  }
}
export default DailyBill
