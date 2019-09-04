import React , { Component } from 'react';
import { connect } from "dva";
import moment from 'moment';
import { Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, } from 'antd';
import UpLoadImgMod from '../UpLoadImgMod';
import { disabledDate, disabledDateTime } from '../dateSet.js';

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
class WebSet extends Component {
  //时间校验
  validator=(rule, value, callback)=> {
    let { activityInfo } =this.props;
    if(activityInfo.time) {
      let actiTime = activityInfo.time[0];
      let isBefore = moment(value).isBefore(actiTime)||moment(value).isSame(actiTime);
      if(!isBefore) {
        callback('预热时间只能选择活动开始之前的时间或与开始时间相同。');
      }else {
        callback();
      }
    } else {
      callback();
    }
  }
  render() {
    const { activityInfo } =this.props;
    const { getFieldDecorator } = this.props.form;

    return(
      <div>
        <p className="info-title">前端展示</p>
        <UpLoadImgMod
          rules={[{ required: true, message: '请上传图片'}]}
          formItemLayout={formItemLayout}
          name="websiteBanner"
          label="活动配置促销活动页头图"
          width={3}
          height={2}
          imgType={2}
          ruleType={2}
          fileList={activityInfo.websiteBanner}
          form={this.props.form}/>
        <FormItem label='是否需要预热' {...formItemLayout}>
         {
           getFieldDecorator('isWarmUp', {
             rules: [{ required: true, message: '请选择是否需要预热'}],
             initialValue:activityInfo.isWarmUp
           })(
             <Radio.Group >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
           )
         }
        </FormItem>
        {
          !!activityInfo.isWarmUp&&
          <div>
            <FormItem label='预热时间' {...formItemLayout}>
              {
                getFieldDecorator('warmUpBeginTime', {
                  rules: [{ required: true, message: '请设置预热时间'},{
                    validator:this.validator
                  }],
                  initialValue:activityInfo.warmUpBeginTime?moment(activityInfo.warmUpBeginTime,'YYYY-MM-DD HH:mm:ss'):null
                })(
                  <DatePicker
                    disabled={activityInfo.time?false:true}
                    showTime
                    format ="YYYY-MM-DD HH:mm:ss"/>
                )
              }
            </FormItem>
            {
              activityInfo.promotionScope==1&&
              <UpLoadImgMod
                rules={[{required:true,message:'请上传图片'}]}
                formItemLayout={formItemLayout}
                name="pdDetailBannerPic"
                label="商品详情页横幅条背景图"
                width={25}
                height={4}
                fileList={activityInfo.pdDetailBannerPic}
                form={this.props.form}/>
            }
            <UpLoadImgMod
              rules={[{ required: activityInfo.promotionScope==1?false:true, message: '请上传图片'}]}
              formItemLayout={formItemLayout}
              name="logoPic"
              label="活动主题logo图"
              width={1}
              height={1}
              imgType={2}
              fileList={activityInfo.logoPic}
              form={this.props.form}/>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { ctipActivityAddOne } = state;
  return ctipActivityAddOne;
}

export default  connect(mapStateToProps)(WebSet);
