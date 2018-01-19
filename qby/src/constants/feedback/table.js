import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import TableLink from '../../components/table/tablelink';

class SpTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '反馈编号',
			dataIndex: 'feedbackNo'
		}, {
			title: '反馈问题',
			dataIndex: 'remark'
		},{
			title: '反馈类型',
			dataIndex: 'typeStr'
		},{
			title: '反馈状态',
			dataIndex: 'statusStr'
		},{
			title: '反馈门店',
			dataIndex: 'spShopName'
        },{
			title: '反馈时间',
			dataIndex: 'createTime'
		},{
			title: '处理时长',
			dataIndex: 'handleTime'
		},{
			title: '操作',
			width:'10%',
			dataIndex: 'opation',
			render: (text, record) => {
				return (
					<TableLink type={'1'} text='处理' hindClick={this.editInfo.bind(this,record)}/>
				);
			}
		}]
	}
	
	//点击表格上的修改按钮操作
	editInfo = (record) =>{
		const spFeedbackId=String(record.spFeedbackId);
		const paneitem={title:'反馈处理',key:'406000edit'+spFeedbackId,data:{spFeedbackId:spFeedbackId},componkey:'406000edit'}
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
		this.props.dispatch({
            type:'feedback/fetch',
            payload:{code:'qerp.web.sp.feedback.query',values:values}
        });
		this.props.dispatch({ type: 'tab/loding', payload:true});
	}

	render() {
		return (
			<EditableTable 
				bordered={true}
				dataSource={this.props.feedbacks} 
				columns={this.columns} 
				footer={true}
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				current={Number(this.props.currentPage)+1}
			/>
		);
	}
}

function mapStateToProps(state) {
	const {feedbacks,total,limit,currentPage,values} = state.feedback;
	return {feedbacks,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(SpTable);



