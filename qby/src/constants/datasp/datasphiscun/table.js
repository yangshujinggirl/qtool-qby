import { connect } from 'dva';
import EditableTable from '../../../components/table/tablemodel';


class DataspcunhisTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '序号',
			dataIndex: 'index'
		},{
			title: '商品编码',
			dataIndex: 'code'
		}, {
			title: '商品条码',
			dataIndex: 'barcode'
		},{
			title: '商品名称',
			dataIndex: 'pdSpuName'
		},{
			title: '商品分类',
			dataIndex: 'pdCategoryName'
		},{
			title: '规格',
			dataIndex: 'displayName'
		},{
			title: '数量',
			dataIndex: 'qty'
		},
		{
			title: '预定未发货数量',
			dataIndex: 'waitDeliveryQty'
		},
		{
			title: '发货未收货数量',
			dataIndex: 'receivingQty'
		},
		{
			title: '预定未收货数量',
			dataIndex: 'waitReceiveQty'
		},
		{
			title: '调出待收货数量',
			dataIndex: 'allocateOutWaitingQty'
		},
		{
			title: '调入待收货数量',
			dataIndex: 'allocateInWaitingQty'
		},
		{
			title: '价格',
			dataIndex: 'toBPrice'
		}];   
	}
	
	//分页方法
	pageChange=(page,pageSize)=>{
		this.initstockList(this.props.values,pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
		this.initstockList(this.props.values,size,0)
	}
	
	//列表数据请求   
	initstockList=(values,limit,currentPage)=>{
		values.limit=limit;
		values.currentPage=currentPage;
		this.props.dispatch({
			type:'datasphiscun/fetch',
			payload:{code:'qerp.web.qpos.pd.historyInv.query',values:values}
		});
		this.props.dispatch({ type: 'tab/loding', payload:true});
	}

	render() {
		return (
			<EditableTable
				dataSource={this.props.pdInvVos} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				current={Number(this.props.currentPage)+1}
				scroll={{ x: '160%'}}
				/>
		);
	}
	
	
}

function mapStateToProps(state) {
	const {pdInvVos,limit,currentPage,total,values} = state.datasphiscun;
	return {pdInvVos,limit,currentPage,total,values};
}

export default connect(mapStateToProps)(DataspcunhisTable);
