import { connect } from 'dva';
import { Button ,Modal} from 'antd';
import {GetServerData} from '../../../services/services';
import EditableTable from '../../../components/table/tablebasic';
const confirm = Modal.confirm;

class DataspTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '门店编号',
			dataIndex: 'no'
		}, {
			title: '门店名称',
			dataIndex: 'name'
		},{
			title: '掌柜销售额',
			dataIndex: 'qbyAmount'
		},{
			title: '掌柜销售数量',
			dataIndex: 'qbyQty'
		},{
			title: 'POS销售额',
			dataIndex: 'posAmount'
		},{
			title: 'POS净收款',
			dataIndex: 'cleanAmount'
		},{
			title: 'POS销售数量',
			dataIndex: 'posQty'
		}];   
	}

	//getdatasouce
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
	
	
	
	render() {
		return (
			<div>
				<Button type="primary" onClick={this.exportData.bind(this,50,this.props.values)} className='mb10'>导出数据</Button>
				<EditableTable
					dataSource={this.props.shopSaleDatas} 
					columns={this.columns} 
					bordered={true}
					footer={false}
					/>
			</div>
		);
	}
	
}

function mapStateToProps(state) {
	const {shopSaleDatas,values} = state.dataspsell;
	return {shopSaleDatas,values};
}

export default connect(mapStateToProps)(DataspTable);
