import React from 'react';
import { Tabs, Button } from 'antd';
import { connect } from 'dva';
import Content from '../frame/content0';
import '../../style/tab.css';

const TabPane = Tabs.TabPane;

class Tab extends React.Component {
  	onChange = (activeKey) => {

    	let activeKeys={key:activeKey}
    	this.props.dispatch({
        	type:'tab/firstAddTab',
        	payload:activeKeys
      	});
  	}
  	onEdit = (targetKey) => {
		const pane = eval(sessionStorage.getItem("pane"));
		if(pane.length<=1){
			return
		}
		this.props.dispatch({
            type:'tab/initDeletestate',
            payload:targetKey
		  });
  	}
  	render() {
    	return (
        	<Tabs
    				hideAdd
    				onChange={this.onChange}
    				activeKey={this.props.activeKey}
    				type="editable-card"
    				onEdit={this.onEdit}
    				className='h10 tabs-header'
        	>
				{
					this.props.pane.map(
						pane =>
						<TabPane tab={pane.title} key={pane.key} className='h10'>
							<Content data={pane.data} componkey={pane.componkey} ref='content' author={pane.author}/>
						</TabPane>
					)
				}
        </Tabs>
    );
  }

}
function mapStateToProps(state) {
	const {pane,activeKey} = state.tab;
    return {pane,activeKey};
}
export default connect(mapStateToProps)(Tab);
