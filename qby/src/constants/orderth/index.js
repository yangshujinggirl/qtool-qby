import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//table
import OrderthTable from './table';
//search
import OrderthSearch from './search';

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
						className='mt20'
						onClick={this.addNew}
					>
						新建退货单
					</Button>
					<Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
					>
						导出数据
					</Button>
             		<div className='mt15'><OrderthTable/></div>
        	</div>
      	)
	}
	  
	componentDidMount(){
		
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(OrderthIndex);
