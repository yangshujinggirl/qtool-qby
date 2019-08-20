import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "dva";
import StepMod from "./components/StepMod";
import SetTitle from "./components/SetGood/Title";
import Discount from "./components/SetGood/Discount";
import Import from "./components/SetGood/Import";
import SetGoods from "./components/SetGood/SetGoods";
import "./index.less";

class CtipActivityAddTwo extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="set_goods">
        <StepMod step={1} />
        {1 == 2 && (
          <div>
            <div className="title">优惠内容</div>
            <SetTitle type={2} />
            <Discount />
          </div>
        )}
        <div className="title">活动商品</div>
        <SetTitle type={2} />
        <Import />
        <SetGoods />
        <div className="btn_box">
          <Button className="btn" size="large">上一步</Button>
          <Button className="btn" type="primary" size="large">保存并预览</Button>
          <Button className="btn" type="primary" size="large">保存并提交审核</Button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { ctipActivityAddTwo } = state;
  return ctipActivityAddTwo;
}
export default connect(mapStateToProps)(CtipActivityAddTwo);
