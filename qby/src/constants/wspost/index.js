import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button ,Table,message } from 'antd';
import EditableTable from './table';
import WrappedApp from './form';
import {GetServerData} from '../../services/services';

class Shipping_forms extends React.Component{
	Hindsave=()=>{
		const values={
			wsOrderDeliveryInputs:this.props.data
		}
		const result=GetServerData('qerp.web.ws.order.delivery.save',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){	
				message.success('发货成功');
				const data=[]
				this.props.dispatch({
					type:'wspost/tabledata',
					payload:data
				});
			}
		})
	}


	
	render(){
	return(
		<div className='content_box'>
			<div className='white_box'>
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
	const {data,initform} = state.wspost;
	return {data,initform};
}
export default connect(mapStateToProps)(Shipping_forms);