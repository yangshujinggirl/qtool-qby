import React, { Component } from "react";
import { Form, Button, Input, Checkbox, Row, Col, Radio, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { getTimeListApi } from "../../../../services/cConfig/homeConfiguration/goodSet";
import "./index.less";
const Option = Select.Option;
const placeholderText = ["请填写页面编码", "请填写URL链接", ""];
class ModuleSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'qwdqef',
      isDisplaySplitLine:0,
      isDisplayCountdown:0,
      titleColor:0,
      moreLinkInfo:'ge',
      moduleBackColor:'fdf',
      isDisplayMore:0,
      moreLinkType:1,
      timeSlots: []
    };
  }

  render() {
    const {
      title,
      isDisplaySplitLine,
      isDisplayCountdown,
      titleColor,
      moreLinkInfo,
      moduleBackColor,
      isDisplayMore,
      moreLinkType
    } = this.state;
    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="single-line-set">
        <Form>
          <FormItem {...formLayout} label="模块标题名称">
            {getFieldDecorator("title", {
              initialValue:title,
              rules: [{ required: true, message: "请选择标题栏样式" }]
            })(
              <Input
                style={{ width: "300px" }}
                minLength="2"
                maxLength="4"
                placeholder="请输入模块名称"
              />
            )}
            <span className="suffix_tips">
              模块名称2-4个字符，将在C端App和小程序中展示，可输入中文、字母、数字
            </span>
          </FormItem>
          <FormItem {...formLayout} label="标题栏样式">
            {getFieldDecorator("titleColor", {
              initialValue: titleColor,
              rules: [{ required: true, message: "请选择标题栏样式" }]
            })(
              <Radio.Group>
                <Radio value={0}>黑色</Radio>
                <Radio value={1}>白色</Radio>
              </Radio.Group>
            )}
            <a style={{ textDecoration: "underline" }} className="theme-color">
              查看示例
            </a>
          </FormItem>
          <FormItem {...formLayout} label="是否展示查看更多">
            {getFieldDecorator("isDisplayMore", {
              rules: [{ required: true, message: "请选择是否展示查看更多" }],
              initialValue:isDisplayMore,
              onChange: this.onChange
            })(
              <Radio.Group>
                <Radio value={0}>不显示</Radio>
                <Radio value={1}>显示</Radio>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem {...formLayout} label="配置跳转页面">
            {getFieldDecorator("moreLinkType", {
              rules: [{ required: true, message: "请选择配置页面" }],
              initialValue: moreLinkType,
              onChange: this.onChange
            })(
              <Select>
                <Option value={1}>去配置页面</Option>
                <Option value={2}>去H5页面</Option>
                <Option value={3}>去已选商品列表页</Option>
              </Select>
            )}
          </FormItem>
          {(moreLinkType == 1 || moreLinkType == 2) && (
            <FormItem wrapperCol={{ offset: 3 }}>
              {getFieldDecorator("moreLinkInfo", {
                rules: [{ required: true, message: "请填写配置页面" }],
                initialValue: moreLinkInfo
              })(
                <Input
                  placeholder={
                    moreLinkType == 1 ? placeholderText[0] : placeholderText[1]
                  }
                  style={{ width: "200px" }}
                />
              )}
            </FormItem>
          )}
          <FormItem {...formLayout} label="是否隐藏模块分割线">
            {getFieldDecorator("isDisplaySplitLine", {
              initialValue: isDisplaySplitLine,
              rules: [{ required: true, message: "请选择是否隐藏模块分割线" }]
            })(
              <Radio.Group>
                <Radio value={0}>不隐藏</Radio>
                <Radio value={1}>隐藏</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem {...formLayout} label="插件">
            {getFieldDecorator("isDisplayCountdown",{
              initialValue:isDisplayCountdown
            })(
              <Checkbox>展示倒计时插件</Checkbox>
            )}
            <a className="theme-color" style={{ textDecoration: "underline" }}>
              查看示例
            </a>
            <span className="suffix_tips">
              注：仅促销商品支持倒计时插件，倒计时计算首页发布时间-活动结束时间
            </span>
          </FormItem>
          <FormItem {...formLayout} label="设置模块背景色号">
            {getFieldDecorator("moduleBackColor", {
              initialValue: moduleBackColor
            })(
              <Input
                style={{ width: "300px" }}
                placeholder="标题颜色的色号，常用色号可在示例中查看"
              />
            )}
            <span className="suffix_tips">请填写#+六位数字</span>
          </FormItem>
          <Row>
            <Col offset={4}>
              <Button className="save-btn" type="primary" size="large">
                保存
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
const ModuleSets = Form.create({})(ModuleSet);
export default ModuleSets;
