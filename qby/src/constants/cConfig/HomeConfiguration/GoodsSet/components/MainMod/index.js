import React, { Component } from 'react';
import { Table, Button, Form, Input, message } from 'antd';
import { connect } from 'dva';
import DragField from '../DragField';
import { getSearchIdApi } from '../../../../../../services/cConfig/homeConfiguration/goodSet';
import { columnsFun, columnsTwoFun } from '../columns/index';
import {columnsNewFun,columnsNewTwoFun} from  '../columns/columns2'
// import './index.less';

//dispatch 更新数据源
const FormItem = Form.Item;
class Mod extends Component {
  //新增
  handleAdd=()=> {
    let { totalList, addkey } =this.props;
    totalList.push({ key:addkey })
    this.props.dispatch({
      type:'goodsSet/getAddkey',
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
      type:'goodsSet/getMoveList',
      payload:goods
    });
    this.props.form.resetFields()
  };
  //code
  handleBlur=(e,record,valueType)=> {
    let value;
    value = e.target.value;
    if(!value) {
      return;
    }
    let { goods, totalList } =this.props;
    const invalid = totalList.findIndex(item=>{ //本行修改无效
      return (item.key == record.key)&&(item.FixedPdSpuId == value)
    });
    if(invalid!=-1) return
    this.props.dispatch({ type: 'tab/loding', payload:true});
    let params = {activityId:this.props.activityId}
    if(valueType == 'pdCode'){
      params.pdcode = value
    }else{
      params.pdSpuId = value;
    };
    getSearchIdApi(params)
    .then((res) => {
      if(res.code==0) {
        let { spuInfo } = res;
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
      type:'goodsSet/getGoodsList',
      payload:goods
    });
    this.props.form.resetFields()
  }
  render() {
    const { goods, form } =this.props;
    let columnsOne = columnsFun(form,this.handleBlur);
    let columnsTwo = columnsTwoFun(form,this.handleBlur);
    let columnsNewOne = columnsNewFun(form,this.handleBlur)
    let columnsNewTwo = columnsNewTwoFun(form,this.handleBlur)
    return (
      <DragField
        columnsOne={this.props.goodType==2 ? columnsOne : columnsNewOne}
        columnsTwo={this.props.goodType==2 ? columnsTwo : columnsNewTwo}
        handleAdd={this.handleAdd}
        goods={goods}
        onOperateClick={this.onOperateClick}
        moveRow={this.moveRow}/>
    );
  }
}

function mapStateToProps(state) {
  const { goodsSet } =state;
  return goodsSet;
}
export default connect(mapStateToProps)(Mod);
