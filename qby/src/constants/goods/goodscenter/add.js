
import { Table, Input, Icon, Button ,Upload, message} from 'antd';
import Addavatar from './addupload';
import { connect } from 'dva';



class AddEditableTable extends React.Component {
constructor(props) {
	super(props);
	this.columns = [{
	title: 'operation',
	dataIndex: 'operation',
	render: (text, record, index) => {
		return (
		record.type=='2'?<Addavatar/>:<Input type="textarea" rows={4} placeholder="请输入商品描述"  onChange={this.setvalur.bind(this,index)}/>
		);
	}
	},{
	title: 'operations',
	dataIndex: 'operations',
	width:'50px',
	render: (text, record, index) => {
		return (
			<p onClick={this.onDelete.bind(this,index)}>删除</p>
		
		);
	}
	}];

	this.state = {
	dataSource: [],
	count: 2
	};
}
setvalur=(index,e)=>{
	let dataSourcedata=this.state.dataSource
	dataSourcedata[index].operation.content=e.target.value
	this.setState({
	dataSource:dataSourcedata
	},function(){
	const BackSpudesDatasouce=this.props.BackSpudesDatasouce
	BackSpudesDatasouce(this.state.dataSource)
	})
}
setimgvalur=(index,messages)=>{
	let dataSourcedatas=this.state.dataSource
	dataSourcedatas[index].operation.content=messages
	this.setState({
	dataSource:dataSourcedatas
	},function(){
	const BackSpudesDatasouce=this.props.BackSpudesDatasouce
	BackSpudesDatasouce(this.state.dataSource)
	})
}



onDelete = (index) => {
	let dataSource = [...this.state.dataSource];
	dataSource.splice(index, 1);
	this.setState({ dataSource:dataSource },function(){
		//  const BackSpudesDatasouce=this.props.BackSpudesDatasouce
		//  BackSpudesDatasouce(this.state.dataSource)
	});
}


handleAdd = () => {
	const { count, dataSource } = this.state;
	const newData = {
	key: count,
	operation: {type:'1'}
	};
	this.setState({
	dataSource: [...dataSource, newData],
	count: count + 1
	},function(){
	//   const BackSpudesDatasouce=this.props.BackSpudesDatasouce
	//   BackSpudesDatasouce(this.state.dataSource)
	});
}
handleAddimg = () => {
	const { count, dataSource } = this.state;
	const newData = {
	key: count,
	operation: {type:'2'}
	};
	this.setState({
	dataSource: [...dataSource, newData],
	count: count + 1
	},function(){
	//   const BackSpudesDatasouce=this.props.BackSpudesDatasouce
	//   BackSpudesDatasouce(this.state.dataSource)
	});
}

//   SetData=(fileDomain,messages)=>{
//     console.log(fileDomain)
//     console.log(messages)
//       for(var i=0;i<messages.length;i++){
//         messages[i].key=i+'s'
//         if(messages[i].type=='1'){
//            messages[i].operation={type:'1',content:messages[i].content}
//         }
//         if(messages[i].type=='2'){
//            messages[i].operation={type:'2',content:messages[i].content}
//         }
//       }
//       this.setState({
//         dataSource:messages,
//         fileDomain:fileDomain
//       })
//   }


render() {
	const { dataSource } = this.state;
	const columns = this.columns;
	console.log(this.props.data)
	return (
	<div style = {{marginTop:'15px'}}>
		<Button style = {{marginLeft:'22px'}} onClick={this.handleAdd}>添加文本</Button>
		<Button style = {{marginLeft:'15px'}} onClick={this.handleAddimg}>添加图片</Button>
		<Table style ={{paddingTop:0}} bordered={false} dataSource={this.props.data} columns={columns} showHeader={false} pagination={false} className='OrderCenterEidt'/>
	</div>
	);
}
}

export default AddEditableTable;

