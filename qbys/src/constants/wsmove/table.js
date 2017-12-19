import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';
import TableLink from '../../components/table/tablelink';

class WarehouseIndexTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '移库单号',
			dataIndex: 'moveNo',
			render: (text, record) => {
				return (
					<TableLink text={text} hindClick={this.editInfo.bind(this,record,'10')} type='1'/>
				);
			}
			},{
				title: '所属仓库',
				dataIndex: 'wsWarehouseName'
			},{
			title: '移库状态',
			dataIndex: 'statusStr'
		}, {
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
					<TableLink text='移库' hindClick={this.editInfo.bind(this,record,'20')} type={record.status!='30'?'1':'0'}/>
				);
			}
		}
	];      
	
	this.columnsuse = [{
		title: '移库单号',
		dataIndex: 'moveNo',
		render: (text, record) => {
			return (
				<TableLink text={text} hindClick={this.editInfo.bind(this,record,'10')} type='1'/>
			);
		}
		},{
			title: '所属仓库',
			dataIndex: 'wsWarehouseName'
		},{
		title: '移库状态',
		dataIndex: 'statusStr'
	}, {
		title: '打印状态',
		dataIndex: 'print'
	},{
		title: '创建人',
		dataIndex: 'createUserName'
	},{
		title: '创建时间',
		dataIndex: 'createTime'
	  }
];  

	}
	//列表数据请求   
	initWarehouseList=(values,limit,currentPage)=>{
		values.limit=limit
		values.currentPage=currentPage
		this.props.dispatch({
			type:'wsmove/fetch',
			payload:{code:'qerp.web.ws.move.query',values:values}
		})
		this.props.dispatch({type:'tab/loding',payload:true})
	}
	initselect=()=>{
		const selectedRows=[]
		const selectedRowKeys=[]
		this.props.dispatch({
			type:'wsmove/select',
			payload:{selectedRowKeys,selectedRows}
		})
	}
	// 选择
	selectChange=(selectedRowKeys,selectedRows)=>{
		this.props.dispatch({
			type:'wsmove/select',
			payload:{selectedRowKeys,selectedRows}
		})
	}
	//进详情
	editInfo = (record,place) => {
        if(place=='10'){
			const wsMoveId=String(record.wsMoveId)
			const paneitem={title:'移库详情',key:'60000edit'+wsMoveId+'info',data:{wsMoveId:wsMoveId},componkey:'60000info'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
		if(place=='20'){
			const wsMoveId=String(record.wsMoveId)
			const paneitem={title:'移库',key:'60000edit'+wsMoveId,data:{wsMoveId:wsMoveId},componkey:'60000edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
			this.props.dispatch({
				type:'wsmove/initneweditdata',
				payload:''
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
	render() {
		const adminType=eval(sessionStorage.getItem('adminType'));
		return (
			<EditableTable 
				dataSource={this.props.wsMoves} 
				columns={adminType=='10'?this.columnsuse:this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				selectChange={this.selectChange.bind(this)}
				selectType='radio'
				select={adminType=='10'?false:true}
				selectedRowKeys={this.props.selectedRowKeys}
				current={Number(this.props.currentPage)+1}
				/>
		);
	}
}

function mapStateToProps(state) {
	const {wsMoves,total,limit,currentPage,values,selectedRowKeys} = state.wsmove;
	return {wsMoves,total,limit,currentPage,values,selectedRowKeys};
}

export default connect(mapStateToProps)(WarehouseIndexTable);