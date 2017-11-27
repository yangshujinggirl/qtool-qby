
// import React from 'react';
// import {Table} from 'antd';
// import { GetServerData} from '../../services/service';
// class EditableTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.columns = [{
//       title: '商品条码',
//       dataIndex: 'pdSpuBarcode'
//     }, {
//       title: '商品名称',
//       dataIndex: 'pdSpuName'
//     },{
//       title: '商品规格',
//       dataIndex: 'pdSkuDisplayName'
//     },{
//       title: '拣货数量',
//       dataIndex: 'planQty'
//     },{
//       title: '复合数量',
//       dataIndex: 'checkQty'
//     }];
//     this.state = {
//       dataSource: [],
//       count: 2,
//       current:0,
//       total:0,
//       pdbarcode:null
//     };
//   }
//   rowClassName=(record, index)=>{
//     if (index % 2) {
//       return 'table_gray'
//     }else{
//       return 'table_white'
//     }
//   }
//   onCellChange = (index, key) => {
//     return (value) => {
//       const dataSource = [...this.state.dataSource];
//       dataSource[index][key] = value;
//       this.setState({ dataSource });
//     };
//   }
//   onDelete = (index) => {
//     const dataSource = [...this.state.dataSource];
//     dataSource.splice(index, 1);
//     this.setState({ dataSource });
//   }
// Backsetdata=(value,id,total)=>{
//     console.log(value)
//     console.log(id)
//     console.log(total)
//   for (var i = 0; i < value.length; i++) {
//     if (value[i].pdSkuBarcode != null) {
//       value[i].pdSpuBarcode = value[i].pdSkuBarcode;
//     }
//   }
//   this.setState({
//     dataSource:value,
//     total:total,
//     pdbarcode:id,
//     current:1
//   })
// }
// pageonChange=(page)=>{
//     console.log(page)
//   let values={
//       orderNo:this.state.pdbarcode,
//       limit:10,
//       currentPage:Number(page.current)-1
//     }
//     let Strdatanume=JSON.stringify(values)
//     const result=GetServerData('qerp.web.ws.order.check.orderno',Strdatanume)
//     result.then((res)=> {
//           return res;
//       }).then((json) => {
//         console.log(json)
//         var wsOrderDetails=json.wsOrder.wsOrderDetails
//         for (var i = 0; i < wsOrderDetails.length; i++) {
//             if (wsOrderDetails[i].pdSkuBarcode != null) {
//                 wsOrderDetails[i].pdSpuBarcode = wsOrderDetails[i].pdSkuBarcode;
//             }
//         }
//         this.setState({
//            dataSource:wsOrderDetails,
//            current:Number(page.current)
//         })
//       })
// }
//   render() {
//     const { dataSource } = this.state;
//     const columns = this.columns;
//     return (
//       <div>
//         <Table bordered pagination={false} dataSource={dataSource} columns={columns} pagination={{'showQuickJumper':true,'total':this.state.total,'current':this.state.current}} onChange={this.pageonChange.bind(this)} rowClassName={this.rowClassName.bind(this)}/>
//       </div>
//     );
//   }
// }


// export default connect(mapStateToProps)(EditableTable);


import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';
import TableLink from '../../components/table/tablelink';

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
    const {dataSource,total,limit,currentPage} = state.postcheck;
    return {dataSource,total,limit,currentPage};
}

export default connect(mapStateToProps)(WarehouseinIndexTable);
 


