import React from 'react';
import { Link } from 'dva/router'
import { connect } from 'dva';
import '../../style/sider.css';
import { Layout, Menu, Icon } from 'antd';
import IconLogo from '../frame/iconlogo';
import { isClickcom } from '../../utils/matching';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Siders extends React.Component {
    //设置标签
    setTab =  (item) =>{
        console.log(item)
        const key =String(item.key);
        const result=isClickcom(key)
        console.log(result)

        // const paneitem={title:item.item.props.children.props.children,key:item.key}
        this.props.dispatch({
            type:'tab/addNewTab',
<<<<<<< HEAD
            payload:paneitem
=======
            payload:result
>>>>>>> 400d8993385541ac4875aa430581240539c49b45
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
<<<<<<< HEAD
                        defaultOpenKeys={['0']}
=======
                defaultOpenKeys={['0']}
>>>>>>> 400d8993385541ac4875aa430581240539c49b45
				        defaultSelectedKeys={['4']}
                onSelect={this.setTab}>
							{
								this.props.menus.map((item,index)=>{
									return (
										<SubMenu title={<div className='itembox'>
<<<<<<< HEAD
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
=======
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
>>>>>>> 400d8993385541ac4875aa430581240539c49b45
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
    const {menus} = state.tab;
    return {menus};
}

export default connect(mapStateToProps)(Siders);

