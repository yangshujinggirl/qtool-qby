import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import User from '../frame/userinfo';
import Tab from '../frame/tab';
import Siders from '../frame/sider';
import '../../style/frame.css';

const { Header, Content, Footer, Sider } = Layout;

class Frame extends React.Component {
    render() {
        return (   
    		<Layout>
    			<Siders/>
    			<Layout className='count_r'>
      				<Header className='clearfix headers'>
      					<div className='fr'>
                            <User/>
                        </div>
      				</Header>
			      	<Content className='contents'>
			        		<Tab/>	
			      	</Content>
    			</Layout>
  			</Layout>
        )
    }
}

export default Frame;

