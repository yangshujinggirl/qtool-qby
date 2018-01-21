import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon ,Modal} from 'antd';
import { connect } from 'dva';
//search
import OperateinoutSearch from './search';
//table
import OperateinoutTable from './table';
//导出的弹框
import Appmodelone from '../ordermd/modal';
const confirm = Modal.confirm;

class OperateinoutIndex extends React.Component{
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
  	render(){
     	return(
        	<div className='content_box'>
                <OperateinoutSearch/>
				<Button 
					type="primary" 
					size='large'
					className='mt20'
					onClick={this.exportData.bind(this,20,this.props.values)}
					>
						导出数据
				</Button>
				<div className='mt15'><OperateinoutTable/></div>
        	</div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
	const {values} = state.operateinout
	return {values};
}

export default connect(mapStateToProps)(OperateinoutIndex);
