import React, { Component } from "react";
import { Button, Form, message } from "antd";
import { connect } from "dva";
import StepMod from "./components/StepMod";
import SetTitle from "./components/SetGood/Title";
import Discount from "./components/SetGood/Discount";
import Import from "./components/SetGood/Import";
import SetGoods from "./components/SetGood/SetGoods";
import { saveGoodsetApi,goAuditApi } from "../../../services/marketActivities/ctipActivity";
import "./index.less";

class CtipActivityAddTwo extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.props.dispatch({//清空历史数据
      type: "ctipActivityAddTwo/resetData",
      payload: {}
    });
    const { promotionId, promotionType } = this.props.data;
    this.props.dispatch({//活动所有设置的详情
      type: "ctipActivityAddTwo/fetchDiscountInfo",
      payload: { promotionId }
    });
    this.props.dispatch({
      type: "ctipActivityAddTwo/getProType",
      payload: { promotionType }
    });
  };
  //上一步
  goback = () => {
    const { promotionId, promotionType } = this.props.data;
    const { componkey } = this.props;
    const paneitem = {
      title: "编辑C端活动",
      key: `1501000levelTwoOne${promotionId}`,
      componkey: "1501000levelTwoOne",
      parentKey: "1501000level",
      data: {
        parentKey: "1501000level",
        promotionId: promotionId,
        promotionType: promotionType
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  gobackToList = () => {
    const componkey = `1501000levelTwoSecond${this.props.data.promotionId}`;
    this.props.dispatch({
      type: "tab/initDeletestate",
      payload: componkey
    });
    this.props.dispatch({
      type:'ctipActivity/fetchList',
      payload:{channel:1}
    });
  };
  goInfo = () => {
    const { promotionId } = this.props.data;
    const paneitem = {
      title: "C端活动详情",
      key: `1501000levelTwoInfo${promotionId}`,
      componkey: "1501000levelTwoInfo",
      parentKey: "1501000level",
      data: {
        promotionId: promotionId
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  //保存并预览
  handSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.sendQequest("save");
      }
    });
  };
  //保存并审核
  audit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.sendQequest("audit");
      }
    });
  };
  //发送请求
  sendQequest = type => {
    const { promotionId, promotionType } = this.props.data;
    const { goodLists } = this.props;
    if (goodLists.length == 0) {
      message.error("请至少添加一个活动商品");
      return
    };
    let values = { promotionId, promotionType, promotionProducts: goodLists };
    if (!(promotionType == 10 || promotionType == 11)) {
      //非单品
      const { dataSource } = this.props;
      values.promotionRules = dataSource;
    }
    if (promotionType == 20 || promotionType == 21) {
      //满元或者满件赠
      const isNoValue = values.promotionRules.some(item => {
        return item.promotionGifts.length == 0;
      });
      if (isNoValue) {
        message.error("存在某级阶梯没有赠品，请至少上传一个赠品");
        return ;
      };
    };
    saveGoodsetApi(values).then(res => {
      if (res.code == "0") {
        if (type == "audit") {
          message.success("提交审核成功");
          goAuditApi({promotionId}).then(res=>{
            if(res.code == 0){
              this.gobackToList(); //回到列表页
            };
          });
        };
        if (type == "save") {//回到查看页
          this.goInfo();
        };
      };
    });
  };
  render() {
    const { promotionType,beginTime,endTime,pdKind,promotionId} = this.props.data;
    const form = this.props.form;
    return (
      <div className="set_goods">
        <StepMod step={1} />
        {!(promotionType == 10 || promotionType == 11) && (
          <div>
            <div className="title">优惠内容</div>
            <div className="set_title">
              <SetTitle type={promotionType} />
            </div>
            <Discount form={form} />
          </div>
        )}
        <div className="act_goods_index">
          <div className="title">活动商品</div>
          {this.props.data.pdScope == 1 ? (
            <div className='all_field'>
              您选择的促销级别为全场级，全部商品都参与活动，此处无需添加商品
            </div>
          ) : (
            <div>
              <div className="set_title">
                {(promotionType == 10 || promotionType == 11) && (
                  <SetTitle type={promotionType}/>
                )}
              </div>
              <Import beginTime={beginTime} endTime={endTime} pdKind={pdKind} promotionId={promotionId}/>
              <SetGoods />
            </div>
          )}
        </div>
        <div className="btn_box">
          <Button className="btn" size="large" onClick={this.goback}>
            上一步
          </Button>
          <Button
            className="btn"
            type="primary"
            size="large"
            onClick={this.handSubmit}
          >
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
