import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon ,Modal} from 'antd';
import { connect } from 'dva';
//table
import OrderthTable from './table';
//search
import OrderthSearch from './search';
import Appmodelone from '../ordermd/modal';
const confirm = Modal.confirm;

class OrderthIndex extends React.Component{
	state = {};

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
  	render(){
     	return(
        	<div className='content_box'>
                <OrderthSearch/>
					<Button 
						type="primary" 
						size='large'
						className='mt20 mr10'
						onClick={this.addNew}
					>
						新建退货单
					</Button>
					<Button 
						type="primary" 
						size='large'
						className='mt20'
						onClick={this.exportData.bind(this,11,this.props.values)}
					>
						导出数据
					</Button>
             		<div className='mt15'><OrderthTable/></div>
        	</div>
      	)
	}
	  
	componentDidMount(){
		
	}
}

function mapStateToProps(state) {
	const {values} = state.orderth;
	return {values};
}

export default connect(mapStateToProps)(OrderthIndex);
