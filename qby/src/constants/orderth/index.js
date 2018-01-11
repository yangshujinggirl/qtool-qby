import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//table
import OrderthTable from './table';
//search
import OrderthSearch from './search';
import Appmodelone from '../ordermd/modal';

class OrderthIndex extends React.Component{
	state = {};

	addNew = () =>{
		const paneitem={title:'新建退货单',key:'203000edit',componkey:'203000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
		this.props.dispatch({
            type:'orderth/initState',
            payload:{}
		})
  	}

  	render(){
     	return(
        	<div className='content_box'>
                <OrderthSearch/>
					<Button 
						type="primary" 
						size='large'
						className='mt20 mr10'
						onClick={this.addNew}
					>
						新建退货单
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
						type="11"
						/>
             		<div className='mt15'><OrderthTable/></div>
        	</div>
      	)
	}
	  
	componentDidMount(){
		
	}
}

function mapStateToProps(state) {
	const {values} = state.orderth;
	return {values};
}

export default connect(mapStateToProps)(OrderthIndex);
