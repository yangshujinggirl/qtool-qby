import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../../components/table/tablemodel';
import TableLink from '../../../components/table/tablelink';

class StockTable extends React.Component {
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
            title: '库存数量',
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
            type:'stock/fetch',
            payload:{code:'qerp.web.ws.inv.spu.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    render() {
        return (
			<EditableTable
				dataSource={this.props.stockList} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				current={Number(this.props.currentPage)+1}
				/>
        );
	}
	componentDidMount(){
        //执行初始化数据方法获取list
		this.initstockList(this.props.values,this.props.limit,this.props.currentPage);
	}
    
}

function mapStateToProps(state) {
    const {stockList,total,limit,currentPage,values} = state.stock;
    return {stockList,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(StockTable);
