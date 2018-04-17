import { connect } from 'dva';
import EditableTable from '../../../components/table/tablemodel';


class DataspcunTable extends React.Component {
	constructor(props) {
        super(props);
		this.columns = [
			{
            	title: '序号',
            	dataIndex: 'index'
			},
			{
            	title: '商品编码',
            	dataIndex: 'code'
			}, 
			{
            	title: '商品条码',
            	dataIndex: 'barcode'
		  	},
		  	{
				title: '商品名称',
				dataIndex: 'pdSpuName'
		  	},
			{
				title: '商品分类',
				dataIndex: 'pdCategoryName'
			},
			{
				title: '规格',
				dataIndex: 'displayName'
			},
			{
				title: '数量',
				dataIndex: 'qty'
			},
			{
				title: '在途数量（销）',
				dataIndex: 'onsellqty'
			},
			{
				title: '在途数量（出）',
				dataIndex: 'ontuqty'
			},
			{
				title: '价格',
				dataIndex: 'toBPrice'
			}
		];   
    }
	
	//分页方法
	pageChange=(page,pageSize)=>{
        this.initstockList(this.props.values,pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
        this.initstockList(this.props.values,size,0)
	}
    
    //列表数据请求   
    initstockList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'dataspcun/fetch',
            payload:{code:'qerp.web.qpos.pd.inv.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    render() {
        return (
			<EditableTable
				dataSource={this.props.pdInvVos} 
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
    const {pdInvVos,limit,currentPage,total,values} = state.dataspcun;
    return {pdInvVos,limit,currentPage,total,values};
}

export default connect(mapStateToProps)(DataspcunTable);
