import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import TableLink from '../../components/table/tablelink';
import CollectionsPage from './model';


class OperateczTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [
            {
              title: '充值号',
              dataIndex: 'voucherNo',
              render: (text, record) => {
                return (
                    <TableLink type='1' text={text} hindClick={this.hindonClick.bind(this,record)}/>
                );
              }
            }, {
              title: '门店名称',
              dataIndex: 'shopName'
            },{
              title: '充值金额',
              dataIndex: 'amount'
            }, {
              title: '充值时间',
              dataIndex: 'createTime'
            },{
              title: '审核状态',
              dataIndex: 'statusStr',
              render: (text, record) => {
                return (
                    <CollectionsPage 
                        title='充值审核' 
                        type='1' 
                        text={text} 
                        types={record.status== 0 ? 1: 2} 
                        data={{shopName:record.shopName,amount:record.amount,spVoucherId:record.spVoucherId}}
                        url={record.picUrl} 
                    />
                );
              }
            }];  
            
            
        this.state={
            spVouchers:[
                {
                    voucherNo:"123",
                    shopName:'lc',
                    amount:'100',
                    createTime:'10220',
                    statusStr:'0',
                    status:'0'
                }

            ]
        }
    }
    

	//列表数据请求   
	initWarehouseList=(values,limit,currentPage)=>{
		values.limit=limit
		values.currentPage=currentPage
		this.props.dispatch({
			type:'operatecz/fetch',
			payload:{code:'qerp.web.sp.voucher.query',values:values}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}
	
	//进详情
	hindonClick = (record) => {
		const spVoucherId=String(record.spVoucherId)
		const paneitem={title:'充值详情',key:'401000edit'+spVoucherId+'info',data:{spVoucherId:spVoucherId},componkey:'401000info'}
		this.props.dispatch({
			type:'tab/firstAddTab',
			payload:paneitem
		})
	}
	
	//分页方法
	pageChange=(page,pageSize)=>{
		this.initWarehouseList(this.props.values,pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
		this.initWarehouseList(this.props.values,size,0)
	}
	render() {
		return (
			<EditableTable 
				dataSource={this.props.spVouchers} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
                current={Number(this.props.currentPage)+1}
                bordered={true}
                footer={true}
				/>
		);
	}
}

function mapStateToProps(state) {
	const {spVouchers,total,limit,currentPage,values,fileDomain} = state.operatecz;
	return {spVouchers,total,limit,currentPage,values,fileDomain};
}

export default connect(mapStateToProps)(OperateczTable);



