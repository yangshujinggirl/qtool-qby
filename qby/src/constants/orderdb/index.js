import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon,Modal } from 'antd';
import { connect } from 'dva';
//table
import OrderdbTable from './table';
//search
import OrderdbSearch from './search';
import Appmodelone from '../ordermd/modal';
const confirm = Modal.confirm;

class OrderdbIndex extends React.Component{
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
		const goodsInfo=[{
            key: 0,
            code:'',
            qty: '',
            codeline:true,
            qtyline:true,
        }]
		const paneitem={title:'新建调拨单',key:'206000edit',componkey:'206000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});

		this.props.dispatch({
            type:'orderdb/syncGoodsInfo',
            payload:goodsInfo
		})
	  }

	//清除选中
	clearChooseInfo=()=>{
		const selectedRows=[];
		const selectedRowKeys = [];
		this.props.dispatch({
			type:'orderdb/select',
			payload:{selectedRowKeys,selectedRows}
		})
  	}
	  
	  	//列表数据请求   
	 	initList=(values,limit,currentPage)=>{
        	values.limit=limit;
        	values.currentPage=currentPage;
			this.props.dispatch({
				type:'orderdb/fetch',
				payload:{code:'qerp.web.sp.exchange.query',values:values}
			});
        	this.props.dispatch({ type: 'tab/loding', payload:true});
    	}
	//强制完成
	mandatoryOrder=()=>{
		if (this.props.selectedRows.length < 1) {
			message.error('请选择调拨单',.8)
			return;
		}
		const values={wsAsnId:this.props.selectedRows[0].wsAsnId}
		const result=GetServerData('qerp.web.ws.asn.finish',values);
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				this.initList(this.props.values,this.props.limit,this.props.currentPage)
				this.clearChooseInfo()
			}
		})
	}
  	render(){
		const rolelists=this.props.data.rolelists
		// //新增采购单
		const addorder=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.sp.exchange.save"
		})
		//导出数据
		const expontdata=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.sys.doc.task"
		})
		//强制完成
		const overorder=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.ws.asn.finish"
		})



     	return(
        	<div className='content_box'>
                <OrderdbSearch/>
					{
						overorder?
						<Button 
						type="primary" 
						size='large'
						className='mt20 mr10'
						onClick={this.mandatoryOrder.bind(this)}
					>
						强制完成
					</Button>
					:null

					}
					{
						addorder?
						<Button
						type="primary" 
						size='large'
						className='mt20 mr10'
						onClick={this.addNew}
					>
						新建调拨单
					</Button>
					:null


					}
					{
						expontdata?
						<Button 
						type="primary" 
						size='large'
						className='mt20 mr10'
						onClick={this.exportData.bind(this,17,this.props.values)}
					>
						导出数据
					</Button>
					:null
					}

					
	
             		<div className='mt15'><OrderdbTable overorderobj={overorder}/></div>
        	</div>
      	)
    }
    
}

function mapStateToProps(state) {
	const {values,limit,currentPage,selectedRows} = state.orderdb;
	return {values,limit,currentPage,selectedRows};
}

export default connect(mapStateToProps)(OrderdbIndex);
