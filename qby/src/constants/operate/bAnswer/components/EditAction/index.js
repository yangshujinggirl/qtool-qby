
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
	componentWillReceiveProps(props) {
		this.setState({
			dataSource: props.dataSource,
			key:props.dataSource.length
		})
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
	//删除
	handDelete(index) {
		let { dataSource } = this.state;
		// let formValue = this.props.form.getFieldValue('answerContent');
		dataSource.splice(index,1);
		// formValue.splice(index,1);
		// this.props.form.setFieldsValue({
		// 	answerContent:formValue
		// })
		this.setState({
			dataSource,
			key:dataSource.length
		})
	}
	//上下移动
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
		// let formValue = this.props.form.getFieldValue('answerContent');
    const currentData = dataSource[currentIndex];
    // const currentValue = formValue[currentIndex];
		//数据源
    dataSource.splice(currentIndex,1);
    dataSource.splice(hoverIndex,0,currentData);
		dataSource.map((el,index) =>el.key =index)
		// //表单源
    // formValue.splice(currentIndex,1);
    // formValue.splice(hoverIndex,0,currentValue);
		// this.props.form.setFieldsValue({
		// 	answerContent:formValue
		// })
		console.log(dataSource)
		this.setState({dataSource});
  }
	//更改表单内容
	setValusInForm =(currentIndex,value)=> {
		let { dataSource } = this.state;
		if(value instanceof Array == false ) {
			value.persist();
    	value = value.nativeEvent.target.value;
		}
		dataSource.map((el,index) => {
			if(currentIndex == index) {
				el.content = value
			}
			return el;
		})
		this.setState({
			dataSource
		})
	}

	renderForm =(record,index)=> {
		if(record.type == '1') {
			// return <div className="content-action">
			// 				{
			// 					this.props.form.getFieldDecorator(`answerContent[${index}].content`,{
			// 						initialValue:record.content,
			// 						getValueFromEvent:null,
			// 						onChange:(e)=>this.setValusInForm(index,e)
			// 					})(
			// 						 <Input.TextArea
			// 							 key={index}
			// 							 className="text-input"
			// 							 placeholder="请输入文本"
			// 							 autoComplete="off"/>
			// 					)
			// 				}
			// 			</div>
			return <div className="content-action">
								<Input.TextArea
									key={index}
									value={record.content}
									onChange={(e)=>this.setValusInForm(index,e)}
									className="text-input"
									placeholder="请输入文本"
									autoComplete="off"/>
						</div>
		} else {
			let fileList = [];
			if(record.content!=='') {
				fileList=record.content;
			}
			return <div className="content-action">
								<UpLoadFile
									fileList={fileList}
									form={this.props.form}
									onChange={(file)=>this.setValusInForm(index,file)}
									index={index}/>
							</div>
		}
	}
	render() {
		let { dataSource } = this.state;
		const { title } =this.props;
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
						<p className="preview-title">{title}</p>
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
					</div>
				</div>
			</div>
		);
	}
}

export default EditAction;
