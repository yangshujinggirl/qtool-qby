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
		const paneitem={title:'新建调拨单',key:'206000edit',componkey:'206000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
		// this.props.dispatch({
        //     type:'orderct/initState',
        //     payload:{}
		// })
  	}

  	render(){
     	return(
        	<div className='content_box'>
                <OrderdbSearch/>
					<Button
						type="primary" 
						size='large'
						className='mt20 mr10'
						onClick={this.addNew}
					>
						新建调拨单
					</Button>
					<Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
						onClick={this.exportData.bind(this,17,this.props.values)}
					>
						导出数据
					</Button>
             		<div className='mt15'><OrderdbTable/></div>
        	</div>
      	)
    }
    
	componentDidMount(){
		
	}
}

function mapStateToProps(state) {
	const {values} = state.orderdb;
	return {values};
}

export default connect(mapStateToProps)(OrderdbIndex);
