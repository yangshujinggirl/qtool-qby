import { connect } from 'dva';
import '../../style/sider.css';
import IconLogo from '../frame/iconlogo';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import SiderBarData from '../../components/SiderBarData.js';
const SubMenu = Menu.SubMenu;

class Siders extends React.Component {
    setTab =  (item) =>{
    		const key =String(item.key);
    		const paneitem={
    			title:item.item.props.children.props.children,
    			key:String(item.key),
    			data:{rolelists:item.item.props.rolelist},
    			componkey:String(item.key)
    		};
        this.props.dispatch({
            type:'tab/firstAddTab',
            payload:paneitem
        })
     }

    onOpenChange=(key)=>{
    	this.props.dispatch({
          type:'tab/openkey',
          payload:key
      })
    }
    render() {
      	// const menus = SiderBarData;
        const menus = this.props.menus;
        return (
    		<div className='sidebox'>
    			<Sider className={this.props.isHideSider?'slidebox hide':'slidebox'} width='220'>
      				<div className="slider_logo">
      					<img src={require('../../assets/menu_logo.png')}/>
      				</div>
       				<Menu
    						className='menus'
    						theme="dark"
    						mode="inline"
    						openKeys={this.props.openKey}
    						selectedKeys={[this.props.activeKey]}
    						onOpenChange={this.onOpenChange}
    						onClick={this.setTab}>
							{
								menus.map((item,index)=>{
									return (
										<SubMenu title={
													<div className='itembox'>
														<IconLogo type={item.type}/>
														<span>{item.name}</span>
													</div>
						             }
												 key={item.urResourceId}>
											{
												item.children.map((subitem,subindex)=>{
													return(
														<Menu.Item
															index={subitem.urResourceId}
															key={subitem.urResourceId}
															rolelist={subitem.children}
														>
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
	const {menus,activeKey,openKey} = state.tab;
    return {menus,activeKey,openKey};
}
export default connect(mapStateToProps)(Siders);
