import React , { Component } from 'react';
import { connect } from "dva";
import { Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, } from 'antd';
import moment from 'moment';
import StepMod from './components/StepMod';
import BlTable from './components/BlTable';
import InfoSet from './components/InfoSet';
import WebSet from './components/WebSet';
import './CtipActivityAddOne.less'

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
        payload:data.promotionId
      })
    }
  }
  handleSubmit= e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      values = this.formatParams(values);
      if (!err) {
        values = this.formatParams(values);
        this.successCallback()
      }
    });
  };
  formatParams=(values)=> {
    let { time ,...paramsVal} =values;
    if(time&&time.length>0) {
      paramsVal.beginTime = moment(time[0]).format('YYYY-MM-DD HH:mm:ss');
      paramsVal.endTime = moment(time[1]).format('YYYY-MM-DD HH:mm:ss');
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
const CtipActivityAddOne = Form.create({
  onValuesChange(props, changedFields, allFields) {
    const { ratio=[],...valFileds } = allFields;
    props.dispatch({
      type:'ctipActivityAddOne/getRatioList',
      payload:ratio
    })
    if(valFileds.promotionScope == 2 && valFileds.promotionType == 24) {
      valFileds.pdScope =2;
      valFileds.pdKind =null;
    }
    props.dispatch({
      type:'ctipActivityAddOne/getActivityInfo',
      payload:valFileds
    })
  },
  // mapPropsToFields(props) {
  //   return {
  //     goods: Form.createFormField(props.goodsList),
  //   };
  // }
})(CtipActivityAddOneF);
function mapStateToProps(state) {
  const { ctipActivityAddOne } = state;
  return ctipActivityAddOne;
}

export default  connect(mapStateToProps)(CtipActivityAddOne);
