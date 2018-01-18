import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';


class DataspcunhisTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '商品编码',
			dataIndex: 'code'
		}, {
			title: '商品条码',
			dataIndex: 'barcode'
		},{
			title: '商品名称',
			dataIndex: 'name'
		},{
			title: '商品规格',
			dataIndex: 'displayName'
		},{
			title: '分类',
			dataIndex: 'pdCategory1'
		},{
			title: '类别',
			dataIndex: 'pdCategory2'
		},{
			title: '掌柜销售数量',
			dataIndex: 'qbyQty'
		},{
			title: '掌柜销售金额',
			dataIndex: 'qbyAmount'
		},{
			title: 'POS销售数量',
			dataIndex: 'posQty'
		},{
			title: 'POS销售金额',
			dataIndex: 'posAmount'
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
			type:'datas/fetch',
			payload:{code:'qerp.web.rp.spu.data.page',values:values}
		});
		this.props.dispatch({ type: 'tab/loding', payload:true});
	}

	render() {
		return (
			<EditableTable
				dataSource={this.props.pdAnalysis} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				current={Number(this.props.currentPage)+1}
				footer={true}
				bordered={true}


				/>
		);
	}
	
	
}

function mapStateToProps(state) {
	const {pdAnalysis,limit,currentPage,total,values} = state.datas;
	return {pdAnalysis,limit,currentPage,total,values};
}

export default connect(mapStateToProps)(DataspcunhisTable);
