import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button ,Table,message } from 'antd';
import TableCanEdit from '../../components/table/table_edit';

class EditableTable extends React.Component {
	constructor(props) {
	super(props);
	this.columns = [{
		title: '配货单号',
		dataIndex: 'orderNo'
	  }, {
		title: '物流公司',
		dataIndex: 'wsExpressName'
	  }, {
		title: '物流单号',
		dataIndex: 'expressMailno'
	  },{
		title: '物流费用',
		dataIndex: 'shippingFee'
	  },{
		title: '操作',
		dataIndex: 'operation',
		render: (text, record,index) => {
		  return (
		
			  <div onClick = {this.onDelete.bind(this,record)} style={{color: '#35bab0', cursor:'pointer'}}>删除</div>
			
		  );
		}
	  }];
	
	}
	
	//删除按钮
	onDelete = (record) => {
		console.log(record)
		const dataSource=this.props.data.slice(0)
		 const data=dataSource.filter(item => item.key !== record.key) 
		 console.log(data)
		 this.props.dispatch({
			type:'wspost/tabledata',
			payload:data
		})
	}

	//初始化data数据
	clearDataSource = ()=>{
		
	}
	
	render() {
	return (
		<div>
			<TableCanEdit dataSources={this.props.data} columns={this.columns}/>
		</div>
	);
	}
}
function mapStateToProps(state) {
	console.log(state)
    const {data} = state.wspost;
    return {data};
}
export default connect(mapStateToProps)(EditableTable);