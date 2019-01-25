import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon ,Modal,message} from 'antd';
import { connect } from 'dva';
import {removeSpace} from '../../utils/meth';
import OrderthTable from './table';
import OrderthSearch from './search';
import Appmodelone from '../ordermd/modal';

const confirm = Modal.confirm;
class OrderthIndex extends React.Component{
	state = {};
	//新建
	addNew = () =>{
		const paneitem={title:'新建退货单',key:'203000edit',componkey:'203000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
		this.props.dispatch({
            type:'orderth/initState',
            payload:{}
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

	//列表数据请求
    initList=(values,limit,currentPage)=>{
				removeSpace(values);
        values.limit=limit;
        values.currentPage=currentPage;
        values.type = "20";
        this.props.dispatch({
            type:'orderth/fetch',
            payload:{code:'qerp.web.ws.asn.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
	}

	//清除选中
	clearChooseInfo=()=>{
		const selectedRows=[];
		const selectedRowKeys = [];
		this.props.dispatch({
			type:'orderth/select',
			payload:{selectedRowKeys,selectedRows}
		})
  	}
	//强制完成
	mandatoryOrder=()=>{
		if (this.props.selectedRows.length < 1) {
			message.error('请选择退货单',.8)
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
  	render(){
		const rolelists=this.props.data.rolelists
		//增改
		const addorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.ws.asn.save"
		})
		//导出数据
		const expontdata=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sys.doc.task"
		})
		//强制完成
		const overorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.ws.asn.finish"
		})


     	return(
        	<div className='content_box'>
                <OrderthSearch/>

				{
					addorder?
					<Button
					type="primary"
					size='large'
					className='mt20 mr10'
					onClick={this.addNew}
				>
						新建退货单
					</Button>
				:null
				}
				{
					expontdata?
					<Button
					type="primary"
					size='large'
					className='mt20 mr10'
					onClick={this.exportData.bind(this,11,this.props.values)}
				>
					导出数据
				</Button>
				:null
				}
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
             		<div className='mt15'>
					 	<OrderthTable addorderobj={overorder}/>
					</div>
        	</div>
      	)
	}
}

function mapStateToProps(state) {
	const {values,selectedRows,limit,currentPage} = state.orderth;
	return {values,selectedRows,limit,currentPage};
}

export default connect(mapStateToProps)(OrderthIndex);
