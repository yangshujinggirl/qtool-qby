import React, { Component } from "react";
import GoodsSet from "./GoodsSet";
import ModuleSet from "./ModuleSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;
class Index extends Component {
  render() {
    return (
      <div className="content_box stock-tabs">
        <Tabs>
          <TabPane tab="设置时段" key="1">
            <GoodsSet />
          </TabPane>
          <TabPane tab="配置商品" key="2">
            <ModuleSet />
          </TabPane>
          <TabPane tab="模块设置" key="3">
            <ModuleSet />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Index;
