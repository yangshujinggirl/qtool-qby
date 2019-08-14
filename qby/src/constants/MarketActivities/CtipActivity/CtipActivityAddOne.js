import React , { Component } from 'react';
import { connect } from "dva";
import { Button, Form, Input, DatePicker, Radio, Checkbox } from 'antd';
import StepMod from './components/StepMod';

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
};
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
    const { activityInfo } =this.props;
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <StepMod step={0}/>
        <Form>
          <FormItem label='活动名称' {...formItemLayout}>
             {
               getFieldDecorator('name', {
                 rules: [{ required: true, message: '请输入商品名称'}],
                 // initialValue:pdSpu.name
               })(
                 <Input placeholder="请输入商品名称" maxLength='32' autoComplete="off"/>
               )
             }
           </FormItem>
          <FormItem label='活动时间' {...formItemLayout}>
             {
               getFieldDecorator('name', {
                 rules: [{ required: true, message: '请输入商品名称'}],
                 // initialValue:pdSpu.name
               })(
                 <RangePicker />
               )
             }
           </FormItem>
          <FormItem label='活动目的' {...formItemLayout}>
             {
               getFieldDecorator('md', {
                 rules: [{ required: true, message: '请输入商品名称'}],
                 // initialValue:pdSpu.name
               })(
                 <Checkbox.Group style={{ width: '100%' }}>
                    <Checkbox value="A">拉新</Checkbox>
                    <Checkbox value="B">促活</Checkbox>
                    <Checkbox value="C">提升订单量</Checkbox>
                    <Checkbox value="D">清库存</Checkbox>
                    <Checkbox value="E">其他</Checkbox>
                </Checkbox.Group>
               )
             }
           </FormItem>
          <FormItem label='活动级别' {...formItemLayout}>
             {
               getFieldDecorator('name', {
                 rules: [{ required: true, message: '请输入商品名称'}],
                 // initialValue:pdSpu.name
               })(
                 <Radio.Group >
                  <Radio value={4}>S级</Radio>
                  <Radio value={1}>A级</Radio>
                  <Radio value={2}>B级</Radio>
                  <Radio value={3}>C级</Radio>
                </Radio.Group>
               )
             }
           </FormItem>
           <FormItem label='活动端' {...formItemLayout}>
              {
                getFieldDecorator('platform', {
                  rules: [{ required: true, message: '请输入商品名称'}],
                  // initialValue:pdSpu.name
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                     <Checkbox value="A">线上App/小程序</Checkbox>
                     <Checkbox value="B">线下POS</Checkbox>
                 </Checkbox.Group>
                )
              }
            </FormItem>
           <FormItem label='活动门店' {...formItemLayout}>
              全部门店
            </FormItem>
            <FormItem label='活动成本承担方' {...formItemLayout}>
               {
                 getFieldDecorator('md', {
                   rules: [{ required: true, message: '请输入商品名称'}],
                   // initialValue:pdSpu.name
                 })(
                   <Checkbox.Group style={{ width: '100%' }}>
                      <Checkbox value="A">Qtools</Checkbox>
                      <Checkbox value="B">门店</Checkbox>
                      <Checkbox value="C">供应商</Checkbox>
                  </Checkbox.Group>
                 )
               }
             </FormItem>
             <FormItem label='促销范围' {...formItemLayout}>
                {
                  getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入商品名称'}],
                    // initialValue:pdSpu.name
                  })(
                    <Radio.Group >
                     <Radio value={4}>单品促销</Radio>
                     <Radio value={1}>专区促销</Radio>
                   </Radio.Group>
                  )
                }
              </FormItem>
             <FormItem label='促销类型' {...formItemLayout}>
                {
                  getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入商品名称'}],
                    // initialValue:pdSpu.name
                  })(
                    <Radio.Group >
                     <Radio value={4}>单品促销</Radio>
                     <Radio value={1}>专区促销</Radio>
                   </Radio.Group>
                  )
                }
              </FormItem>
             <FormItem label='可同享的专区促销类型' {...formItemLayout}>
                {
                  getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入商品名称'}],
                    // initialValue:pdSpu.name
                  })(
                    <Radio.Group >
                     <Radio value={1}>均不同享</Radio>
                     <Radio value={2}>专区多级满赠</Radio>
                     <Radio value={3}>专区多级满元减</Radio>
                     <Radio value={4}>专区满件减免</Radio>
                   </Radio.Group>
                  )
                }
              </FormItem>
        </Form>
        <Button
          size="large"
          type="primary"
          onClick={this.goStepTwo}>新建活动</Button>
      </div>
    )
  }
}
const CtipActivityAddOne = Form.create({})(CtipActivityAddOneF);
function mapStateToProps(state) {
  const { ctipActivityAddOne } = state;
  return ctipActivityAddOne;
}

export default  connect(mapStateToProps)(CtipActivityAddOne);
