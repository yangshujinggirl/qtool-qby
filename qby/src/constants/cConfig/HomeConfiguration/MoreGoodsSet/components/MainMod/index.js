import React, { Component } from 'react';
import { Table, Button, Form, Input, message } from 'antd';
import { connect } from 'dva';
import DragField from '../DragField';
import { getSearchIdApi } from '../../../../../../services/cConfig/homeConfiguration/moreGoodsSet';
import { columnsFun, columnsTwoFun } from '../columns/index';
// import './index.less';

//dispatch 更新数据源
const FormItem = Form.Item;
class Mod extends Component {
  //新增
  handleAdd=()=> {
    let { goods, addkey } =this.props;
    let { listOne, listTwo } =goods;
    if(listOne.length>=6) {
      listTwo.push({ key:addkey })
    }  else {
      listOne.push({ key:addkey })
    }
    goods={ ...goods,listOne, listTwo};
    this.props.dispatch({
      type:'moreGoodsSet/getAddkey',
      payload:addkey
    });
    this.callBack(goods);
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
    this.callBack(goods);
  }
  moveRow = (dragParent, hoverParent, dragIndex, hoverIndex) => {
    let { goods } =this.props;
    let tempHover = goods[dragParent][dragIndex];
    let tempDrag = goods[hoverParent][hoverIndex];
    goods[hoverParent].splice(hoverIndex, 1, tempHover);
    goods[dragParent].splice(dragIndex, 1, tempDrag);
    this.callBack(goods);
  };
  //code
  handleBlur=(listType,e,index)=> {
    let value;
    value = e.target.value;
    if(!value) {
      return;
    }
    let { goods, totalList } =this.props;
    this.props.dispatch({ type: 'tab/loding', payload:true});
    getSearchIdApi({pdSpuId:value})
    .then((res) => {
      if(res.code==0) {
        let { spuInfo } =res;
        let idx = totalList.findIndex((el) => el.FixedPdSpuId == spuInfo.pdSpuId);
        if(idx != -1) {
          message.error('商品重复，请重新添加');
        } else {
          goods[listType] = goods[listType].map((el,idx) => {
            if(index == idx) {
              el.FixedPdSpuId = spuInfo.pdSpuId;
              el = {...el,...spuInfo};
            };
            return el
          });
          this.callBack(goods);
        }
      }
      this.props.dispatch({ type: 'tab/loding', payload:false});
    })
  }
  callBack=(goods)=> {
    this.props.dispatch({
      type:'moreGoodsSet/getGoodsList',
      payload:goods
    });
    this.props.form.resetFields()
  }
  render() {
    const { goods, form } =this.props;
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
  const { moreGoodsSet } =state;
  return moreGoodsSet;
}
export default connect(mapStateToProps)(Mod);
