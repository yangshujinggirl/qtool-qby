import React, { Component } from "react";
import { connect } from "dva";
import GoodsSet from "./GoodsSet";
import ModuleSet from "./ModuleSet";
import GoodsConfig from "./GoodsConfig";
import { Tabs } from "antd";
const { TabPane } = Tabs;
class Index extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount =()=> {
    this.props.dispatch({
      type:'goodsSet/resetData2',
    })
  }
  callback = key => {
    this.props.dispatch({
      type: "goodsSet/changeKey",
      payload: { activeKey: key }
    });
    this.props.dispatch({
      type: "goodsSet/setMark",
      payload: { mark: false }
    });
  };
  render() {
    console.log(this.props)
    const { activeKey} = this.props;
    const {homepageModuleId} = this.props.data;
    return (
      <div className="content_box stock-tabs">
        <Tabs activeKey={activeKey} onChange={this.callback}>
          <TabPane tab="设置时段" key="1">
            <GoodsSet homepageModuleId={homepageModuleId}/>
          </TabPane>
          <TabPane tab="配置商品" key="2">
            {
              activeKey=='2'&&
              <GoodsConfig homepageModuleId={homepageModuleId}/>
            }
          </TabPane>
          <TabPane tab="模块设置" key="3">
            {
              activeKey=='3'&&
              <ModuleSet homepageModuleId={homepageModuleId}/>
            }
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
