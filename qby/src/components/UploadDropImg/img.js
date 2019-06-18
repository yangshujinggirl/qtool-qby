import React,{Component} from 'react'
import {Icon} from 'antd'
import './index.less'
import { //引入react-dnd
    DragSource,
    DropTarget,
} from 'react-dnd'
var _  = require('lodash');


const Types = {
  CARD:'CARD'
}
const ImgSource = {
  beginDrag(props,monitor,component){ //拖拽开始时触发的事件，必须，返回props相关事件
    return {
      index:props.index
    }
  },
  endDrag(props,monitor,component){
    //拖拽结束时的事件
  }
}
function collect(connect,monitor){ //通过这个函数可以通过this.props获取该函数返回的所有属性
  return{
    connectDragSource:connect.dragSource(),
    isDragging:monitor.isDragging()
  }
}
const ImgTarget = {
  drop(props,monitor,component){
    if(!component) return null;
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if(dragIndex == hoverIndex) return;
    props.onImg(dragIndex,hoverIndex)
  }
}
function collect1(connect,monitor){
  return {
    connectDragTarget:connect.dropTarget(),
    // isOver:monitor.isOver(), //source是否在Target上方
    // isOverCurrent:monitor.isOver({shallow:true}),
    // canDrop:monitor.canDrop(),//能否被放置
    // itemType:monitor.getItemType(),//获得拖拽组件type
  }
}
class Img extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    const {isDragging,connectDragSource,connectDragTarget} = this.props;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    const {img} = this.props;
    return(
      connectDragSource(
        connectDragTarget(
        <div className='img_container'>
            <img style={{width:'86px',height:'86px'}} src={fileDomain+img}/>
              <div className="mask-box">
                <div className='mask'>
                  <div className='enlarge'>
                    <Icon
                      onClick={this.props.enLarge}
                      style={{'fontSize':'16px',color:'#fafafa'}}
                      type="eye" />
                  </div>
                  <div className='delete'>
                    <Icon
                      onClick={this.props.onDelete}
                      style={{'fontSize':'16px',color:'#fafafa',}}
                      type="delete" />
                  </div>
              </div>
            </div>
          </div>
        )
      )
    )
  }
}
export default _.flow(
  DragSource(Types.CARD,ImgSource,collect),
  DropTarget(Types.CARD,ImgTarget,collect1)
)(Img)
