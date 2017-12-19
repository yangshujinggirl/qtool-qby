import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import User from '../frame/userinfo';
import Tab from '../frame/tab';
import Siders from '../frame/sider';
import '../../style/frame.css';

const { Header, Content, Footer, Sider } = Layout;

class Frame extends React.Component {

	state = {
		isHideSider:false
	}

	addTap=(title,count,key)=>{
		const addTap=this.refs.tab.add
		addTap(title,count,key)
	} 

	//隐藏显示侧边栏
	hideSider = () =>{
		if(this.state.isHideSider){
			this.setState({
				isHideSider:false
			 })
		}else{
			this.setState({
				isHideSider:true
			 })
		}
         
	}
	
    render() {
        return (   
    		<Layout>
				{/* 侧边栏部分 */}
    			<Siders isHideSider={this.state.isHideSider}/>
    			<Layout className={this.state.isHideSider?'count_r':'count_r ml-220'}>
					{/*右侧头部信息部分  */}
      				<Header className='clearfix headers'>
      					<div className='users'>
                            <User/>
                        </div>
      				</Header>
					{/* 内容区部分 */}
			      	<Content className='contents'>
			        		<Tab ref='tab'/>	
			      	</Content>
    			</Layout>
				<div className={this.state.isHideSider?'closepop':'openpop'} onClick={this.hideSider}></div>
  			</Layout>
        )
    }
}



export default Frame;

