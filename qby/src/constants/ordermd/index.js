import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon,Modal } from 'antd';
import { connect } from 'dva';
import '../../style/ordermd.css';
import OrdermdTable from './table';
import OrdermdSearch from './search';
import Appmodelone from './modal';

const confirm = Modal.confirm;
class OrdermdIndex extends React.Component{
	state = {};
	//导出数据
	exportData = (type,data) => {
		const values={
			type:type,
			downloadParam:data,
		}
		const result=GetServerData('qerp.web.sys.doc.task',values);
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				var _dispatch=this.props.dispatch
				confirm({
					title: '数据已经进入导出队列',
					content: '请前往下载中心查看导出进度',
					cancelText:'稍后去',
					okText:'去看看',
					onOk() {
						const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
						_dispatch({
							type:'tab/firstAddTab',
							payload:paneitem
						});
						_dispatch({
							type:'downlaod/fetch',
							payload:{code:'qerp.web.sys.doc.list',values:{limit:15,currentPage:0}}
						});
					},
					onCancel() {
						
					},
	  			});
			}
		})
	
	}


	addNew = () =>{
		const paneitem={title:'新增订单',key:'201000edit',componkey:'201000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
  	}

  	render(){
		const rolelists=this.props.data.rolelists
		//新增订单
		const addorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sp.order.save"
		})
		//导出数据
		const expontdata=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sys.doc.task"
		})
		//取消订单
		const cancelorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sp.order.cancel"
		})
     	return(
        	<div className='content_box'>
                <OrdermdSearch/>
					{
						addorder?
						<Button 
							type="primary" 
							size='large'
							className='mt20'
							onClick={this.addNew.bind(this)}
						>
							新增订单
						</Button>
						:null
					}
					{
						expontdata?
						<Button 
							type="primary" 
							size='large'
							className='mt20 ml10'
							onClick={this.exportData.bind(this,10,this.props.values)}
						>
							导出数据
						</Button>
						:null
					}
             		<div className='mt15'><OrdermdTable cancelorderobj={cancelorder}/></div>
        	</div>
      	)
	}
	  
	
}

function mapStateToProps(state) {
	const {values} = state.ordermd;
    return {values};
}

export default connect(mapStateToProps)(OrdermdIndex);
