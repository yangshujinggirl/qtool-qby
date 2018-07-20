
import { Table, Input, Icon, Button ,Upload, message} from 'antd';
import UpLoadFile from './UpLoadFile.js';
import { connect } from 'dva';


class AddEditableTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			count: 2
		};
	}
	// setValur=(index,e)=>{
	// 	//更新数据
	// 	const pdSpuInfo=this.props.pdSpuInfo.splice(0)
	// 	pdSpuInfo[index].content=e.target.value
	// 	this.props.dispatch({
	// 		type:'goods/pdSpuInfo',
	// 		payload:pdSpuInfo
	// 	})
	// }

	// onDelete = (index) => {
	// 	const pdSpuInfo=this.props.pdSpuInfo.slice(0)
	// 	pdSpuInfo.splice(index, 1);
	// 	this.props.dispatch({
	// 		type:'goods/pdSpuInfo',
	// 		payload:pdSpuInfo
	// 	})
	// }
	//
	handleAdd (val){
		let { dataSource } = this.state;
		let type = val=='text'?'1':'2'
		dataSource.push({
			type,
			content:''
		})
		this.setState({
			dataSource
		})
	}
	normFile(content) {
		return {type:'1',content}
	}
	render() {
		const { dataSource } = this.state;
		return (
			<div>
				<Button style = {{marginLeft:'22px'}} onClick={()=>this.handleAdd('text')}>添加文本</Button>
				<Button style = {{marginLeft:'15px'}} onClick={()=>this.handleAdd('img')}>添加图片</Button>
					{
						this.state.dataSource.map((el,index)=> {
							return (
								el.type==1?
								<div key={index}>
									{
										this.props.getFieldDecorator(`pdSpuInfo[${index}]`,{
                      initialValue:'',
											getValueFromEvent:this.normFile
                    })(
                       <Input placeholder="Username" />
                    )
									}
								</div>
								:
								<div key={index}>
									<UpLoadFile
										index={index}
										getFieldDecorator={this.props.getFieldDecorator}/>
								</div>
							)
						})
					}
			</div>
		);
	}
}

export default connect()(AddEditableTable);
