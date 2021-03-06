import React, { Component } from "react";
import MorePicSet from "./MorePicSet";
import ModuleSet from "./ModuleSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey:'1'
    }
  }
  callback=(activeKey)=> {
    this.setState({ activeKey })
  }
  render() {
    const { activeKey } =this.state;
    const {homepageModuleId} = this.props.data;
    return (
      <div className="content_box stock-tabs">
        <Tabs activeKey={activeKey} onChange={this.callback}>
          <TabPane tab="图片设置" key="1">
            {activeKey=='1'&& <MorePicSet {...this.props}/>}
          </TabPane>
          <TabPane tab="模块设置" key="2">
            {activeKey == '2' && <ModuleSet {...this.props} homepageModuleId={homepageModuleId}/>}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Index;
