import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon,message,Modal  } from 'antd';
import { connect } from 'dva';
import {deepcCloneObj} from '../../utils/commonFc';
//search
import OrdercgSearch from './search';
//table
import OrdercgTable from './table';
import Appmodelone from '../ordermd/modal';

import {GetLodop} from './print';
const confirm = Modal.confirm;

class OrdercgIndex extends React.Component{
	state = {};

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
		console.log(this.props.selectedRows)
		if (this.props.selectedRows.length < 1) {
		  message.error('请选择采购单',.8)
		  return;
		}
		for (var i = 0; i < this.props.selectedRows.length; i++) {
		  GetLodop(this.props.selectedRows[i].wsAsnId,'wsAsnOrder', this.props.selectedRows[i].asnNo)
		}
		 this.clearChooseInfo()
	  }

  	render(){
     	return(
        	<div className='content_box'>
                <OrdercgSearch/>
					<Button 
						type="primary" 
						size='large'
						className='mt20'
						onClick={this.addNew.bind(this)}
					>
						新建采购单
					</Button>
                    <Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
						onClick={this.printCgorder}
					>
						打印采购单
					</Button>
					
					<Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
						onClick={this.exportData.bind(this,15,this.props.values)}
					>
						导出数据
					</Button>
             		<div className='mt15'><OrdercgTable/></div>
        	</div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
	const {tableList,total,limit,currentPage,values,selectedRowKeys,selectedRows} = state.ordercg;
    return {tableList,total,limit,currentPage,values,selectedRowKeys,selectedRows};
}

export default connect(mapStateToProps)(OrdercgIndex);
