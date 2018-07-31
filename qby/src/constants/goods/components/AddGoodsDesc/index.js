
import { Table, Input, Icon, Button ,Upload, message} from 'antd';
import { connect } from 'dva';

import UpLoadFile from './UpLoadFile.js';
import './index.less';


class AddEditableTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: this.props.dataSource,
			key:this.props.dataSource.length
		};
	}

	handleAdd (val){
		let { dataSource } = this.state;
		let type = val=='text'?'1':'2';
		let {key}=this.state;
		key++;
		dataSource.push({
			type,
			content:'',
			key
		})
		this.setState({
			dataSource,
			key
		})
	}
	handDelete(index) {
		let { dataSource } = this.state;
		dataSource.splice(index,1);
		this.setState({
			dataSource
		})
	}
	renderForm =(text, record, index)=> {
		const { dataSource } =this.state;
		if(record.type == '1') {
			return <div>
							{
								this.props.form.getFieldDecorator(`pdSpuInfo[${index}].content`,{
									initialValue:dataSource[index].content,
								})(
									 <Input placeholder="Username" autoComplete="off"/>
								)
							}
						</div>
		} else {
			let fileList = [];
			fileList.push(record.content);
			return <UpLoadFile
							fileList={record.content==''?[]:fileList}
							form={this.props.form}
							index={index}/>
		}
	}
	renderDelete =(text, record, index)=> {
		return <p onClick={()=>this.handDelete(index)} className='theme-color delete'>删除</p>
	}
	render() {
		let { dataSource } = this.state;

		return (
			<div className='add-text-img'>
				<Button onClick={()=>this.handleAdd('text')}>添加文本</Button>
				<Button style = {{marginLeft:'15px'}} onClick={()=>this.handleAdd('img')}>添加图片</Button>
				<Table
					bordered={false}
					dataSource={dataSource}
					showHeader={false}
					pagination={false}
					className='adddesc-tables'>
					<Table.Column title='operation' key={1} render={this.renderForm}/>
					<Table.Column title='handle' width={100} key={2} render={this.renderDelete}/>
				</Table>
			</div>
		);
	}
}

export default AddEditableTable;
