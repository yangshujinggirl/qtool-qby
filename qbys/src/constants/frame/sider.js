import React from 'react';
import { Link } from 'dva/router'
import { connect } from 'dva';
import '../../style/sider.css';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Siders extends React.Component {
    render() {
        return (   
    		<div>
    			<Sider className='slidebox' width='220'>
      				<div className="slider_logo">
      					<img src={require('../../assets/menu_logo.png')}/>
      				</div>
       				<Menu
       					className='menus' 
      					theme="dark" 
      					mode="inline" 
      					defaultSelectedKeys={['4']}>
        					<SubMenu title="订单中心">
            					<Menu.Item key="1">门店订单</Menu.Item>
				              	<Menu.Item key="2">采购订单</Menu.Item>
				              	<Menu.Item key="3">退货订单</Menu.Item>
				              	<Menu.Item key="4">采退订单</Menu.Item>
				              	<Menu.Item key="5">pos订单</Menu.Item>
        					</SubMenu>
					        <SubMenu title="商品中心">
					            <Menu.Item key="6">商品管理</Menu.Item>
					              <Menu.Item key="7">商品库存</Menu.Item>
					              <Menu.Item key="8">分类管理</Menu.Item>
					              <Menu.Item key="9">品牌管理</Menu.Item>
					              <Menu.Item key="10">规格管理</Menu.Item>
					        </SubMenu>
					        <SubMenu title="运营中心">
					            <Menu.Item key="11">会员管理</Menu.Item>
					              <Menu.Item key="12">充值管理</Menu.Item>
					              <Menu.Item key="13">收支管理</Menu.Item>
					              <Menu.Item key="14">门店管理</Menu.Item>
					              <Menu.Item key="15">供应商管理</Menu.Item>
					              <Menu.Item key="16">Banner管理</Menu.Item>
					        </SubMenu>
					        <SubMenu title="数据中心">
					            <Menu.Item key="17">销售数据</Menu.Item>
					              <Menu.Item key="18">门店销售</Menu.Item>
					              <Menu.Item key="19">库存数据</Menu.Item>
					              <Menu.Item key="20">门店库存</Menu.Item>
					              <Menu.Item key="21">成本管理</Menu.Item>
					              <Menu.Item key="22">采购数据</Menu.Item>
					              <Menu.Item key="23">门店数据</Menu.Item>
					        </SubMenu>
					        <SubMenu title="仓库中心">
					            <Menu.Item key="24">入库管理</Menu.Item>
					              <Menu.Item key="25">出库管理</Menu.Item>
					              <Menu.Item key="26">出库复核</Menu.Item>
					              <Menu.Item key="27">出库发货</Menu.Item>
					              <Menu.Item key="28">库存管理</Menu.Item>
					              <Menu.Item key="29">库存移库</Menu.Item>
					              <Menu.Item key="30">库存盘点</Menu.Item>
					              <Menu.Item key="31">库存损益</Menu.Item>
					              <Menu.Item key="32">基础库区</Menu.Item>
					              <Menu.Item key="33">基础库位</Menu.Item>
					        </SubMenu>
					        <SubMenu title="账号中心">
					            <Menu.Item key="34">Q本营账号</Menu.Item>  
					        </SubMenu>
      					</Menu>
    			</Sider>
  			</div>
    			
  			
        )
    }

}




 



export default Siders;

