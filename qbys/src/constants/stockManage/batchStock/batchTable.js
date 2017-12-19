import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../../components/table/tablemodel';
import TableLink from '../../../components/table/tablelink';

class BatchStockTable extends React.Component {
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
			title: '库位',
			dataIndex: 'wsBin.code'
		  },{
			title: '批次',
			dataIndex: 'wsLot.productDate'
		  },{
			title: '库存数量',
			dataIndex: 'qty'
		  },{
			title: '分配库存',
			dataIndex: 'qtyAllocated'
		  },{
			title: '占用库存',
			dataIndex: 'qtyOnhold'
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
			type:'batchStock/fetch',
			payload:{code:'qerp.web.ws.inv.bin.query',values:values}
		});
		this.props.dispatch({ type: 'tab/loding', payload:true});
	}

	render() {
		return (
			<EditableTable 
				dataSource={this.props.list} 
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
		this.initList(this.props.values,this.props.limit,this.props.currentPage);
	}
	
}

function mapStateToProps(state) {
	const {list,total,limit,currentPage,values} = state.batchStock;
	return {list,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(BatchStockTable);
