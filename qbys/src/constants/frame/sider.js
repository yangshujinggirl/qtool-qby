import React from 'react';
import { Link } from 'dva/router'
import { connect } from 'dva';
import '../../style/sider.css';
import { Layout, Menu, Icon } from 'antd';
import IconLogo from '../frame/iconlogo';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class Siders extends React.Component {
    //设置标签
    setTab =  (item) =>{
		console.log(item)
        const key =String(item.key);
        const paneitem={title:item.item.props.children.props.children,key:String(item.key),data:null,componkey:String(item.key)}
        this.props.dispatch({
            type:'tab/addNewTab',
            payload:paneitem
          })
	}
	onOpenChange=(key)=>{
		console.log(key)
		this.props.dispatch({
            type:'tab/openkeys',
            payload:key
          })
	}
    render() {
		const deselect=this.props.menus.length>0?String(this.props.menus[0].children[0].urResourceId):''
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
						openKeys={this.props.openkeys}
						selectedKeys={[this.props.activeKey]}
						onOpenChange={this.onOpenChange}
                		onClick={this.setTab}>
							{
								this.props.menus.map((item,index)=>{
									return (
										<SubMenu title={<div className='itembox'>
                                    <IconLogo type={item.type}/>
                                    <span>{item.name}</span></div>} 
                              key={index}>
			              	{
			              		item.children.map((subitem,subindex)=>{
									      return(
    												<Menu.Item key="1" index={subindex} key={subitem.urResourceId}>
                              <div className='itemmain'>{subitem.name}</div>
                            </Menu.Item>
											    )
			              		})
			              	}
						        </SubMenu>
									)
								})	
							}
      					</Menu>
    			</Sider>
  			</div>
        )
    }
}
function mapStateToProps(state) {
	console.log(state)
	const {menus,activeKey,openkeys} = state.tab;
    return {menus,activeKey,openkeys};
}
export default connect(mapStateToProps)(Siders);