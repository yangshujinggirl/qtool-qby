import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import './index.less';


let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let { className } = restProps;
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
      parent:props.parent
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const hoverParent = props.parent;
    const dragParent = monitor.getItem().parent;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex&&dragParent===hoverParent) {
      return;
    }
    // Time to actually perform the action
    props.moveRow(dragParent, hoverParent, dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
    monitor.getItem().parent = hoverParent;
  },
};
let DragableBodyRow  = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(BodyRow);

DragableBodyRow = DragSource('row', rowSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(DragableBodyRow);

class Field extends Component {
  constructor(props) {
    super(props);
  }
  components = {
    body: {
      row: DragableBodyRow,
    },
  };
  render() {
    const { data, columnsTwo, columnsOne } =this.props;
    return (
      <div className="drag-tables-component">
      <Table
        bordered
        pagination={false}
        columns={columnsOne}
        dataSource={data.data0}
        components={this.components}
        onRow={(record, index) => ({
          parent:'data0',
          index,
          moveRow: this.props.moveRow,
        })}/>
      <Table
        bordered
        pagination={false}
        columns={columnsTwo}
        dataSource={data.data1}
        components={this.components}
        footer={()=><Button type="default" onClick={this.props.handleAdd}>+新增</Button>}
        onRow={(record, index) => ({
          parent:'data1',
          index,
          moveRow: this.props.moveRow,
        })}/>
      </div>

    );
  }
}

export default DragDropContext(HTML5Backend)(Field);
