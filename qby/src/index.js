import dva from 'dva';
import 'antd/dist/antd.less';
import './index.css';

import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
//商品中心-------
import baseGoodsDetail from './models/goodsCenter/baseGoods/baseGoodsDetail.js';//基础商品
import baseGoodsList from './models/goodsCenter/baseGoods/baseGoodsList.js';//基础商品详情
//订单中心--用户订单
import userorders from './models/userorders';
import account from "./models/account"
import downlaod from "./models/downlaod"
import dataposorder from "./models/dataposorder"
import datasporder from "./models/datasporder"
import datas from "./models/datas"
import dataclassdes from "./models/dataclassdes"
import datagodes from "./models/datagodes"
import dataspfen from "./models/dataspfen"
import datasphiscun from "./models/datasphiscun"
import dataspcun from "./models/dataspcun"
import dataspsell from "./models/dataspsell"
import stock from "./models/stock"
import specs from "./models/specs"
import brand from "./models/brand"
import fenlei from "./models/fenlei"
import warehouse from "./models/warehouse"
import feedback from "./models/feedback"
import datacg from "./models/datacg"
import datawstime from "./models/datawstime"
import datawshis from "./models/datawshis"
import datawson from "./models/datawson"
import dataws from "./models/dataws"
import operatesp from "./models/operatesp"
import goodtime from "./models/goodtime"
import operatecz from "./models/operatecz"
import recheck from "./models/recheck"
import adjust from "./models/adjust"
import jedit from "./models/jedit"
import postcheck from "./models/postcheck"
import goods from "./models/goods"
import orderdb from "./models/orderdb"
import orderct from "./models/orderct"
import orderth from "./models/orderth"
import orderpos from "./models/orderpos"
import ordercg from "./models/ordercg"
import ordermd from "./models/ordermd"
import IndexPage from "./models/IndexPage"
import tab from "./models/tab"
import users from "./models/users"
import operatemember from "./models/operatemember"
import operateinout from "./models/operateinout"
import operatesupplier from "./models/operatesupplier"
import operatebanner from "./models/operatebanner"
import h5config from "./models/h5config"
import dataposManage from "./models/dataposManage"
import onlinegood from "./models/onlinegood"
//合作中心
import marketResource from './models/cooperate/marketResource' //资源管理
//活动中心
import cBanner from './models/activity/cBanner/cBanner'
import coupon from './models/activity/coupon/coupon'
//客服中心
import userFeedBack from './models/server/userFeedBack'
import serverBill from './models/server/serverBill'


// 1. Initialize
const app = dva({
    history: useRouterHistory(createHashHistory)({ queryKey: false }),
  });

const models = [
  baseGoodsDetail,
  baseGoodsList,
  userorders,
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
  stock,
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
  coupon
]

models.forEach(m => {
  return app.model(m)
})


// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
