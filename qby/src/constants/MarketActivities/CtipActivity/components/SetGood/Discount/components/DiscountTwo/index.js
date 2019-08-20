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
  componentDidMount() {}
  delete = index => {
    this.props.form.resetFields();
    const dataLists = [...this.props.dataLists];
    dataLists.splice(index, 1);
    this.props.dispatch({
      type: "discount/refreshDataLists",
      payload: { dataLists }
    });
  };
  add = () => {
    const dataLists = [...this.props.dataLists];
    dataLists.push({ price1: "", price2: "" });
    this.props.dispatch({
      type: "discount/refreshDataLists",
      payload: { dataLists }
    });
  };
  onChange = (e, index, key) => {
    const dataLists = [...this.props.dataLists];
    dataLists[index][key] = e.target.value;
    this.props.dispatch({
      type: "discount/refreshDataLists",
      payload: { dataLists }
    });
  };
  render() {
    const { dataLists } = this.props;
    dataLists.map(item => {
      item.key = item.id;
    });
    console.log(dataLists);
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="discountTwo">
        <Form>
          {dataLists.map((item, index) => (
            <div className="step">
              <div>
                <FormItem className="satified_price">
                  {1 == 2 ? (
                    <span>阶梯{index + 1}：单笔订单满　</span>
                  ) : (
                    <span>阶梯{index + 1}：买满　</span>
                  )}
                  {getFieldDecorator(`fieldValues[${index}].price1`, {
                    initialValue: item.price1,
                    onChange: e => {
                      this.onChange(e, index, "price1");
                    },
                    rules: [
                      {
                        validator: (rule, value, callback) => {
                          if (index > 0) {
                            if (value <= dataLists[index - 1].price1) {
                              callback(
                                "此阶梯优惠门槛需大于上一阶梯的优惠门槛"
                              );
                            }
                          }
                          callback();
                        }
                      }
                    ]
                  })(
                    <Input
                      autoComplete="off"
                      maxLength="5"
                      style={{ width: "150px" }}
                    />
                  )}
                  {1 == 2 ? "　元, 减　" : "　件, 减免　"}
                </FormItem>
                <FormItem className="reduce_price">
                  {getFieldDecorator(`fieldValues[${index}].price2`, {
                    
                    initialValue: item.price2,
                    onChange: e => {
                      this.onChange(e, index, "price2");
                    },
                    rules: [
                      {
                        validator: (rule, value, callback) => {
                          if (index > 0) {
                            if (
                              value / dataLists[index].price1 <=
                              dataLists[index - 1].price2 /
                                dataLists[index - 1].price1
                            ) {
                              callback(
                                "此阶梯优惠门槛需大于上一阶梯的优惠门槛"
                              );
                            }
                          }
                          callback();
                        }
                      }
                    ]
                  })(<Input autoComplete="off" style={{ width: "150px" }} />)}
                </FormItem>
              </div>
              {dataLists.length > 1 && (
                <a className="theme-color" onClick={() => this.delete(index)}>
                  删除等级
                </a>
              )}
            </div>
          ))}
        </Form>
        <div className="discountTwo_add">
          <Button
            disabled={dataLists.length == 3}
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
  const { discount } = state;
  return discount;
}
const DiscountTwos = Form.create({})(DiscountTwo);
export default connect(mapStateToProps)(DiscountTwos);
