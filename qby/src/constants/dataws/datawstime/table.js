
import { connect } from 'dva';
import EditableTable from '../../../components/table/tablemodel';


class DatawstimeTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns = [{
          title: '商品条码',
          dataIndex: 'barcode'
        }, {
          title: '商品名称',
          dataIndex: 'pdSpu.name'
        },{
          title: '商品规格',
          dataIndex: 'specification'
        },{
          title: '所属仓库',
          dataIndex: 'wsWarehouseName'
        },{
          title: '单据类型',
          dataIndex: 'docTypeStr'
        },{
          title: '单据编号',
          dataIndex: 'docNo'
        },{
          title: '分配数量',
          dataIndex: 'qtyAllocated'
        },{
          title: '占用数量',
          dataIndex: 'qtyOnhold'
        },{
          title: '库存变化',
          dataIndex: 'invChange'
        },{
          title: '操作时间',
          dataIndex: 'updateTime'
        },{
          title: '交易状态',
          dataIndex: 'statusStr'
        }];
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
            type:'transaction/fetch',
            payload:{code:'qerp.web.ws.inv.trans.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    render() {
        return (
			<EditableTable 
				dataSource={this.props.datasouce} 
				columns={this.columns} 
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
    const {datasouce,total,limit,currentPage,values} = state.datawstime;
    return {datasouce,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(DatawstimeTable);