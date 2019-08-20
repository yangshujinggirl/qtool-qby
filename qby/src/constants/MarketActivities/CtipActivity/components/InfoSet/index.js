import React , { Component } from 'react';
import { connect } from "dva";
import moment from 'moment';
import { Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, } from 'antd';
import BlTable from '../BlTable';
import { disabledDate, disabledDateTimeRange } from '../dateSet.js';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const format ="YYYY-MM-DD HH:mm:ss";

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
};
const pdScopeOption=[
  {
    key:1,
    value:'全场'
  },{
    key:2,
    value:'自选商品'
}]
const singleOption=[
  {
    key:10,
    value:'单品直降'
  },{
    key:12,
    value:'单品多级满赠（例：A商品买3送1）'
}]
const prefectureOption=[
  {
    key:21,
    value:'专区多级满元赠（例：满AB减C）'
  },{
    key:22,
    value:'专区多级满件赠（例：满AB减C）'
  },{
    key:23,
    value:'专区多级满元减（例：满300减30）'
  },{
    key:24,
    value:'专区满件减免商品'
  }]

class InfoSet extends Component {
  handleSearch=(value)=> {
    console.log(value)
  }
  //分成校验
  validatorRatio=(rule, value, callback)=> {
    const ss = [{ratio:50},{ratio:40}];
    let total = ss.reduce((prev,curr)=> {
      return prev.ratio+curr.ratio
    })
    if(total>100) {
      callback('分成比例不能超过100%');
    }else {
      callback();
    }
  }
  changeRange=(value)=>{
    this.props.form.resetFields(['logoBg'])
  }
  changePromotion=(e)=>{
    this.props.form.resetFields(['pdScope','pdKind'])
  }
  render() {
    const { activityInfo, ratioList } =this.props;
    const { getFieldDecorator } = this.props.form;
    console.log(activityInfo);
    let otherIndex = activityInfo.purposeTypes&&activityInfo.purposeTypes.findIndex((el)=>el == '5');
    let providerIndex = activityInfo.bearer&&activityInfo.bearer.findIndex((el)=>el == 'C');
    let rangeOption = activityInfo.promotionScope==1?singleOption:prefectureOption;
    let linkAgeOption = activityInfo.promotionScope==1?prefectureOption:singleOption;
    return(
      <div>
        <p className="info-title">活动信息</p>
        {
          this.props.promotionId&&
          <div>
            <FormItem label='活动ID' {...formItemLayout}>
             {activityInfo.mktActivityId}
            </FormItem>
            <FormItem label='活动状态' {...formItemLayout}>
             {activityInfo.status}
            </FormItem>
          </div>
        }
        <FormItem label='活动名称' {...formItemLayout}>
         {
           getFieldDecorator('name', {
             rules: [{ required: true, message: '请输入活动名称'}],
             initialValue:activityInfo.name
           })(
             <Input
               className="ant-input-fixed"
               placeholder="请输入活动名称" maxLength='30' autoComplete="off"/>
           )
         }
        </FormItem>
        <FormItem label='活动时间' {...formItemLayout}>
         {
           getFieldDecorator('time', {
             rules: [{ required: true, message: '请选择活动时间'}],
             initialValue:activityInfo.beginTime?[moment(activityInfo.beginTime).format(format),moment(activityInfo.endTime).format(format)]:null
           })(
             <RangePicker
               className="ant-input-fixed"
               format={format}
               disabledDate={disabledDate}
               disabledTime={disabledDateTimeRange}
               showTime={{
                 hideDisabledOptions: true,
                 defaultValue: moment('00:00', 'HH:mm'),
               }}/>
           )
         }
        </FormItem>
        <FormItem label='活动目的' {...formItemLayout}>
         {
           getFieldDecorator('purposeTypes', {
             rules: [{ required: true, message: '请选择活动目的'}],
             initialValue:activityInfo.purposeTypes
           })(
             <Checkbox.Group style={{ width: '100%' }}>
                <Checkbox value="1">拉新</Checkbox>
                <Checkbox value="2">促活</Checkbox>
                <Checkbox value="3">提升订单量</Checkbox>
                <Checkbox value="4">清库存</Checkbox>
                <Checkbox value="5">其他</Checkbox>
            </Checkbox.Group>
           )
         }
        </FormItem>
        {
         otherIndex!=undefined&&otherIndex!='-1'&&
         <FormItem label='其他' {...formItemLayout}>
            {
              getFieldDecorator('otherPurpose', {
                rules: [{ required: true, message: '请输入其他目的'}],
                initialValue:activityInfo.otherPurpose
              })(
                <Input.TextArea
                  className="ant-input-fixed"
                  placeholder="请输入其他目的"
                  rows={2}
                  maxLength='100'
                  autoComplete="off"/>
              )
            }
          </FormItem>
        }
        <FormItem label='活动级别' {...formItemLayout}>
            {
              getFieldDecorator('level', {
                rules: [{ required: true, message: '请选择活动级别'}],
                initialValue:activityInfo.level
              })(
                <Radio.Group >
                 <Radio value={1}>S级</Radio>
                 <Radio value={2}>A级</Radio>
                 <Radio value={3}>B级</Radio>
                 <Radio value={4}>C级</Radio>
               </Radio.Group>
              )
            }
            <p className="tips-info">S、A级活动：总费用&#62;&#61;5万元且折扣率&#62;5&#37;，B、C级活动：总费用小于等于5万元且折扣率&#60;5&#37;</p>
        </FormItem>
        <FormItem label='活动端' {...formItemLayout}>
          {
            getFieldDecorator('platform', {
              rules: [{ required: true, message: '请选择活动端'}],
              initialValue:activityInfo.platform
            })(
              <Checkbox.Group style={{ width: '100%' }}>
                 <Checkbox value="1">线上App/小程序</Checkbox>
                 <Checkbox value="2">线下POS</Checkbox>
             </Checkbox.Group>
            )
          }
        </FormItem>
        <FormItem label='活动门店' {...formItemLayout}>
          全部门店
        </FormItem>
        <div className="one-line-wrap">
            <FormItem label='活动成本承担方' {...formItemLayout}>
               {
                 getFieldDecorator('bearer', {
                   rules: [{ required: true, message: '请选择活动成本承担方'}],
                   initialValue:activityInfo.bearer
                 })(
                   <Checkbox.Group style={{ width: '100%' }}>
                      <Checkbox value="A">Qtools</Checkbox>
                      <Checkbox value="B">门店</Checkbox>
                      <Checkbox value="C">供应商</Checkbox>
                  </Checkbox.Group>
                 )
               }
             </FormItem>
          {
            providerIndex!=undefined&&providerIndex!='-1'&&
              <FormItem {...formItemLayout} className="autoComplete-formItem">
                 {
                   getFieldDecorator('autoComplete', {
                     rules: [{ required: true, message: '请输入商品名称'}],
                     initialValue:activityInfo.name
                   })(
                    <AutoComplete
                      dataSource={[]}
                      onSelect={this.onSelect}
                      onSearch={this.handleSearch}/>
                   )
                 }
               </FormItem>
          }
        </div>
        <FormItem label='活动成本分摊比例' {...formItemLayout}>
          <BlTable
            dataSource={ratioList}
            form={this.props.form}
            validator={this.validatorRatio}/>
        </FormItem>
        <FormItem label='促销范围' {...formItemLayout}>
          {
            getFieldDecorator('promotionScope', {
              rules: [{ required: true, message: '请输入商品名称'}],
              onChange:this.changeRange,
              initialValue:activityInfo.promotionScope
            })(
              <Radio.Group >
               <Radio value={1}>单品促销</Radio>
               <Radio value={2}>专区促销</Radio>
             </Radio.Group>
            )
          }
        </FormItem>
        {
          activityInfo.promotionScope&&
          <FormItem label='促销类型' {...formItemLayout}>
            {
              getFieldDecorator('promotionType', {
                rules: [{ required: true, message: '请选择促销类型'}],
                initialValue:activityInfo.promotionType,
                onChange:this.changePromotion
              })(
                <Radio.Group >
                  {
                    rangeOption.map((el,index) => (
                      <Radio key={el.key} value={el.key}>{el.value}</Radio>
                    ))
                  }
               </Radio.Group>
              )
            }
          </FormItem>
        }
        {
          activityInfo.promotionScope==2&&activityInfo.promotionType&&
          <FormItem label='促销级别' {...formItemLayout}>
             {
               getFieldDecorator('pdScope', {
                 rules: [{ required: true, message: '请选择促销级别'}],
                 initialValue:activityInfo.pdScope
               })(
                 <Radio.Group >
                   {
                     pdScopeOption.map((el,index) => (
                       <Radio
                         value={el.key}
                         key={el.key}
                         disabled={activityInfo.promotionType=='24'?true:false}>{el.value}</Radio>
                     ))
                   }
                </Radio.Group>
               )
             }
           </FormItem>
        }
        {
          activityInfo.pdScope==2&&
          <FormItem label='商品种类' {...formItemLayout}>
             {
               getFieldDecorator('pdKind', {
                 rules: [{ required: true, message: '请输入商品名称'}],
                 initialValue:activityInfo.pdKind
               })(
                 <Radio.Group >
                  <Radio value={1}>一般贸易商品（除品牌直供）</Radio>
                  <Radio value={2}>品牌直供商品</Radio>
                  <Radio value={3} disabled={activityInfo.promotionType=='24'?true:false}>保税商品</Radio>
                </Radio.Group>
               )
             }
             <p className="tips-info">由于App购物车此三类商品需分开结算，所以为保证用户体验，此三种商品不可同时参与一档专区活动</p>
           </FormItem>
        }
        {
          activityInfo.promotionScope&&
          <FormItem label='可同享的促销类型' {...formItemLayout}>
            {
              getFieldDecorator('sharedPromotionType', {
                rules: [{ required: true, message: '请输入商品名称'}],
                initialValue:activityInfo.sharedPromotionType
              })(
                <Radio.Group >
                  <Radio value={-1}>均不同享</Radio>
                  {
                    linkAgeOption.map((el)=>(
                      <Radio value={el.key} key={el.key}>{el.value}</Radio>
                    ))
                  }
               </Radio.Group>
              )
            }
          </FormItem>
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { ctipActivityAddOne } = state;
  return ctipActivityAddOne;
}

export default  connect(mapStateToProps)(InfoSet);
