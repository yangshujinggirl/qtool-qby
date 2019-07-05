import React, { Component } from "react";
import ThemeSet from "./ThemeSet";
import ModuleSet from "./ModuleSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;
class Index extends Component {
  render() {
    return (
      <div className="content_box stock-tabs">
        <Tabs>
          <TabPane tab="主题设置" key="1">
            <ThemeSet />
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
