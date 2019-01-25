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
      inputValues:{}
    }
  }
  componentDidMount() {
    this.initData();
  }
  initData() {
    const { rolelists=[] } =this.props.data;
    //初始化时reSetData
    this.props.dispatch({
      type:'baseGoodsList/reSetData',
    });
    //请求数据
    this.props.dispatch({
      type:'baseGoodsList/fetchList',
      payload: {}
    });
    this.props.dispatch({
      type:'baseGoodsList/fetchCategory',
      payload: {
        level:1,
        parentId:null,
        status:1
      }
    });
    //权限
    this.props.dispatch({
      type:'baseGoodsList/setAuthority',
      payload: rolelists
    });
  }
  //分页
  changePage = (currentPage) => {
    currentPage--;
    const { inputValues } = this.state;
    const paramsObj ={...{currentPage},...inputValues}
    this.props.dispatch({
      type:'baseGoodsList/fetchList',
      payload: paramsObj
    });
  }
  //修改pageSize
  changePageSize =(values)=> {
    const { inputValues } = this.state;
    const value  = {...values,...inputValues}
    this.props.dispatch({
      type:'baseGoodsList/fetchList',
      payload: value
    });
  }
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'baseGoodsList/fetchList',
      payload: values
    });
    this.setState({
      inputValues:values
    })
  }
  //新增商品
  addGoods(source) {
    const paneitem={
      title:'新增商品',
      key:`${this.state.componkey}edit`+source,
      componkey:`${this.state.componkey}edit`,
      data:{
        source,
        key:`${this.state.componkey}edit`+source,
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
    }
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
    const { limit, currentPage } = this.props.baseGoodsList.dataPag;
    const { componkey } = this.state;
    const paneitem={
      title:'商品编辑',
      key:`${componkey}edit${record.pdSpuId}`,
      componkey:`${componkey}edit`,
      data:{
        listParams:{
          ...this.state.inputValues,
          limit,
          currentPage
        },
        pdSpuId:record.pdSpuId,
        source:record.source,
        key:`${componkey}edit${record.pdSpuId}`
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
    const { dataList=[], categoryList, authorityList, dataPag } = this.props.baseGoodsList;
    return (
      <div className="base-goods-components qtools-components-pages">
        <FilterForm
            categoryList={categoryList}
            submit={this.searchData}
          />
        <div className="handel-btn-lists">
          {
            authorityList.authorityOnline&&
            <Button
              size="large"
              type="primary"
              onClick={()=>this.addGoods(1)}>新增线上商品</Button>
          }
          {
            authorityList.authorityOutLine&&
            <Button
              size="large"
              type="primary"
              onClick={()=>this.addGoods(0)}>新增线下商品</Button>
          }
        </div>
        <GoodsList
          list={dataList}
          onOperateClick={this.handleOperateClick.bind(this)}/>
        {
          dataList.length>0&&
          <Qpagination
            sizeOptions="2"
            onShowSizeChange={this.changePageSize}
            data={dataPag}
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
