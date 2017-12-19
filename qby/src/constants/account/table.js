import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';
import TableLink from '../../components/table/tablelink';

class AccountIndexTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
		    title: '账号名称',
		    dataIndex: 'username'
		}, {
			title: '姓名',
			dataIndex: 'name'
		}, {
			title: '职位',
			dataIndex: 'job'
		},{
			title: '手机',
			dataIndex: 'mobile'
		},{
			title: '邮箱',
			dataIndex: 'email'
		},{
			title: '状态',
			dataIndex: 'statusStr'
		},{
			title: '更新时间',
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
	pageChange=(values,page,pageSize)=>{
		this.initAccountList(pageSize,Number(page-1),values)
	}
	//pagesize变化
	pageSizeChange=(values,current,size)=>{
		this.initAccountList(size,0,values)
	}

	//账号列表数据
	initAccountList=(limit,currentPage,values)=>{
        this.props.dispatch({
            type:'account/fetch',
            payload:{code:'qerp.web.ur.user.query',values:{limit:limit,currentPage:currentPage,...values}}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}
    render() {
        return (
			<EditableTable 
				dataSource={this.props.accountInfo} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this,this.props.values)}
				pageSizeChange={this.pageSizeChange.bind(this,this.props.values)}
				total={this.props.total}
				limit={this.props.limit}
				current={Number(this.props.currentPage)+1}
				/>
        );
	}

	componentDidMount(){
		this.initAccountList()
    }
	
    
}

function mapStateToProps(state) {
	const {accountInfo,total,limit,currentPage,values} = state.account;
    return {accountInfo,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(AccountIndexTable);
 


