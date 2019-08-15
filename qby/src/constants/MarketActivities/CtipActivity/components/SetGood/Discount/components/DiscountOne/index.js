import React, { Component } from "react";
import { Input, Table, Button, Modal, Form } from "antd";
import { connect } from "dva";
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
    //拿到初始的列表信息--->放在model中拿
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
        dataIndex: "name",
        key: "2"
      },
      {
        title: "赠品B端售价",
        dataIndex: "bPrice",
        key: "3"
      },
      {
        title: "最多可参与活动的赠品数",
        dataIndex: "max",
        key: "4"
      },
      {
        title: "赠品B端在售库存",
        dataIndex: "bStock",
        key: "5"
      },
      {
        title: "赠品C端在售库存",
        dataIndex: "cStock",
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
                    record.max,
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
  //编辑
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
  //删除
  delete = (currentParentIndex, currentChildIndex) => {
    this.setState({
      currentParentIndex,
      currentChildIndex,
      deletVisible: true,
      level: false
    });
  };
  //新增
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
    dataSource[index].price = Number(value);
    this.setState({
      dataSource
    });
    const m = new Map();
    m.set(`price${index}`, value);
    this.props.form.setFieldsValue(m);
    console.log(this.props.form.getFieldsValue());
  };
  //确认
  handleOk = (values, resetFields) => {
    let {
      dataSource,
      currentParentIndex,
      currentChildIndex,
      editType
    } = this.state;
    const list = {
      pdCode: values.pdCode,
      name: "zengpin",
      bPrice: "12.00",
      max: values.max,
      bStock: 12,
      cStock: 14
    };
    if (editType == "add") {
      //判断是新增还是编辑
      dataSource[currentParentIndex].lists.push(list);
    } else {
      const lists = dataSource[currentParentIndex].lists;
      lists[currentChildIndex] = list;
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
      deletVisible:true,
      level:true
    });
  };
  //新增等级
  addLevel = () => {
    const list = { price: "", lists: [] };
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
    const { dataSource, currentParentIndex, currentChildIndex,level} = this.state;
    if (level) {
      //是等级删除
      dataSource.splice(currentParentIndex,1);
    } else {
      const lists = dataSource[currentParentIndex].lists;
      lists.splice(currentChildIndex, 1);
    };
    this.setState({
      deletVisible:false
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
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
    console.log(dataSource);
    return (
      <div className="discount-good">
        <div>赠送方式: 每种赠品均送</div>
        <div className="content">
          {dataSource.map((item, index) => (
            <div>
              <Table
                className="discount_table"
                title={() => (
                  <div className="discount_title">
                    <div>
                      <FormItem>
                        阶梯{index + 1}：*单笔订单满　
                        {getFieldDecorator(`price${index}`, {
                          rules: [
                            { required: "请输入价格" },
                            {
                              validator: (rule, value, callback) => {
                                if (index == 0) {
                                  return callback();
                                }
                                if (value <= dataSource[index - 1].price) {
                                  callback(
                                    "此阶梯优惠门槛需大于上一阶梯的优惠门槛"
                                  );
                                }
                                if (value > 99999) {
                                  callback("不可超过99999");
                                }
                                callback();
                              }
                            }
                          ],
                          initialValue: item.price,
                          onChange: e => this.onChange(e, index)
                        })(
                          <Input
                            maxLength={5}
                            autoComplete="off"
                            style={{ width: "100px" }}
                          />
                        )}
                        　 元，送以下商品
                      </FormItem>
                      　 　
                    </div>
                    <a
                      onClick={() => this.deleteParent(index)}
                      className="theme-color"
                    >
                      删除此级
                    </a>
                  </div>
                )}
                footer={() => (
                  <div className="discount_footer">
                    <Button
                      disabled={item.lists.length == 20}
                      onClick={() => this.add(index, "add")}
                      type="primary"
                    >
                      +赠品
                    </Button>
                  </div>
                )}
                pagination={false}
                bordered
                dataSource={item.lists}
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
          wrapClassName='discount_delet_modal'
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
  const { discount } = state;
  return discount;
}
const DiscountOnes = Form.create({})(DiscountOne);
export default connect(mapStateToProps)(DiscountOnes);
