
import { connect } from 'dva';
import '../../style/content.css';
import { Spin } from 'antd';
import SiderDataMap from '../../components/SiderDataMap.js';

import GoodsIndex from '../goods/goodscenter/index';
import GoodEdit from '../goods/goodscenter/edit';
import Goodinfo from '../goods/goodscenter/info';
import Stockindex from '../goods/stock/index';
import Classificationindex from '../goods/classification/index';
import Brandindex from '../goods/brandManage/index';
import Specsindex from '../goods/specs/index';
import GoodtimeIndex from '../goods/goodtime/index';
import GoodEditForm from '../goods/goodtime/edit';
import DataspIndex from '../datasp/index';
import AccountIndex from '../account/index';
import AddNewAccount from '../account/info';
//门店订单
import OrdermdIndex from '../ordermd/index';
import OrdermdInfo from '../ordermd/info';
import OrdermdEdit from '../ordermd/edit';
//采购订单
import OrdercgIndex from '../ordercg/index';
import OrdercgInfo from '../ordercg/info';
import OrdercgEdit from '../ordercg/edit';
//退货订单
import OrderthIndex from '../orderth/index';
import OrderthInfo from '../orderth/info';
import OrderthEdit from '../orderth/edit';
//采退订单
import OrderctIndex from '../orderct/index';
import OrderctInfo from '../orderct/info';
import OrderctEdit from '../orderct/edit';
//pos订单
import OrderposIndex from '../orderpos/index';
import OrderposInfo from '../orderpos/info';
//调拨订单
import OrderdbIndex from '../orderdb/index';
import OrderdbInfo from '../orderdb/info';
import OrderdbEdit from '../orderdb/edit';

//充值订单
import CzIndex from '../operatecz/index';
import OperateczInfo from '../operatecz/info';

//收支管理
import OperateinoutIndex from '../operateinout/index';
import OperateinoutInfo from '../operateinout/info';
import OperateinoutMoneyInfo from '../operateinout/infomoney';
import OperatememberIndex from '../operatemember/index';
import OperateinoutExchangeInfo from '../operateinout/infoexchange'

//供应商管理
import OperatesupplierIndex from '../operatesupplier/index';
import OperatesupplierEdit from '../operatesupplier/edit';
//banner管理
import OperatebannerIndex from '../operatebanner/index';
import OperatebannerEdit from '../operatebanner/edit';
import H5_configure from '../operatebanner/editH5';

import OperateIndex from '../operatesp/index';
import SpEditForms from '../operatesp/edit';
import SpInfo from '../operatesp/info';

import DownloadIndex from '../download/index';


import ConsumptionInfo from '../operatemember/info';

//数据中心
import DatawsIndex from '../dataws/index';
import DatacgIndex from '../datacg/index';
import DataposIndex from '../datapos/index';
import ShListDetail from '../datapos/shReport/shList/shListDetail'; //收货列表详情
import ThListDetail from '../datapos/shReport/thList/thListDetail' //退货列表详情
import DataFinanceIndex from '../datafinance/index';

import DatagoIndex from '../datagoods/index';

import DataorderIndex from '../dataorder/index';

import FeedbackIndex from '../feedback/index';
import Feedbackedit from '../feedback/edit';

import DataTable from '../datagoods/table';
import SpselldataTable from '../datasp/table';

//日志
import Config from '../goods/goodscenter/config';

import InfouserIndex from '../online/infouser/index';
import OrderuserIndex from '../online/orderuser/index';
import OrderuserInfo from '../online/orderuser/info';

import OnAudit from '../online/onAudit/index' //待审核订单

import OnlineGoodsIndex from '../online/infogoods/index';

import OnlineGoodEdit from '../online/infogoods/edit';
import OnlineGoodinfo from '../online/infogoods/info';
import OnlineConfig from '../online/infogoods/config';



import AdjustInfo from '../datapos/adjustinfo'
import InventoryInfo from '../datapos/inventoryinfo'
import DbInfo from '../datapos/dbinfo'

//Q本营-门店pos
import QposDbInfo from '../datapos/dbinfo'

