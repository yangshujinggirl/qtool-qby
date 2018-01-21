import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';
import TableLink from '../../../components/table/tablelink';

class GoodtimeTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '定时名称',
			dataIndex: 'taskName'
		}, {
			title: '定时操作',
			dataIndex: 'opstatusStr'
		},{
			title: '状态',
			dataIndex: 'statusStr'
		},{
			title: '最后修改人',
			dataIndex: 'updateUserName'
		},{
			title: '定时时间',
			dataIndex: 'taskTime'
		},{
			title: '操作',
			dataIndex: 'opation',
			render: (text, record) => {
				return (
					record.status == 1?
					(<TableLink text='修改' type={"1"} hindClick={this.editInfo.bind(this,record)}/>)
					:null
				);
			}
		}]
	}
	
	//点击表格上的修改按钮操作
	editInfo = (record) =>{
		const pdTaskTimeId=String(record.pdTaskTimeId);
		const paneitem={title:'修改定时',key:'305000edit'+pdTaskTimeId,data:{pdTaskTimeId:pdTaskTimeId},componkey:'305000edit'}
		this.props.dispatch({
			type:'tab/firstAddTab',
			payload:paneitem
		})
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
		values.type = "20";
		this.props.dispatch({
            type:'goodtime/fetch',
            payload:{code:'qerp.web.pd.task.time.query',values:values}
        });
		this.props.dispatch({ type: 'tab/loding', payload:true});
	}

	render() {
		return (
			<EditableTable 
				bordered={true}
				dataSource={this.props.taskTimes} 
				columns={this.columns} 
				footer={true}
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				current={Number(this.props.currentPage)+1}
				// loading={true}
			/>
		);
	}
}

function mapStateToProps(state) {
	const {taskTimes,total,limit,currentPage,values} = state.goodtime;
	return {taskTimes,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(GoodtimeTable);



