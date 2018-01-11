import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//table
import OrderdbTable from './table';
//search
import OrderdbSearch from './search';
import Appmodelone from '../ordermd/modal';
class OrderdbIndex extends React.Component{
	state = {};

	addNew = () =>{
		const paneitem={title:'新建调拨单',key:'206000edit',componkey:'206000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
		// this.props.dispatch({
        //     type:'orderct/initState',
        //     payload:{}
		// })
  	}

  	render(){
     	return(
        	<div className='content_box'>
                <OrderdbSearch/>
					<Button
						type="primary" 
						size='large'
						className='mt20 mr10'
						onClick={this.addNew}
					>
						新建调拨单
					</Button>
					{/* <Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
					>
						导出数据
					</Button> */}
					<Appmodelone 
						text="导出数据" 
						title="导出数据" 
						count="数据已经进入导出队列，请前往下载中心查看导出进度"
						okText="去看看"
						cancelText="稍后去"
						dataValue={this.props.values}
						type="17"
						/>
             		<div className='mt15'><OrderdbTable/></div>
        	</div>
      	)
    }
    
	componentDidMount(){
		
	}
}

function mapStateToProps(state) {
	const {values} = state.orderdb;
	return {values};
}

export default connect(mapStateToProps)(OrderdbIndex);
