import React , { Component } from 'react';
import { connect } from "dva";
import moment from 'moment';
import NP from 'number-precision';
import { Tag, Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, Table} from 'antd';
import { disabledDate, disabledDateTimeRange } from '../dateSet.js';
import { columnsCreat } from '../../columns';
import {
  pdScopeOption,singleOption,promotionScopeOption,
  prefectureOption, purposeTypesOption,pdKindOption,
  levelOption, prefShareOption, singleShareOption } from '../optionMap.js';
import { getSuppliApi } from '../../../../../services/marketActivities/ctipActivity.js';
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
const bearMap={
  'A':'Qtools',
  'B':'门店',
  'C':'供应商',
}

class InfoSet extends Component {
  constructor(props) {
    super(props);
    this.state ={
      supplierList:[],
    }
  }
  //分成校验
  validatorRatio=(rule, value, callback)=> {
    let { activityInfo, ratioList } =this.props;
    let { bearers } =this.props.form.getFieldsValue(['bearers']);
    let total =0;
    bearers.forEach((el)=> {
      if(!el.proportion) {
        el.proportion=0;
      }
      total+=Number(el.proportion);
    })
    if(total>100) {
      callback('承担比例总和不能超过100%');
    }else {
      callback();
    }
  }
  //分成change
  changeProportion=(rule, value, callback)=> {
    this.props.form.resetFields(['bearers'])
  }
  handleSearch=(value)=> {
    getSuppliApi({name:value})
    .then((res) => {
      const { suppliers } =res;
      if(res.code == '0') {
        this.setState({ supplierList:suppliers });
      }
    })
  }
  onSelect=(value, option)=> {
    let { ratioList } =this.props;
    let idx = ratioList.findIndex(el => el.key == value);
    if(idx =='-1') {
      ratioList.push({
        key:`C${value}`,
        bearerType:'C',
        bearerStr:option.props.children,
        bearer:value
      });
      this.props.dispatch({
        type:'ctipActivityAddOne/getRatioList',
        payload:ratioList
      })
    }
  }
  handleClose=(removedTag)=> {
    let { ratioList } =this.props;
    const { bearers } =this.props.form.getFieldsValue(['bearers']);
    let tags = ratioList.filter(tag => tag.key !== removedTag.key);
    this.props.dispatch({
      type:'ctipActivityAddOne/getRatioList',
      payload:tags
    })
    this.props.form.resetFields(['bearers'])
  }
  changeRange=(value)=>{
    this.props.form.resetFields(['logoBg'])
  }
  changePromotion=(e)=>{
    this.props.form.resetFields(['pdScope','pdKind'])
  }
  changeBearActi=(value)=>{
    let { ratioList } =this.props;
    let newArr=[];
    let tagsList = ratioList.filter(el => el.bearerType=='C');
    let fixedList = ratioList.filter(el => el.bearerType!='C');
    let valMap={};
    fixedList.map((el) => {
      if(!valMap[el.bearerType]) {
        valMap[el.bearerType]=el;
      }
    })
    let isIdx = value.findIndex((el) =>el=='C');
    if(isIdx=='-1') {
      tagsList = [];
    }
    value&&value.map((el,index) => {
      if(el!='C') {
        if(valMap[el]) {
          newArr.push(valMap[el])
        } else {
          let item={}
          item.bearer = el;
          item.bearerType = el;
          item.bearerStr =  bearMap[el];
          item.key = `${el}${index}`;
          newArr.push(item)
        }
      }
     });
    ratioList=[...newArr,...tagsList];
    this.props.dispatch({
      type:'ctipActivityAddOne/getRatioList',
      payload:ratioList
    })
    this.props.form.resetFields(['bearers'])
  }
  formatOption=()=> {
    const { activityInfo } =this.props;
    let option;
    if(activityInfo.promotionScope==1) {
      if(activityInfo.promotionType=='11') {
        option =prefShareOption;
      } else {
        option =prefectureOption;
      }
    } else {
      if(activityInfo.promotionType=='20'||activityInfo.promotionType=='21') {
        option =singleShareOption;
      } else {
        option =singleOption;
      }
    }
    return option;
  }
  render() {
    const { activityInfo, ratioList, tagsList, promotionId } =this.props;
    const { supplierList } =this.state;
    const { getFieldDecorator } = this.props.form;
    let blColumns = columnsCreat(this.props.form,this.validatorRatio,this.changeProportion,ratioList);
    let otherIndex = activityInfo.purposeTypes&&activityInfo.purposeTypes.findIndex((el)=>el == '5');
    let providerIndex = activityInfo.costApportion&&activityInfo.costApportion.findIndex((el)=>el == 'C');
    let rangeOption = activityInfo.promotionScope==1?singleOption:prefectureOption;
    let linkAgeOption = this.formatOption();
    return(
      <div>
        <p className="info-title">活动信息</p>
        {
        promotionId&&
          <div>
            <FormItem label='活动ID' {...formItemLayout}>
             {activityInfo.promotionId}
            </FormItem>
            <FormItem label='活动状态' {...formItemLayout}>
             {activityInfo.statusStr}
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
               disabled={promotionId?true:false}
               className="ant-input-fixed"
               placeholder="请输入活动名称" maxLength='30' autoComplete="off"/>
           )
         }
        </FormItem>
        <FormItem label='活动时间' {...formItemLayout}>
         {
           getFieldDecorator('time', {
             rules: [{ required: true, message: '请选择活动时间'}],
             initialValue:activityInfo.beginTime?[moment(activityInfo.beginTime,format),moment(activityInfo.endTime,format)]:null
           })(
             <RangePicker
               disabled={promotionId?true:false}
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
             initialValue:activityInfo.purposeTypes,
           })(
             <Checkbox.Group style={{ width: '100%' }}>
               {
                 purposeTypesOption.map((el) => (
                   <Checkbox value={el.key} key={el.key}>{el.value}</Checkbox>
                 ))
               }
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
                  {
                    levelOption.map((el) => (
                      <Radio value={el.key} key={el.key}>{el.value}</Radio>
                    ))
                  }
               </Radio.Group>
              )
            }
            <p className="tips-info">S、A级活动：总费用&#62;&#61;5万元且折扣率&#62;5&#37;，B、C级活动：总费用小于等于5万元且折扣率&#60;5&#37;</p>
        </FormItem>
        <FormItem label='活动端' {...formItemLayout}>
          线上App/小程序
        </FormItem>
        <FormItem label='活动门店' {...formItemLayout}>
          全部门店
        </FormItem>
        <div className="one-line-wrap">
            <FormItem label='活动成本承担方' {...formItemLayout}>
               {
                 getFieldDecorator('costApportion', {
                   rules: [{ required: true, message: '请选择活动成本承担方'}],
                   initialValue:activityInfo.costApportion,
                   onChange:this.changeBearActi
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
              <FormItem className="autoComplete-formItem">
                 {
                   getFieldDecorator('autoComplete')(
                    <AutoComplete
                      dataSource={supplierList}
                      onSelect={this.onSelect}
                      onSearch={this.handleSearch}>
                      {
                        supplierList.map(el =>
                          <AutoComplete.Option key={el.pdSupplierId}>{el.name}</AutoComplete.Option>
                        )
                      }
                    </AutoComplete>
                   )
                 }
               </FormItem>
          }
        </div>
        <div className="supplier-tags-wrap">
          {
            tagsList.map((el)=> (
              <Tag
                closable
                key={el.key}
                onClose={()=>this.handleClose(el)}>
                {el.bearerStr}
              </Tag>
            ))
          }
        </div>
        <FormItem label='活动成本分摊比例' {...formItemLayout}>
          <Table
            onRow={record => {
              return {
                "data-row-key":record.key,
              };
            }}
            className="bl-table-wrap"
            bordered
            pagination={false}
            columns={blColumns}
            dataSource={ratioList}/>
        </FormItem>
        <FormItem label='促销范围' {...formItemLayout}>
          {
            getFieldDecorator('promotionScope', {
              rules: [{ required: true, message: '请输入商品名称'}],
              onChange:this.changeRange,
              initialValue:activityInfo.promotionScope
            })(
              <Radio.Group disabled={promotionId?true:false}>
                {
                  promotionScopeOption.map((el)=> (
                    <Radio value={el.key} key={el.key}>{el.value}</Radio>
                  ))
                }
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
                      <Radio key={el.key} value={el.key} disabled={promotionId?true:false}>{el.value}</Radio>
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
                 <Radio.Group disabled={promotionId?true:false}>
                   {
                     pdScopeOption.map((el,index) => (
                       <Radio
                         value={el.key} key={el.key}
                         disabled={(el.key==1&&activityInfo.promotionType!=22)?true:false}>{el.value}</Radio>
                     ))
                   }
                </Radio.Group>
               )
             }
           </FormItem>
        }
        {
          activityInfo.pdScope==2&&activityInfo.promotionScope==2&&
          <FormItem label='商品种类' {...formItemLayout}>
             {
               getFieldDecorator('pdKind', {
                 rules: [{ required: true, message: '请选择商品种类'}],
                 initialValue:activityInfo.pdKind
               })(
                 <Radio.Group disabled={promotionId?true:false}>
                   {
                     pdKindOption.map((el)=> (
                       <Radio
                         value={el.key}
                         key={el.key}
                         disabled={el.key==3&&activityInfo.promotionType!=22?true:false}>
                         {el.value}
                       </Radio>
                     ))
                   }
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
                rules: [{ required: true, message: '请选择可同享的促销类型'}],
                initialValue:activityInfo.sharedPromotionType
              })(
                <Radio.Group disabled={promotionId?true:false}>
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
