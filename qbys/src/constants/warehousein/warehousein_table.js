import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';
import TableLink from '../../components/table/tablelink';

class WarehouseinIndexTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
		    title: '收货单号',
		    dataIndex: 'asnNo',
		    render: (text, record) => {
		    	return (
					<TableLink text={text} hindClick={this.editInfo.bind(this,record,'10')} type='1'/>
				);
			}
		    },{
            title: '发货主体名称',
            dataIndex: 'name'
          }, {
            title: '收货仓库',
            dataIndex: 'statusStr1'
          },{
            title: '订单状态',
            dataIndex: 'statusStr'
          },{
            title: '预计送达时间',
            dataIndex: 'expectedTime'
          },{
		    title: '操作',
		    dataIndex: 'opation',
		    render: (text, record) => {
		    	return (
					<TableLink text='入库' hindClick={this.editInfo.bind(this,record,'20')} type={record.status=='30'?'0':'1'}/>
				);
			}
		    }];        
	}


	// 选择
	selectChange=(selectedRowKeys,selectedRows)=>{
		this.props.dispatch({
			type:'wsin/select',
			payload:{selectedRowKeys,selectedRows}
		})
	}



//列表数据请求   
initWarehouseList=(values,limit,currentPage)=>{
    values.limit=limit
    values.currentPage=currentPage
    console.log(values)
    this.props.dispatch({
        type:'warehouse/fetch',
        payload:{code:'qerp.web.ws.order.query',values:values}
    })
    this.props.dispatch({ type: 'tab/loding', payload:true}) 
}


	//修改用户信息
    editInfo = (record,place) => {
		if(place=='10'){
			const wsOrderId=String(record.wsAsnId)
			const paneitem={title:'入库详情',key:'501000edit'+wsOrderId+'info',data:{wsOrderId:wsOrderId},componkey:'501000info'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
		if(place=='20'){
			const wsOrderId=String(record.wsAsnId)
			const paneitem={title:'入库',key:'501000edit'+wsOrderId,data:{wsOrderId:wsOrderId},componkey:'501000edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}

	}
	//分页方法
	pageChange=(page,pageSize)=>{
        this.initWarehouseList(this.props.values,pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
        this.initWarehouseList(this.props.values,size,Number(current-1))
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
				dataSource={this.props.wsorderlist} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				selectChange={this.selectChange.bind(this)}
				select={true}
				selectType='checkbox'
				selectedRowKeys={this.props.selectedRowKeys}
				/>
        );
	}
	componentDidMount(){
		this.initAccountList(this.props.limit,this.props.currentPage)
	}
    
}

function mapStateToProps(state) {
	console.log(state)
    const {wsorderlist,total,limit,currentPage,values,selectedRowKeys} = state.wsin;
    return {wsorderlist,total,limit,currentPage,values,selectedRowKeys};
}

export default connect(mapStateToProps)(WarehouseinIndexTable);
 


