import { connect } from 'dva';
import '../../style/content.css';
import { Spin } from 'antd';

import GoodsIndex from '../goods/goodscenter/index';
import GoodEdit from '../goods/goodscenter/edit';
import Goodinfo from '../goods/goodscenter/info';
import Stockindex from '../goods/stock/index';
import Classificationindex from '../goods/classification/index';
import Brandindex from '../goods/brand/index';
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

import DownloadIndex from '../download/index';


import ConsumptionInfo from '../operatemember/info';

import DatawsIndex from '../dataws/index';
import DatacgIndex from '../datacg/index';
import DataposIndex from '../datapos/index';
import ReceiptDetails from '../datapos/receiptReportDetail';
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

import OnlineGoodsIndex from '../online/infogoods/index';

import OnlineGoodEdit from '../online/infogoods/edit';
import OnlineGoodinfo from '../online/infogoods/info';
import OnlineConfig from '../online/infogoods/config';



import AdjustInfo from '../datapos/adjustinfo'
import InventoryInfo from '../datapos/inventoryinfo'
import DbInfo from '../datapos/dbinfo'

//Q本营-门店pos
import QposDbInfo from '../datapos/dbinfo'

import UserOrder from '../userOrder/index';


class Content extends React.Component {
    render() {
        return (
    		<div className='counter'>
                <div className='counter_con'>
                    <Spin tip="加载中..." spinning={this.props.loding}>
                        {
                            (() => {
                                switch (this.props.componkey) {


                                    case "301000":return  <GoodsIndex data={this.props.data}/>;
                                    case "301000edit":return  <GoodEdit data={this.props.data}/>;
                                    case "301000info":return  <Goodinfo data={this.props.data}/>;

                                    case "301700":return  <Stockindex data={this.props.data}/>;
                                    case "302000":return  <Classificationindex data={this.props.data}/>;
                                    case "303000":return  <Brandindex data={this.props.data}/>;
                                    case "304000":return  <Specsindex data={this.props.data}/>;
                                    case "305000":return  <GoodtimeIndex data={this.props.data}/>;
                                    case "305000edit":return  <GoodEditForm data={this.props.data}/>;

                                    case "401000":return  <CzIndex data={this.props.data}/>;
                                    case "401000info":return  <OperateczInfo data={this.props.data}/>;

                                    case "402000infoCZ":return  <OperateczInfo data={this.props.data}/>;
                                    case "402000infoOrder":return <OrdermdInfo data={this.props.data}/>;

                                    case "402500edit":return  <ConsumptionInfo data={this.props.data}/>;
                                    case "403000":return  <OperateIndex data={this.props.data}/>;
                                    case "403000edit":return  <SpEditForms data={this.props.data}/>;

                                    case "704000":return  <DataorderIndex data={this.props.data}/>;
                                    case "703000edit":return  <DataTable data={this.props.data}/>;
                                    case "702000edit":return  <SpselldataTable data={this.props.data}/>;


                                    case "000001":return  <DownloadIndex data={this.props.data}/>;

                                    case "705000":return  <DatawsIndex data={this.props.data}/>;
                                    case "701000":return  <DatacgIndex data={this.props.data}/>;
                                    case "702000":return  <DataspIndex data={this.props.data}/>;
                                    case "707000":return  <DataposIndex data={this.props.data}/>;
                                    case "703006info":return <ReceiptDetails data={this.props.data}/>
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
                                    //运营管理
                                    case "402000":return <OperateinoutIndex data={this.props.data}/>;
                                    case "402000info":return <OperateinoutInfo data={this.props.data}/>;
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
                                    case "301000editconfig": return <Config data={this.props.data}/>;


                                    case "801000": return <OrderuserIndex data={this.props.data}/>
                                    case "801000info": return <OrderuserInfo data={this.props.data}/>;
                                    case "803000": return <InfouserIndex data={this.props.data}/>

                                    case "802000": return <OnlineGoodsIndex data={this.props.data}/>
                                    case "802000edit":return  <OnlineGoodEdit data={this.props.data}/>;
                                    case "802000info":return  <OnlineGoodinfo data={this.props.data}/>;
                                    case "802000editconfig": return <OnlineConfig data={this.props.data}/>;

                                    case "707000info": return <AdjustInfo data={this.props.data}/>;
                                    case "707000infoinventory": return <InventoryInfo data={this.props.data}/>
                                    case "707000infodb": return <DbInfo data={this.props.data}/>

                                    case "707000infodb1": return <QposDbInfo data={this.props.data}/>

                                    case "402000infoExchange" : return <OperateinoutExchangeInfo data={this.props.data}/>
                                    case "207000" : return <UserOrder data={this.props.data}/>
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
    return {loding};
}

export default connect(mapStateToProps)(Content);
