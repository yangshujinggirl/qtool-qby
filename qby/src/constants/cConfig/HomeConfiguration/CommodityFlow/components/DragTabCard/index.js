import React, { Component } from 'react';
import { Tabs, Button, Form, Input, Icon } from 'antd';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'dva';
import update from 'immutability-helper';



const FormItem = Form.Item;
const rowSource = {
  beginDrag(props) {
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
    }
    props.moveRow(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};
class Card extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget } = this.props;
    const { index, handleToggle, handleDelete, item,  selectkey } =this.props;
    const { getFieldDecorator } =this.props.form;
    return connectDragSource(
      connectDropTarget(
        <div className={`item-tabs ${selectkey==item.key?'selectkey':''}`} onClick={()=>handleToggle(item)}>
          <FormItem>
            {getFieldDecorator(`tabsField[${index}].tabName`,{
              initialValue:item.tabName,
              rules:[{
                required: true,message:'请输入请输入名称'
              },{
                validator:this.props.validator
              }],
            })(
              <Input
                maxLength='4'
                placeholder="请输入请输入名称"
                autoComplete="off"/>
            )}
          </FormItem>
          <Icon type="close" className="close-btn" onClick={(e)=>handleDelete(e,item)}/>
        </div>
      ),
    );
  }
}

let DragableCard  = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(Card);

DragableCard = DragSource('row', rowSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(DragableCard);

export default DragableCard;