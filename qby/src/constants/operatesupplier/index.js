import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//search
import OperatesupplierSearch from './search';
//table
import OperatesupplierTable from './table';

class OperatesupplierIndex extends React.Component{
    state = {};
    
  	render(){
     	return(
        	<div className='content_box'>
                <OperatesupplierSearch/>
             		<div className='mt15'><OperatesupplierTable/></div>
        	</div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(OperatesupplierIndex);