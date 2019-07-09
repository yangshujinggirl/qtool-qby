import React, { Component } from "react";
import { Form, Button, Input, Checkbox, Row, Col, Radio, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import {getTimeListApi} from '../../../../services/cConfig/homeConfiguration/goodSet'
import "./index.less";
const Option = Select.Option;
const placeholderText = ["请填写页面编码", "请填写URL链接", ""];
class ModuleSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMore: false,
      timeSlots:[]
    };
  }
  
  render() {
   
    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="single-line-set">
        <Form>
          <FormItem {...formLayout} label="模块标题名称">
            {getFieldDecorator("name", {
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
            {getFieldDecorator("name1", {
              initialValue: 1,
              rules: [{ required: true, message: "请选择标题栏样式" }]
            })(
              <Radio.Group>
                <Radio value={1}>黑色</Radio>
                <Radio value={2}>白色</Radio>
              </Radio.Group>
            )}
            <a style={{ textDecoration: "underline" }} className="theme-color">
              查看示例
            </a>
          </FormItem>
          <FormItem {...formLayout} label="是否展示查看更多">
            {getFieldDecorator("name2", {
              rules: [{ required: true, message: "请选择是否展示查看更多" }],
              initialValue: 1,
              onChange: this.onChange
            })(
              <Radio.Group>
                <Radio value={1}>不显示</Radio>
                <Radio value={2}>显示</Radio>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem {...formLayout} label="配置跳转页面">
            {getFieldDecorator("name7", {
              rules: [{ required: true, message: "请选择配置页面" }],
              initialValue: 1,
              onChange: this.onChange
            })(
              <Select>
                <Option value="jack">去配置页面</Option>
                <Option value="lucy">去H5页面</Option>
                <Option value="disabled">去已选商品列表页</Option>
              </Select>
            )}
          </FormItem>
          <FormItem wrapperCol={{offset:3}}>
            {getFieldDecorator("name8", {
              rules: [{ required: true, message: "请选择配置页面" }],
              initialValue: 1
            })(<Input style={{'width':'200px'}} />)}
          </FormItem>
          <FormItem {...formLayout} label="是否隐藏模块分割线">
            {getFieldDecorator("name3", {
              rules: [{ required: true, message: "请选择是否隐藏模块分割线" }]
            })(
              <Radio.Group>
                <Radio value={1}>不隐藏</Radio>
                <Radio value={2}>隐藏</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem {...formLayout} label="插件">
            <Checkbox>
              展示倒计时插件
              <a
                className="theme-color"
                style={{ textDecoration: "underline" }}
              >
                查看示例
              </a>
            </Checkbox>
            <span className="suffix_tips">
              注：仅促销商品支持倒计时插件，倒计时计算首页发布时间-活动结束时间
            </span>
          </FormItem>
          <FormItem {...formLayout} label="设置模块背景色号">
            {getFieldDecorator("name5")(
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
