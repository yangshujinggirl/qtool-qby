import React, { Component } from "react";
import MoreGoodsSet from "./MoreGoodsSet";
import ModuleSet from "./ModuleSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;
class Index extends Component {
  render() {
    return (
      <div className="content_box stock-tabs">
        <Tabs>
          <TabPane tab="商品设置" key="1">
            <MoreGoodsSet />
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
