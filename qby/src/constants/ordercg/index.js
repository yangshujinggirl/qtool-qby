import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon,message,Modal  } from 'antd';
import { connect } from 'dva';
import {deepcCloneObj} from '../../utils/commonFc';
import OrdercgSearch from './search';
import OrdercgTable from './table';
import Appmodelone from '../ordermd/modal';
import {GetLodop} from './print';

const confirm = Modal.confirm;
class OrdercgIndex extends React.Component{
	state = {};
	//table搜索
	initList=(values,limit,currentPage)=>{
		values.type = "10";
		 values.limit=limit;
		 values.currentPage=currentPage;
		 this.props.dispatch({
			 type:'ordercg/fetch',
			 payload:{code:'qerp.web.ws.asn.query',values:values}
		 });
		 this.props.dispatch({ type: 'tab/loding', payload:true});
	}
	//新建采购单
	addNew = () =>{
		const paneitem={title:'新建采购单',key:'202000edit',componkey:'202000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
		this.props.dispatch({
            type:'ordercg/initState',
            payload:{}
		});
		this.props.dispatch({
			type:'ordercg/syncTaxRateDisabled',
			payload:true
		})
		this.props.dispatch({
			type:'ordercg/syncNothasFacepay',
			payload:true
		})
	}
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
	//清除选中
	clearChooseInfo=()=>{
		const selectedRows=[];
		const selectedRowKeys = [];
		this.props.dispatch({
			type:'ordercg/select',
			payload:{selectedRowKeys,selectedRows}
		})
  	}

	  //打印采购单
	printCgorder = () => {
		if (this.props.selectedRows.length < 1) {
		  message.error('请选择采购单',.8)
		  return;
		}
		for (var i = 0; i < this.props.selectedRows.length; i++) {
		  GetLodop(this.props.selectedRows[i].wsAsnId,'wsAsnOrder', this.props.selectedRows[i].asnNo)
		}
		 this.clearChooseInfo()
	}

	//强制完成
	mandatoryOrder=()=>{
		if (this.props.selectedRows.length < 1) {
			message.error('请选择采购单',.8)
			return;
		}
		if ((this.props.selectedRows[0].status!= 10) && (this.props.selectedRows[0].status!=20)) {
			message.error('此状态下的订单不能强制完成',.8)
			return;
		}
		const values={wsAsnId:this.props.selectedRows[0].wsAsnId}
		const result=GetServerData('qerp.web.sp.ws.asn.finish',values);
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				message.success('强制完成成功',.8)
				this.initList(this.props.values,this.props.limit,this.props.currentPage)
				this.clearChooseInfo()
			}
		})
	}
	//已付款
	alpayamount=()=>{
		if (this.props.selectedRows.length < 1) {
			message.error('请选择采购单',.8)
			return;
		}
		if(this.props.selectedRows[0].payStatus == "20"){
			message.error('此订单付款状态已经为已付款',.8)
			return;
		}
		let values = {};
		values.wsAsnId = this.props.selectedRows[0].wsAsnId;
		values.payStatus = "20";
		this.payAmount(values)
	}
	//待付款
	wlpayamount=()=>{
		if (this.props.selectedRows.length < 1) {
			message.error('请选择采购单',.8)
			return;
		}
		if(this.props.selectedRows[0].payStatus == "10"){
			message.error('此订单付款状态已经为待付款',.8)
			return;
		}
		let values = {};
		values.wsAsnId = this.props.selectedRows[0].wsAsnId;
		values.payStatus = "10";
		this.payAmount(values)
	}

	//付款操作
	payAmount=(values)=>{
		const result=GetServerData('qerp.web.ws.asn.payStatus',values);
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
			return currentValue.url=="qerp.web.ws.asn.save"
		})
		//导出数据
		const expontdata=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sys.doc.task"
		})
		//打印订单
		const printorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sp.order.print"
		})
		//付款操作
		const payorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.ws.asn.payStatus"
		})
		//强制完成
		const overorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.ws.asn.finish"
		})
     	return(
        	<div className='content_box'>
                <OrdercgSearch/>
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
						payorder?
						<Button
						type="primary"
						size='large'
						className='mt20 mr10'
						onClick={this.alpayamount.bind(this)}
					>
						已付款
					</Button>
					:null
					}

					{
						payorder?
						<Button
						type="primary"
						size='large'
						className='mt20 mr10'
						onClick={this.wlpayamount.bind(this)}
					>
						待付款
					</Button>
					:null
					}

					{
						addorder?
						<Button
						type="primary"
						size='large'
						className='mt20 mr10'
						onClick={this.addNew.bind(this)}
					>
						新建采购单
					</Button>
					:null
					}
					{
						printorder?
						<Button
						type="primary"
						size='large'
						className='mt20 mr10'
						onClick={this.printCgorder}
					>
						打印采购单
					</Button>
					:null
					}
					{
						expontdata?
						<Button
						type="primary"
						size='large'
						className='mt20 mr10'
						onClick={this.exportData.bind(this,15,this.props.values)}
					>
						导出数据
					</Button>
					:null
					}
             		<div className='mt15'><OrdercgTable addorderobj={addorder}/></div>
        	</div>
      	)
	}


}

function mapStateToProps(state) {
	const {tableList,total,limit,currentPage,values,selectedRowKeys,selectedRows} = state.ordercg;
    return {tableList,total,limit,currentPage,values,selectedRowKeys,selectedRows};
}

export default connect(mapStateToProps)(OrdercgIndex);
