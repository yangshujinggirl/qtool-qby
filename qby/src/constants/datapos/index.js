
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs,Input,Form,AutoComplete} from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import '../../style/dataManage.css';

import DailyBill from './dailyBill';
import HotSellGoods from './hotSellGoods';
import ClerkSale from './clerkSale';
import ReceiptReport from './receiptReport';
import ProfitReport from './profitReport';
import InOutReport from './inoutReport';
import AdjustLogIndex from './adjustLog';
import InventorydiffLogIndex from './inventorydiffLog';
import Onwayingindex from './onwaying'
import DbLogIndex from './dblog';
import IntegralStatements from './IntegralStatements';
import FreightDetail from './freightDetail';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class DataposIndexForm extends React.Component{
	state = {
        key:"1",
        shopId:null,
        sureShopId:null,
        dataSources:[],
  };
  tabChange = (index)=>{
      this.setState({
          key:index
      })
  }
  //智能搜索框搜索事件
  handleSearch = (value) => {
      let data={name:value};
      const result=GetServerData('qerp.web.sp.shop.list',data);
      result.then((res) => {
          return res;
      }).then((json) => {
          if(json.code=='0'){
              let shopList=json.shops;
              let dataSources=[];
              for(let i=0;i<shopList.length;i++){
                  dataSources.push({
                      text:shopList[i].name,
                      value:shopList[i].spShopId,
                      key:i
                  })
              }
              this.setState({
                  dataSources:dataSources,
                  shopId:null,
                  sureShopId:null
              });
          }
      })
  }
  //在选择的时候
  onSelect=(value)=>{
      this.setState({
          shopId:value
      })
  }
  //保存
	handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let selectShopId = this.state.shopId;
                this.setState({
                    sureShopId:selectShopId
                },function(){

                })
            }
        })
    }
	resetShopId() {
		this.setState({ sureShopId: null, key:1 });
	}
	render(){
    const { getFieldDecorator } = this.props.form;
   	return(
    	<div className='content_box stock-tabs data-pos'>
        {
          !this.state.sureShopId?
          <div style={{width:"100%",paddingTop:"200px",textAlign:"center",verticalAlign:"middle"}}>
            <Form className="search-shop">
              <FormItem
                  label="门店名称"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('shopName', {
                      rules: [{ required: true, message: '请选择门店名称'}],
                  })(
                      <AutoComplete
                          dataSource={this.state.dataSources}
                          onSelect={this.onSelect}
                          onSearch={this.handleSearch}
                          placeholder='请选择门店名称'/>
                  )}
              </FormItem>
              <Button htmlType="submit" type="primary" style={{marginTop:"1px"}} onClick={this.handleSubmit.bind(this)}>进入门店</Button>
            </Form>
        	</div>
          :
          <Tabs defaultActiveKey="1"  onTabClick={this.tabChange.bind(this)}>
            <TabPane tab="每日对账单" key="1">
                {this.state.key == 1 && <DailyBill shopId={this.state.sureShopId} resetShopId={this.resetShopId.bind(this)}/>}
            </TabPane>
            <TabPane tab="热销商品" key="2">
                {this.state.key == 2 && <HotSellGoods shopId={this.state.sureShopId}/>}
            </TabPane>
            <TabPane tab="店员销售" key="3">
                {this.state.key == 3 && <ClerkSale shopId={this.state.sureShopId} resetShopId={this.resetShopId.bind(this)}/>}
            </TabPane>
            <TabPane tab="收货报表" key="4">
                {this.state.key == 4 && <ReceiptReport shopId={this.state.sureShopId}/>}
            </TabPane>
            <TabPane tab="在途库存" key="9">
                {this.state.key == 9 && <Onwayingindex shopId={this.state.sureShopId}/>}
            </TabPane>
            <TabPane tab="利润报表" key="5">
                {this.state.key == 5 && <ProfitReport shopId={this.state.sureShopId} resetShopId={this.resetShopId.bind(this)}/>}
            </TabPane>
            <TabPane tab="进销存报表" key="6">
                {this.state.key == 6 && <InOutReport shopId={this.state.sureShopId} resetShopId={this.resetShopId.bind(this)}/>}
            </TabPane>
            <TabPane tab="积分报表" key="11">
                {this.state.key == 11 && <IntegralStatements shopId={this.state.sureShopId} resetShopId={this.resetShopId.bind(this)}/>}
            </TabPane>
            <TabPane tab="配送费明细" key="12">
                {this.state.key == 12 && <FreightDetail shopId={this.state.sureShopId} resetShopId={this.resetShopId.bind(this)}/>}
            </TabPane>
            <TabPane tab="损益日志" key="7">
                {this.state.key == 7 && <AdjustLogIndex shopId={this.state.sureShopId}/>}
            </TabPane>
            <TabPane tab="盘点日志" key="8">
                {this.state.key == 8 && <InventorydiffLogIndex shopId={this.state.sureShopId}/>}
            </TabPane>
            <TabPane tab="调拨日志" key="10">
                {this.state.key == "10" && <DbLogIndex shopId={this.state.sureShopId}/>}
            </TabPane>
          </Tabs>
        }
    	</div>
  	)
	}
}

const DataposIndex = Form.create()(DataposIndexForm);

export default connect()(DataposIndex);
