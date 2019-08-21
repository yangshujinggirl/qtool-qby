import React, { Component } from "react";
import { Button, Form } from "antd";
import { connect } from "dva";
import StepMod from "./components/StepMod";
import SetTitle from "./components/SetGood/Title";
import Discount from "./components/SetGood/Discount";
import Import from "./components/SetGood/Import";
import SetGoods from "./components/SetGood/SetGoods";
import "./index.less";

class CtipActivityAddTwo extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    const { promotionId, promotionType } = this.props.data;
    this.props.dispatch({
      //活动所有设置的详情
      type: "ctipActivityAddTwo/fetchDiscountInfo",
      payload: { promotionId }
    });
    this.props.dispatch({
      type: "ctipActivityAddTwo/getProType",
      payload: { promotionType }
    });
  };
  audit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      }
    });
  };
  render() {
    const { promotionType } = this.props;
    const form = this.props.form;
    return (
      <div className="set_goods">
        <StepMod step={1} />
        {!(promotionType == 10 || promotionType == 11) && (
          <div>
            <div className="title">优惠内容</div>
            <div className="set_title">
              <SetTitle type={promotionType}/>
            </div>
            <Discount form={form} />
          </div>
        )}
        <div className='act_goods_index'>
          <div className="title">活动商品</div>
          <div className="set_title">
            {(promotionType == 10 || promotionType == 11) && (
              <SetTitle type={promotionType}/>
            )}
          </div>
          <Import />
          <SetGoods />
        </div>
        <div className="btn_box">
          <Button className="btn" size="large">
            上一步
          </Button>
          <Button className="btn" type="primary" size="large">
            保存并预览
          </Button>
          <Button
            className="btn"
            type="primary"
            size="large"
            onClick={this.audit}
          >
            保存并提交审核
          </Button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { ctipActivityAddTwo } = state;
  return ctipActivityAddTwo;
}
const CtipActivityAddTwos = Form.create({})(CtipActivityAddTwo);
export default connect(mapStateToProps)(CtipActivityAddTwos);
