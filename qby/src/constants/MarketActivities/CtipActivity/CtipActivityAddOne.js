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
    if(data.promotionId) {
      this.props.dispatch({
        type:'ctipActivityAddOne/fetchInfo',
        payload:{promotionId:data.promotionId}
      })
    }
  }
  handleSubmit= e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values = this.formatParams(values);
      console.log(values);
      if (!err) {
        values = this.formatParams(values);
        this.successCallback()
      }
    });
  };
  formatParams=(values)=> {
    let { time ,...paramsVal} =values;
    const { activityInfo, ratioList } =this.props;

    if(time&&time.length>0) {
      paramsVal.beginTime = moment(time[0]).format('YYYY-MM-DD HH:mm:ss');
      paramsVal.endTime = moment(time[1]).format('YYYY-MM-DD HH:mm:ss');
    }
    if(paramsVal.bearers&&paramsVal.bearers.length>0) {
      paramsVal.bearers = paramsVal.bearers.filter(x => true);
      // paramsVal.bearers = paramsVal.bearers.filter((el) => el.budget == true);
    }
    return paramsVal;
  }
  // jump=()=>{
  //   const { data } = this.props;
  //   const paneitem = {
  //     title: "编辑C端活动",
  //     key: `${data.parentKey}levelTwoSecond${Math.random()}`,
  //     componkey: `${data.parentKey}levelTwoSecond`,
  //     parentKey:data.parentKey,
  //     data: {
  //       parentKey:data.parentKey,
  //       promotionId:Math.random(),
  //       promotionType:23
  //     }
  //   };
  //   this.props.dispatch({
  //     type: "tab/firstAddTab",
  //     payload: paneitem
  //   });
  // }
  successCallback=(res)=> {
    const { data } = this.props;
    const paneitem = {
      title: "编辑C端活动",
      key: `${data.parentKey}levelTwoSecond${res.promotionId}`,
      componkey: `${data.parentKey}levelTwoSecond`,
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
    const { bearers=[],...valFileds } = allFields;
    if(valFileds.promotionScope == 2 && valFileds.promotionType == '23') {
      valFileds.pdScope =2;
      valFileds.pdKind =null;
    }
    let ratioList=[];
    valFileds.bearerActivity&&valFileds.bearerActivity.map((el,index) => {
      if(el!='C') {
        let item={}
        item.bearer = bearMap[el];
        item.key = index;
        ratioList.push(item)
      }
    });
    if(bearers.length>0) {
      ratioList = ratioList.map((el) => {
        bearers.map((item) => {
          if(el.bearer == item.bearer) {
            el = {...el, ...item};
          }
        })
        return el;
      })
    }
    props.dispatch({
      type:'ctipActivityAddOne/getActivityInfo',
      payload:valFileds
    })
    props.dispatch({
      type:'ctipActivityAddOne/getRatioList',
      payload:ratioList
    })
  },
  // mapPropsToFields(props) {
  //   console.log(props)
  //   return {
  //     bearers: Form.createFormField(props.ratioList),
  //   };
  // }
})(CtipActivityAddOneF);
function mapStateToProps(state) {
  const { ctipActivityAddOne } = state;
  return ctipActivityAddOne;
}

export default  connect(mapStateToProps)(CtipActivityAddOne);
