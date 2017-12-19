import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';
import TableLink from '../../components/table/tablelink';

class WarehouseIndexTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '配货单号',
			dataIndex: 'orderNo',
			render: (text, record) => {
				return (
					<TableLink text={text} hindClick={this.editInfo.bind(this,record)} type='1'/>
				);
			}
			},{
			title: '收货主体名称',
			dataIndex: 'name'
		},{
			title: '出货仓库',
			dataIndex: 'wsWarehouseName'
		}, {
			title: '订单状态',
			dataIndex: 'statusStr'
		},{
			title: '打印状态',
			dataIndex: 'print'
		},{
			title: '订单类型',
			dataIndex: 'typeStr'
		},{
			title: '订单时间',
			dataIndex: 'createTime'
		}, {
			title: '订单行数',
			dataIndex: 'skuSum'
		},{
			title: '商品总数',
			dataIndex: 'qtySum'
		}];        
	}
	//列表数据请求   
	initWarehouseList=(values,limit,currentPage)=>{
		values.limit=limit
		values.currentPage=currentPage
		this.props.dispatch({
			type:'warehouse/fetch',
			payload:{code:'qerp.web.ws.order.query',values:values}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}
	// 选择
	selectChange=(selectedRowKeys,selectedRows)=>{
		this.props.dispatch({
			type:'warehouse/select',
			payload:{selectedRowKeys,selectedRows}
		})
	}
	//进详情
	editInfo = (record) => {
		const wsOrderId=String(record.wsOrderId)
		const paneitem={title:'出库详情',key:'20000edit'+wsOrderId+'info',data:{wsOrderId:wsOrderId},componkey:'20000info'}
		this.props.dispatch({
			type:'tab/firstAddTab',
			payload:paneitem
		})
	}
	initselect=()=>{
		const selectedRows=[]
		const selectedRowKeys=[]
		this.props.dispatch({
			type:'warehouse/select',
			payload:{selectedRowKeys,selectedRows}
		})
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
				dataSource={this.props.wsorderlist} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				selectChange={this.selectChange.bind(this)}
				select={adminType=='10'?false:true}
				selectType='checkbox'
				selectedRowKeys={this.props.selectedRowKeys}
				current={Number(this.props.currentPage)+1}
				/>
		);
	}
}

function mapStateToProps(state) {
	const {wsorderlist,total,limit,currentPage,values,selectedRowKeys} = state.warehouse;
	return {wsorderlist,total,limit,currentPage,values,selectedRowKeys};
}

export default connect(mapStateToProps)(WarehouseIndexTable);



