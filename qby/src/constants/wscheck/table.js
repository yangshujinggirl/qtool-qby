import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';
import TableLink from '../../components/table/tablelink';



class WarehouseinIndexTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '盘点单号',
			dataIndex: 'checkNo',
			render: (text, record) => {
				return (
					<TableLink text={text} hindClick={this.editInfo.bind(this,record,'10')} type='1'/>
				);
			}
		},{
				title: '所属仓库',
				dataIndex: 'wsWarehouseName'
				
		},{
			title: '盘点状态',
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
					<TableLink text='盘点' hindClick={this.editInfo.bind(this,record,'20')} type={record.status=='30'?'0':'1'}/>
				);
			}
		}];    

		this.columnsuse =[{
			title: '盘点单号',
			dataIndex: 'checkNo',
			render: (text, record) => {
				return (
					<TableLink text={text} hindClick={this.editInfo.bind(this,record,'10')} type='1'/>
				);
			}
		},{
				title: '所属仓库',
				dataIndex: 'wsWarehouseName'
				
		},{
			title: '盘点状态',
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
	}




	// 选择
	selectChange=(selectedRowKeys,selectedRows)=>{
		this.props.dispatch({
			type:'wscheck/select',
			payload:{selectedRowKeys,selectedRows}
		})
	}

	//列表数据请求   
	initWarehouseList=(values,limit,currentPage)=>{
		values.limit=limit
		values.currentPage=currentPage
		this.props.dispatch({
			type:'wscheck/fetch',
			payload:{code:'qerp.web.ws.check.query',values:values}
		})
		this.props.dispatch({type:'tab/loding',payload:true})
	}


	//修改用户信息
	editInfo = (record,place) => {	
		if(place=='10'){
			const wsCheckId=String(record.wsCheckId)
			const paneitem={title:'盘点单详情',key:'70000edit'+wsCheckId+'info',data:{wsCheckId:wsCheckId},componkey:'70000info'}
			this.props.dispatch({
				type:'tab/firstAddTab',
				payload:paneitem
			})
		}
		if(place=='20'){
			const wsCheckId=String(record.wsCheckId)
			const paneitem={title:'修改盘点单',key:'70000edit'+wsCheckId,data:{wsCheckId:wsCheckId},componkey:'70000editing'}
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
	initselect=()=>{
		const selectedRows=[]
		const selectedRowKeys=[]
		this.props.dispatch({
			type:'wscheck/select',
			payload:{selectedRowKeys,selectedRows}
		})
	}
	render() {
		const adminType=eval(sessionStorage.getItem('adminType'));
		return (
			<EditableTable 
				dataSource={this.props.wsChecks} 
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
	const {wsChecks,total,limit,currentPage,values,selectedRowKeys} = state.wscheck;
	return {wsChecks,total,limit,currentPage,values,selectedRowKeys};
}

export default connect(mapStateToProps)(WarehouseinIndexTable);



