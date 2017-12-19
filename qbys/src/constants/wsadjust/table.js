import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';
import TableLink from '../../components/table/tablelink';

class WarehouseinIndexTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '损益单号',
			dataIndex: 'adjustNo',
			render: (text, record) => {
				return (
					<TableLink text={text} hindClick={this.editInfo.bind(this,record,'10')} type='1'/>
				);
			}
			},{
			title: '所属仓库',
			dataIndex: 'wsWarehouseName'
		}, {
			title: '损益状态',
			dataIndex: 'statusStr'
		},{
			title: '打印状态',
			dataIndex: 'print'
		},{
			title: '创建人',
			dataIndex: 'createUserName'
		},{
			title: '创建时间',
			dataIndex: 'createTime'
		}];      

		this.columnsuse =[{
				title: '损益单号',
				dataIndex: 'adjustNo',
				render: (text, record) => {
					return (
						<TableLink text={text} hindClick={this.editInfo.bind(this,record,'10')} type='1'/>
					);
				}
				},{
					title: '所属仓库',
					dataIndex: 'wsWarehouseName'
				},{
				title: '损益状态',
				dataIndex: 'statusStr'
			},{
				title: '打印状态',
				dataIndex: 'print'
			},{
				title: '创建人',
				dataIndex: 'createUserName'
			},{
				title: '创建时间',
				dataIndex: 'createTime'
			},{
				title: '操作',
				dataIndex: 'opation',
				render: (text, record) => {
					return (
						<TableLink text='损益' hindClick={this.editInfo.bind(this,record,'20')} type={record.status=='30'?'0':'1'}/>
					);
				}
			}]
	}

	// 选择
	selectChange=(selectedRowKeys,selectedRows)=>{
		this.props.dispatch({
			type:'adjust/select',
			payload:{selectedRowKeys,selectedRows}
		})
	}

	//列表数据请求   
	initWarehouseList=(values,limit,currentPage)=>{
		values.limit=limit
		values.currentPage=currentPage
		this.props.dispatch({
			type:'adjust/fetch',
			payload:{code:'qerp.web.ws.adjust.query',values:values}
		})
		this.props.dispatch({type:'tab/loding',payload:true})
	}

	initselect=()=>{
		const selectedRows=[]
		const selectedRowKeys=[]
		this.props.dispatch({
			type:'adjust/select',
			payload:{selectedRowKeys,selectedRows}
		})
	}

	//修改用户信息
	editInfo = (record,place) => {	
		if(place=='10'){
			const wsAdjustId=String(record.wsAdjustId)
			const paneitem={title:'损益详情',key:'80000edit'+wsAdjustId+'info',data:{wsAdjustId:wsAdjustId},componkey:'80000info'}
			this.props.dispatch({
				type:'tab/firstAddTab',
				payload:paneitem
			})
		}
		if(place=='20'){
			const wsAdjustId=String(record.wsAdjustId)
			const paneitem={title:'损益',key:'80000edit'+wsAdjustId,data:{wsAdjustId:wsAdjustId},componkey:'80000editing'}
			this.props.dispatch({
				type:'tab/firstAddTab',
				payload:paneitem
			})
		}

	}
	//分页方法
	pageChange=(page,pageSize)=>{
		this.initWarehouseList(this.props.values,pageSize,Number(page-1))
		this.initselect()
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
		this.initWarehouseList(this.props.values,size,0)
		this.initselect()
	}

	//账号列表数据
	initAccountList=(limit,currentPage)=>{
		this.props.dispatch({
			type:'account/fetch',
			payload:{code:'qerp.web.ws.order.query',values:{limit:limit,currentPage:currentPage}}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}

	render() {
		const adminType=eval(sessionStorage.getItem('adminType'));
		return (
			<EditableTable 
				dataSource={this.props.wsAdjustslist} 
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
	const {wsAdjustslist,total,limit,currentPage,values,selectedRowKeys} = state.adjust;
	return {wsAdjustslist,total,limit,currentPage,values,selectedRowKeys};
}

export default connect(mapStateToProps)(WarehouseinIndexTable);



