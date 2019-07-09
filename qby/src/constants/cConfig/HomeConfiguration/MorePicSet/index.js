import React, { Component } from "react";
import MorePicSet from "./MorePicSet";
import ModuleSet from "./ModuleSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key:'1'
    }
  }
  callback=(key)=> {
    this.setState({ key })
  }
  render() {
    const { key } =this.state;
    return (
      <div className="content_box stock-tabs">
        <Tabs defaultActiveKey={key} onChange={this.callback}>
          <TabPane tab="图片设置" key="1">
            {key=='1'&& <MorePicSet />}
          </TabPane>
          <TabPane tab="模块设置" key="2">
            {key == '2' && <ModuleSet />}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Index;
