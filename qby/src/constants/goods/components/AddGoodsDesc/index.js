import React,{Component} from 'react'
import { Table, Input, Icon, Button ,Upload, message} from 'antd';
import { connect } from 'dva';
import { DragSource, DropTarget } from 'react-dnd';
import MyTagControlContext from '../../../../components/MyTagControlContext';
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
	}
	components = {
    body: {
      row: DragableBodyRow,
    },
  }
  //拖拽完成
	moveRow = (dragIndex, hoverIndex) => {
    const { dataSource } = this.props;
    const dragRow = dataSource[dragIndex];
    const list = update(this.props.dataSource, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
    });
    this.props.changeSource(list);
  }
  //添加
	handleAdd (val){
		let { dataSource } = this.props;
		let type = val=='text'?'1':'2';
		dataSource.push({
      content:'',
			type,
		});
    this.props.changeSource(dataSource);
	}
  //删除
	handDelete(index) {
		let { dataSource } = this.props;
    dataSource.splice(index,1);
		this.props.changeSource(dataSource);
	}
	getText=(e,index)=>{
		const {dataSource} = this.props;
		const {value} = e.target;
		dataSource[index].content = value;
    this.props.changeSource(dataSource);
	}
  //修改图片--->更改dataSource
  changeImg=(pic,index)=>{
    const {dataSource} = this.props;
    dataSource[index].content = pic;
    this.props.changeSource(dataSource);
  }
  //渲染列表
	renderForm =(text, record, index)=> {
		const { dataSource } = this.props;
		if(record.type == '1') {
      console.log(record)
			return <div>
							 <Input placeholder="请输入文本" value={record.content} onChange={(e)=>this.getText(e,index)} autoComplete="off"/>
						</div>
		} else {
			return <UpLoadFile
              changeImg={(pic)=>this.changeImg(pic,index)}
  						imgUrl={record.content}
              index={index}
  						form={this.props.form}/>

		}
	}
	renderDelete =(text, record, index)=> {
		return <p onClick={()=>this.handDelete(index)} className='theme-color delete'>删除</p>
	}
	render() {
		let { dataSource } = this.props;
    console.log(dataSource)
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
const AddEditableTables = MyTagControlContext(AddEditableTable);
export default AddEditableTables;
