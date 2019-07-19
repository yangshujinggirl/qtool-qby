import React, { Component } from "react";
import { connect } from "dva";
import { Form, Button, Select } from "antd";
import ModDis from "./components/MainMod";
import ImportBtn from "./components/ImportBtn";
import {
  getActivityListApi,
  getSaveApi
} from "../../../../services/cConfig/homeConfiguration/goodSet";
import "./index.less";

const FormItem = Form.Item;
const Option = Select.Option;

class GoodsConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activitys: []
    };
  }
  componentDidMount = () => {
    this.initPage();
  };
  initPage = () => {
    const { pdListDisplayCfgId } = this.props;
    if (pdListDisplayCfgId) {
      this.getActivityList(pdListDisplayCfgId);
      this.getList();
    }
  };
  getList() {
    const { pdListDisplayCfgId } = this.props;
    this.props.dispatch({
      type: "goodsSet/fetchList",
      payload: { pdListDisplayCfgId }
    });
  }
  //请求活动列表
  getActivityList = pdListDisplayCfgId => {
    getActivityListApi({ pdListDisplayCfgId }).then(res => {
      if (res.code == "0") {
        this.setState({
          activitys: res.activitys
        });
      }
    });
  };
  //请求商品列表
  getdata = pdListDisplayCfgId => {
    let params = {
      pdListDisplayCfgId
    };
    this.props.dispatch({
      type: "goodsSet/fetchList",
      payload: params
    });
  };
  //配置商品按钮---->配置商品的tab
  gotoSet = () => {
    this.props.dispatch({
      type: "goodsSet/changeKey",
      payload: { activeKey: "1" }
    });
  };
  //更新商品列表
  callBack = goods => {
    this.props.dispatch({
      type: "goodsSet/getGoodsList",
      payload: goods
    });
  };
  //导入更新
  uploadData(data) {
    console.log(data);
  }
  //下载
  downLoadTep = () => {
    window.open("../../../../static/order.xlsx");
  };
  //提交
  submit = func => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { fieldsTwo, fieldsOne } = values;
        let params = {
          homePageModuleId: 20,
          pdSpuList: [...fieldsOne, ...fieldsTwo]
        };
        getSaveApi(params).then(res => {});
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { activitys } = this.state;
    const { endTime, beginTime, activityId, pdListDisplayCfgId,totalList } = this.props;
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 }
    };
    return (
      <p className="good_config">
        {pdListDisplayCfgId ? (
          <div>
            <Form>
              <FormItem label="时间段" {...formLayout}>
                <span>
                  {beginTime} ~ {endTime}
                </span>
              </FormItem>
              <FormItem label="选择活动" {...formLayout}>
                {getFieldDecorator("activityId", {
                  initialValue: activityId,
                  rules: [{ required: true, message: "请选择时间段" }]
                })(
                  <Select>
                    {activitys.map(item => (
                      <Option value={item.activityId}>
                        {item.activityName}
                      </Option>
                    ))}
                  </Select>
                )}
                <span className="suffix_tips">
                  请先选择你要展示的商品所在的活动
                </span>
              </FormItem>
            </Form>
            <div className="good-title">
              <div>已选商品</div>
              <div>
                <span>已选{totalList.length}/100</span>
                <ImportBtn uploadData={this.uploadData} />
                <Button
                  className="down_load_btn"
                  type="primary"
                  onClik={this.downLoadTep}
                >
                  下载附件模板
                </Button>
              </div>
            </div>
            <div className="tips">
              注：首页单行横划商品模块固定展示8件商品，按照以下顺序展示，售罄或下架商品不展示，由后位商品按照顺序补充
            </div>
            <div>
              <ModDis callBack={this.callBack} form={this.props.form} />
            </div>
            <div className="handle-btn-footer">
              <Button onClick={this.submit} type="primary" size="large">
                保存
              </Button>
            </div>
          </div>
        ) : (
          <p className="no-data">
            <p>请先设置时段</p>
            <Button
              className="go_set_btn"
              type="primary"
              onClick={this.gotoSet}
            >
              去设置
            </Button>
          </p>
        )}
      </p>
    );
  }
}
function mapStateToProps(state) {
  const { goodsSet } = state;
  return goodsSet;
}
const GoodsConfigs = Form.create({})(GoodsConfig);
export default connect(mapStateToProps)(GoodsConfigs);
