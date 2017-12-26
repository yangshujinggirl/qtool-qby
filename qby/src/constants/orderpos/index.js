import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import '../../style/ordermd.css';
//table
import OrderposTable from './table';
//search
import OrderposSearch from './search';
import Appmodelone from '../ordermd/modal';
class OrderposIndex extends React.Component{
	state = {};

	//导出数据
	exportData = () => {
		const values=this.props.values;
		const result=GetServerData('qerp.web.sp.order.export',values);
	  }

	addNew = () =>{
		const paneitem={title:'新增订单',key:'201000edit',componkey:'201000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
  	}

  	render(){
     	return(
        	<div className='content_box'>
                <OrderposSearch/>
					<Appmodelone 
						text="导出数据" 
						title="导出数据" 
						count="数据已经进入导出队列，请前往下载中心查看导出进度"
						okText="去看看"
						cancelText="稍后去"
						/>
					{/* <Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
						onClick={this.exportData}
					>
						导出数据
					</Button> */}
             		<div className='mt15'><OrderposTable/></div>
        	</div>
      	)
	}
	  
	componentDidMount(){
		
	}
}

function mapStateToProps(state) {
	const {values} = state.ordermd;
    return {values};
}

export default connect(mapStateToProps)(OrderposIndex);
