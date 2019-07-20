import React, { Component } from 'react';
import { Tabs, Button } from 'antd';
import { connect } from 'dva';
import Mod from './components/Mod';
import TabsMod from './components/TabsMod';
import './CommodityFlow.less';

const { TabPane } = Tabs;

class CommodityFlow extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getList()
  }
  getList() {
    const { homepageModuleId } =this.props.data;
    this.props.dispatch({
      type:'commodityFlow/fetchTabList',
      payload:{
        homePageModuleId:homepageModuleId
      }
    })
  }
  onOkToggle=(value)=> {
    this.modDom.submit(()=>this.onOkTogCallback(value));
  }
  onOkTogCallback=(value)=> {
    this.getList(value);
  }
  onCancelToggle=(value)=> {
    const { tabId, key } =value;
    this.props.dispatch({
      type:'commodityFlow/fetchGoodsList',
      payload:{tabId,selectkey:key}
    })
  }
  render() {
    const { tabs } =this.props;
    return(
      <div className="commodity-flow-pages">
        <div className="main-content-action">
          <TabsMod
            onOk={this.onOkToggle}
            onCancel={this.onCancelToggle}/>
          {
            tabs.length>0&&
            <Mod onRef={(mod)=>{this.modDom = mod}}/>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { commodityFlow } =state;
  return commodityFlow;
}
export default connect(mapStateToProps)(CommodityFlow);
