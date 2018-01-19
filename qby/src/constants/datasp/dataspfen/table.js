import { connect } from 'dva';
import EditableTable from '../../../components/table/tablemodel';


class DataspfenTable extends React.Component {
	constructor(props) {
        super(props);
		this.columns = [{
            title: '门店名称',
            dataIndex: 'shopName'
          },{
            title: '食品类数量',
            dataIndex: 'posQty'
          }, {
            title: '食品类金额',
            dataIndex: 'posAmount'
          },{
            title: '分成金额',
            dataIndex: 'intoAmount'
		  },{
            title: '非商品数量',
            dataIndex: 'notPosQty'
		  },{
            title: '非食品金额',
            dataIndex: 'notPosAmount'
          },{
            title: '分成金额',
            dataIndex: 'notIntoAmount'
          }];   
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
            type:'dataspfen/fetch',
            payload:{code:'qerp.web.rp.shop.Joint.division.page',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    render() {
        return (
			<EditableTable
				dataSource={this.props.divisions} 
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
    const {divisions,limit,currentPage,total,values} = state.dataspfen;
    return {divisions,limit,currentPage,total,values};
}

export default connect(mapStateToProps)(DataspfenTable);
