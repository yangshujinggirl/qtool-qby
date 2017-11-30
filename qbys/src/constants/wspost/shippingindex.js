import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button ,Table,message } from 'antd';
import EditableTable from './shipping_table';
import WrappedApp from './shipping_form';
import {GetServerData} from '../../services/services';

class Shipping_forms extends React.Component{
	Hindsave=()=>{
		const values={
			wsOrderDeliveryInputs:this.props.data
		}
		this.props.dispatch({
			type:'wspost/save',
			payload:{code:'qerp.web.ws.order.delivery.save',values:values}
		});


	}



	
	
	render(){
	return(
		<div className='content_box'>
			<div className='white_box' style={{padding:'30px 0'}}>
				<WrappedApp/>
				<EditableTable/>
				<div style = {{textAlign:'right'}}>
					<Button type="primary" style={{margin:'15px 15px 0 0'}} onClick={this.Hindsave.bind(this)}>保存</Button>
				</div>
			</div>
		</div>
	)
	}
}

function mapStateToProps(state) {
	console.log(state)
    const {data,initform} = state.wspost;
    return {data,initform};
}
export default connect(mapStateToProps)(Shipping_forms);