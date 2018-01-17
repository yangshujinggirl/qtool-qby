
import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';


class DatawstimeTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
		title: '商品编码',
		dataIndex: 'pdCode'
		}, {
		title: '商品条码',
		dataIndex: 'pdBarcode'
		},{
		title: '商品名称',
		dataIndex: 'pdSpuName'
		},{
		title: '商品规格',
		dataIndex: 'pdSkuType'
		},{
		title: '所属仓库',
		dataIndex: 'wsWarehouseName'
		},{
		title: '库位',
		dataIndex: 'wsBin'
		},{
		title: '商品数量',
		dataIndex: 'wsBinLotQty'
		},{
		title: '到期时间',
		dataIndex: 'expireDateStr'
		},{
		title: '到期天数',
		dataIndex: 'expireDays'
		}];
	}

	//分页方法
	pageChange=(page,pageSize)=>{
		this.initList(this.props.values,pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
		this.initList(this.props.values,size,0)
	}
	
	//列表数据请求   
	initList=(values,limit,currentPage)=>{
		values.limit=limit;
		values.currentPage=currentPage;
		this.props.dispatch({
			type:'datawstime/fetch',
			payload:{code:'qerp.web.pd.validDate.query',values:values}
		});
		this.props.dispatch({ type: 'tab/loding', payload:true});
	}

	render() {
		return (
			<EditableTable 
				dataSource={this.props.validDateInfos} 
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
	const {validDateInfos,total,limit,currentPage,values} = state.datawstime;
	return {validDateInfos,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(DatawstimeTable);
