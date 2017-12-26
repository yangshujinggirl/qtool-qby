import React from 'react';
import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//table
import GoodtimeTable from './table';
//search
import SearchForms from './search';

class GoodtimeIndex extends React.Component{
	state = {};

	addNew = () =>{
		const paneitem={title:'新建定时',key:'305000edit',componkey:'305000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
		// this.props.dispatch({
        //     type:'orderth/initState',
        //     payload:{}
		// })
  	}

  	render(){
     	return(
        	<div className='content_box'>
                <SearchForms/>
					<Button 
						type="primary" 
						size='large'
						className='mt20'
						onClick={this.addNew}
					>
						新增定时
					</Button>
             		<div className='mt15'><GoodtimeTable/></div>
        	</div>
      	)
	}
	  
	
}



export default connect()(GoodtimeIndex);
