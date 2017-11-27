import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button ,Table,message } from 'antd';
import EditableTable from './shipping_table';
import WrappedApp from './shipping_form';


class Shipping_forms extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
		value:''
	  }
	}
	Hinddataback=(value)=>{
	  this.setState({
		value:value
	  })
	}
	Hindsave=()=>{
	  let valueInputs = {
		wsOrderDeliveryInputs:this.state.value
	  }
	  let Strdatanume=JSON.stringify(valueInputs)
	  const result=GetServerData('qerp.web.ws.order.delivery.save',Strdatanume)
	  result.then((res) => {
		return res;
	  }).then((json) => {
		if(json.code=='0'){
		  message.success('保存成功')
		  this.refs.EditableTable.clearDataSource();
		}else{
		  message.error(json.message)
		}
	  })
	}
	callFn=(message)=>{
	  const setmessage=this.refs.EditableTable.setmessage
	  setmessage(message)
	}
	render(){
	 return(
	   <div className='content_box'>
		<div className='white_box' style={{padding:'30px 0'}}>
		 <WrappedApp callFn={this.callFn.bind(this)}/>
		 <EditableTable ref='EditableTable' Hinddataback={this.Hinddataback.bind(this)}/>
		 <div style = {{textAlign:'right'}}>
		  <Button type="primary" style={{margin:'15px 15px 0 0'}} onClick={this.Hindsave.bind(this)}>保存</Button>
		</div>
		</div>
	   </div>
	  )
	}
  }
  
  export default connect()(Shipping_forms);