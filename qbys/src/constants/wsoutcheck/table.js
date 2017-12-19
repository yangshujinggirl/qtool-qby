import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';

class WarehouseinIndexTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns =  [{
				title: '商品条码',
				dataIndex: 'pdSkuBarcode'
				}, {
				title: '商品名称',
				dataIndex: 'pdSpuName'
				},{
				title: '商品规格',
				dataIndex: 'pdSkuDisplayName'
				},{
				title: '拣货数量',
				dataIndex: 'planQty'
				},{
				title: '复合数量',
				dataIndex: 'checkQty'
				}];        
	}
	//列表数据请求   
	initWarehouseList=(values,limit,currentPage)=>{
		const valuess={orderNo:values,limit:limit,currentPage:currentPage}
		this.props.dispatch({
			type:'postcheck/fetch',
			payload:{code:'qerp.web.ws.order.check.orderno',values:valuess}
		})
	}
	
	//分页方法
	pageChange=(page,pageSize)=>{
		this.initWarehouseList(this.props.phcode,pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
		this.initWarehouseList(this.props.phcode,size,Number(current-1))
	}

	
	render() {
		return (
			<EditableTable 
				dataSource={this.props.dataSource} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				select={false}
				
				
				/>
		);
	}
	
	
}

function mapStateToProps(state) {
	const {dataSource,total,limit,currentPage,phcode} = state.postcheck;
	return {dataSource,total,limit,currentPage,phcode};
}

export default connect(mapStateToProps)(WarehouseinIndexTable);



