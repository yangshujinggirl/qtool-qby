import React, { Component } from "react";
import { Button, Form, message } from "antd";
import { connect } from "dva";
import StepMod from "./components/StepMod";
import SetTitle from "./components/SetGood/Title";
import Discount from "./components/SetGood/Discount";
import Import from "./components/SetGood/Import";
import SetGoods from "./components/SetGood/SetGoods";
import {saveGoodsetApi} from '../../../services/marketActivities/ctipActivity'
import "./index.less";

class CtipActivityAddTwo extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.props.dispatch({//清空历史数据
      //活动所有设置的详情
      type: "ctipActivityAddTwo/resetData",
      payload: {}
    });
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
  //上一步
  goback=()=>{
    const {promotionId,promotionType} = this.props.data;
    const { componkey } = this.props;
    const paneitem = {
      title: "编辑C端活动",
      key:  `1501000levelTwoOne${promotionId}`,
      componkey: '1501000levelTwoOne',
      parentKey:'1501000level',
      data: {
        parentKey:'1501000level',
        promotionId:promotionId,
        promotionType:promotionType
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  gobackToList=()=>{
    const componkey = `1501000levelTwoSecond${this.props.data.promotionId}`
    this.props.dispatch({
      type: "tab/initDeletestate",
      payload: componkey
    });
  };
  goInfo=()=> {
    const {promotionId} = this.props;
    const paneitem = {
      title: "C端活动详情",
      key: `1501000levelTwoInfo${promotionId}`,
      componkey: '1501000levelTwoInfo',
      parentKey:'1501000level',
      data: {
        promotionId:promotionId
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  }
  //保存并预览
  handSubmit=()=>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      // this.goInfo()
      if (!err) {
        this.sendQequest('save')
      };
    });
  }
  //保存并审核
  audit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      // this.gobackToList()//回到列表页
      if (!err) {
        this.sendQequest('audit')
      };
    });
  };
  //发送请求
  sendQequest=(type)=>{
    const {promotionId,promotionType} = this.props.data;
        const {goodLists} = this.props;
        if(goodLists.length==0){
          message.error('请至少添加一个活动商品');
        };
        let values = {promotionId, promotionType,promotionProducts:goodLists};
        if( !(promotionType==10||promotionType==11) ){//非单品
          const {dataSource} = this.props;
          values.promotionRules = dataSource;
        };
        saveGoodsetApi(values).then(res=>{
          if(res.code == '0'){
            if(type=='audit'){
              message.success('提交审核成功');
              this.gobackToList()//回到列表页
            };
            if(type=='save'){//回到查看页
              this.goInfo()
            };
          };
        });
  }
  render() {
    console.log(this.props)
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
          <Button className="btn" size="large" onClick={this.goback}>
            上一步
          </Button>
          <Button className="btn" type="primary" size="large" onClick={this.handSubmit}>
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