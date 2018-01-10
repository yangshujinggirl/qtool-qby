import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import TableLink from '../../components/table/tablelink';

class SpTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '门店名称',
			dataIndex: 'name'
		}, {
			title: '门店电话',
			dataIndex: 'mobile'
		},{
			title: '店主姓名',
			dataIndex: 'shopman'
		},{
			title: '门店状态',
			dataIndex: 'statusStr'
		},{
			title: '门店类型',
			dataIndex: 'shopTypeStr'
		},{
			title: '所在城市',
			dataIndex: 'provinces'
        },{
			title: '账户余额',
			dataIndex: 'amount'
        },{
			title: '操作',
			dataIndex: 'opation',
			render: (text, record) => {
				return (
					<TableLink type={'1'} text='修改' hindClick={this.editInfo.bind(this,record)}/>
				);
			}
		}]
	}
	
	//点击表格上的修改按钮操作
	editInfo = (record) =>{
		const spShopId=String(record.spShopId);
		const paneitem={title:'修改门店',key:'403000edit'+spShopId,data:{spShopId:spShopId},componkey:'403000edit'}
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
            type:'operatesp/fetch',
            payload:{code:'qerp.web.sp.shop.query',values:values}
        });
		this.props.dispatch({ type: 'tab/loding', payload:true});
	}

	render() {
		return (
			<EditableTable 
				bordered={true}
				dataSource={this.props.spShops} 
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
	const {spShops,total,limit,currentPage,values} = state.operatesp;
	return {spShops,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(SpTable);



