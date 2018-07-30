import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd'

import FilterForm from './components/FilterForm/index.js';
import GoodsList from './components/GoodsList/index.js';
import Qpagination from '../../../components/Qpagination';

import './index.less';

class BaseGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componkey:this.props.componkey,
      fields: {
         code: {
           value: '',
         },
         name: {
           value: '',
         },
         brandName: {
           value: '',
         },
         pdCategory1Name: {
           value: '',
         },
         infoStatus: {
           value: '',
         },
         source: {
           value: '',
         },
       },
    }
  }
  componentWillMount() {
    this.props.dispatch({
      type:'baseGoodsList/fetchList',
      payload:{}
    })
  }
  //双向绑定表单
  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }
  //分页
  changePage = (currentPage) => {
    const { fields } = this.state;
    const formData = {};
    let key;
    for(key in fields) {
      formData[key] = fields[key].value;
    }
    const paramsObj ={...{currentPage},...formData}
    this.props.dispatch({
      type:'baseGoodsList/fetchList',
      payload: paramsObj
    });
  }
  //修改pageSize
  changePageSize =(values)=> {
    this.props.dispatch({
      type:'baseGoodsList/fetchList',
      payload: values
    });
  }
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'baseGoodsList/fetchList',
      payload: values
    });
  }
  //新增商品
  addGoods(source) {
    const paneitem={
      title:'新增商品',
      key:`${this.state.componkey}edit`,
      componkey:`${this.state.componkey}edit`,
      data:{
        pdSpuId:null,
        source,
        key:`${this.state.componkey}edit`,
      }
    }
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  //操作
  handleOperateClick(record,type) {
    switch(type) {
      case "detail":
        this.getDetail(record)
        break;
      case "edit":
        this.getEdit(record)
        break;
      case "log":
        this.getLog(record)
        break;
      case "sell":
        this.sellAndSaleStop(10,record)
        break;
      case "saleStop":
        this.sellAndSaleStop(20,record)
        break;
    }
  }
  //售卖，停售
  sellAndSaleStop(type,id) {

  }
  //详情
  getDetail(record) {
    const paneitem={
      title:'商品详情',
      key:`${this.state.componkey}edit${record.pdSpuId}info`,
      componkey:`${this.state.componkey}info`,
      data:{
        pdSpuId:record.pdSpuId,
        source:record.source
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  //编辑。
  getEdit(record) {
    const paneitem={
      title:'商品编辑',
      key:`${this.state.componkey}edit${record.pdSpuId}`,
      componkey:`${this.state.componkey}edit`,
      data:{
        pdSpuId:record.pdSpuId,
        source:record.source,
        key:`${this.state.componkey}edit${record.pdSpuId}`
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  //日志
  getLog(record) {
    const paneitem={
      title:'商品日志',
      key:`${this.state.componkey}editconfig${record.pdSpuId}info`,
      componkey:`${this.state.componkey}editconfig`,
      data:{
        pdSpuId:record.pdSpuId,
        source:record.source,
        key:`${this.state.componkey}edit${record.pdSpuId}`
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  render() {
    const { dataList=[] } = this.props.baseGoodsList;
    const {fields} = this.state;
    return (
      <div className="base-goods-components qtools-components-pages">
        <FilterForm
          {...fields}
          submit={this.searchData}
          onChange={this.handleFormChange}/>
        <div className="handel-btn-lists">
          <Button size="large" type="primary" onClick={()=>this.addGoods(1)}>新增线上商品</Button>
          <Button size="large" type="primary" onClick={()=>this.addGoods(0)}>新增线下商品</Button>
        </div>
        {
          dataList.length>0?
          <GoodsList list={dataList} onOperateClick={this.handleOperateClick.bind(this)}/>
          :
          <div>暂无数据</div>
        }
        {
          dataList.length>0&&
          <Qpagination
            onShowSizeChange={this.changePageSize}
            data={this.props.baseGoodsList}
            onChange={this.changePage}/>
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { baseGoodsList } = state;
  return {baseGoodsList};
}

export default connect(mapStateToProps)(BaseGoods);
