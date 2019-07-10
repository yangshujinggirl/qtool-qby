import React, { Component } from "react";
import { connect } from "dva";
import { Form, Button, Select } from "antd";
import Mod from "./components/Mod";
import {
  getActivityListApi,
  getdataApi
} from "../../../../services/cConfig/homeConfiguration/goodSet";
import "./index.less";

const FormItem = Form.Item;
const Option = Select.Option;

class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activitys: [],
      data: {
        data0:[],
        data1:[]
      }
    };
  }
  componentDidMount = () => {
    const { pdListDisplayCfgId } = this.props;
    if (pdListDisplayCfgId) {
      this.getActivityList(pdListDisplayCfgId);
      this.getdata(pdListDisplayCfgId);
    }
  };
  //请求活动列表
  getActivityList = homePageModuleId => {
    getActivityListApi({ pdListDisplayCfgId, homePageModuleId, type: 1 }).then(
      res => {
        if (res.code == "0") {
          this.setState({
            activitys: res.activitys
          });
        }
      }
    );
  };
  //请求商品列表
  getdata = pdListDisplayCfgId => {
    getdataApi({ pdListDisplayCfgId }).then(res => {});
    const res = {
      code: "0",
      data: [
        {
          pdListId: 1,
          pdSpuId: "pdSpuID",
          pdCode: "商品code",
          sellingPoints: "卖",
          tags: "标",
          pdSpuPic: "qtltest/spu/1907/10/1562746280028.jpg",
          pdSpuName: "名称",
          pdCategory: "分类",
          pdSpuPrice: "价格",
          activityName: "活动名称",
          pdSpuInv: "在售库存",
          outOfStockShopNum: "缺货门店"
        },
        {
          pdListId: 1,
          pdSpuId: "pdSpuID",
          pdCode: "商品code",
          sellingPoints: "卖",
          tags: "标",
          pdSpuPic: "qtltest/spu/1907/10/1562746280028.jpg",
          pdSpuName: "名称",
          pdCategory: "分类",
          pdSpuPrice: "价格",
          activityName: "活动名称",
          pdSpuInv: "在售库存",
          outOfStockShopNum: "缺货门店"
        },
        {
          pdListId: 1,
          pdSpuId: "pdSpuID",
          pdCode: "商品code",
          sellingPoints: "卖",
          tags: "标",
          pdSpuPic: "qtltest/spu/1907/10/1562746280028.jpg",
          pdSpuName: "名称",
          pdCategory: "分类",
          pdSpuPrice: "价格",
          activityName: "活动名称",
          pdSpuInv: "在售库存",
          outOfStockShopNum: "缺货门店"
        },
        {
          pdListId: 1,
          pdSpuId: "pdSpuID",
          pdCode: "商品code",
          sellingPoints: "卖",
          tags: "标",
          pdSpuPic: "qtltest/spu/1907/10/1562746280028.jpg",
          pdSpuName: "名称",
          pdCategory: "分类",
          pdSpuPrice: "价格",
          activityName: "活动名称",
          pdSpuInv: "在售库存",
          outOfStockShopNum: "缺货门店"
        },
        {
          pdListId: 1,
          pdSpuId: "pdSpuID",
          pdCode: "商品code",
          sellingPoints: "卖",
          tags: "标",
          pdSpuPic: "qtltest/spu/1907/10/1562746280028.jpg",
          pdSpuName: "名称",
          pdCategory: "分类",
          pdSpuPrice: "价格",
          activityName: "活动名称",
          pdSpuInv: "在售库存",
          outOfStockShopNum: "缺货门店"
        },
        {
          pdListId: 1,
          pdSpuId: "pdSpuID",
          pdCode: "商品code",
          sellingPoints: "卖",
          tags: "标",
          pdSpuPic: "qtltest/spu/1907/10/1562746280028.jpg",
          pdSpuName: "名称",
          pdCategory: "分类",
          pdSpuPrice: "价格",
          activityName: "活动名称",
          pdSpuInv: "在售库存",
          outOfStockShopNum: "缺货门店"
        },
        {
          pdListId: 1,
          pdSpuId: "pdSpuID",
          pdCode: "商品code",
          sellingPoints: "卖",
          tags: "标",
          pdSpuPic: "qtltest/spu/1907/10/1562746280028.jpg",
          pdSpuName: "名称",
          pdCategory: "分类",
          pdSpuPrice: "价格",
          activityName: "活动名称",
          pdSpuInv: "在售库存",
          outOfStockShopNum: "缺货门店"
        },
        {
          pdListId: 1,
          pdSpuId: "pdSpuID",
          pdCode: "商品code",
          sellingPoints: "卖",
          tags: "标",
          pdSpuPic: "qtltest/spu/1907/10/1562746280028.jpg",
          pdSpuName: "名称",
          pdCategory: "分类",
          pdSpuPrice: "价格",
          activityName: "活动名称",
          pdSpuInv: "在售库存",
          outOfStockShopNum: "缺货门店"
        }
      ]
    };
    if (res.code == "0") {
      const { data } = res;
      data.map((item,index)=>{ 
        item.key = index+1;
        return item;
      });
      const data0 = data.slice(0, 9);
      const data1 = data.slice(8);
      console.log(data0);
      console.log(data1);
      this.setState({
        data: {
          data0,
          data1
        }
      });
    }
  };
  gotoSet = () => {
    this.props.dispatch({
      type: "goodsSet/changeKey",
      payload: { activeKey: "1" }
    });
  };
  changedata=(data)=>{
    this.setState({
      data
    })
  }
  render() {
    console.log(this.props.pdListDisplayCfgId);
    const { getFieldDecorator } = this.props.form;
    const { activitys, data } = this.state;
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 }
    };
    return (
      <div className="good_config">
        {this.props.pdListDisplayCfgId ? (
          <div>
            <Form>
              <FormItem label="时间段" {...formLayout}>
                <span>2018-09-08 12:20 ~ 2018-09-09 14:34</span>
              </FormItem>
              <FormItem label="选择活动" {...formLayout}>
                {getFieldDecorator("activityId", {
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
                <span>已选6/100</span>
                <Button className="center-btn" type="primary">
                  上传附件
                </Button>
                <Button type="primary">下载附件模板</Button>
              </div>
            </div>
            <div className="tips">
              注：首页单行横划商品模块固定展示8件商品，按照以下顺序展示，售罄或下架商品不展示，由后位商品按照顺序补充
            </div>
            <div>
              <Mod data={data} callback={this.changedata}/>
            </div>
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
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { goodsSet } = state;
  return goodsSet;
}
const Configs = Form.create({})(Config);
export default connect(mapStateToProps)(Configs);
