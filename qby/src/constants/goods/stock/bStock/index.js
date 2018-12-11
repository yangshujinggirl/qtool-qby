
import React from 'react'
import { Form, Input, Button, Table, message} from 'antd'
import EditableTable from '../../../../components/table/tablebasic'
import WrappedApp from './editform'
import { connect } from 'dva';


const FormItem = Form.Item

class Stockindex extends React.Component {
constructor(props) {
	super(props);
		this.columns = [{
			title: '商品编码',
			dataIndex: 'code'
			},{
			title: '商品名称',
			dataIndex: 'name'
			}, {
			title: '商品规格',
			dataIndex: 'pdtypes'
			},{
			title: '修改前售卖库存',
			dataIndex: 'qty'
			},{
			title: '修改后售卖库存',
			dataIndex: 'afterQty'
		}];
		this.state = {
			value:'',
			initDonesens:'',
			Datesouce:[],
			ishindok:false
		}
}

	// Backdata=(value)=>{
	// 	this.Hindsetdatas(value)
	// }
	//
	// Hindsetdatas=(value)=>{
	// 	this.setState({
	// 		value:value
	// 	})
	// }
	//
	// HindsetdatasinitDonesens=(value,Datesouce)=>{
	// 	this.setState({
	// 		initDonesens:value,
	// 		Datesouce:Datesouce
	// 	},function(){
	// 		const Setdata=this.refs.Datesouce.Setdata
	// 		Setdata(this.state.Datesouce)
	// 	})
	// }
	// Cleardata=()=>{
	// 	const Cleardata=this.refs.wrappedApper.Cleardata
	// 	Cleardata()
	// }
	// Focus=()=>{
	// 	const Focus=this.refs.wrappedApper2.Focus
	// 	Focus()
	// }
	render() {
		return (
			<div className='content_box'>
				<WrappedApp/>
				{
					this.props.ishindok
					? <EditableTable columns={this.columns} dataSource={this.props.changedatasouce} bordered={true}/>
					:null
				}
			</div>
		);
	}
	componentDidMount(){
		this.props.dispatch({
			type:'bStock/initinfo',
			payload:{}
		})
	}
}



function mapStateToProps(state) {
	const {datasoucedata,changedatasouce,ishindok} = state.bStock;
    return {datasoucedata,changedatasouce,ishindok};
}
export default connect(mapStateToProps)(Stockindex);
