import React, { Component } from "react";
import IconSet from "./IconSet";
import ModuleSet from "./ModuleSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;
class Index extends Component {
  render() {
    console.log(this.props)
    const {homepageModuleId,homepageId} = this.props.data
    return (
      <div className="content_box stock-tabs">
        <Tabs>
          <TabPane tab="设置icon" key="1">
            <IconSet homepageModuleId={homepageModuleId} />
          </TabPane>
          <TabPane tab="模块设置" key="2">
            <ModuleSet homepageModuleId={homepageModuleId} homepageId={homepageId}/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Index;