//订单中心
import UserOrder from '../userOrder/index';//用户订单
import UserOrderDetail from '../userOrder/userOrderDetail'
import Userth from '../userth/index' //用户退单
import UserthDetail from '../userth/userthDetail' //用户退单详情
import AddThOrder from '../userth/allth/addThOrder'//创建退单
//商品中心
import  BaseGoods from '../goods/baseGoods/index';//基础商品
import  AddGoods from '../goods/baseGoods/AddGoods';//基础商品--新增商品
import  GoodsDetail from '../goods/baseGoods/GoodsDetail';//基础商品--商品详情
import  LogList from '../goods/baseGoods/LogList';//基础商品--日志
import  BtipGoods from '../goods/bTipGoods/index';//B端商品-
import  BtipAddGoods from '../goods/bTipGoods/AddGoods';//B端商品--新增商品
import  BtipGoodsDetail from '../goods/bTipGoods/GoodsDetail';//B端商品--商品详情
import  BtipLogList from '../goods/bTipGoods/LogList';//B端商品--日志
import  CtipGoods from '../goods/cTipGoods/index';//C端商品-
import  CtipAddGoods from '../goods/cTipGoods/AddGoods';//C端商品--新增商品
import  CtipGoodsDetail from '../goods/cTipGoods/GoodsDetail';//C端商品--商品详情
import  CtipLogList from '../goods/cTipGoods/LogList';//C端商品--日志
import  InternalSort from '../goods/internalSort/index.js';//内部分类
import  CountryManage from '../goods/countryManage/index.js';//国家管理
import  BondManage from '../goods/bondManage/index.js'//保税仓管理
import CgoodsExplain from '../goods/cgoodsExplain/index'//c端商品说明
import ExchangeAct from '../goods/exchangeAct/index'//活动兑换商品
import ActAddGoods from '../goods/exchangeAct/addGoods'//活动兑换商品新增商品
//电商中心
import ProductInfo from '../online/productInfo/index.js';//商品信息
import EditGoods from '../online/productInfo/AddGoods.js';//修改商品信息
import OnLineGoodsDetail from '../online/productInfo/GoodsDetail.js';//修改商品信息
import OnLineLogList from '../online/productInfo/LogList.js';//修改商品信息
import Ctimer from '../goods/cTimer/index.js';//c端定时
import AddTimer from '../goods/cTimer/AddTimer.js';//c端定时
// 合作中心
import MarketResource from '../cooperate/marketResource/index';
import AddStaff from '../cooperate/marketResource/AddStaff';

//活动中心
import Coupon from '../activity/coupon/index';//优惠券
import Cbanner from '../activity/cBanner/index'//C端banner
import CoperatebannerEdit from '../activity/cBanner/edit';//C端banner修改或新增
import CH5_configure from '../activity/cBanner/editH5';//c端banner配置
import CouponDetail from '../activity/coupon/CouponDetail';//优惠券详情
import AddCoupon from '../activity/coupon/AddCoupon';//新增优惠券
import CouponRecord from '../activity/coupon/CouponRecord/index';
import Bpush from '../activity/bPush/index'; //b端push
import BpushDetail from '../activity/bPush/BpushDetail' //b端详情
import AddbPush from '../activity/bPush/AddPush' //新增push页面
import Cpush from '../activity/cPush/index'; //b端push
import CpushDetail from '../activity/cPush/CpushDetail' //b端详情
import AddcPush from '../activity/cPush/AddPush' //新增push页面

//财务中心
import ShareManage from '../financeCenter/shareManage/index'//分润管理
//客服中心
import UserFeedBack from '../server/userFeedBack/index'; //用户反馈
import HandleBack from '../server/userFeedBack/HandleBack'//反馈处理
import ServerBill from '../server/serverBill/index'; //用户反馈
import HandleBill from '../server/serverBill/HandleBill'; //工单处理
import CserverOrder from '../server/cServerOrder'; //工单处理
import CserverOrderdetail from '../server/cServerOrder/CserverOrderdetail'; //工单处理
//app数据
import AppData from '../dataapp/index'

//运营中心
import Supplyinout from '../operate/supplyinout/index' //供应商收支
import BillDetails from '../operate/supplyinout/BillDetails' //结算单明细
import Withdraw from '../operate/withdraw/index' //提现
import WithdrawDetails from '../operate/withdraw/WithdrawDetails' //提现详情
import Banswer from '../operate/bAnswer/index' //b端问答
import Addanswer from '../operate/bAnswer/addAnswer' //b端问答
import SellManage from '../operate/sellManage' //销售收支管理
//门店数据
import DataDistribute from '../datasp/dataspcun/dataDistribution/index'
//用户中心
import CuserManage from '../userCenter/cUserManage/index'//c端用户管理



