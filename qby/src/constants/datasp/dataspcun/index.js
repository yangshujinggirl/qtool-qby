
import {GetServerData} from '../../../services/services';
import {Getexpont} from '../../../services/expont';
import { Button, Icon,Modal } from 'antd';
import { connect } from 'dva';
import DataspcunTable from './table';
import DataspcunSearch from './search';
const confirm = Modal.confirm;

class DataspcunIndex extends React.Component{
	state = {};
	handleOperateClick =(record)=> {
		const paneitem = {
			title:'库存分布',
			key:`${this.props.componkey}distribute`,
			componkey:`${this.props.componkey}distribute`,
			data:{
				pdSpuId:record.pdSpuId,
				pdSkuId:record.pdSkuId,
			}
		};
		this.props.dispatch({
			type:'tab/firstAddTab',
			payload:paneitem
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
  			});
			}
		})
	}

	render(){
   	return(
    	<div>
        <DataspcunSearch/>
      	<Button
					type="primary"
					size='large'
					className='mt15'
					onClick={this.exportData.bind(this,54,this.props.dataspcun.values)}
					>
            导出数据
					</Button>
       		<div className='mt20'>
						<DataspcunTable operateClick={this.handleOperateClick}/>
					</div>
    	</div>
  	)
	}
}

function mapStateToProps(state) {
	const {dataspcun} = state;
    return {dataspcun};
}

export default connect(mapStateToProps)(DataspcunIndex);
