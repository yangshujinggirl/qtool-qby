import React, { Component } from "react";
import { Input, Table, Button, Modal, Form } from "antd";
import { connect } from "dva";
import { getComplimentaryApi } from "../../../../../../../../services/marketActivities/ctipActivity";
import EditModal from "./components/EditModal";
import "./index.less";
const FormItem = Form.Item;
class DiscountOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletVisible: false,
      visible: false,
      currentParentIndex: 0,
      currentChildIndex: 0,
      editType: "add",
      status: 1,
      max: "",
      pdCode: "",
      dataSource: this.props.dataSource
    };
  }
  componentDidMount = () => {
    console.log(this.props);
    //拿到初始的列表信息--->放在model中拿
  };
  componentWillReceiveProps = nextProps => {
    if (!_.isEqual(nextProps.dataSource, this.props.dataSource)) {
      this.setState({
        dataSource: nextProps.dataSource
      });
    }
  };
  getColumns = currentParentIndex => {
    const columns = [
      {
        title: "赠品编码",
        dataIndex: "pdCode",
        key: "1"
      },
      {
        title: "赠品名称",
        dataIndex: "pdName",
        key: "2"
      },
      {
        title: "赠品B端售价",
        dataIndex: "sellPrice",
        key: "3"
      },
      {
        title: "最多可参与活动的赠品数",
        dataIndex: "maxQty",
        key: "4"
      },
      {
        title: "赠品B端在售库存",
        dataIndex: "toBQty",
        key: "5"
      },
      {
        title: "赠品C端在售库存",
        dataIndex: "toCQty",
        key: "6"
      },
      {
        title: "赠品操作",
        key: "7",
        render: (text, record, index) => {
          return (
            <div>
              <a
                onClick={() => this.delete(currentParentIndex, index)}
                className="theme-color"
              >
                删除
              </a>
              　
              <a
                onClick={() =>
                  this.edit(
                    record.pdCode,
                    record.maxQty,
                    "edit",
                    currentParentIndex,
                    index
                  )
                }
                className="theme-color"
              >
                编辑
              </a>
            </div>
          );
        }
      }
    ];
    return columns;
  };
  //子级编辑
  edit = (pdCode, max, editType, currentParentIndex, currentChildIndex) => {
    this.setState({
      pdCode,
      max,
      visible: true,
      editType,
      currentParentIndex,
      currentChildIndex
    });
  };
  //子集删除
  delete = (currentParentIndex, currentChildIndex) => {
    this.setState({
      currentParentIndex,
      currentChildIndex,
      deletVisible: true,
      level: false
    });
  };
  //子级新增
  add = (currentParentIndex, editType) => {
    this.setState({
      visible: true,
      currentParentIndex,
      editType
    });
  };
  //满赠价格变化
  onChange = (e, index) => {
    const { value } = e.target;
    const { dataSource } = this.state;
    if (this.props.promotionType == 20) {
      //20满元曾21满件赠
      dataSource[index].param.leastAmount = Number(value);
    } else {
      dataSource[index].param.leastQty = Number(value);
    }
    this.setState({
      dataSource
    });
    const m = new Map();
    m.set(`price${index}`, value);
    this.props.form.setFieldsValue(m);
    console.log(this.props.form.getFieldsValue());
  };
  //新增赠品确认
  handleOk = (values, resetFields) => {
    let {
      dataSource,
      currentParentIndex,
      currentChildIndex,
      editType
    } = this.state;
    if (editType == "add") {
      //判断是新增还是编辑
      getComplimentaryApi({ pdCode: values.pdCode }).then(res => {
        if (res.code == 0) {
        }
      });
      const product = {
        pdCode: "233",
        pdName: "zengpin",
        sellPrice: "12.00",
        toBQty: 12,
        toCQty: 14
      };
      let list = { ...product, maxQty: values.max };
      dataSource[currentParentIndex].promotionGifts.push(list);
    } else {
      const promotionGifts = dataSource[currentParentIndex].promotionGifts;
      const list = promotionGifts[currentChildIndex];
      promotionGifts[currentChildIndex] = { ...list, maxQty: values.max };
    }
    this.setState({
      visible: false,
      dataSource
    });
    resetFields();
  };
  //取消
  handleCancel = resetFields => {
    this.setState({
      visible: false
    });
    resetFields();
  };
  //删除等级
  deleteParent = index => {
    this.setState({
      currentParentIndex: index,
      deletVisible: true,
      level: true
    });
  };
  //新增等级
  addLevel = () => {
    const list = {
      param: { leastAmount: "", leastQty: "" },
      promotionGifts: []
    };
    const { dataSource } = this.state;
    dataSource.push(list);
    this.setState(dataSource);
  };
  onCancel = () => {
    this.setState({
      deletVisible: false
    });
  };
  onOk = () => {
    const {
      dataSource,
      currentParentIndex,
      currentChildIndex,
      level
    } = this.state;
    if (level) {
      this.props.form.resetFields();
      //是等级删除
      dataSource.splice(currentParentIndex, 1);
    } else {
      const promotionGifts = dataSource[currentParentIndex].promotionGifts;
      promotionGifts.splice(currentChildIndex, 1);
    }
    this.setState({
      deletVisible: false
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { promotionType } = this.props;
    const {
      dataSource,
      status,
      visible,
      pdCode,
      max,
      editType,
      deletVisible,
      level
    } = this.state;
    return (
      <div className="discount-good">
        <div>赠送方式: 每种赠品均送</div>
        <div className="content">
          {dataSource.length>0&&dataSource.map((item, index) => (
            <div>
              <Table
                key={index}
                className="discount_table"
                title={() => (
                  <div className="discount_title">
                    <div>
                      {promotionType == 20 && (
                        <FormItem>
                          阶梯{index + 1}：<span style={{color:'red'}}>*</span>单笔订单满　
                          {getFieldDecorator(`price${index}`, {
                            rules: [
                              { required: true, message: "请填写优惠内容" },
                              {
                                validator: (rule, value, callback) => {
                                  if (index > 0 &&value &&value <=dataSource[index - 1].param.leastAmount) {
                                    callback("此阶梯优惠门槛需大于上一阶梯的优惠门槛");
                                  };
                                  if (value > 99999) {
                                    callback("不可超过99999");
                                  };
                                  callback();
                                },
                              },
                            ],
                            initialValue: item.param.leastAmount,
                            onChange: e => this.onChange(e, index)
                          })(
                            <Input
                              autoComplete="off"
                              style={{ width: "100px" }}
                            />
                          )}　元，送以下商品
                        </FormItem>
                      )}
                      {promotionType == 21 && (
                        <FormItem>
                          阶梯{index + 1}：*单笔订单满　
                          {getFieldDecorator(`price${index}`, {
                            rules: [
                              { required: true, message: "请填写优惠内容" },
                              {
                                validator: (rule, value, callback) => {
                                  if (index > 0 &&value &&value <=dataSource[index - 1].param.leastQty) {
                                    callback("此阶梯优惠门槛需大于上一阶梯的优惠门槛");
                                  };
                                  if (value > 99) {
                                    callback("不可超过99");
                                  };
                                  callback();
                                },
                              }
                            ],
                            initialValue: item.param.leastQty,
                            onChange: e => this.onChange(e, index)
                          })(
                            <Input
                              autoComplete="off"
                              style={{ width: "100px" }}
                            />
                          )}　件，送以下商品
                        </FormItem>
                      )}
                    </div>
                    {dataSource.length > 1 && (
                      <a
                        onClick={() => this.deleteParent(index)}
                        className="theme-color"
                      >
                        删除此级
                      </a>
                    )}
                  </div>
                )}
                footer={() => (
                  <div className="discount_footer">
                    <Button
                      disabled={item.promotionGifts.length == 20}
                      onClick={() => this.add(index, "add")}
                      type="primary"
                    >+赠品
                    </Button>
                  </div>
                )}
                pagination={false}
                bordered
                dataSource={item.promotionGifts}
                columns={this.getColumns(index)}
                size="middle"
              />
            </div>
          ))}
          <div className="discount_addLevel">
            <Button
              disabled={dataSource.length == 3}
              type="primary"
              onClick={this.addLevel}
            >
              继续新增优惠等级
            </Button>
          </div>
        </div>
        <EditModal
          visible={visible}
          status={status}
          editType={editType}
          pdCode={pdCode}
          max={max}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
        />
        <Modal
          wrapClassName="discount_delet_modal"
          okText="确认删除"
          cancelText="暂不删除"
          visible={deletVisible}
          onCancel={this.onCancel}
          onOk={() => this.onOk(level)}
        >
          {level ? "是否删除此级优惠" : "是否删除此商品"}
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { ctipActivityAddTwo } = state;
  return ctipActivityAddTwo;
}
export default connect(mapStateToProps)(DiscountOne);
