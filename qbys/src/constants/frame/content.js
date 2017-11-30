import React from 'react';
import { connect } from 'dva';
import '../../style/content.css';
import { Spin } from 'antd';
//引入组件
import AccountIndex from '../accountCenter/account_center.js';
import AddNewAccount from '../accountCenter/add_new_account.js';
import Cgorder from '../cgorder/cgorder';
import Ctorder from '../ctorder/ctorder';
import Sporder from '../sporder/sporder';
import WarehouseIndex from '../warehouseout/warehouse';
import WarehouseInfo from '../warehouseout/warehouse_info';
import HouseAreaIndex from '../warehouseAreaManage/houseAreaIndex';
import HousePositionIndex from '../wsPositionManage/wsPositionIndex';
import StockManageIndex from '../stockManage/stockManageIndex';

import WarehouseinIndex from '../warehousein/warehousein';
import WarehouseinEdit from '../warehousein/warehousein_edit';
import WarehouseinInfo from '../warehousein/warehousein_info';

import Wsshipping from '../wspost/shippingindex';
import Post_ku_check from '../wsoutcheck/wsoutindex';

import WsmoveIndex from '../wsmove/index';
import WsmoveInfo from '../wsmove/info';
import WsmoveUser from '../wsmove/user';
import WsmoveNewuser from '../wsmove/newuser';

import WsIndex from '../wsedit/index';


class Content extends React.Component {
    render() {
        return (   
    		<div className='counter'>
                <div className='counter_con'>
                <Spin tip="Loading..." spinning={this.props.loding}>
                {
                    (() => {
                        switch (this.props.componkey) {
                        case "201000": return <WsIndex data={this.props.data}/>;
                        case "202000": return <Cgorder data={this.props.data}/>;
                        case "204000": return <Ctorder data={this.props.data}/>;
                        case "601000": return <AccountIndex data={this.props.data}/>;
                        case "601000edit": return <AddNewAccount data={this.props.data}/>;

                        case "501000": return <WarehouseinIndex data={this.props.data}/>;
                        case "501000edit": return <WarehouseinEdit data={this.props.data}/>;
                        case "501000info": return  <WarehouseinInfo data={this.props.data}/>;
                        
                        case "502000": return  <WarehouseIndex data={this.props.data}/>;
                        case "502000info": return  <WarehouseInfo data={this.props.data}/>;
                        case "508000":return <HouseAreaIndex data={this.props.data}/>;
                        case "508100":return <HousePositionIndex data={this.props.data}/>;
                        case "503000":return  <StockManageIndex data={this.props.data}/>;
                        case "502900":return  <Wsshipping data={this.props.data}/>;
                        case "502500":return  <Post_ku_check data={this.props.data}/>;
                        case "504100":return  <WsmoveIndex data={this.props.data}/>;

                        case "504100info":return  <WsmoveInfo data={this.props.data}/>;
                        case "504100edit":return  <WsmoveUser data={this.props.data}/>;
                        case "504100edits":return  <WsmoveNewuser data={this.props.data}/>;

                        default:      return "我是404";
                        }
                    })()
                }
                </Spin>
                </div>
                <div className='footer'>
                    Ant Design ©2016 Created by Ant UED
                </div>
  			</div>
        )
    }
}

function mapStateToProps(state) {
    const {activeKey,loding} = state.tab;
    return {activeKey,loding};
}

export default connect(mapStateToProps)(Content);

