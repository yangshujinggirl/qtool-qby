import React , { Component } from 'react';
import { connect } from "dva";
import { Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, } from 'antd';
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
    if(data.id) {
      this.props.dispatch({
        type:'ctipActivityAddOne/fetchInfo',
        payload:data.id
      })
    }
  }
  handleSubmit= e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        this.goStepTwo()
      }
    });
  };
  goStepTwo=(record)=> {
    const { data } = this.props;
    const paneitem = {
      title: "编辑C端活动",
      key: `${data.parentKey}levelTwoSecond${record.homepageId}`,
      componkey: `${data.parentKey}levelTwoSecond`,
      parentKey:data.parentKey,
      data: {
        parentKey:data.parentKey,
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
          <InfoSet form={this.props.form}/>
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
