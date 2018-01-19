import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';


class DataclassTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '分类名称',
			dataIndex: 'name'
		},{
			title: '掌柜销售数量',
			dataIndex: 'qbyQty'
		}, {
			title: '掌柜销售数量占比',
			dataIndex: 'qbyQtyBi'
		},{
			title: '掌柜销售金额',
			dataIndex: 'qbyAmount'
		},{
			title: '掌柜销售金额占比',
			dataIndex: 'qbyAmountBi'
		},{
			title: 'POS销售数量',
			dataIndex: 'posQty'
		},{
			title: 'POS销售数量占比',
			dataIndex: 'posQtyBi'
		},{
			title: 'POS销售金额',
			dataIndex: 'posAmount'
		},{
			title: 'POS销售金额占比',
			dataIndex: 'posAmountBi'
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
				dataSource={this.props.categoryAnalysis} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				current={Number(this.props.currentPage)+1}
				footer={false}
				bordered={true}
				/>
		);
	}
	
	
}

function mapStateToProps(state) {
	const {categoryAnalysis,updateTime} = state.dataclassdes;
	return {categoryAnalysis,updateTime};
}

export default connect(mapStateToProps)(DataclassTable);
