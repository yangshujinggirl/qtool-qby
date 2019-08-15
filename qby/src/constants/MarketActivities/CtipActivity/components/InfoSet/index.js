import React , { Component } from 'react';
import { connect } from "dva";
import moment from 'moment';
import { Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, } from 'antd';
import BlTable from '../BlTable';
import { disabledDate, disabledDateTime } from '../dateSet.js';

const singleOption=[
  {
    key:1,
    value:'单品直降'
  },{
    key:2,
    value:'单品多级满件折（例：A商品2件8折)'
  },{
    key:3,
    value:'单品多级满赠（例：A商品买3送1）'
}]
const prefectureOption=[
  {
    key:1,
    value:'专区多级满件折（例：ABC商品任意2件8折）'
  },{
    key:2,
    value:'专区多级满元减（例：满300减30）'
  },{
    key:3,
    value:'专区多级满元赠（例：满AB减C）'
  },{
    key:4,
    value:'专区多级满件赠（例：满AB减C）'
  },{
    key:5,
    value:'专区满件减免商品'
  }]
const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
};
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

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
  render() {
    const { activityInfo, ratioList } =this.props;
    const { getFieldDecorator } = this.props.form;
    console.log(activityInfo);
    let otherIndex = activityInfo.aim&&activityInfo.aim.findIndex((el)=>el == 'E');
    let providerIndex = activityInfo.bearer&&activityInfo.bearer.findIndex((el)=>el == 'C');
    let rangeOption = activityInfo.range==1?singleOption:prefectureOption;
    return(
      <div>
        <p className="info-title">活动信息</p>
        <FormItem label='活动ID' {...formItemLayout}>
         123
        </FormItem>
        <FormItem label='活动状态' {...formItemLayout}>
         待提交
        </FormItem>
        <FormItem label='活动名称' {...formItemLayout}>
         {
           getFieldDecorator('name', {
             rules: [{ required: true, message: '请输入活动名称'}],
             // initialValue:pdSpu.name
           })(
             <Input placeholder="请输入活动名称" maxLength='30' autoComplete="off"/>
           )
         }
        </FormItem>
        <FormItem label='活动时间' {...formItemLayout}>
         {
           getFieldDecorator('time', {
             rules: [{ required: true, message: '请选择活动时间'}],
             // initialValue:pdSpu.name
           })(
             <RangePicker
               format="YYYY-MM-DD HH:mm:ss"
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
        {
         otherIndex!=undefined&&otherIndex!='-1'&&
         <FormItem label='其他' {...formItemLayout}>
            {
              getFieldDecorator('other', {
                rules: [{ required: true, message: '请输入商品名称'}],
                // initialValue:pdSpu.name
              })(
                <Input.TextArea placeholder="请输入商品名称" rows={2} maxLength='100' autoComplete="off"/>
              )
            }
          </FormItem>
        }
        <FormItem label='活动级别' {...formItemLayout}>
            {
              getFieldDecorator('jibie', {
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
            <p>S、A级活动：总费用&#62;&#61;5万元且折扣率&#62;5&#37;，B、C级活动：总费用小于等于5万元且折扣率&#60;5&#37;</p>
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
        <div className="one-line-wrap">
            <FormItem label='活动成本承担方' {...formItemLayout}>
               {
                 getFieldDecorator('bearer', {
                   rules: [{ required: true, message: '请选择活动成本承担方'}],
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
          {
            providerIndex!=undefined&&providerIndex!='-1'&&
              <FormItem {...formItemLayout} className="autoComplete-formItem">
                 {
                   getFieldDecorator('autoComplete', {
                     rules: [{ required: true, message: '请输入商品名称'}],
                     // initialValue:pdSpu.name
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
         {
           getFieldDecorator('bl')(
             <BlTable
               dataSource={ratioList}
               form={this.props.form}
               validator={this.validatorRatio}/>
           )
         }
        </FormItem>
        <FormItem label='促销范围' {...formItemLayout}>
          {
            getFieldDecorator('range', {
              rules: [{ required: true, message: '请输入商品名称'}],
              onChange:this.changeRange
              // initialValue:pdSpu.name
            })(
              <Radio.Group >
               <Radio value={1}>单品促销</Radio>
               <Radio value={2}>专区促销</Radio>
             </Radio.Group>
            )
          }
        </FormItem>
        <FormItem label='促销类型' {...formItemLayout}>
          {
            getFieldDecorator('lx', {
              rules: [{ required: true, message: '请输入商品名称'}],
              // initialValue:pdSpu.name
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
        {
          activityInfo.range==2&&
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
        }
        {
          activityInfo.level==2&&
          <FormItem label='商品种类' {...formItemLayout}>
             {
               getFieldDecorator('zl', {
                 rules: [{ required: true, message: '请输入商品名称'}],
                 // initialValue:pdSpu.name
               })(
                 <Radio.Group >
                  <Radio value={1}>一般贸易商品（除品牌直供）</Radio>
                  <Radio value={2}>品牌直供商品</Radio>
                  <Radio value={3}>保税商品</Radio>
                </Radio.Group>
               )
             }
           </FormItem>
        }
        <FormItem label='可同享的专区促销类型' {...formItemLayout}>
          {
            getFieldDecorator('type', {
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
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { ctipActivityAddOne } = state;
  return ctipActivityAddOne;
}

export default  connect(mapStateToProps)(InfoSet);
