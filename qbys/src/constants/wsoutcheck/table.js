import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';

class WarehouseinIndexTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns =  [{
                  title: '商品条码',
                  dataIndex: 'pdSpuBarcode'
                }, {
                  title: '商品名称',
                  dataIndex: 'pdSpuName'
                },{
                  title: '商品规格',
                  dataIndex: 'pdSkuDisplayName'
                },{
                  title: '拣货数量',
                  dataIndex: 'planQty'
                },{
                  title: '复合数量',
                  dataIndex: 'checkQty'
                }];        
	}
//列表数据请求   
initWarehouseList=(values,limit,currentPage)=>{
    const valuess={orderNo:values,limit:limit,currentPage:currentPage}
    this.props.dispatch({
        type:'postcheck/fetch',
        payload:{code:'qerp.web.ws.order.check.orderno',values:valuess}
    })
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
        this.initWarehouseList(this.props.phcode,pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
        this.initWarehouseList(this.props.phcode,size,Number(current-1))
	}

	
    render() {
        return (
			<EditableTable 
				dataSource={this.props.dataSource} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				select={false}
				
				
				/>
        );
	}
	
    
}

function mapStateToProps(state) {
	console.log(state)
    const {dataSource,total,limit,currentPage,phcode} = state.postcheck;
    return {dataSource,total,limit,currentPage,phcode};
}

export default connect(mapStateToProps)(WarehouseinIndexTable);
 


