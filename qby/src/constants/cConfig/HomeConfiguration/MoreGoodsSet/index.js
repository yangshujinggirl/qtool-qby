import React, { Component } from "react";
import MoreGoodsSet from "./MoreGoodsSet";
import ModuleSet from "./ModuleSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;
class Index extends Component {
  render() {
    const {homePageModuleId} = this.props
    return (
      <div className="content_box stock-tabs">
        <Tabs>
          <TabPane tab="商品设置" key="1">
            <MoreGoodsSet homePageModuleId={homePageModuleId}/>
          </TabPane>
          <TabPane tab="模块设置" key="2">
            <ModuleSet homePageModuleId={homePageModuleId}/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Index;
