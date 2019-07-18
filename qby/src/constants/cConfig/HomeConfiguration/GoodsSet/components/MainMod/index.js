import React, { Component } from 'react';
import { Table, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import DragField from '../DragField';
import { columnsFun, columnsTwoFun } from '../columns/index';
// import './index.less';

//dispatch 更新数据源
const FormItem = Form.Item;
class Mod extends Component {
  //新增
  handleAdd=()=> {
    let { goods, addkey } = this.props;
    let { listOne, listTwo } = goods;
    if(listOne.length>=8) {
      listTwo.push({ key:addkey })
    }  else {
      listOne.push({ key:addkey })
    }
    goods={ ...goods,listOne, listTwo};
    this.props.callBack(goods);
  }
  //表单事件
  onOperateClick=(record,listType,type)=> {
    switch(type) {
      case 'delete':
        this.handleDelete(listType,record);
        break;
    }
  }
  handleDelete=(listType,record)=> {
    let { goods } =this.props;
    goods[listType] = goods[listType].filter(item => item.key !== record.key)
    this.props.callBack(goods);
  }
  moveRow = (dragParent, hoverParent, dragIndex, hoverIndex) => {
    let { goods } =this.props;
    let tempHover = goods[dragParent][dragIndex];
    let tempDrag = goods[hoverParent][hoverIndex];
    goods[hoverParent].splice(hoverIndex, 1, tempHover);
    goods[dragParent].splice(dragIndex, 1, tempDrag);
    this.props.callBack(goods);
  };
  //code
  handleBlur=(listType,e,index)=> {
    let value;
    value = e.target.value;
    if(!value) {
      return;
    }
    this.getSearch(listType,value,index)
  }
  //code查询商品
  getSearch(listType,value,index) {
    let { goods } =this.props;
    let res={
      pdSpuName: '奶粉',
      pdSpuId:'3456',
      pdCategory:'3级商品分类',
      pdSpuPrice:'¥200-¥999.33',
      wsInv:'1290',
      outOfStockShopNum:'2家',
    };
    goods[listType] = goods[listType].map((el,idx) => {
      if(index == idx) {
        el = {...el,...res}
      };
      return el
    });
    this.props.callBack(goods);
  }
  render() {
    const { goods, form } = this.props;
    let columnsOne = columnsFun(form,this.handleBlur);
    let columnsTwo = columnsTwoFun(form,this.handleBlur);

    return (
      <DragField
        columnsOne={columnsOne}
        columnsTwo={columnsTwo}
        handleAdd={this.handleAdd}
        goods={goods}
        onOperateClick={this.onOperateClick}
        moveRow={this.moveRow}/>
    );
  }
}

function mapStateToProps(state) {
  const { goodsSet } = state;
  return goodsSet;
}
export default connect(mapStateToProps)(Mod);
