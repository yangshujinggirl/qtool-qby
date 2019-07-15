import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { DragSource, DropTarget } from 'react-dnd';
import MyTagControlContext from '../MyTagControlContext';



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
    return {
      index: dragingIndex,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props['data-row-index'];
    if (dragIndex === hoverIndex) {
      return;
    }
    props.moveRow(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
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
        item.onOperateClick = (type) => { this.props.onOperateClick(item, type) };
    })
    return data;
  }
  render() {
    let { goodsList, columns, moveRow } =this.props;
    goodsList  = this.processData(goodsList);
    return (
      <Table
        bordered
        pagination={false}
        columns={columns}
        dataSource={goodsList}
        components={this.components}
        footer={()=><Button type="default" onClick={this.props.handleAdd}>+新增</Button>}
        onRow={(record, index) => ({
          'data-row-key':record.key,
          'data-row-index':index,
          moveRow: moveRow,
        })}/>
    );
  }
}

export default MyTagControlContext(Field);
