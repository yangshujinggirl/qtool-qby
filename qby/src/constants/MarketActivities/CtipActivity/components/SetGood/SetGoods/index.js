import React, { Component } from "react";
import { connect } from "dva";
import { Table, Modal } from "antd";
import SetModal from "./components/SetModal";
import BatchModal from "./components/BatchModal";
import "./index.less";
import getColumns from "./columns";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      batchVisible: false,
      delVisible: false,
      batchType: 1,
      currentIndex: 0,
      currentRecord: {
        pdCode: "",
        maxQty: "",
        perOrderLimit: "",
        perDayLimit: "",
        perUserLimit: "",
        sellPrice: ""
      }
    };
  }
  //编辑
  edit = (index, record) => {
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
      payload: goodLists
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
  setBatchVisible = () => {
    this.setState({
      batchVisible: false
    });
  };
  onDelCancel = () => {
    this.setState({
      delVisible: false
    });
  };
  setQty = batchType => {
    this.setState({
      batchType,
      batchVisible: true
    });
  };
  render() {
    const { goodLists, promotionType } = this.props;
    const {
      visible,
      batchVisible,
      delVisible,
      batchType,
      currentIndex,
      currentRecord
    } = this.state;
    const type = 1;
    const Columns = getColumns(type, this.edit, this.delt);
    let columns = [];
    if(promotionType==10){
      columns = Columns.columns1;
    };
    if(promotionType==11){
      columns = Columns.columns2;
    };
    if(promotionType == 20 ||promotionType == 21 ||promotionType == 23){
      columns = Columns.columns3;
    };
    if(promotionType == 22){
      columns = Columns.columns4;
    }
    return (
      <div className="act_setGoods">
        <div className="batch_set_box">
          <div>
            批量设置：
            {promotionType != 11 && (
              <a className="batch_set" onClick={() => this.setQty(1)}>
                活动最大可售卖数量
              </a>
            )}
            {(promotionType == 10 || promotionType == 11) && (
              <span>
                <a className="batch_set" onClick={() => this.setQty(2)}>
                  每账号每单限购
                </a>
                <a className="batch_set" onClick={() => this.setQty(3)}>
                  每账号每天限购
                </a>
                <a className="batch_set" onClick={() => this.setQty(4)}>
                  每账号总限购
                </a>
              </span>
            )}
          </div>
          <div>共{goodLists.length}条数据</div>
        </div>
        <div className="good_table">
          <Table
            pagination={false}
            bordered
            columns={columns}
            scroll={{
              x: promotionType == 10 || promotionType == 11 ? "140%" : ""
            }}
            dataSource={goodLists}
          />
          <SetModal
            visible={visible}
            currentIndex={currentIndex}
            currentRecord={currentRecord}
            onVisible={this.onVisible}
          />
          <BatchModal
            visible={batchVisible}
            type={batchType}
            setBatchVisible={this.setBatchVisible}
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
