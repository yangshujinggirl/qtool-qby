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
	
	addNew = () =>{
		const paneitem={title:'新建供应商',key:'405000edit',componkey:'405000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
		this.props.dispatch({
            type:'operatesupplier/initState',
            payload:{}
		})
  	}
    
  	render(){
		const rolelists=this.props.data.rolelists
		// //新增
		const addorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.supplier.save"
		})  
     	return(
        	<div className='content_box'>
                <OperatesupplierSearch/>
				{
					addorder?
					<Button 
					type="primary" 
					size='large'
					className='mt20'
					onClick={this.addNew}
				>
					新建供应商
				</Button>
				:null

				}
				
				<div className='mt15'><OperatesupplierTable addorderobj={addorder}/></div>
        	</div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(OperatesupplierIndex);