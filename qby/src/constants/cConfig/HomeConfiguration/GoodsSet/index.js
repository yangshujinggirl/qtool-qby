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
  };
  render() {
    const {activeKeyLists,activeKey} = this.props;
    const {homepageModuleId} = this.props.data;
    return (
      <div className="content_box stock-tabs">
        <Tabs activeKey={activeKey} onChange={this.callback}>
          {
            activeKeyLists.map(item=>{
              return (
              <TabPane tab={item.tab} key={item.key}>
                {
                  item.key == 1&&
                  <GoodsSet homepageModuleId={homepageModuleId}/>
                }
                {
                  item.key == 2&&
                  <ModuleSet homepageModuleId={homepageModuleId}/>
                }
                {
                  (item.key == 3&&activeKey==3)&&
                  <GoodsConfig homepageModuleId={homepageModuleId}/>
                }
                
              </TabPane>
              )
            })
          }
          {/* <TabPane tab="设置时段" key="1">
            <GoodsSet homepageModuleId={homepageModuleId}/>
          </TabPane>
          <TabPane tab="模块设置" key="3">
            {
              activeKey=='3'&&
              <ModuleSet homepageModuleId={homepageModuleId}/>
            }
          </TabPane>
          {
            activeKey=='2'&&
            <TabPane tab="配置商品" key="2">
                <GoodsConfig homepageModuleId={homepageModuleId}/>
            </TabPane>
          } */}
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
