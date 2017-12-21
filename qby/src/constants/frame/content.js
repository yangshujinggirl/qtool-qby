import { connect } from 'dva';
import '../../style/content.css';
import { Spin } from 'antd';

import GoodsIndex from '../goods/index';
// import WarehouseinEdit from '../wsin/edit';
// import WarehouseinInfo from '../wsin/info';

import WarehouseIndex from '../wsout/index';
import WarehouseInfo from '../wsout/info';
import Post_ku_check from '../wsoutcheck/index';
import Wsshipping from '../wspost/index';
import WsmoveIndex from '../wsmove/index';
import WsmoveInfo from '../wsmove/info';
import WsmoveUser from '../wsmove/edit';
import WsmoveNewuser from '../wsmove/newedit';
import WsIndex from '../wsedit/index';
import Addws from '../wsedit/edit';
import WsadjustIndex from '../wsadjust/index';
import Wsadjustnewedit from '../wsadjust/newedit';
import WsjustEdit from '../wsadjust/edit';
import WsadjustInfo from '../wsadjust/info';
import WscheckIndex from '../wscheck/index';
import Wschecknewedit from '../wscheck/newedit';
import WscheckEdit from '../wscheck/edit';
import WscheckInfo from '../wscheck/info';
import WscheckEditdiff from '../wscheck/editcheckdiff';


import AccountIndex from '../account/index';
import AddNewAccount from '../account/info';
//门店订单
import OrdermdIndex from '../ordermd/index';
import OrdermdInfo from '../ordermd/info';
//采购订单
import OrdercgIndex from '../ordercg/index';
import OrdercgInfo from '../ordercg/info';
//退货订单
import OrderthIndex from '../orderth/index';
import OrderthInfo from '../orderth/info';
//采退订单
import OrderctIndex from '../orderct/index';
import OrderctInfo from '../orderct/info';
//调拨订单
import OrderdbIndex from '../orderdb/index';

import BasicSetting from '../basicSetting/basicSetting';


class Content extends React.Component {
    render() {
        return (   
    		<div className='counter'>
                <div className='counter_con'>
                    <Spin tip="加载中..." spinning={this.props.loding}>
                        {
                            (() => {
                                switch (this.props.componkey) {
                                    case "10000": return <WarehouseinIndex data={this.props.data}/>;
                                    case "10000edit": return <WarehouseinEdit data={this.props.data}/>;
                                    case "10000info": return  <WarehouseinInfo data={this.props.data}/>;
                                    case "20000": return  <WarehouseIndex data={this.props.data}/>;
                                    case "20000info": return  <WarehouseInfo data={this.props.data}/>;
                                    case "301000":return  <GoodsIndex data={this.props.data}/>;
                                    case "40000":return  <Wsshipping data={this.props.data}/>;
                                    case "50000":return  <StockManageIndex data={this.props.data}/>;
                                    case "60000":return  <WsmoveIndex data={this.props.data}/>;
                                    case "60000info":return  <WsmoveInfo data={this.props.data}/>;
                                    case "60000edit":return  <WsmoveUser data={this.props.data}/>;
                                    case "60000edits":return  <WsmoveNewuser data={this.props.data}/>;
                                    case "70000":return  <WscheckIndex data={this.props.data}/>;
                                    case "70000edit":return  <Wschecknewedit data={this.props.data}/>;
                                    case "70000editing":return  <WscheckEdit data={this.props.data}/>;
                                    case "70000info":return  <WscheckInfo data={this.props.data}/>;
                                    case "70000editfiff":return  <WscheckEditdiff data={this.props.data}/>;
                                    case "80000":return  <WsadjustIndex data={this.props.data}/>;
                                    case "80000edit":return  <Wsadjustnewedit data={this.props.data}/>;
                                    case "80000editing":return  <WsjustEdit data={this.props.data}/>;
                                    case "80000info":return  <WsadjustInfo data={this.props.data}/>;


                                    case "90000": return <WsIndex data={this.props.data}/>;
                                    case "90000edit": return <Addws data={this.props.data}/>;
                                    // 
                                    case "201000":return <OrdermdIndex data={this.props.data}/>;
                                    case "201000info":return <OrdermdInfo data={this.props.data}/>;
                                    case "202000":return <OrdercgIndex data={this.props.data}/>;
                                    case "202000info":return <OrdercgInfo data={this.props.data}/>;
                                    case "203000":return <OrderthIndex data={this.props.data}/>;
                                    case "203000info":return <OrderthInfo data={this.props.data}/>;
                                    case "204000":return <OrderctIndex data={this.props.data}/>;
                                    case "204000info":return <OrderctInfo data={this.props.data}/>;
                                    case "206000":return <OrderdbIndex data={this.props.data}/>;
                            
                                    case "120000": return <BasicSetting data={this.props.data}/>;
                                    case "601000": return <AccountIndex data={this.props.data}/>;
                                    case "601000edit": return <AddNewAccount data={this.props.data}/>;
                                    default:  return "我是404";
                                }
                            })()
                        }
                    </Spin>
                </div>
                <div className='footer'>
                    Designed by Qtools Online
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

