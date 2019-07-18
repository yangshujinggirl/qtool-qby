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
    let dragingIndex = props['data-row-index'];
    let dragingParent = props['data-row-parent'];
    return {
      index: dragingIndex,
      parent:dragingParent
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props['data-row-index'];
    const hoverParent = props['data-row-parent'];
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
  //绑定方法
  processData(data) {
    if(!this.props.onOperateClick) {
      return data;
    }
    data && data.map((item, i) => {
        item.onOperateClick = (listType,type) => { this.props.onOperateClick(item,listType, type) };
    })
    return data;
  }
  render() {
    const { goods, columnsTwo, columnsOne } = this.props;
    let listTwo = this.processData(goods.listTwo)
    let listOne = this.processData(goods.listOne)
    return (
      <div className="drag-tables-component">
        <Table
          bordered
          pagination={false}
          columns={columnsOne}
          dataSource={listOne}
          components={this.components}
          onRow={(record, index) => ({
            'data-row-key':record.key,
            'data-row-parent':'listOne',
            'data-row-index':index,
            moveRow: this.props.moveRow,
          })}/>
        <Table
          bordered
          pagination={false}
          columns={columnsTwo}
          dataSource={listTwo}
          components={this.components}
          footer={()=><Button type="default" onClick={this.props.handleAdd}>+新增</Button>}
          onRow={(record, index) => ({
            'data-row-key':record.key,
            'data-row-index':index,
            'data-row-parent':'listTwo',
            moveRow: this.props.moveRow,
          })}/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Field);
