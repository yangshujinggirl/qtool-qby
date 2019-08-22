import React , { Component } from 'react';
import { connect } from "dva";
import moment from 'moment';
import NP from 'number-precision';
import { Tag, Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, Table} from 'antd';
import { disabledDate, disabledDateTimeRange } from '../dateSet.js';
import { columnsCreat } from '../../columns';
import { pdScopeOption,singleOption,prefectureOption, purposeTypesOption, levelOption } from '../optionMap.js';
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


class InfoSet extends Component {
  constructor(props) {
    super(props);
    this.state ={
      supplierList:[],
    }
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
    let { tagsList } =this.props;
    let idx = tagsList.findIndex(el => el.key == value);
    if(idx =='-1') {
      tagsList.push({
        key:value,
        bearerType:'C',
        bearer:option.props.children
      });
      this.props.dispatch({
        type:'ctipActivityAddOne/getTagList',
        payload:tagsList
      })
    }
    console.log('onSelect',tagsList)
  }
  handleClose=(removedTag)=> {
    let { tagsList } =this.props;
    const { bearers } =this.props.form.getFieldsValue(['bearers']);
    let dd = bearers.filter(tag => tag.bearer !== removedTag.bearer);
    console.log(dd)
    let tags = tagsList.filter(tag => tag.key !== removedTag.key);
    this.props.dispatch({
      type:'ctipActivityAddOne/getTagList',
      payload:tags
    })
    this.props.form.setFieldsValue({ bearers:dd })
  }
  //分成校验
  validatorRatio=(rule, value, callback)=> {
    const ss = [{proportion:50}];
    let { activityInfo, ratioList } =this.props;
    let { bearers } =this.props.form.getFieldsValue(['bearers']);
    let total =0;
    bearers.forEach((el)=> { total+=Number(el.proportion); })
    if(total>100) {
      callback('分成比例不能超过100%');
    }else {
      callback();
    }
  }
  changePurpose=(value)=>{
    let { activityInfo } =this.props;
    activityInfo={...activityInfo, purposeTypes: value };
    this.props.dispatch({
      type:'ctipActivityAddOne/getActivityInfo',
      payload:activityInfo
    })
  }
  changeRange=(value)=>{
    this.props.form.resetFields(['logoBg'])
  }
  changePromotion=(e)=>{
    this.props.form.resetFields(['pdScope','pdKind'])
  }
  changeBearActi=(value)=>{
    let { activityInfo, tagsList } =this.props;
    let newArr=[];
    const bearMap={
      'A':'Qtools',
      'B':'门店',
      'C':'供应商',
    }
    let isIdx = value.findIndex((el) =>el=='C');
    value&&value.map((el,index) => {
      if(el!='C') {
        let item={}
        item.bearer = bearMap[el];
        item.bearerType = el;
        item.key = index;
        newArr.push(item)
      }
     });
    let ratioList=[...newArr,...tagsList];
    activityInfo={...activityInfo, bearerActivity: value };
    this.props.dispatch({
      type:'ctipActivityAddOne/getActivityInfo',
      payload:activityInfo
    })
    this.props.dispatch({
      type:'ctipActivityAddOne/getRatioList',
      payload:ratioList
    })
    if(isIdx=='-1') {
      this.props.dispatch({
        type:'ctipActivityAddOne/getTagList',
        payload:[]
      })
    }
    this.props.form.resetFields(['bearers'])
  }
  render() {
    const { activityInfo, ratioList, tagsList } =this.props;
    const { supplierList } =this.state;
    const { getFieldDecorator } = this.props.form;
    let blColumns = columnsCreat(this.props.form,this.validatorRatio,ratioList);
    let otherIndex = activityInfo.purposeTypes&&activityInfo.purposeTypes.findIndex((el)=>el == '5');
    let providerIndex = activityInfo.bearerActivity&&activityInfo.bearerActivity.findIndex((el)=>el == 'C');
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
             initialValue:activityInfo.purposeTypes,
             onChange:this.changePurpose
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
                 getFieldDecorator('bearerActivity', {
                   rules: [{ required: true, message: '请选择活动成本承担方'}],
                   initialValue:activityInfo.bearer,
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
                   getFieldDecorator('autoComplete', {
                     rules: [{ required: true, message: '请输入商品名称'}],
                     initialValue:activityInfo.name
                   })(
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
                {el.bearer}
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
                         value={el.key} key={el.key}
                         disabled={activityInfo.promotionType=='23'?true:false}>{el.value}</Radio>
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
                 rules: [{ required: true, message: '请选择商品种类'}],
                 initialValue:activityInfo.pdKind
               })(
                 <Radio.Group >
                  <Radio value={1}>一般贸易商品（除品牌直供）</Radio>
                  <Radio value={2}>品牌直供商品</Radio>
                  <Radio value={3} disabled={activityInfo.promotionType=='23'?true:false}>保税商品</Radio>
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