class Content extends React.Component {
    render() {
      let formDataCode =(values)=> {
        if(values.indexOf('-') == -1) {
          return SiderDataMap[values]
        } else {
          let paramsArray = values.split('-');
          return `${SiderDataMap[paramsArray[0]]}${paramsArray[1]}`;
        }
      }
        return (
    		<div className='counter'>
                <div className='counter_con'>
                    <Spin tip="加载中..." spinning={this.props.loding}>
                        {
                            (() => {
                                switch (this.props.componkey) {
                                    //财务中心
                                    case "1302000":return  <ShareManage data={this.props.data} componkey={this.props.componkey}/>;
                                    //用户中心
                                    case "1201000":return  <CuserManage data={this.props.data}/>;

                                    case "301700":return  <Stockindex data={this.props.data}/>;
                                    // case "302000":return  <Classificationindex data={this.props.data}/>;
                                    case "303000":return  <Brandindex data={this.props.data}/>;
                                    case "304000":return  <Specsindex data={this.props.data}/>;
                                    case "305000":return  <GoodtimeIndex data={this.props.data}/>;
                                    case "305000edit":return  <GoodEditForm data={this.props.data}/>;
                                    case "314000":return  <CgoodsExplain data={this.props.data}/>;



                                    case "401000":return  <CzIndex data={this.props.data}/>;
                                    case "401000info":return  <OperateczInfo data={this.props.data}/>;

                                    case "402000infoCZ":return  <OperateczInfo data={this.props.data}/>;
                                    case "402000infoOrder":return <OrdermdInfo data={this.props.data}/>;

                                    case "402500edit":return  <ConsumptionInfo data={this.props.data}/>;
                                    case "403000":return  <OperateIndex data={this.props.data}/>;
                                    case "403000edit":return  <SpEditForms data={this.props.data}/>;
                                    case "403000info":return  <SpInfo data={this.props.data}/>;

                                    case "407000":return <Supplyinout data={this.props.data} componkey={this.props.componkey}/>; //供应商收支列表
                                    case "407000edit":return <BillDetails data={this.props.data} componkey={this.props.componkey}/>; //结算单明细

                                    case "408100":return <Withdraw data={this.props.data} componkey={this.props.componkey}/>; //提现管理
                                    case "408100info":return <WithdrawDetails data={this.props.data} componkey={this.props.componkey}/>; //提现详情

                                    case "409000":return <Banswer data={this.props.data} componkey={this.props.componkey}/>; //B端问答
                                    case "409000edit":return <Addanswer data={this.props.data} componkey={this.props.componkey}/>; //B端问答

                                    case "704000":return  <DataorderIndex data={this.props.data}/>;
                                    case "703000edit":return  <DataTable data={this.props.data}/>;
                                    case "702000edit":return  <SpselldataTable data={this.props.data} />;
                                    case "702000distribute":return  <DataDistribute data={this.props.data} componkey={this.props.componkey}/>;


                                    case "000001":return  <DownloadIndex data={this.props.data}/>;

                                    case "705000":return  <DatawsIndex data={this.props.data}/>;
                                    case "701000":return  <DatacgIndex data={this.props.data}/>;
                                    case "702000":return  <DataspIndex data={this.props.data} componkey={this.props.componkey}/>;
                                    case "707000":return  <DataposIndex data={this.props.data} componkey={this.props.componkey}/>;
                                    case "707000infoSh":return <ShListDetail data={this.props.data}/>
                                    case "707000infoTh":return <ThListDetail data={this.props.data}/>
                                    case "706000":return <DataFinanceIndex data={this.props.data}/>

                                    case "703000":return  <DatagoIndex data={this.props.data}/>;

                                    case "201000":return <OrdermdIndex data={this.props.data}/>;
                                    case "201000info":return <OrdermdInfo data={this.props.data}/>;
                                    case "201000edit":return <OrdermdEdit data={this.props.data}/>;

                                    case "202000":return <OrdercgIndex data={this.props.data}/>;
                                    case "202000info":return <OrdercgInfo data={this.props.data}/>;
                                    case "202000edit":return <OrdercgEdit data={this.props.data}/>;

                                    case "203000":return <OrderthIndex data={this.props.data}/>;
                                    case "203000info":return <OrderthInfo data={this.props.data}/>;
                                    case "203000edit":return <OrderthEdit data={this.props.data}/>;

                                    case "204000":return <OrderctIndex data={this.props.data}/>;
                                    case "204000info":return <OrderctInfo data={this.props.data}/>;
                                    case "204000edit":return <OrderctEdit data={this.props.data}/>;

                                    case '205000':return <OrderposIndex data={this.props.data}/>;
                                    case '205000info':return <OrderposInfo data={this.props.data}/>;

                                    case "206000":return <OrderdbIndex data={this.props.data}/>;
                                    case "206000info":return <OrderdbInfo data={this.props.data}/>;
                                    case "206000edit":return <OrderdbEdit data={this.props.data}/>;
                                // --------------------------- 运营管理 -------------------------------
                                    case "402000":return <OperateinoutIndex data={this.props.data}/>;
                                    case "402000info":return <OperateinoutInfo data={this.props.data}/>;
                                    case formDataCode('operate41'):return <SellManage data={this.props.data} componkey={this.props.componkey}/>;
                                    case "402000infoMoney":return <OperateinoutMoneyInfo data={this.props.data}/>;
                                    case "402500":return <OperatememberIndex data={this.props.data}/>;
                                    case "405000":return <OperatesupplierIndex data={this.props.data}/>;
                                    case "405000edit":return <OperatesupplierEdit data={this.props.data}/>;
                                    case "404000":return <OperatebannerIndex data={this.props.data}/>;
                                    case "404000edit":return <OperatebannerEdit data={this.props.data}/>
                                    case "404000editH5":return <H5_configure data={this.props.data}/>

                                    case "601000": return <AccountIndex data={this.props.data}/>;
                                    case "601000edit": return <AddNewAccount data={this.props.data}/>;

                                    case "406000": return <FeedbackIndex data={this.props.data}/>;
                                    case "406000edit": return <Feedbackedit data={this.props.data}/>;
                                    // case "301000editconfig": return <Config data={this.props.data}/>;


                                    case "801000": return <OrderuserIndex data={this.props.data}/>
                                    case "801000info": return <OrderuserInfo data={this.props.data}/>;
                                    case "803000": return <InfouserIndex data={this.props.data}/>


                                    // case "802000": return <OnlineGoodsIndex data={this.props.data}/>
                                    case "802000": return <ProductInfo data={this.props.data} componkey={this.props.componkey}/>
                                    case "802000edit":return  <EditGoods data={this.props.data}/>;
                                    case "802000info":return  <OnLineGoodsDetail data={this.props.data}/>;
                                    case "802000editconfig" : return <OnLineLogList data={this.props.data}/>;

                                    case "804000": return <OnAudit data={this.props.data}/>
                                    case "804000info": return <OrderuserInfo data={this.props.data}/>

                                    case "707000info" : return <AdjustInfo data={this.props.data}/>;
                                    case "707000infoinventory": return <InventoryInfo data={this.props.data}/>
                                    case "707000infodb": return <DbInfo data={this.props.data}/>

                                    case "707000infodb1" : return <QposDbInfo data={this.props.data}/>
                                    case "708000" : return <AppData data={this.props.data}/>


                                    case "402000infoExchange" : return <OperateinoutExchangeInfo data={this.props.data}/>
                                    // ------------------------------ 用户订单 ------------------------------
                                    case formDataCode('order70') : return <UserOrder data={this.props.data} componkey={this.props.componkey}/>
                                    case formDataCode('order70-edit') : return <UserOrderDetail data={this.props.data} componkey={this.props.componkey}/>
                                    case "208000":return <Userth data={this.props.data} componkey={this.props.componkey}/>
                                    case "208000edit":return <AddThOrder data={this.props.data} componkey={this.props.componkey}/>
                                    case "208000info":return <UserthDetail data={this.props.data} componkey={this.props.componkey}/>
                                    // -------------------------------合作中心----------------------------
                                    case formDataCode('cooperate10') : return <MarketResource data={this.props.data} componkey={this.props.componkey}/> //市场资源
                                    case formDataCode('cooperate10-edit') : return <AddStaff data={this.props.data} componkey={this.props.componkey}/> //新增人员

                                    // --------------------------------活动中心----------------------------
                                    case formDataCode('activity02')  : return <Cbanner data={this.props.data} componkey={this.props.componkey}/> //cBanner
                                    case formDataCode('activity02-edit') : return <CoperatebannerEdit data={this.props.data}/>//cBanner新增修改
                                    case formDataCode('activity02-editH5') : return <CH5_configure data={this.props.data}/>//cBanner
                                    case formDataCode('activity03') : return <Coupon data={this.props.data} componkey={this.props.componkey}/> //优惠券
                                    case formDataCode('activity03-edit') : return <AddCoupon data={this.props.data} componkey={this.props.componkey}/> //创建优惠券
                                    case formDataCode('activity03-info') : return <CouponDetail data={this.props.data} componkey={this.props.componkey}/> //优惠券详情
                                    case formDataCode('activity03-editconfig') : return <CouponRecord data={this.props.data} componkey={this.props.componkey}/> //注券记录
                                    case formDataCode('activity04') : return <Bpush data={this.props.data} componkey={this.props.componkey}/>//B端推送
                                    case formDataCode('activity04-edit') : return <AddbPush data={this.props.data} componkey={this.props.componkey}/>//新增推送
                                    case formDataCode('activity04-info') : return <BpushDetail data={this.props.data}/>//b端推送详情
                                    case formDataCode('activity05') : return <Cpush data={this.props.data} componkey={this.props.componkey}/>//c端推送
                                    case formDataCode('activity05-edit') : return <AddcPush data={this.props.data} componkey={this.props.componkey}/>//C新增推送
                                    case formDataCode('activity05-info') : return <CpushDetail data={this.props.data}/>//C端推送详情
                                    // -------------------------------商品中心----基础商品----------------------------
                                    case formDataCode('goods10') : return <BaseGoods data={this.props.data} componkey={this.props.componkey}/>
                                    case formDataCode('goods10-edit') : return <AddGoods data={this.props.data}/>
                                    case formDataCode('goods10-info') : return <GoodsDetail data={this.props.data}/>
                                    case formDataCode('goods10-editconfig') : return <LogList data={this.props.data}/>
                                    case formDataCode('goods70') : return <BtipGoods data={this.props.data} componkey={this.props.componkey}/>
                                    case formDataCode('goods70-edit') : return <BtipAddGoods data={this.props.data} />
                                    case formDataCode('goods70-info') : return <BtipGoodsDetail data={this.props.data} />
                                    case formDataCode('goods70-editconfig') : return <BtipLogList data={this.props.data} />
                                    case formDataCode('goods20') : return <InternalSort data={this.props.data} componkey={this.props.componkey}/>
                                    case formDataCode('goods11') : return <CountryManage data={this.props.data} componkey={this.props.componkey}/>//国家管理
                                    case formDataCode('goods80') : return <CtipGoods data={this.props.data} componkey={this.props.componkey}/>//c端商品
                                    case formDataCode('goods80-edit') : return <CtipAddGoods data={this.props.data} />
                                    case formDataCode('goods80-info') : return <CtipGoodsDetail data={this.props.data} />
                                    case formDataCode('goods80-editconfig') : return <CtipLogList data={this.props.data} />
                                    case formDataCode('goods12') : return <Ctimer data={this.props.data} componkey={this.props.componkey}/>//c端定时
                                    case formDataCode('goods12-edit') : return <AddTimer data={this.props.data} componkey={this.props.componkey}/>
                                    case "313000" : return <BondManage data={this.props.data} componkey={this.props.componkey}/>
                                    case "306000" : return <ExchangeAct data={this.props.data} componkey={this.props.componkey}/>
                                    case "306000edit" : return <ActAddGoods data={this.props.data} componkey={this.props.componkey}/>
                                    //------------------------------客服中心------------------------
                                    case formDataCode('server02') : return <UserFeedBack data={this.props.data} componkey={this.props.componkey}/>//用户反馈
                                    case formDataCode('server02-edit') : return <HandleBack data={this.props.data} componkey={this.props.componkey}/>
                                    case formDataCode('server03') : return <ServerBill data={this.props.data} componkey={this.props.componkey}/>//客服工单
                                    case formDataCode('server03-edit') : return <HandleBill data={this.props.data} componkey={this.props.componkey}/>
                                    case formDataCode('server32'): return <CserverOrder data={this.props.data} componkey={this.props.componkey}/>//c客服工单
                                    case formDataCode('server32-info'): return <CserverOrderdetail data={this.props.data} componkey={this.props.componkey}/>


                                    default:  return "我是404";
                                }
                            })()
                        }
                    </Spin>
                </div>
                <div className='footer'>
                Designed by Qtools Apps
                </div>
  			</div>
        )
    }
}

function mapStateToProps(state) {
    const {loding} = state.tab;
    // const loding = state.loading.global && state.loading.effects['tab/loding'];
    return {loding};
}

export default connect(mapStateToProps)(Content);
