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
    this.props.dispatch({
      type:'commodityFlow/fetchTabList',
      payload:{
        homePageModuleId:20
      }
    })
  }
  render() {
    const { tabs } =this.props;
    return(
      <div className="commodity-flow-pages">
        <div className="main-content-action">
          <TabsMod />
          {
            tabs.length>0&&
            <Mod />
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
