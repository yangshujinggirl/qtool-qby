import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//search
import OperateinoutSearch from './search';
//table
import OperateinoutTable from './table';
//导出的弹框
import Appmodelone from '../ordermd/modal';

class OperateinoutIndex extends React.Component{
    state = {};
    
  	render(){
     	return(
        	<div className='content_box'>
                <OperateinoutSearch/>
				<Appmodelone 
					text="导出数据" 
					title="导出数据" 
					count="数据已经进入导出队列，请前往下载中心查看导出进度"
					okText="去看看"
					cancelText="稍后去"
					dataValue={this.props.values}
					type="20"
					/>
				<div className='mt15'><OperateinoutTable/></div>
        	</div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
	const {values} = state.operateinout
	return {values};
}

export default connect(mapStateToProps)(OperateinoutIndex);
