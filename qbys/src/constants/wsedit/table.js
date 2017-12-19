import { connect } from 'dva';
import TableLink from '../../components/table/tablelink';
import TableCanEdit from '../../components/table/table_edit';

class WsTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
		    title: '仓库名称',
		    dataIndex: 'name'
		}, {
			title: '仓库编码',
			dataIndex: 'wsNo'
		}, {
			title: '仓库类型',
			dataIndex: 'wsType'
		},{
			title: '收货人',
			dataIndex: 'recName'
		},{
			title: '收货电话',
			dataIndex: 'recTelephone'
		},{
			title: '收货地址',
			dataIndex: 'recAddress'
		},{
			title: '仓库状态',
			dataIndex: 'statusStr'
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
        const wsWarehouseId=String(record.wsWarehouseId)
        const paneitem={title:'仓库修改',key:'90000edit'+wsWarehouseId,data:{wsWarehouseId:wsWarehouseId},componkey:'90000edit'}
        this.props.dispatch({
          	type:'tab/firstAddTab',
          	payload:paneitem
        })
	}

	//仓库列表数据
	initAccountList=()=>{
        this.props.dispatch({
            type:'wsedit/fetch',
			payload:{code:'qerp.web.ws.warehouse.query',values:{}}
		})
		 this.props.dispatch({type:'tab/loding',payload:true})
	}
    render() {
        return (
			<TableCanEdit
				columns={this.columns} 
				dataSources={this.props.warehouses}
			/>
        );
	}
	componentDidMount(){
		this.initAccountList()
	}
    
}

function mapStateToProps(state) {
    const {warehouses} = state.wsedit;
    return {warehouses};
}

export default connect(mapStateToProps)(WsTable);
 


