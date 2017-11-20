import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';
import TableLink from '../../components/table/tablelink';

class WarehouseIndexTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
		    title: '配货单号',
		    dataIndex: 'orderNo',
		    render: (text, record) => {
		    	return (
					<TableLink text={text} hindClick={this.editInfo.bind(this,record)}/>
				);
			}
		    },{
            title: '门店/供应商名称',
            dataIndex: 'name'
          }, {
            title: '订单状态',
            dataIndex: 'statusStr'
          },{
            title: '打印状态',
            dataIndex: 'print'
          },{
            title: '订单类型',
            dataIndex: 'typeStr'
          },{
            title: '订单时间',
            dataIndex: 'createTime'
          }, {
            title: '订单行数',
            dataIndex: 'skuSum'
          },{
            title: '商品总数',
            dataIndex: 'qtySum'
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
		console.log(page)
		console.log(pageSize)
		this.initAccountList(pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
		console.log(current)
		console.log(size)
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
	console.log(state)
    const {accountInfo,total,limit,currentPage} = state.account;
    return {accountInfo,total};
}

export default connect(mapStateToProps)(WarehouseIndexTable);
 


