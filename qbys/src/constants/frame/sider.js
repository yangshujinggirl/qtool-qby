import React from 'react';
import { Link } from 'dva/router'
import { connect } from 'dva';
import '../../style/sider.css';
import { Layout, Menu, Icon } from 'antd';
import IconLogo from '../frame/iconlogo';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class Siders extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tabArr:[]
      };
    }
    
    //设置标签
    setTab =  (item) =>{
        const key =String(item.key);
        const paneitem={title:item.item.props.children.props.children,key:item.key}
        this.props.dispatch({
            type:'tab/tablist',
            payload:paneitem
          })
    }

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
                        defaultOpenKeys={this.props.menus.length>0?[String(this.props.menus[0].urResourceId)]:null}
				        defaultSelectedKeys={['4']}
                        onSelect={this.setTab}>
							{
									this.props.menus.map((item,index)=>{
										return (
											<SubMenu title={<div className='itembox'><IconLogo type={item.type}/><span>{item.name}</span></div>} key={item.urResourceId}>
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
    const {menus} = state.sider;
    return {menus};
}

export default connect(mapStateToProps)(Siders);

