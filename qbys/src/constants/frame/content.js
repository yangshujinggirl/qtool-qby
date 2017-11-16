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
// const commnect=[
// 	{key:'201000',title:'门店订单',content:{com:<Sporder/>}},
// 	{key:'202000',title:'采购订单',content:{com:<Cgorder/>}},
// 	{key:'203000',title:'退货订单',content:'退货订单'},
// 	{key:'204000',title:'采退订单',content:<Ctorder/>},
// 	{key:'205000',title:'pos订单',content:'a'},

// 	{key:'301000',title:'商品管理',content:'a'},
// 	{key:'301700',title:'商品库存',content:'a'},
// 	{key:'302000',title:'分类管理',content:'a'},
// 	{key:'303000',title:'品牌管理',content:'a'},
// 	{key:'304000',title:'规格管理',content:'a'},
// 	{key:'305000',title:'商品定时',content:'a'},

// 	{key:'402500',title:'会员管理',content:'a'},
// 	{key:'401000',title:'充值管理',content:'a'},
// 	{key:'402000',title:'收支管理',content:'a'},
// 	{key:'403000',title:'门店管理',content:'a'},
// 	{key:'405000',title:'供应商管理',content:'a'},
// 	{key:'404000',title:'Banner管理',content:'a'},

// 	{key:'701000',title:'销售管理',content:'a'},
// 	{key:'701200',title:'门店销售',content:'a'},
// 	{key:'701500',title:'库存数据',content:'a'},
// 	{key:'701700',title:'门店库存',content:'a'},
// 	{key:'702000',title:'成本管理',content:'a'},
// 	{key:'702500',title:'采购数据',content:'a'},
// 	{key:'703000',title:'门店数据',content:'a'},

// 	{key:'601000',title:'Q本营账号',content:'a'}
	
// ]




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

