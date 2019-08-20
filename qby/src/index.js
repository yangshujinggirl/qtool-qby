import dva from "dva";
import createLoading from "dva-loading";
import "antd/dist/antd.less";
import "./index.css";
import "./style/baseCommon.less"; //公共样式
import { useRouterHistory } from "dva/router";
import { createHashHistory } from "history";
//商品中心-------
import addGoods from "./models/goodsCenter/baseGoods/addGoods.js"; //基础商品--新增商品
import baseGoodsDetail from "./models/goodsCenter/baseGoods/baseGoodsDetail.js"; //基础商品--新增商品
import baseGoodsList from "./models/goodsCenter/baseGoods/baseGoodsList.js"; //基础商品列表
import bTipGoodsList from "./models/goodsCenter/bTipGoods/bTipGoodsList.js"; //B端商品列表
import bTipAddGoods from "./models/goodsCenter/bTipGoods/bTipAddGoods.js"; //B端商品列表
import cTipGoodsList from "./models/goodsCenter/cTipGoods/cTipGoodsList.js"; //c端商品列表
import cTipAddGoods from "./models/goodsCenter/cTipGoods/cTipAddGoods.js"; //c端商品列表
import internalSort from "./models/goodsCenter/internalSort.js"; //B端商品列表
import goodsLogList from "./models/goodsCenter/goodsLogList.js"; //B端商品列表
import cTimer from "./models/cTimer/cTimer.js"; //c端定时
import cExplain from "./models/goodsCenter/cExplain.js"; //c端商品说明
import bondManage from "./models/goodsCenter/bondManage.js"; //保税仓管理
import countryManage from "./models/goodsCenter/countryManage.js"; //国家管理
import exchangeAct from "./models/goodsCenter/exchangeAct/exchangeAct.js"; //国家管理
//电商中心
import productGoodsList from "./models/online/productInfo/productGoodsList.js";
import productEditGoods from "./models/online/productInfo/productEditGoods.js";
//订单中心--用户订单
import userorders from "./models/userorders";
import allth from "./models/orderCenter/userth/allth"; //所有退单
import toAudit from "./models/orderCenter/userth/toAudit"; //待运营审核订单
import account from "./models/account";
import downlaod from "./models/downlaod";
import orderuser from "./models/online/orderuser/index"; //online用户订单
//数据中心
import dataposorder from "./models/dataposorder";
import datasporder from "./models/datasporder";
import datas from "./models/datas";
import dataclassdes from "./models/dataclassdes";
import datagodes from "./models/datagodes";
import dataspfen from "./models/dataspfen";
import datasphiscun from "./models/datasphiscun";
import dataspcun from "./models/dataspcun";
import dataspsell from "./models/dataspsell";
import mdDivide from "./models/datapos/dailyBill/mdDivide";
import thList from "./models/datapos/shReport/thList";
import bStock from "./models/stock/bStock";
import onlineStock from "./models/stock/onlineStock";
import specs from "./models/specs";
import brand from "./models/goodsCenter/brand";
import fenlei from "./models/fenlei";
import warehouse from "./models/warehouse";
import feedback from "./models/feedback";
import datacg from "./models/datacg";
import datawstime from "./models/datawstime";
import datawshis from "./models/datawshis";
import datawson from "./models/datawson";
import dataws from "./models/dataws";
import operatesp from "./models/operatesp";
import goodtime from "./models/goodtime";
import operatecz from "./models/operatecz";
import recheck from "./models/recheck";
import adjust from "./models/adjust";
import jedit from "./models/jedit";
import postcheck from "./models/postcheck";
import goods from "./models/goods";
import orderdb from "./models/orderdb";
import orderct from "./models/orderct";
import orderth from "./models/orderth";
import orderpos from "./models/orderpos";
import ordercg from "./models/ordercg";
import ordermd from "./models/ordermd";
import IndexPage from "./models/IndexPage";
import tab from "./models/tab";
import users from "./models/users";
import operatemember from "./models/operatemember";
import operateinout from "./models/operateinout";
import operatesupplier from "./models/operatesupplier";
import operatebanner from "./models/operatebanner";
import h5config from "./models/h5config";
import dataposManage from "./models/dataposManage";
import onlinegood from "./models/onlinegood";
//合作中心
import marketResource from "./models/cooperate/marketResource"; //资源管理
//活动中心
import cBanner from "./models/activity/cBanner/cBanner"; //c端banner
import coupon from "./models/activity/coupon/coupon"; //优惠券
import bPush from "./models/activity/bPush/bPush"; //bpush
import cPush from "./models/activity/cPush/cPush"; //bpush
//财务中心
import shareTotal from "./models/financeCenter/shareManage/shareTotal";
import shareMail from "./models/financeCenter/shareManage/shareMail";
import shareRate from "./models/financeCenter/shareManage/shareRate";
//客服中心
import userFeedBack from "./models/server/userFeedBack";
import serverBill from "./models/server/serverBill";
import cServerOrder from "./models/server/cServerOrder"; //c端客服工单;
//app数据
import appBase from "./models/appData/appBase";
//供应商收支
import supplyinout from "./models/operate/supplyinout";
//提现管理
import withdraw from "./models/operate/withdraw";
import sellManage from "./models/operate/sellManage";

