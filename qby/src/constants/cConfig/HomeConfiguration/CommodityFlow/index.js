import React, { Component } from "react";
import CommodityFlow from "./CommodityFlow";
import ModuleSet from "./ModuleSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;
class Index extends Component {
  render() {
    return (
      <div className="content_box stock-tabs">
        <Tabs>
          <TabPane tab="设置icon" key="1">
            <CommodityFlow />
          </TabPane>
          <TabPane tab="模块设置" key="2">
            <ModuleSet />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Index;
