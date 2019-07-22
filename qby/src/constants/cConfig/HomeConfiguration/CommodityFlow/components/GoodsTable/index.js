import React, { Component } from 'react';
import { Table, Button, Form, Input, message } from 'antd';
import { connect } from 'dva';
import DragTableField from '../DragTableField';
import { columnsFun } from '../columns/index';
import { getSearchIdApi } from '../../../../../../services/cConfig/homeConfiguration/commodityFlow';

import './index.less';

//dispatch 更新数据源
const FormItem = Form.Item;
class GoodsTable extends Component {
  constructor(props) {
    super(props);
    this.state={
      firstIn:true,
      key:this.props.goodsList.length
    }
  }
  componentWillReceiveProps(props) {
    if(this.state.firstIn) {
      this.setState({ key: props.goodsList.length })
    }
  }
  updateData(goodsList) {
    this.props.dispatch({
      type:'commodityFlow/getGoodsList',
      payload:goodsList
    })
    this.props.form.resetFields();
  }
  //新增
  handleAdd=()=> {
    let { goodsList, addkey } =this.props;
    let { key } =this.state;
    key++
    this.setState({ key, firstIn:false });
    goodsList.push({ key, isFixed:0 });
    this.updateData(goodsList);
  }
  //表单事件
  onOperateClick=(record,type)=> {
    switch(type) {
      case 'delete':
        this.handleDelete(record);
        break;
      case 'toggle':
        this.handleToggleStatus(record);
        break;
    }
  }
  handleDelete=(record)=> {
    let { goodsList } =this.props;
    goodsList = goodsList.filter(item => item.key !== record.key)
    this.updateData(goodsList);
  }
  handleToggleStatus=(record)=> {
    let { goodsList } =this.props;
    goodsList.map((el,index) => {
      if(el.pdSpuId == record.pdSpuId) {
        el.isFixed = 0;
      }
    })
    this.updateData(goodsList);
  }
  moveRow = (dragIndex, hoverIndex) => {
    let { goodsList } =this.props;
    let tempHover = goodsList[dragIndex];
    let tempDrag = goodsList[hoverIndex];
    goodsList.splice(hoverIndex, 1, tempHover);
    goodsList.splice(dragIndex, 1, tempDrag);
    this.updateData(goodsList);
  };
  //code
  handleBlur=(e,index)=> {
    let value;
    value = e.target.value;
    if(!value) {
      return;
    }
    let { goodsList } =this.props;
    getSearchIdApi({pdSpuId:value})
    .then((res) => {
      const { spuInfo, code }=res;
      if(code == '0') {
        let idx = goodsList.findIndex((el) => el.FixedPdSpuId == spuInfo.pdSpuId);
        if(idx != -1) {
          message.error('商品重复，请重新添加');
        } else {
          goodsList[index]={...goodsList[index],...spuInfo};
          goodsList[index].FixedPdSpuId= spuInfo.pdSpuId;
        }
        this.updateData(goodsList);
      }
    });
  }
  render() {
    const { goodsList, form } =this.props;
    let columns = columnsFun(form,this.handleBlur);

    return (
      <div className="commodity-flow-goods-table-component">
        <DragTableField
          columns={columns}
          handleAdd={this.handleAdd}
          goodsList={goodsList}
          onOperateClick={this.onOperateClick}
          moveRow={this.moveRow}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { commodityFlow } =state;
  return commodityFlow;
}
export default connect(mapStateToProps)(GoodsTable);
