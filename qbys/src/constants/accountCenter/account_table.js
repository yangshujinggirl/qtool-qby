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
					<TableLink text='修改' hindClick={this.editInfo.bind(this,record)}/>
				);
			}
		}];        
	}

	//修改用户信息
    editInfo = (record) => {
        const urUserId=String(record.urUserId)
        const paneitem={title:'修改账号',key:'601000edit'+urUserId,data:{urUserId:urUserId},componkey:'601000edit'}
        this.props.dispatch({
          	type:'tab/addNewTab',
          	payload:paneitem
        })
	}
	//分页方法
	pageChange=(page,pageSize)=>{
		console.log(page)
		console.log(pageSize)
	}
	//pagesize辩护
	pageSizeChange=(current,size)=>{
		console.log(current)
		console.log(size)
		localStorage.setItem('pagesize',size)
		console.log(localStorage)
		this.props.dispatch({
            type:'account/fetch',
            payload:{code:'qerp.web.ur.user.query',values:{limit:size,currentPage:Number(current)-1}}
		})
	}

    render() {
        return (
			<EditableTable 
				dataSource={this.props.accountInfo} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				/>
        );
    }
    componentDidMount(){
		const pages=localStorage.getItem('pagesize')
        this.props.dispatch({
            type:'account/fetch',
            payload:{code:'qerp.web.ur.user.query',values:{limit:pages?pages:'10',currentPage:0}}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
    }
}

function mapStateToProps(state) {
	console.log(state)
    const {accountInfo,total} = state.account;
    return {accountInfo,total};
}

export default connect(mapStateToProps)(AccountIndexTable);
 