import bAnswer from "./models/operate/bAnswer"; //B端问答
import bAddAnswer from "./models/operate/bAnswer/bAddAnswer"; //新增B端问答
import bActPrice from "./models/operate/bActPrice/index"; //B端活动进价
import bDown from "./models/operate/bDown/index"; //B限时直降
import cDown from "./models/operate/cDown/index"; //c限时直降
import themeAct from "./models/operate/themeAct/index"; //c限时直降
import pageConfig from "./models/operate/pageConfig/index"; //页面配置
import market from "./models/operate/market/index"; //页面配置
//待审核订单
import onAudit from "./models/online/onAudit";
import freightDetail from "./models/datapos/freightDetail";
//用户中心
import cUserManage from "./models/userCenter/cUserManage";
import homeEdit from "./models/homeConfiguration/homeEdit.js";
import commodityFlow from "./models/homeConfiguration/commodityFlow.js";
import bannerSet from "./models/homeConfiguration/bannerSet.js";
import iconSet from "./models/homeConfiguration/iconSet.js";
import morePicSet from "./models/homeConfiguration/morePicSet.js";
import moreGoodsSet from "./models/homeConfiguration/moreGoodsSet.js";
//内容中心
import homeConfig from "./models/homeConfiguration/configurationList";
import goodsSet from './models/homeConfiguration/goodsSet'
//营销中心
import bAudit from './models/marketActivities/bAudit'
import cAudit from './models/marketActivities/cAudit'
import ctipActivity from './models/marketActivities/ctipActivity';
import ctipActivityAddOne from './models/marketActivities/ctipActivity/ctipActivityAddOne';
import ctipActivityAddTwo from './models/marketActivities/ctipActivity/ctipActivityAddTwo';
import discount from './models/marketActivities/ctipActivity/setGood/discount';//活动优惠内容
import setGoods from './models/marketActivities/ctipActivity/setGood/setGoods';//选择商品内容
// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false })
});
const models = [
  goodsLogList,
  productGoodsList,
  productEditGoods,
  countryManage,
  internalSort,
  cTipAddGoods,
  cTipGoodsList,
  bTipAddGoods,
  bTipGoodsList,
  addGoods,
  baseGoodsDetail,
  baseGoodsList,
  cExplain,
  bondManage,
  userorders,
  cUserManage,
  allth,
  toAudit,
  account,
  downlaod,
  dataposorder,
  datasporder,
  datas,
  dataclassdes,
  datagodes,
  dataspfen,
  datasphiscun,
  dataspcun,
  dataspsell,
  mdDivide,
  thList,
  bStock,
  onlineStock,
  specs,
  brand,
  fenlei,
  warehouse,
  feedback,
  datacg,
  datawstime,
  datawshis,
  datawson,
  dataws,
  operatesp,
  goodtime,
  operatecz,
  recheck,
  adjust,
  jedit,
  postcheck,
  goods,
  orderdb,
  orderct,
  orderth,
  orderpos,
  ordercg,
  ordermd,
  IndexPage,
  tab,
  users,
  operatemember,
  operateinout,
  operatesupplier,
  operatebanner,
  h5config,
  dataposManage,
  onlinegood,
  marketResource,
  cBanner,
  userFeedBack,
  serverBill,
  coupon,
  bPush,
  cPush,
  cTimer,
  appBase,
  supplyinout,
  withdraw,
  bAnswer,
  bAddAnswer,
  onAudit,
  sellManage,
  freightDetail,
  cServerOrder,
  shareRate,
  shareTotal,
  shareMail,
  orderuser,
  exchangeAct,
  //运营中心
  bActPrice,
  bDown,
  cDown,
  themeAct,
  pageConfig,
  market,
  homeEdit,
  commodityFlow,
  bannerSet,iconSet,morePicSet,moreGoodsSet,
  //内容中心
  homeConfig,
  goodsSet,
  //营销中心
  bAudit,
  cAudit,ctipActivity,ctipActivityAddOne,ctipActivityAddTwo,discount,setGoods
];
models.forEach(m => {
  return app.model(m);
});
// 2. Plugins
app.use(createLoading());
// 3. Model
// app.model(require('./models/example'));
// 4. Router
app.router(require("./router"));
// 5. Start
app.start("#root");
