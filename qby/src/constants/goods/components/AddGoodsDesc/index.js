import React,{Component} from 'react'
import { Table, Input, Icon, Button ,Upload, message} from 'antd';
import { connect } from 'dva';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import UpLoadFile from './UpLoadFile.js';
import './index.less';

let dragingIndex = -1;

class BodyRow extends Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let className = restProps.className;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};
const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    };
    props.moveRow(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};
const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);
class AddEditableTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: this.props.dataSource,
			key:this.props.dataSource.length
		};
	}
	components = {
    body: {
      row: DragableBodyRow,
    },
  }
  //拖拽完成
	moveRow = (dragIndex, hoverIndex) => {
    const { dataSource } = this.state;
    const {pdSpuInfo} = this.props.form.getFieldsValue();
    pdSpuInfo[dragIndex].content = dataSource[hoverIndex].content;
    pdSpuInfo[hoverIndex].content = dataSource[dragIndex].content;
    this.props.form.setFieldsValue({pdSpuInfo})
    const dragRow = dataSource[dragIndex];
    this.setState(
      update(this.state, {
        dataSource: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      }),
    );
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
	getText=(e,index)=>{
		const {dataSource} = this.state;
		const {value} = e.target;
		dataSource[index].content = value;
	}
	renderForm =(text, record, index)=> {
		const { dataSource } = this.state;
		if(record.type == '1') {
			return <div>
							{
								this.props.form.getFieldDecorator(`pdSpuInfo[${index}].content`,{
									initialValue:dataSource[index].content,
								})(
									 <Input placeholder="请输入文本" onBlur={(e)=>this.getText(e,index)}  autoComplete="off"/>
								)
							}
						</div>
		} else {
			let fileList = [];
			if(record.content!=='') {
				fileList.push(record.content);
			}
			return <UpLoadFile
							fileList={fileList}
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
					components={this.components}
					showHeader={false}
					pagination={false}
					onRow={(record, index) => ({
	          index,
	          moveRow: this.moveRow,
	        })}
					className='adddesc-tables'>
					<Table.Column title='operation' key={1} render={this.renderForm}/>
					<Table.Column title='handle' width={100} key={2} render={this.renderDelete}/>
				</Table>
			</div>
		);
	}
}
const AddEditableTables = DragDropContext(HTML5Backend)(AddEditableTable);
export default AddEditableTables;
