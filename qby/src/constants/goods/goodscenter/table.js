import { connect } from 'dva';
import EditableTable from '../../../components/table/tablemodel';
import TableLink from '../../../components/table/tablelink';

class WarehouseinIndexTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '收货单号',
			dataIndex: 'asnNo',
			render: (text, record) => {
				return (
					<TableLink text={text} hindClick={this.editInfo.bind(this,record,'10')} type='1'/>
				);
			}
		},{
			title: '发货主体名称',
			dataIndex: 'name'
		}, {
			title: '收货仓库',
			dataIndex: 'wsWarehouseName'
		},{
			title: '订单状态',
			dataIndex: 'statusStr'
		},{
			title: '预计送达时间',
			dataIndex: 'expectedTime'
		},{
			title: '操作',
			dataIndex: 'opation',
			render: (text, record) => {
				return (
					<TableLink text='入库' hindClick={this.editInfo.bind(this,record,'20')} type={record.status=='30'?'0':'1'}/>
				);
			}
		}];    
		this.columnsuse = [{
			title: '收货单号',
			dataIndex: 'asnNo',
			render: (text, record) => {
				return (
						<TableLink text={text} hindClick={this.editInfo.bind(this,record,'10')} type='1'/>
				);
			}
		},{
			title: '发货主体名称',
			dataIndex: 'name'
		}, {
			title: '收货仓库',
			dataIndex: 'wsWarehouseName'
		},{
			title: '订单状态',
			dataIndex: 'statusStr'
		},{
			title: '预计送达时间',
			dataIndex: 'expectedTime'
		}];    
	}
	// 选择
	selectChange=(selectedRowKeys,selectedRows)=>{
		this.props.dispatch({
			type:'goods/select',
			payload:{selectedRowKeys,selectedRows}
		})
	}
	//列表数据请求   
	initWarehouseList=(values,limit,currentPage)=>{
		values.limit=limit
		values.currentPage=currentPage
		this.props.dispatch({
			type:'goods/fetch',
			payload:{code:'qerp.web.ws.asn.query',values:values}
		})
		this.props.dispatch({type:'tab/loding',payload:true})
	}
	//table跳转
	editInfo = (record,place) => {
		if(place=='10'){
			const wsAsnId=String(record.wsAsnId)
			const paneitem={title:'入库详情',key:'10000edit'+wsAsnId+'info',data:{wsAsnId:wsAsnId},componkey:'10000info'}
			this.props.dispatch({
				type:'tab/firstAddTab',
				payload:paneitem
			})
		}
		if(place=='20'){
			const wsAsnId=String(record.wsAsnId)
			const paneitem={title:'入库',key:'10000edit'+wsAsnId,data:{wsAsnId:wsAsnId},componkey:'10000edit'}
			this.props.dispatch({
				type:'tab/firstAddTab',
				payload:paneitem
			})
			this.props.dispatch({
				type:'goods/initstatus',
				payload:{}
			})
		}
	}

	initselect=()=>{
		const initselectedRows=[]
		const initselectedRowKeys=[]
		this.props.dispatch({
	    	type:'goods/select',
	    	payload:{initselectedRowKeys,initselectedRows}
	  	})
	}


	//分页方法
	pageChange=(page,pageSize)=>{
		this.initWarehouseList(this.props.values,pageSize,Number(page-1))
		this.initselect()
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
		this.initWarehouseList(this.props.values,size,0);
		this.initselect()
	}
	render() {
		const adminType=eval(sessionStorage.getItem('adminType'));
		return (
			<EditableTable 
				dataSource={this.props.wsorderlist} 
				columns={adminType=='10'?this.columnsuse:this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				selectChange={this.selectChange.bind(this)}
				select={adminType=='10'?false:true}
				selectType='radio'
				selectedRowKeys={this.props.selectedRowKeys}
				current={Number(this.props.currentPage)+1}
				/>
		);
	}
}

function mapStateToProps(state) {
	const {wsorderlist,total,limit,currentPage,values,selectedRowKeys} = state.goods;
	return {wsorderlist,total,limit,currentPage,values,selectedRowKeys};
}

export default connect(mapStateToProps)(WarehouseinIndexTable);



