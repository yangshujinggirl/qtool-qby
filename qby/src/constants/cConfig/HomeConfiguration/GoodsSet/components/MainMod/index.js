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
    let { totalList, addkey } = this.props;
    totalList.push({
      key:addkey,
    })
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
    let value = e.target.value;
    if(!value) {return}
    let { totalList,goodType } = this.props;
    let params = {};
    if(goodType == 2){ //上新商品
      const isValid = this.removeRepeat(totalList,value,'pdSpuId',record);
      if(isValid){
        params.pdSpuId = value
      }else{
        return 
      };
    }else{//活动商品
      params.activityId = this.props.activityId;
      if(valueType == 'pdCode'){ // 填写的是pdCode
        const isValid = this.removeRepeat(totalList,value,'pdCode',record);
        if(isValid){
          params.pdcode = value;
        }else{
          return 
        };
      }else{//填写的是pdSpuId
        const invalid = totalList.findIndex(item=>{ //本行修改无效
          return (item.key == record.key)&&(item.pdSpuId == value)
        });
        if(invalid!=-1){ return null }
        params.pdSpuId = value;
      };
    };
    this.sendRequest(params,totalList,record);
  }
  //对数据做去重
  removeRepeat =(totalList,value,inputType,record)=> {
    const invalid = totalList.findIndex(item=>{ //本行修改无效
      return (item.key == record.key)&&(item[inputType] == value)
    });
    if(invalid!=-1){ return null }
    const isRepeat = totalList.findIndex(item=>item[inputType] == value);
    if(isRepeat !== -1){
      if(inputType == 'pdCode'){
        message.error('商品编码'+value+'重复');
      }else{
        message.error('pdSpuid'+value+'重复')
      };
      return null
    };
    return true;
  }
  //请求
  sendRequest =(params,totalList,record)=>{
    this.props.dispatch({ type: 'tab/loding', payload:true});
    getSearchIdApi(params)
    .then((res) => {
      if(res.code == 0) {
        let { spuInfo } = res;
        const idx = totalList.findIndex((item)=>item.pdCode == spuInfo.pdCode && item.pdSpuId == spuInfo.pdSpuId);
        if(idx != -1){
          message.error('商品重复,请重新添加');
        }else{
          totalList = totalList.map((el,idx) => {
            if(el.key == record.key) {
              el.pdSpuId = spuInfo.pdSpuId;
              el = {...el,...spuInfo};
            };
            return el
          });
          this.callBack(totalList);
       };
      };
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
    const { goods, form } = this.props;
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
