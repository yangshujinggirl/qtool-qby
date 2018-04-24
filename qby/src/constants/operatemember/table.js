import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import TableLink from '../../components/table/tablelink';

class OperatememberTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '会员姓名',
			dataIndex: 'name'
		}, {
			title: '会员电话',
			dataIndex: 'mobile'
		},{
			title: '会员卡号',
			dataIndex: 'cardNo'
		},{
			title: '会员门店',
			dataIndex: 'spShopName'
		},{
			title: '会员级别',
			dataIndex: 'levelStr'
		}, {
			title: '账户余额',
			dataIndex: 'amount'
		},
		{
			title: '会员积分',
			dataIndex: 'point'
		},
		{
			title: '最近使用时间',
			dataIndex: 'lastActiveTime'
		},{
			title: '消费记录',
			dataIndex: 'opation',
			render: (text, record) => {
				return (
					<TableLink type='1' text='查看' hindClick={this.editInfo.bind(this,record)}/>
				);
			}
		}
		];
	}
	editInfo = (record) =>{
		const mbCardId=String(record.mbCardId);
		const paneitem={title:'消费记录',key:'402500edit'+mbCardId,data:{mbCardId:mbCardId},componkey:'402500edit'}
		this.props.dispatch({
			type:'tab/firstAddTab',
			payload:paneitem
		})
		


	}
	
	//点击表格上的修改按钮操作
	lookInfo = (record) =>{
		
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
			type:'operatemember/fetch',
			payload:{code:'qerp.web.qpos.mb.card.query',values:values}
		});
		this.props.dispatch({ type: 'tab/loding', payload:true});
	}

	render() {
		return (
		<EditableTable 
			dataSource={this.props.tableList} 
			columns={this.columns} 
			footer={true}
			bordered={true}
			pageChange={this.pageChange.bind(this)}
			pageSizeChange={this.pageSizeChange.bind(this)}
			total={this.props.total}
			limit={this.props.limit}
			current={Number(this.props.currentPage)+1}
			/>
		);
	}
	componentDidMount(){
	//执行初始化数据方法获取list
		this.initList(this.props.values,this.props.limit,this.props.currentPage);
	}
	
}

function mapStateToProps(state) {
	const {tableList,total,limit,currentPage,values} = state.operatemember;
	return {tableList,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(OperatememberTable);



