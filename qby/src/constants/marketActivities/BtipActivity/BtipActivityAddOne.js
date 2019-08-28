import React , { Component } from 'react';
import { connect } from "dva";
import { Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, } from 'antd';
import StepMod from './components/StepMod';
import InfoSet from './components/InfoSet';
import './BtipActivityAddOne.less'

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
      if (!err) {
        this.goStepTwo()
      }
    });
  };
  goStepTwo=(promotionId)=> {
    const { data } = this.props;
    const paneitem = {
      title: "编辑B端活动",
      key: `${data.parentKey}levelTwoSecond${promotionId}`,
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
      type:'btipActivityAddOne/getRatioList',
      payload:ratio
    })
    props.dispatch({
      type:'btipActivityAddOne/getActivityInfo',
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
  const { btipActivityAddOne } = state;
  return btipActivityAddOne;
}

export default  connect(mapStateToProps)(CtipActivityAddOne);
