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
import PutInManageComponent from '../putInStorageManage/putInManageComponent';
import GetIntoStorageComponent from '../getIntoStorage/getIntoStorageIndex';
import WarehouseIndex from '../warehouseout/warehouse';
import WarehouseInfo from '../warehouseout/warehouse_info';
import HouseAreaIndex from '../warehouseAreaManage/houseAreaIndex';

class Content extends React.Component {
    render() {
        return (   
    		<div className='counter'>
                <div className='counter_con'>
                <Spin tip="Loading..." spinning={this.props.loding}>
                {
                    (() => {
                        switch (this.props.componkey) {
                        case "201000": return <Sporder data={this.props.data}/>;
                        case "202000": return <Cgorder data={this.props.data}/>;
                        case "204000": return <Ctorder data={this.props.data}/>;
                        case "601000": return <AccountIndex data={this.props.data}/>;
                        case "601000edit": return <AddNewAccount data={this.props.data}/>;
                        case "501000": return <PutInManageComponent data={this.props.data}/>;
                        case "501000info": return  <GetIntoStorageComponent data={this.props.data}/>
                        case "502000": return  <WarehouseIndex data={this.props.data}/>
                        case "502000info": return  <WarehouseInfo data={this.props.data}/>
                        case "508000":return <HouseAreaIndex data={this.props.data}/>;
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

