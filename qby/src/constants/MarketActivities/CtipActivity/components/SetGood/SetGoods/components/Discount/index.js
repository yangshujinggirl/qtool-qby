import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { connect } from "dva";
const FormItem = Form.Item;
import "./index.less";
class Discount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  delete = index => {
    this.props.form.resetFields();
    const promotionRules = [...this.props.promotionRules];
    const goodLists = [...this.props.goodLists];
    promotionRules.splice(index, 1);
    goodLists.promotionRules = promotionRules;
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshLists",
      payload: { goodLists }
    });
  };
  add = () => {
    const promotionRules = [...this.props.promotionRules];
    const goodLists = [...this.props.goodLists];
    promotionRules.push({ param: { leastAmount: "", reduceAmount: "" } });
    goodLists.promotionRules = promotionRules;
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshLists",
      payload: { goodLists }
    });
  };
  onChange = (e, index, key) => {
    const promotionRules = [...this.props.promotionRules];
    const goodLists = [...this.props.goodLists];
    promotionRules[index]["param"][key] = e.target.value;
    goodLists.promotionRules = promotionRules;
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshLists",
      payload: { goodLists }
    });
  };
  render() {
    const { promotionRules} = this.props;
    promotionRules.map((item,index) => {
      item.key = index;
    });
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="discountTwo">
        <Form>
          {promotionRules.map((item, index) => (
            <div className="step">
              <div>
                  <FormItem className="satified_price">
                    阶梯{index + 1}：<span style={{ color: "red" }}>*</span> 单笔订单满 　
                    {getFieldDecorator(`fieldValues[${index}].leastQty`, {
                      initialValue: item.param.leastQty,
                      onChange: e => {
                        this.onChange(e, index, "leastQty");
                      },
                      rules: [
                        { required: true, message: "请填写优惠内容" },
                        {
                          validator: (rule, value, callback) => {
                            if(value){
                              if (index > 0 && +value <= (+promotionRules[index - 1].param.leastQty) ) {
                                callback("此阶梯优惠门槛需大于上一阶梯的优惠门槛");
                              };
                              if(index > 0 && +promotionRules[index].param.reduceQty && +promotionRules[index].param.reduceQty/+value <= (+promotionRules[index - 1].param.reduceQty /+promotionRules[index - 1].param.leastQty)){
                                callback("此阶梯优惠门槛需大于上一阶梯的优惠门槛");
                              };
                              if(value>99){
                                callback('不可超过99')
                              };
                            };
                            callback();
                          }
                        }
                      ]
                    })(
                      <Input
                        autoComplete="off"
                        style={{ width: "50px" }}
                      />
                    )}　件, 送　
                  </FormItem>
                  <FormItem className="reduce_price">
                    {getFieldDecorator(`fieldValues[${index}].reduceQty`, {
                      initialValue: item.param.reduceQty,
                      onChange: e => {
                        this.onChange(e, index, "reduceQty");
                      },
                      rules: [
                        { required: true, message: "请填写优惠内容" },
                        {
                          validator: (rule, value, callback) => {
                            if(value){
                              if (index > 0 && +promotionRules[index].param.leastQty && +value/+promotionRules[index].param.leastQty <= (+promotionRules[index - 1].param.reduceQty /+promotionRules[index - 1].param.leastQty)) {
                                callback("此阶梯优惠门槛需大于上一阶梯的优惠门槛");
                              };
                              if(value>99){
                                callback('不可超过99')
                              };
                            };
                            callback();
                          }
                        }
                      ]
                    })(<Input autoComplete="off" style={{ width: "50px" }} />)}
                  </FormItem>
              </div>
              {promotionRules.length > 1 && (
                <a className="theme-color" onClick={() => this.delete(index)}>
                  删除等级
                </a>
              )}
            </div>
          ))}
        </Form>
        <div className="discountTwo_add">
          <Button
            disabled={promotionRules.length == 3}
            type="primary"
            onClick={this.add}
          >
            继续新增等级优惠
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
const Discounts = Form.create({})(Discount);
export default connect(mapStateToProps)(Discounts);
