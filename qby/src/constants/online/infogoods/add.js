
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
					record.type=='2'
					?<Addavatar imageUrl={record.content} index={index}/>
					:<Input type="textarea" rows={4} placeholder="请输入商品描述"   value={record.content} onChange={this.setValur.bind(this,index)}/>
				);
			}
		},{
			title: 'operations',
			dataIndex: 'operations',
			width:'100px',
			render: (text, record, index) => {
				return (
					<p onClick={this.onDelete.bind(this,index)} className='theme-color'>删除</p>
				);
			}
		}];
		this.state = {
			dataSource: [],
			count: 2	
		};
	}
	setValur=(index,e)=>{
		//更新数据
		const pdSpuInfo=this.props.pdSpuInfo.splice(0)
		pdSpuInfo[index].content=e.target.value
		this.props.dispatch({
			type:'onlinegood/pdSpuInfo',
			payload:pdSpuInfo
		})
	}

	onDelete = (index) => {
		const pdSpuInfo=this.props.pdSpuInfo.slice(0)
		pdSpuInfo.splice(index, 1);
		this.props.dispatch({
			type:'onlinegood/pdSpuInfo',
			payload:pdSpuInfo
		})
	}

	handleAdd = () => {
		var pdSpuInfoinit1=this.props.pdSpuInfo
		if(!pdSpuInfoinit1){
			pdSpuInfoinit1=[]
		}
		const pdSpuInfo=pdSpuInfoinit1.slice(0)
		pdSpuInfo.push({
			type:'1',
			content:null
		})
		this.props.dispatch({
			type:'onlinegood/pdSpuInfo',
			payload:pdSpuInfo
		})
	}
	handleAddimg = () => {
		var pdSpuInfoinit2=this.props.pdSpuInfo
		if(!pdSpuInfoinit2){
			pdSpuInfoinit2=[]
		}
		const pdSpuInfo=pdSpuInfoinit2.slice(0)
		pdSpuInfo.push({
			type:'2',
			content:null
		})
		this.props.dispatch({
			type:'onlinegood/pdSpuInfo',
			payload:pdSpuInfo
		})
	}
	render() {
		const { dataSource } = this.state;
		const columns = this.columns;
		return (
			<div style = {{marginTop:'15px'}}>
				<Button style = {{marginLeft:'22px'}} onClick={this.handleAdd}>添加文本</Button>
				<Button style = {{marginLeft:'15px'}} onClick={this.handleAddimg}>添加图片</Button>
				<Table style ={{paddingTop:0}} bordered={false} dataSource={this.props.data} columns={columns} showHeader={false} pagination={false} className='OrderCenterEidt'/>
			</div>
		);
	}
}

function mapStateToProps(state) {
    const {pdSpuInfo} = state.onlinegood;
    return {pdSpuInfo};
}

export default connect(mapStateToProps)(AddEditableTable);


