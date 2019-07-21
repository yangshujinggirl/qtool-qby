import React, { Component } from "react";
import { connect } from "dva";
import { Form, Button, Select, message,Modal } from "antd";
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
      activitys: [],
      visible:false
    };
  }
  componentDidMount = () => {
    if (this.props.mark) {
      this.initPage();
    }
  };
  componentWillReceiveProps = props => {
    if (props.pdListDisplayCfgId != this.props.pdListDisplayCfgId) {
      this.getActivityList(props.pdListDisplayCfgId);
      this.getList(props.pdListDisplayCfgId);
    }
  };
  initPage = () => {
    const { pdListDisplayCfgId } = this.props;
    if (pdListDisplayCfgId) {
      this.getActivityList(pdListDisplayCfgId);
      this.getList(pdListDisplayCfgId);
    }
  };
  getList(id) {
    this.props.dispatch({
      type: "goodsSet/fetchList",
      payload: { pdListDisplayCfgId: id }
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
  //下载
  downLoadTep = () => {
    window.open("../../../../static/order.xlsx");
  };
  //提交
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { fieldsTwo, fieldsOne } = values;
        let pdSpuList;
        if (fieldsOne && fieldsTwo) {
          pdSpuList = [...fieldsOne, ...fieldsTwo];
        } else if (fieldsOne) {
          pdSpuList = fieldsOne;
        } else if (fieldsTwo) {
          fieldsOne = fieldsTwo;
        }
        const {
          homepageModuleId,
          pdListDisplayCfgId,
          goodType,
          activityId
        } = this.props;
        const { totalList } = this.props;
        if (totalList.length < 8) {
          message.error("请至少配置8个商品");
          return;
        }
        let params;
        if (goodType == 1) {
          params = {
            activityId,
            homepageModuleId,
            pdListDisplayCfgId,
            type: goodType,
            pdSpuList
          };
        } else {
          params = {
            homepageModuleId,
            pdListDisplayCfgId,
            type: goodType,
            pdSpuList
          };
        }
        this.props.dispatch({ type: "tab/loding", payload: true });
        getSaveApi(params).then(res => {
          if (res.code == 0) {
            this.getList();
          }
          this.props.dispatch({ type: "tab/loding", payload: false });
        });
      }
    });
  };
  onChange = value => {
    if( this.props.activityId && this.props.totalList.length>0 ){
      this.setState({
        visible:true
      });
      this.setState({
        activityId:value
      });
    }else{
      this.props.dispatch({
        type: "goodsSet/changeActivityId",
        payload: { activityId: value }
      });
    }
  };
  onCancel=()=>{
    this.setState({
      visible:false
    });
    this.props.form.resetFields(['activityId'])
  }
  onOk=()=>{
    this.props.dispatch({
      type: "goodsSet/changeActivityId",
      payload: { activityId: this.state.activityId }
    });
    this.callBack([])
    this.setState({
      visible:false
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { activitys,visible } = this.state;
    const {
      endTime,
      beginTime,
      activityId,
      mark,
      totalList,
      goodType
    } = this.props;
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 }
    };
    return (
      <div className="good_config">
        {mark ? (
          <div>
            <Form>
              <FormItem label="时间段" {...formLayout}>
                <span>
                  {beginTime} ~ {endTime}
                </span>
              </FormItem>
              {goodType == 1 && (
                <div>
                <FormItem label="选择活动" {...formLayout}>
                  {getFieldDecorator("activityId", {
                    initialValue: activityId ? activityId : undefined,
                    rules: [{ required: true, message: "请选择时间段" }],
                    onChange: this.onChange
                  })(
                    <Select  placeholder="请选择正在进行的活动">
                      {activitys&&activitys.map(item => (
                        <Option value = {item.activityId}>
                          {item.activityName}
                        </Option>
                      ))}
                    </Select>
                  )}
                  <span className="suffix_tips">
                    请先选择你要展示的商品所在的活动
                  </span>
                </FormItem>
                {activityId &&
                  <div>
                    <div className="good-title">
                      <div>已选商品设置</div>
                      <div>
                        <span>已选{totalList.length}/100</span>
                        <ImportBtn
                          callBack={this.callBack}
                          type={goodType}
                          activityId={activityId}
                        />
                        <Button
                          className="down_load_btn"
                          type="primary"
                          onClick={this.downLoadTep}
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
                }
                </div>
              )}
            </Form>
            {goodType == 2 &&
              <div>
                <div className="good-title">
                  <div>已选商品设置</div>
                  <div>
                    <span>已选{totalList.length}/100</span>
                    <ImportBtn
                      callBack={this.callBack}
                      type={goodType}
                      activityId={activityId}
                    />
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
            }
          </div>
        ) : (
          <div className="no-data">
            <p>请先设置时段</p>
            <Button
              className="go_set_btn"
              type="primary"
              onClick={this.gotoSet}
            >
              去设置
            </Button>
          </div>
        )}
        <Modal visible={visible} onOk={this.onOk} onCancel={this.onCancel}>
          <p>切换活动后，你选择的商品将清空</p>
          <p>是否确认切换活动？</p>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { goodsSet } = state;
  return goodsSet;
}
const GoodsConfigs = Form.create({})(GoodsConfig);
export default connect(mapStateToProps)(GoodsConfigs);
