import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';
import TableLink from '../../components/table/tablelink';

class WsTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
		    title: '仓库名称',
		    dataIndex: 'username'
		}, {
			title: '仓库编码',
			dataIndex: 'name'
		}, {
			title: '仓库类型',
			dataIndex: 'job'
		},{
			title: '收货人',
			dataIndex: 'mobile'
		},{
			title: '收货电话',
			dataIndex: 'email'
		},{
			title: '收货地址',
			dataIndex: 'statusStr'
		},{
			title: '仓库状态',
			dataIndex: 'updateTime'
		},{
		    title: '操作',
		    dataIndex: 'operation',
		    render: (text, record) => {
		    	return (
					<TableLink text='修改' hindClick={this.editInfo.bind(this,record)} type='1'/>
				);
			}
		}];        
	}

	//修改用户信息
    editInfo = (record) => {
        const urUserId=String(record.urUserId)
        const paneitem={title:'修改账号',key:'601000edit'+urUserId,data:{urUserId:urUserId},componkey:'601000edit'}
        this.props.dispatch({
          	type:'tab/firstAddTab',
          	payload:paneitem
        })
	}
	//分页方法
	pageChange=(page,pageSize)=>{
		this.initAccountList(pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
		this.initAccountList(size,Number(current-1))
	}

	//账号列表数据
	initAccountList=(limit,currentPage)=>{
        this.props.dispatch({
            type:'account/fetch',
            payload:{code:'qerp.web.ur.user.query',values:{limit:limit,currentPage:currentPage}}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}
    render() {
        return (
			<EditableTable 
				dataSource={this.props.accountInfo} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				/>
        );
	}
	componentDidMount(){
		this.initAccountList(this.props.limit,this.props.currentPage)
	}
    
}

function mapStateToProps(state) {
    const {accountInfo,total,limit,currentPage} = state.account;
    return {accountInfo,total};
}

export default connect(mapStateToProps)(WsTable);
 


