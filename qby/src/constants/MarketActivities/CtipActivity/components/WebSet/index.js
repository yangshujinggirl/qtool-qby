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
  render() {
    const { activityInfo } =this.props;
    const { getFieldDecorator } = this.props.form;
    console.log(activityInfo)
    return(
      <div>
        <p className="info-title">前端展示</p>
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
            <FormItem label='设置预热时间' {...formItemLayout}>
              {
                getFieldDecorator('warmUpBeginTime', {
                  rules: [{ required: true, message: '请设置预热时间'}],
                  initialValue:activityInfo.warmUpBeginTime?moment(activityInfo.warmUpBeginTime).format('YYYY-MM-DD HH:mm:ss'):null
                })(
                  <DatePicker
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    showTime={{
                      hideDisabledOptions: true,
                      defaultValue: moment('00:00', 'HH:mm'),
                    }}
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
                label="配置商品详情页横幅条背景图"
                percent={1}
                fileList={activityInfo.pdDetailBannerPic}
                form={this.props.form}/>
            }
            <UpLoadImgMod
              rules={[{ required: activityInfo.promotionScope==1?false:true, message: '请上传图片'}]}
              formItemLayout={formItemLayout}
              name="logoPic"
              label="配置活动主题logo图"
              percent={1}
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
