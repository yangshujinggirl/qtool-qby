import React, { Component } from 'react';
import {Button,Form,Select,Input,DatePicker,Tooltip,Icon,Modal} from "antd";
import UploadNew from "../../components/UploadImg";
import UploadCoupon from "../../components/UploadImg";
import BaseDelTable from "../../components/BaseDelTable";
import { getColumns } from "./columns";
import moment from "moment";
import "../index.less";
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class NewUserSet extends Component {
  validator=(rule,value,callback)=>{
    if(value&&value.length<6){
      callback('请输入六位颜色色号')
    };
    callback()
  }
  render() {
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 }
    };
    const {
      fileList1,
      fileList2,
      optionList,
      couponList,
      moduleBackColor,
      receiveTimeInterval,
      beginTime,
      endTime,
      visible,
      loading
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const columns = getColumns(
      this.props.form,
      optionList,
      this.props.onSelectChange
    );
    return (
      <div className="new_user">
        <div className="title">新人礼设置</div>
        <Form>
          <FormItem className="must-pic" label="新人礼图片" {...formLayout}>
            <UploadNew
              describe="686*114"
              fileList={fileList1}
              changeImg={this.props.changeUserImg}
              exampleImg={require("../../../../../assets/1.jpg")}
              width={686}
              height={114}
            />
          </FormItem>
          <FormItem
            className="must-pic"
            label="优惠券弹窗背景图"
            {...formLayout}
          >
            <div className="coupon-img">
              <UploadCoupon
                describe="690*700"
                fileList={fileList2}
                changeImg={this.props.changeCouponImg}
                exampleImg={require("../../../../../assets/bg.png")}
                width={690}
                height={700}
              />
              <a onClick={this.props.lookExa} className="look-exa">
                查看示例
              </a>
            </div>
          </FormItem>
          <FormItem {...formLayout} label={timeTips}>
            {getFieldDecorator("time", {
              initialValue: beginTime
                ? [moment(beginTime), moment(endTime)]
                : null,
              rules: [{ required: true, message: "请选择展示时间" }]
            })(<RangePicker showTime format="YYYY-MM-DD HH:mm" />)}
          </FormItem>
          <FormItem {...formLayout} label={liquTips}>
            {getFieldDecorator("receiveTimeInterval", {
              initialValue: receiveTimeInterval,
              rules: [{ required: true, message: "请填写领取间隔" }]
            })(<Input style={{ width: "80px" }} />)}
            　天
          </FormItem>
          <FormItem className="must-pic" {...formLayout} label="选择优惠券">
            <BaseDelTable
              callback={this.props.handleCallback}
              columns={columns}
              dataSource={couponList}
            />
          </FormItem>
          <div className="title">模块设置</div>
          <FormItem label="设置模块背景色号" {...formLayout}>
            {getFieldDecorator("moduleBackColor", {
              initialValue: moduleBackColor,
              rules: [
                { required: true, message: "请设置模块背景色号" },
                { validator: this.validator}
              ]
            })(
              <Input
                placeholder="标题颜色的色号，常用色号可在示例中查看"
                style={{ width: "266px" }}
                autoComplete='off'
                maxLength='6'
              />
            )}
            　<span className="suffix_tips">请填写六位数字</span>
          </FormItem>
          <Button
            className="btn"
            size="large"
            type="primary"
            loading={loading}
            onClick={()=>this.props.handleSubmit(this.props.form)}
          >
            保存
          </Button>
          <Modal visible={visible} onCancel={this.props.onCancel} footer={null}>
            <img
              src={require("../../../../../assets/ex4.png")}
              style={{ width: "472px" }}
            />
          </Modal>
        </Form>
      </div>
    );
  }
}
const timeTips = (
  <span>
    <span style={{ paddingRight: "5px" }}>模块展示时间</span>
    <Tooltip title="在模块展示时间内，新用户首页将出现领取优惠券的入口">
      <Icon style={{ color: "#35BAB0" }} type="question-circle" />
    </Tooltip>
  </span>
);
const liquTips = (
  <span>
    <span style={{ paddingRight: "5px" }}>新人每次领取时间间隔</span>
    <Tooltip title="新人领取时间间隔为，新用户两次领取新人礼之间的间隔，间隔期内，新用户将无法领取新人优惠券。">
      <Icon style={{ color: "#35BAB0" }} type="question-circle" />
    </Tooltip>
  </span>
);

const NewUserSets = Form.create({
  mapPropsToFields(props){
    let couponIds = [];
    props.couponList.map(item=>couponIds.push(item.couponId))
    return{
      couponIds:Form.createFormField(couponIds)
    }
  }
})(NewUserSet)
export default NewUserSets;