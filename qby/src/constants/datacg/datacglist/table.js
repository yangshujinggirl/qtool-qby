import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';

class DatacgTable extends React.Component {
	constructor(props) {
        super(props);
		this.columns = [{
            title: '商品编码',
            dataIndex: 'barcode'
          }, {
            title: '商品条码',
            dataIndex: 'pdSpu.name'
          },{
            title: '商品名称',
            dataIndex: 'specification'
		  },{
            title: '商品规格',
            dataIndex: 'wsWarehouseName'
		  },{
            title: '仓库总库存',
            dataIndex: 'qty'
          },{
            title: '分配库存',
            dataIndex: 'qtyAllocated'
          },{
            title: '占用库存',
            dataIndex: 'qtyOnhold'
          },{
            title: '次品库存',
            dataIndex: 'qtyBad'
        }];   
    }
	
	
    
    //列表数据请求   
    initstockList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'stock/fetch',
            payload:{code:'qerp.web.ws.inv.spu.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    render() {
        return (
			<EditableTable
				dataSource={this.props.datasouce} 
				columns={this.columns} 
				total={this.props.total}
				limit={this.props.limit}
                current={Number(this.props.currentPage)+1}
                bordered={true}
                footer={false}
				/>
        );
	}
	
    
}

function mapStateToProps(state) {
    const {datasouce,total,limit,currentPage,values} = state.datawson;
    return {datasouce,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(DatacgTable);
