import React, { Component } from "react";
import BannerSet from "./BannerSet";
import ModuleSet from "./ModuleSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;

class Index extends Component {
  render() {
    const {homepageModuleId} = this.props.data;
    return (
      <div className="content_box stock-tabs">
        <Tabs>
          <TabPane tab="设置banner" key="1">
            <BannerSet homepageModuleId={homepageModuleId}/>
          </TabPane>
          <TabPane tab="模块设置" key="2">
            <ModuleSet homepageModuleId={homepageModuleId}/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Index;
