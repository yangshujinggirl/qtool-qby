import React, { Component } from "react";
import ThemeSet from "./ThemeSet";
import ModuleSet from "./ModuleSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;
class Index extends Component {
  render() {
    const {homepageModuleId} = this.props.data;
    return (
      <div className="content_box stock-tabs">
        <Tabs>
          <TabPane tab="主题设置" key="1" >
            <ThemeSet homepageModuleId={homepageModuleId}/>
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
