import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { connect } from "dva";
const FormItem = Form.Item;
import "./index.less";
class DiscountTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  delete = index => {
    this.props.form.resetFields();
    const dataSource = [...this.props.dataSource];
    dataSource.splice(index, 1);
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshdataSource",
      payload: { dataSource }
    });
  };
  add = () => {
    const dataSource = [...this.props.dataSource];
    dataSource.push({ param: { leastAmount: "", reduceAmount: "" } });
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshdataSource",
      payload: { dataSource }
    });
  };
  onChange = (e, index, key) => {
    const dataSource = [...this.props.dataSource];
    dataSource[index]["param"][key] = e.target.value;
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshdataSource",
      payload: { dataSource }
    });
  };
  render() {
    const { dataSource,promotionType } = this.props;
    dataSource.map(item => {
      item.key = item.id;
    });
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="discountTwo">
        <Form>
          {dataSource.map((item, index) => (
            <div className="step">
              <div>
                {promotionType == 22 &&
                  <FormItem className="satified_price">
                    <span>
                      阶梯{index + 1}：<span style={{ color: "red" }}>*</span>{" "} 单笔订单满　
                    </span>
                    {getFieldDecorator(`fieldValues[${index}].leastAmount`, {
                      initialValue: item.param.leastAmount,
                      onChange: e => {
                        this.onChange(e, index, "leastAmount");
                      },
                      rules: [
                        { required: true, message: "请填写优惠内容" },
                        {
                          validator: (rule, value, callback) => {
                            if(value){
                              if (index > 0 && +value <= (+dataSource[index - 1].param.leastAmount) ) {
                                callback("此阶梯优惠门槛需大于上一阶梯的优惠门槛");
                              };
                              if(index > 0 && +dataSource[index].param.reduceAmount && +dataSource[index].param.reduceAmount/+value <= (+dataSource[index - 1].param.reduceAmount /+dataSource[index - 1].param.leastAmount)){
                                callback("此阶梯优惠门槛需大于上一阶梯的优惠门槛");
                              };
                              if(value>99999){
                                callback('不可超过99999')
                              };
                            };
                            callback();
                          }
                        }
                      ]
                    })(
                      <Input
                        autoComplete="off"
                        style={{ width: "150px" }}
                      />
                    )}　元, 减　
                </FormItem>
                }
                {promotionType == 23 &&
                  <FormItem className="satified_price">
                    阶梯{index + 1}：<span style={{ color: "red" }}>*</span> 买满　
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
                              if (index > 0 && +value <= (+dataSource[index - 1].param.leastQty) ) {
                                callback("此阶梯优惠门槛需大于上一阶梯的优惠门槛");
                              };
                              if(index > 0 && +dataSource[index].param.reduceQty && +dataSource[index].param.reduceQty/+value <= (+dataSource[index - 1].param.reduceQty /+dataSource[index - 1].param.leastQty)){
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
                        style={{ width: "150px" }}
                      />
                    )}　件, 减免　
                  </FormItem>
                }
                {promotionType == 22 &&
                  <FormItem className="reduce_price">
                  {getFieldDecorator(`fieldValues[${index}].reduceAmount`, {
                    initialValue: item.param.reduceAmount,
                    onChange: e => {
                      this.onChange(e, index, "reduceAmount");
                    },
                    rules: [
                      { required: true, message: "请填写优惠内容" },
                      {
                        validator: (rule, value, callback) => {
                          if(value){
                            if (index > 0 && +dataSource[index].param.leastAmount && +value/+dataSource[index].param.leastAmount <= (+dataSource[index - 1].param.reduceAmount /+dataSource[index - 1].param.leastAmount)) {
                              callback("此阶梯优惠门槛需大于上一阶梯的优惠门槛");
                            };
                            if(value>9999){
                              callback('不可超过9999')
                            };
                          };
                          callback();
                        }
                      }
                    ]
                  })(<Input autoComplete="off" style={{ width: "150px" }} />)}
                </FormItem>
                }
                {promotionType == 23 &&
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
                              if (index > 0 && +dataSource[index].param.leastQty && +value/+dataSource[index].param.leastQty <= (+dataSource[index - 1].param.reduceQty /+dataSource[index - 1].param.leastQty)) {
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
                    })(<Input autoComplete="off" style={{ width: "150px" }} />)}
                  </FormItem>
                }
              </div>
              {dataSource.length > 1 && (
                <a className="theme-color" onClick={() => this.delete(index)}>
                  删除等级
                </a>
              )}
            </div>
          ))}
        </Form>
        <div className="discountTwo_add">
          <Button
            disabled={dataSource.length == 3}
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
const DiscountTwos = Form.create({})(DiscountTwo);
export default connect(mapStateToProps)(DiscountTwos);
