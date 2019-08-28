import React , { Component } from 'react';
import { connect } from "dva";
import moment from 'moment';
import { Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, } from 'antd';
import { disabledDate, disabledDateTime } from '../dateSet.js';

const actionOption=[
  {
    key:1,
    value:'单品直降'
  },{
    key:2,
    value:'单品多级满赠（例：A商品买3送1)'
  },{
    key:3,
    value:'专区多级满元赠（例：满299送赠品）'
  },{
    key:4,
    value:'专区多级满件赠（例：满3件送赠品）'
  }]
const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
};
const format="YYYY-MM-DD HH:mm:ss";
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class InfoSet extends Component {
  render() {
    const { activityInfo, ratioList } =this.props;
    const { getFieldDecorator } = this.props.form;
    let otherIndex = activityInfo.aim&&activityInfo.aim.findIndex((el)=>el == '5');
    return(
      <div>
        <p className="info-title">活动信息</p>
        <FormItem label='活动ID' {...formItemLayout}>
         {activityInfo.mktActivityId}
        </FormItem>
        <FormItem label='活动状态' {...formItemLayout}>
         {activityInfo.status}
        </FormItem>
        <FormItem label='活动名称' {...formItemLayout}>
         {
           getFieldDecorator('name', {
             rules: [{ required: true, message: '请输入活动名称'}],
             initialValue:activityInfo.name
           })(
             <Input placeholder="请输入活动名称" maxLength='30' autoComplete="off"/>
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
               format={format}
               disabledDate={disabledDate}
               disabledTime={disabledDateTime}
               showTime={{
                 hideDisabledOptions: true,
                 defaultValue: moment('00:00', 'HH:mm'),
               }}/>
           )
         }
        </FormItem>
        <FormItem label='活动目的' {...formItemLayout}>
         {
           getFieldDecorator('aim', {
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
                rules: [{ required: true, message: '请输入商品名称'}],
                initialValue:activityInfo.otherPurpose
              })(
                <Input.TextArea placeholder="请输入商品名称" rows={2} maxLength='100' autoComplete="off"/>
              )
            }
          </FormItem>
        }
        <FormItem label='活动级别' {...formItemLayout}>
            {
              getFieldDecorator('level', {
                rules: [{ required: true, message: '请输入商品名称'}],
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
            <p>S、A级活动：总费用&#62;&#61;5万元且折扣率&#62;5&#37;，B、C级活动：总费用小于等于5万元且折扣率&#60;5&#37;</p>
        </FormItem>
        <FormItem label='活动门店' {...formItemLayout}>
          全部门店
        </FormItem>
        <FormItem label='促销类型' {...formItemLayout}>
          {
            getFieldDecorator('promotionType', {
              rules: [{ required: true, message: '请输入商品名称'}],
              initialValue:activityInfo.promotionType
            })(
              <Radio.Group >
                {
                  actionOption.map((el,index) => (
                    <Radio key={el.key} value={el.key}>{el.value}</Radio>
                  ))
                }
             </Radio.Group>
            )
          }
        </FormItem>
        <FormItem label='促销级别' {...formItemLayout}>
           {
             getFieldDecorator('level', {
               rules: [{ required: true, message: '请输入商品名称'}],
               // initialValue:pdSpu.name
             })(
               <Radio.Group >
                <Radio value={1}>全场</Radio>
                <Radio value={2}>自选商品</Radio>
              </Radio.Group>
             )
           }
         </FormItem>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { btipActivityAddOne } = state;
  return btipActivityAddOne;
}

export default  connect(mapStateToProps)(InfoSet);
