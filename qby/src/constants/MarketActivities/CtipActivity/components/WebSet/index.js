import React , { Component } from 'react';
import { connect } from "dva";
import { Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, } from 'antd';
import UpLoadImgMod from '../UpLoadImgMod';

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
    const { activityInfo, ratioList } =this.props;
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <p className="info-title">前端展示</p>
        <FormItem label='是否需要预热' {...formItemLayout}>
         {
           getFieldDecorator('hf', {
             rules: [{ required: true, message: '请输入商品名称'}],
             // initialValue:pdSpu.name
           })(
             <Radio.Group >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
           )
         }
        </FormItem>
        {
          !!activityInfo.hf&&
          <div>
            <FormItem label='设置预热时间' {...formItemLayout}>
              {
                getFieldDecorator('hftime', {
                  rules: [{ required: true, message: '请输入商品名称'}],
                  // initialValue:pdSpu.name
                })(
                  <RangePicker />
                )
              }
            </FormItem>
            {
              activityInfo.range==1&&
              <UpLoadImgMod
                rules={[{required:true,message:'请上传图片'}]}
                formItemLayout={formItemLayout}
                name="infobg"
                label="配置商品详情页横幅条背景图"
                width={400}
                height={200}
                fileList={null}
                form={this.props.form}/>
            }
            <UpLoadImgMod
              rules={[{ required: activityInfo.range==1?false:true, message: '请输入商品名称'}]}
              formItemLayout={formItemLayout}
              name="logoBg"
              label="配置活动主题logo图"
              width={400}
              height={200}
              fileList={null}
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
