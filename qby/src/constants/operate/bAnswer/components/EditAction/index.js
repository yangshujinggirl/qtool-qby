
import { Table, Input, Icon, Button ,Upload, message} from 'antd';
import { connect } from 'dva';

import UpLoadFile from './UpLoadFile.js';
import './index.less';


class EditAction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: this.props.dataSource,
			key:this.props.dataSource.length
		};
	}
	//新增功能组件
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
	handelMove(type, currentIndex) {
		let hoverIndex = currentIndex;
		if(type == 'up') {
      hoverIndex--
    } else {
      hoverIndex++
    }
    let { dataSource } = this.state;
    if(hoverIndex<0 || hoverIndex > (dataSource.length-1)) {
      return;
    }
    const currentData = dataSource[currentIndex];
    const hoverData = dataSource[hoverIndex];
    dataSource.splice(currentIndex,1);
    dataSource.splice(hoverIndex,0,currentData);
		this.setState({dataSource})
  }
	renderForm =(record, index)=> {
		const { dataSource } =this.state;
		if(record.type == '1') {
			return <div className="content-action">
							{
								this.props.form.getFieldDecorator(`pdSpuInfo[${index}].content`,{
									initialValue:dataSource[index].content,
								})(
									 <Input.TextArea
										 className="text-input"
										 placeholder="请输入文本"
										 autoComplete="off"/>
								)
							}
						</div>
		} else {
			let fileList = [];
			if(record.content!=='') {
				fileList.push(record.content);
			}
			return <div className="content-action">
								<UpLoadFile
									fileList={fileList}
									form={this.props.form}
									index={index}/>
							</div>
		}
	}
	renderDelete =(text, record, index)=> {
		return <p onClick={()=>this.handDelete(index)} className='theme-color delete'>删除</p>
	}
	render() {
		let { dataSource } = this.state;

		return (
			<div className='edit-action-components'>
				<div className="feature-action-wrap">
					<p className="action-title">功能组件</p>
					<div className="main-content">
						<p
							className="add-btn"
							onClick={()=>this.handleAdd('text')}>新增文本</p>
						<p
							className="add-btn"
							onClick={()=>this.handleAdd('img')}>新增图片</p>
					</div>
				</div>
				<div className="preview-action-wrap">
					<p className="action-title">预览区</p>
					<div className="main-content">
						<p className="preview-title">标题</p>
						{
							dataSource.length>0&&
							dataSource.map((el, index)=>(
								<div key={index} className="action-item">
									{
										this.renderForm(el,index)
									}
									<div className="btn-list-wrap">
										<p className="com-btn" onClick={()=>this.handelMove('up',index)}><Icon type="up" /></p>
										<p className="com-btn" onClick={()=>this.handelMove('down',index)}><Icon type="down" /></p>
										<p className="com-btn" onClick={()=>this.handDelete(index)}>删除</p>
									</div>
								</div>
							))
						}

						{/* <Table
							bordered={false}
							dataSource={dataSource}
							showHeader={false}
							pagination={false}
							className='adddesc-tables'>
							<Table.Column title='operation' key={1} render={this.renderForm}/>
							<Table.Column title='handle' width={100} key={2} render={this.renderDelete}/>
						</Table> */}
					</div>
				</div>
			</div>
		);
	}
}

export default EditAction;
