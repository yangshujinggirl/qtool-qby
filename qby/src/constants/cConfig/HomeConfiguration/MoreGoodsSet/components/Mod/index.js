import React, { Component } from 'react';
import { Table, Button, Form } from 'antd';
import { connect } from 'dva';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import DragField from '../DragField';
import { columnsFun, columnsTwoFun } from '../columns';


class Mod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
        data0:[
          {
            key: '1',
            name: '商品名称商品名称商品名称商品名称商品名称',
            classify:'一级商品分类',
            price:'¥33.99-¥99.33',
            qty:'1290',
            shop:'2家',
          },
          {
            key: '2',
            name: 'Jim Green',
            classify:'一级商品分类',
            price:'¥33.99-¥99.33',
            qty:'120',
            shop:'2家',
          },
          {
            key: '3',
            name: 'Green',
            classify:'一级商品分类',
            price:'¥33.99-¥99.33',
            qty:'110',
            shop:'1家',
          },
        ],
        data1:[
          {
            key: '4',
            name: '商品名称商品名称商品名称商品名称商品名称',
            classify:'一级商品分类',
            price:'¥33.99-¥99.33',
            qty:'1290',
            shop:'2家',
          },
          {
            key: '5',
            name: 'Jim Green',
            classify:'一级商品分类',
            price:'¥33.99-¥99.33',
            qty:'120',
            shop:'2家',
          },
          {
            key: '6',
            name: 'Green',
            classify:'一级商品分类',
            price:'¥33.99-¥99.33',
            qty:'110',
            shop:'1家',
          },
        ]
      },
      dataList:[],
      key:6
    }
  }
  //表单change
  handleChange=(type,name,e,index)=> {
    let value;
    switch(type) {
      case 'input':
        value = e.target.value;
        break;
      case 'select':
        value = e;
        break;
      case 'fileList':
        value = e;
        break;
    }
    let { goodsList } =this.props;
    if(!value) {
      goodsList[index][name]=null;
    } else {
      goodsList[index][name]=value;
    }
    this.handleCallback(goodsList)
  }
  //新增
  handleAdd=()=> {
    let { key, dataList, data } =this.state;
    let { data0, data1 } =data;
    key++;
    if(data0.length>=6) {
      data1.push({ key })
    }  else {
      data0.push({ key })
    }
    data={ ...data,data0,data1};
    this.setState({ key:key, data  });
  }
  //删除
  handleDelete=(key)=> {
    let { dataList } =this.state;
    dataList = dataList.filter(item => item.key !== key)
    this.setState({ dataList  });
  }
  moveRow = (dragParent, hoverParent, dragIndex, hoverIndex) => {
    let { data } =this.state;
    let tempHover = data[dragParent].splice(dragIndex,1);
    let tempDrag = data[hoverParent].splice(hoverIndex,1);
    data[hoverParent].splice(hoverIndex, 0, ...tempHover);
    data[dragParent].splice(dragIndex, 0, ...tempDrag);
    this.setState({ data });
  };
  render() {
    const { data } =this.state;
    const { form } =this.props;
    let columnsOne = columnsFun(form,this.handleChange);
    let columnsTwo = columnsTwoFun(form,this.handleChange);
    return (
      <div>
        <DragField
          columnsOne={columnsOne}
          columnsTwo={columnsTwo}
          handleAdd={this.handleAdd}
          data={data}
          moveRow={this.moveRow}/>
      </div>
    );
  }
}
const ModF = Form.create({
  mapPropsToFields(props) {
    return {
      goods: Form.createFormField(props.goodsList),
    };
  }
})(Mod);
function mapStateToProps(state) {
  const { morePicSet } =state;
  return morePicSet;
}
export default connect(mapStateToProps)(ModF);
// export default Mod;
