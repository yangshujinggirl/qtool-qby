import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//search
import OperateinoutSearch from './search';
//table
import OperateinoutTable from './table';

class OperateinoutIndex extends React.Component{
    state = {};
    
  	render(){
     	return(
        	<div className='content_box'>
                <OperateinoutSearch/>
             		<div className='mt15'><OperateinoutTable/></div>
        	</div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(OperateinoutIndex);
