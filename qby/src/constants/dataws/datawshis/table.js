import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';


class DatawshisTable extends React.Component {
	constructor(props) {
		super(props);
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
			type:'datawshis/fetch',
			payload:{code:'qerp.web.pd.historyInvdata.query',values:values}
		});
		this.props.dispatch({ type: 'tab/loding', payload:true});
	}

	render() {
		return (
			<EditableTable 
			dataSource={this.props.invdatas} 
			columns={this.props.headArr} 
			pageChange={this.pageChange.bind(this)}
			pageSizeChange={this.pageSizeChange.bind(this)}
			total={this.props.total}
			limit={this.props.limit}
			current={Number(this.props.currentPage)+1}
			bordered={true}
			scroll={{ x: '160%'}}
			footer={true}
				/>
		);
	}
	
	
}

function mapStateToProps(state) {
	const {headArr,invdatas,total,limit,currentPage,values} = state.datawshis;
	return {headArr,invdatas,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(DatawshisTable);
