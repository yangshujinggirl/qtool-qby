import React, { Component } from "react";
import { connect } from "dva";
import GoodsSet from "./GoodsSet";
import ModuleSet from "./ModuleSet";
import Config from "./Config";
import { Tabs } from "antd";
const { TabPane } = Tabs;
class Index extends Component {
  constructor(props) {
    super(props);
  }
  callback = key => {
    this.props.dispatch({
      type: "goodsSet/changeKey",
      payload: { activeKey: key }
    });
    this.props.dispatch({
      type:'goodsSet/getpdListDisplayCfgId',
      payload:{pdListDisplayCfgId:''}
    });
  };
  render() {
    const { activeKey,homePageModuleId} = this.props;
    return (
      <div className="content_box stock-tabs">
        <Tabs activeKey={activeKey} onChange={this.callback}>
          <TabPane tab="设置时段" key="1">
            <GoodsSet homePageModuleId={homePageModuleId}/>
          </TabPane>
          <TabPane tab="配置商品" key="2">
            <Config homePageModuleId={homePageModuleId}/>
          </TabPane>
          <TabPane tab="模块设置" key="3">
            <ModuleSet homePageModuleId={homePageModuleId}/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { goodsSet } = state;
  return goodsSet;
}
export default connect(mapStateToProps)(Index);
