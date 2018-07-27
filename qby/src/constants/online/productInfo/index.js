import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, message } from 'antd'

import FilterForm from './components/FilterForm/index.js';
import GoodsList from './components/GoodsList/index.js';
import Qpagination from '../../../components/Qpagination';
import { handleSellApi } from '../../../services/goodsCenter/bTipGoods.js';

class BtipGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componkey:this.props.componkey,
      selecteKeys:[],
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
      type:'productGoodsList/fetchList',
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
    //清空勾选
    this.setState({
      selecteKeys:[],
    })
    const { fields } = this.state;
    const formData = {};
    let key;
    for(key in fields) {
      formData[key] = fields[key].value;
    }
    const paramsObj ={...{currentPage},...formData}
    this.props.dispatch({
      type:'bTipGoodsList/fetchList',
      payload: paramsObj
    });
  }
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'bTipGoodsList/fetchList',
      payload: values
    });
  }
  //导出数据
  exportData() {

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
        this.sellAndSaleStop([record.pdSpuId],10)
        break;
      case "saleStop":
        this.sellAndSaleStop([record.pdSpuId],20)
        break;
    }
  }
  //售卖，停售
  sellAndSaleStop(ids,val) {
    const params = {
      status:val,
      pdSpuIds:ids
    }
    handleSellApi(params)
    .then(res => {
      console.log(res)
    })
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
        // pdSpuId:record.pdSpuId,
        pdSpuId:'25878',
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
      key:`306000editconfig${record.pdSpuId}info`,
      componkey:'306000editconfig',
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

  onCheckBoxChange(record) {
    const selecteKeys = [...this.state.selecteKeys,record.pdSpuId];
    this.setState({
      selecteKeys
    })
  }
  render() {
    const { dataList } = this.props.productGoodsList;
    const {fields} = this.state;
    return (
      <div className="bTip-goods-components qtools-components-pages">
        <FilterForm
          {...fields}
          submit={this.searchData}
          onChange={this.handleFormChange}/>
        <div className="handel-btn-lists">
          <Button size="large" type="primary" onClick={()=>this.exportData()}>导出数据</Button>
        </div>
        <GoodsList
          list={dataList}
          onChange={this.onCheckBoxChange.bind(this)}
          onOperateClick={this.handleOperateClick.bind(this)}/>
        <Qpagination
          data={this.props.productGoodsList}
          onChange={this.changePage}/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { productGoodsList } = state;
  return {productGoodsList};
}

export default connect(mapStateToProps)(BtipGoods);
