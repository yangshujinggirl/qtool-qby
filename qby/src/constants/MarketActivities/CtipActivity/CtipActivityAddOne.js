import React , { Component } from 'react';
import { connect } from "dva";
import { Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, } from 'antd';
import moment from 'moment';
import StepMod from './components/StepMod';
import InfoSet from './components/InfoSet';
import WebSet from './components/WebSet';
import { getSaveActivApi } from '../../../services/marketActivities/ctipActivity.js';
import './CtipActivityAddOne.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class CtipActivityAddOneF extends Component {
  componentDidMount() {
    this.initPage()
  }
  initPage() {
    const { data } = this.props;
    this.props.dispatch({
      type:'ctipActivityAddOne/resetData',
      payload:{}
    })
    if(data.promotionId) {
      this.props.dispatch({
        type:'ctipActivityAddOne/fetchInfo',
        payload:{promotionId:data.promotionId}
      })
    }
  }
  handleSubmit= e => {
    // this.jump()
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values = this.formatParams(values);
      if (!err) {
        values = this.formatParams(values);
        getSaveActivApi(values)
        .then((res)=> {
          if(res.code == '0') {
            this.successCallback()
          }
        })
      }
    });
  };
  formatParams=(values)=> {
    let { time, warmUpBeginTime, bearerActivity, autoComplete, bearers, ...paramsVal} =values;
    const { activityInfo, ratioList, data } =this.props;
    if(time&&time.length>0) {
      paramsVal.beginTime = moment(time[0]).format('YYYY-MM-DD HH:mm:ss');
      paramsVal.endTime = moment(time[1]).format('YYYY-MM-DD HH:mm:ss');
    }
    if(warmUpBeginTime) {
      paramsVal.warmUpBeginTime = moment(warmUpBeginTime).format('YYYY-MM-DD HH:mm:ss');
    }
    if(ratioList.length>0) {
      paramsVal.bearers = ratioList.map((el) => {
        let item={};
        item.bearer = el.bearer;
        item.proportion = el.proportion;
        item.remark = el.remark;
        return item;
      });
      if(ratioList[0].budget) {
        paramsVal.budget = ratioList[0].budget;
      }
    }
    if(data.promotionId) {
      paramsVal.promotionId = data.promotionId;
    }
    paramsVal.platformType = 1;
    paramsVal.pdDetailBannerPic = activityInfo.pdDetailBannerPic;
    paramsVal.logoPic = activityInfo.logoPic;
    return paramsVal;
  }
  jump=()=>{
    const { data } = this.props;
    const paneitem = {
      title: "编辑C端活动",
      key: `${data.parentKey}TwoSecond${Math.random()}`,
      componkey: `${data.parentKey}TwoSecond`,
      parentKey:data.parentKey,
      data: {
        parentKey:data.parentKey,
        promotionId:Math.random(),
        promotionType:data.promotionType
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  }
  successCallback=(res)=> {
    const { data } = this.props;
    const paneitem = {
      title: "编辑C端活动",
      key: `${data.parentKey}TwoSecond${res.promotionId}`,
      componkey: `${data.parentKey}TwoSecond`,
      parentKey:data.parentKey,
      data: {
        parentKey:data.parentKey,
        promotionId:res.promotionId,
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { ratioList, activityInfo } =this.props;
    return(
      <div className="cTip-activity-creat-wrap">
        <StepMod step={0}/>
        <Form>
          <InfoSet form={this.props.form} promotionId={this.props.data.promotionId}/>
          <WebSet form={this.props.form}/>
        </Form>
        <div className="submit-btn-wrap">
          <Button
            size="large"
            type="primary"
            onClick={this.handleSubmit}>保存并继续</Button>
        </div>
      </div>
    )
  }
}
const bearMap={
  'A':'Qtools',
  'B':'门店',
  'C':'供应商',
}
const CtipActivityAddOne = Form.create({
  onValuesChange(props, changedFields, allFields) {
    let { bearers=[], pdDetailBannerPic, logoPic, ...valFileds } = allFields;
    let currentKey = Object.keys(changedFields)[0];
    let { ratioList } =props;
    if(currentKey == 'bearers') {
      ratioList =ratioList.map((el,idx) => {
        bearers.map((prev,index) =>{
          if(idx == index) {
            el = {...el,...prev};
          }
        })
        return el;
      })
      props.dispatch({
        type:'ctipActivityAddOne/getRatioList',
        payload:ratioList
      })
    }
    if(valFileds.promotionScope==2&&valFileds.promotionType==23) {
      valFileds.pdScope=2;
      valFileds.pdKind=null;
    }
    if(pdDetailBannerPic) {
      if(pdDetailBannerPic.status == 'done') {
        if(pdDetailBannerPic.response.code == '0') {
          valFileds.pdDetailBannerPic = pdDetailBannerPic.response.data[0];
        }
      }
    }
    if(logoPic) {
      if(logoPic.status == 'done') {
        if(logoPic.response.code == '0') {
          valFileds.logoPic = logoPic.response.data[0];
        }
      }
    }
    props.dispatch({
      type:'ctipActivityAddOne/getActivityInfo',
      payload:valFileds
    })
  },
})(CtipActivityAddOneF);
function mapStateToProps(state) {
  const { ctipActivityAddOne } = state;
  return ctipActivityAddOne;
}

export default  connect(mapStateToProps)(CtipActivityAddOne);
