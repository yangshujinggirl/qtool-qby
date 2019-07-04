import React, { Component } from "react";
import BannerSet from "./BannerSet";
import ModuleSet from "./ModuleSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import "./index.less";

class Index extends Component {
  render() {
    return (
      <div className="content_box stock-tabs">
        <Tabs>
          <TabPane tab="设置banner" key="1">
            <BannerSet/>
          </TabPane>
          <TabPane tab="模块设置" key="2">
            <ModuleSet/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Index;
