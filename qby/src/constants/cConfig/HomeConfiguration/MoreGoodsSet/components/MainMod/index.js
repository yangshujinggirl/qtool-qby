import React, { Component } from 'react';
import { Table, Button, Form, Input, message } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import DragField from '../DragField';
import { getSearchIdApi } from '../../../../../../services/cConfig/homeConfiguration/moreGoodsSet';
import { columnsFun, columnsTwoFun } from '../columns/index';
// import './index.less';

//dispatch 更新数据源
const FormItem = Form.Item;
class Mod extends Component {
  //新增
  handleAdd=()=> {
    let { totalList, addkey } =this.props;
    totalList.push({ key:addkey })
    this.props.dispatch({
      type:'moreGoodsSet/getAddkey',
      payload:addkey
    });
    this.callBack(totalList);
  }
  //表单事件
  onOperateClick=(record,type)=> {
    switch(type) {
      case 'delete':
        this.handleDelete(record);
        break;
    }
  }
  handleDelete=(record)=> {
    let { totalList } =this.props;
    totalList = totalList.filter(item => item.key !== record.key);
    this.callBack(totalList);
  }
  moveRow = (dragParent, hoverParent, dragIndex, hoverIndex) => {
    let { goods } =this.props;
    let tempHover = goods[dragParent][dragIndex];
    let tempDrag = goods[hoverParent][hoverIndex];
    goods[hoverParent].splice(hoverIndex, 1, tempHover);
    goods[dragParent].splice(dragIndex, 1, tempDrag);
    this.props.dispatch({
      type:'moreGoodsSet/getMoveList',
      payload:goods
    });
    this.props.form.resetFields()
  };
  //code
  handleBlur=(e,record)=> {
    let value;
    // value = e.target.value;
    value = lodash.trim(e.target.value)
    if(!value) {
      return;
    }
    if(value == record.FixedPdSpuId) {
      return;
    }
    let { goods, totalList } =this.props;
    this.props.dispatch({ type: 'tab/loding', payload:true});
    getSearchIdApi({pdSpuId:value,type:0})
    .then((res) => {
      if(res.code==0) {
        let { spuInfo } =res;
        let idx = totalList.findIndex((el) => el.FixedPdSpuId == spuInfo.pdSpuId);
        if(idx != -1) {
          message.error('商品重复，请重新添加');
        } else {
          totalList = totalList.map((el,idx) => {
            if(el.key == record.key) {
              el.FixedPdSpuId = spuInfo.pdSpuId;
              el = {...el,...spuInfo};
            };
            return el
          });
          this.callBack(totalList);
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
