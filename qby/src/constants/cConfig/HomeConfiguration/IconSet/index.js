import React, { Component } from "react";
import IconSet from "./IconSet";
import ModuleSet from "./ModuleSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;
class Index extends Component {
  render() {
    const {homepageModuleId} = this.props.data
    return (
      <div className="content_box stock-tabs">
        <Tabs>
          <TabPane tab="设置icon" key="1">
            <IconSet homepageModuleId={homepageModuleId}/>
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
