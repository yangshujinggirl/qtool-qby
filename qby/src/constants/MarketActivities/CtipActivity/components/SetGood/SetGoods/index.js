import React, { Component } from "react";
import { connect } from "dva";
import { Table, Modal } from "antd";
import SetModal from "./components/SetModal";
import "./index.less";
import getColumns from "./columns";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      delVisible: false,
      currentIndex: 0,
      currentRecord: {
        pdCode: "",
        maxQty: "",
        perOrderLimit: "",
        perDayLimit: "",
        perUserLimit: "",
        sellPrice: "",
      }
    };
  }
  //编辑
  edit = (index, record) => {
    if(this.props.promotionType == 11){
      this.props.dispatch({
        type: "ctipActivityAddTwo/refreshSingleRules",
        payload: { promotionRules:record.promotionRules }
      });
    };
    this.setState({
      visible: true,
      currentIndex: index,
      currentRecord: record
    });
  };
  //删除
  delt = () => {
    this.setState({
      delVisible: true
    });
  };
  //确认删除
  onDelOk = index => {
    const goodLists = [...this.props.goodLists];
    goodLists.splice(index, 1);
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshLists",
      payload: {goodLists}
    });
    this.setState({
      delVisible: false
    });
  };
  onVisible = () => {
    this.setState({
      visible: false
    });
  };
  onDelCancel = () => {
    this.setState({
      delVisible: false
    });
  };
  render() {
    console.log(this.props)
    const { goodLists, promotionType } = this.props;
    const {
      visible,
      delVisible,
      currentIndex,
      currentRecord
    } = this.state;
    const Columns = getColumns(this.edit, this.delt);
    let columns = [];
    switch(promotionType) {
      case 10:
       columns = Columns.columns1;
       break;
      case 11:
       columns = Columns.columns2;
       break;
      case 20:
      case 21:
      case 23:
       columns = Columns.columns3;
       break;
      case 22:
       columns = Columns.columns4;
       break;
    };
    return (
      <div className="act_setGoods">
        <div className="batch_set_box">
          共{goodLists.length}条数据
        </div>
        <div className="good_table">
          <Table
            pagination={false}
            bordered
            columns={columns}
            scroll={{
              x: (promotionType == 10 || promotionType == 11) ? "140%" : ""
            }}
            dataSource={goodLists}
          />
          <SetModal
            visible={visible}
            currentIndex={currentIndex}
            currentRecord={currentRecord}
            onVisible={this.onVisible}
          />
          <Modal
            wrapClassName="setGood_del_model"
            width="400"
            okText="确认删除"
            cancelText="暂不删除"
            visible={delVisible}
            onCancel={this.onDelCancel}
            onOk={this.onDelOk}
          >
            是否删除此商品
          </Modal>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { ctipActivityAddTwo } = state;
  return ctipActivityAddTwo;
}
export default connect(mapStateToProps)(index);
