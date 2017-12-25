import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//table
import OrderctTable from './table';
//search
import OrderctSearch from './search';

class OrderctIndex extends React.Component{
	state = {};

	addNew = () =>{
		const paneitem={title:'新建采退单',key:'204000edit',componkey:'204000edit',data:null}
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
                <OrderctSearch/>
					<Button
						type="primary" 
						size='large'
						className='mt20'
						onClick={this.addNew.bind(this)}
					>
						新建采退单
					</Button>
					<Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
					>
						导出数据
					</Button>
             		<div className='mt15'><OrderctTable/></div>
        	</div>
      	)
    }
    
	componentDidMount(){
		
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(OrderctIndex);
