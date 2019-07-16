import React, { Component } from "react";
import {
  Form,
  Button,
  Input,
  Checkbox,
  Row,
  Col,
  Radio,
  message,
  Select,
  Modal
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import {
  saveModuleApi,
  getModuleApi,
  getSavePicModuleApi,
  getSaveTheModuleApi
} from "../../../../../services/cConfig/homeConfiguration/goodSet";
import "../index.less";
const Option = Select.Option;
const placeholderText = ["请填写页面编码", "请填写URL链接", ""];
class ModuleSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "qwdqef",
      isDisplaySplitLine: 0,
      isDisplayCountdown: 0,
      titleColor: 0,
      moreLinkInfo: "",
      moduleBackColor: "fdf",
      isDisplayMore: 0,
      moreLinkType: 1,
      timeSlots: [],
      visible: false,
      loading:false
    };
  }
  componentDidMount = () => {
    this.getModule();
  };
  getModule = () => {
    const { homepageModuleId } = this.props;
    getModuleApi({ homepageModuleId:homepageModuleId }).then(res => {
      if (res.code == "0") {
        const {
          title,
          isDisplaySplitLine,
          isDisplayCountdown,
          titleColor,
          moreLinkInfo,
          moduleBackColor,
          isDisplayMore,
          moreLinkType
        } = res.homepageModuleVo;
        this.setState({
          title,
          isDisplaySplitLine,
          isDisplayCountdown,
          titleColor,
          moreLinkInfo,
          moduleBackColor,
          isDisplayMore,
          moreLinkType
        });
      }
    });
  };
  onChange = e => {
    this.setState({
      isDisplayMore: e.target.value
    });
  };
  onLinkChange = value => {
    this.setState({
      moreLinkType: value
    });
  };
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  lookEx = () => {
    this.setState({
      visible: true
    });
  };
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading:true
        });
        const { type,homepageModuleId } = this.props;
        values.homepageModuleId = homepageModuleId
        if (type == 40) {
          //多图片
          this.sendRequest2(values);
          return;
        }
        if (type == 50) {
          //主题
          this.sendRequest3(values);
          return;
        }
        this.sendRequest1(values);
      }
    });
  };
  sendRequest1 = values => {
    const { isDisplayCountdown, ..._values } = values;
    if (isDisplayCountdown) {
      _values.isDisplayCountdown = 1;
    } else {
      _values.isDisplayCountdown = 0;
    };
    _values.type = this.props.type;
    saveModuleApi(_values).then(res => {
      if (res.code == 0) {
        message.success("保存成功");
        this.setState({
          loading:false
        });
      }
    });
  };
  sendRequest2 = values => {
    getSavePicModuleApi(values).then(res => {
      if (res.code == 0) {
        message.success("保存成功");
        this.setState({
          loading:false
        });
      }
    });
  };
  sendRequest3 = values => {
    getSaveTheModuleApi(values).then(res => {
      if (res.code == 0) {
        message.success("保存成功");
        this.setState({
          loading:false
        });
      }
    });
  };

  validate = (rule, value, callback) => {
    if (value.length < 2) {
      callback("2-4个字符");
    }
    callback();
  };
  render() {
    const { type } = this.props;
    const {
      title,
      isDisplaySplitLine,
      isDisplayCountdown,
      titleColor,
      moreLinkInfo,
      moduleBackColor,
      isDisplayMore,
      moreLinkType,
      visible,
      loading
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
              initialValue: title,
              rules: [
                { required: true, message: "请选择标题栏样式" },
                { validator: this.validate }
              ]
            })(
              <Input
                style={{ width: "300px" }}
                minLength="2"
                maxLength="4"
                placeholder="请输入模块名称，2-4个字符"
                autoComplete='off'
              />
            )}
            <span className="suffix_tips">
              模块名称2-4个字符，将在C端App和小程序中展示，可输入中文、字母、数字
            </span>
          </FormItem>
          <FormItem {...formLayout} label="标题栏样式">
            {getFieldDecorator("titleColor", {
              initialValue: titleColor ? titleColor : 0,
              rules: [{ required: true, message: "请选择标题栏样式" }]
            })(
              <Radio.Group>
                <Radio value={0}>黑色</Radio>
                <Radio value={1}>白色</Radio>
              </Radio.Group>
            )}
            <a
              onClick={this.lookEx}
              style={{ textDecoration: "underline" }}
              className="theme-color"
            >
              查看示例
            </a>
          </FormItem>
          {(type == 35 || type == 45) && (
            <div>
              <FormItem {...formLayout} label="是否展示查看更多">
                {getFieldDecorator("isDisplayMore", {
                  rules: [
                    { required: true, message: "请选择是否展示查看更多" }
                  ],
                  initialValue: isDisplayMore ? isDisplayMore : 0,
                  onChange: this.onChange
                })(
                  <Radio.Group>
                    <Radio value={0}>不显示</Radio>
                    <Radio value={1}>显示</Radio>
                  </Radio.Group>
                )}
              </FormItem>
              {isDisplayMore == 1 && (
                <div>
                  <FormItem {...formLayout} label="配置跳转页面">
                    {getFieldDecorator("moreLinkType", {
                      rules: [{ required: true, message: "请选择配置页面" }],
                      initialValue: moreLinkType,
                      onChange: this.onLinkChange
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
                            moreLinkType == 1
                              ? placeholderText[0]
                              : placeholderText[1]
                          }
                          style={{ width: "200px" }}
                          autoComplete='off'
                        />
                      )}
                    </FormItem>
                  )}
                </div>
              )}
            </div>
          )}
          {type == 50 && (
            <FormItem {...formLayout} label="是否展示查看更多">
              {getFieldDecorator("isDisplayMore", {
                rules: [{ required: true, message: "请选择是否展示查看更多" }],
                initialValue: isDisplayMore ? isDisplayMore : 0,
                onChange: this.onChange
              })(
                <Radio.Group>
                  <Radio value={0}>不显示</Radio>
                  <Radio value={1}>显示</Radio>
                </Radio.Group>
              )}
            </FormItem>
          )}
          <FormItem {...formLayout} label="是否隐藏模块分割线">
            {getFieldDecorator("isDisplaySplitLine", {
              initialValue: isDisplaySplitLine ? isDisplaySplitLine : 0,
              rules: [{ required: true, message: "请选择是否隐藏模块分割线" }]
            })(
              <Radio.Group>
                <Radio value={0}>不隐藏</Radio>
                <Radio value={1}>隐藏</Radio>
              </Radio.Group>
            )}
          </FormItem>
          {type == 35 && (
            <FormItem {...formLayout} label="插件">
              {getFieldDecorator("isDisplayCountdown", {
                initialValue: isDisplayCountdown
              })(<Checkbox>展示倒计时插件</Checkbox>)}
              <span className="suffix_tips">
                注：仅促销商品支持倒计时插件，倒计时计算首页发布时间-活动结束时间
              </span>
            </FormItem>
          )}
          <FormItem {...formLayout} label="设置模块背景色号">
            {getFieldDecorator("moduleBackColor", {
              initialValue: moduleBackColor
            })(
              <Input
                style={{ width: "300px" }}
                placeholder="请输入模块背景色号，例#333333"
                autoComplete='off'
              />
            )}
            <span className="suffix_tips">请填写#+六位数字</span>
          </FormItem>
          <Row>
            <Col offset={4}>
              <Button
                onClick={this.handleSubmit}
                className="save-btn"
                type="primary"
                size="large"
                loading={loading}
              >
                保存
              </Button>
            </Col>
          </Row>
        </Form>
        <Modal
          wrapClassName="model_center"
          onCancel={this.onCancel}
          footer={null}
          visible={visible}
        >
          <img
            style={{ width: "470px" }}
            src={require("../../../../../assets/ex3.png")}
          />
        </Modal>
      </div>
    );
  }
}
const ModuleSets = Form.create({})(ModuleSet);
export default ModuleSets;