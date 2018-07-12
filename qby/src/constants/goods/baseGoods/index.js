import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd'

import FilterForm from './components/FilterForm/index.js';
import GoodsList from './components/GoodsList/index.js';
import Qpagination from '../../../components/Qpagination';

import './index.css';

class BaseGoods extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.dispatch({
      type:'baseGoodsList/fetchList',
      payload:{}
    })
  }
  //分页
  changePage = (currentPage) => {
    this.props.dispatch({
      type:'baseGoodsList/fetchList',
      payload: {currentPage}
    });
  }
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'baseGoodsList/fetchList',
      payload: values
    });
  }
  render() {
    const { dataList=[] } = this.props.baseGoodsList;
    return (
      <div className="base-goods-components">
        <FilterForm submit={this.searchData}/>
        <div className="add-btn-lists">
          <Button size="large" type="primary">新增线上商品</Button>
          <Button size="large" type="primary">新增线下商品</Button>
        </div>
        <GoodsList list={dataList}/>
        <Qpagination
          data={this.props.baseGoodsList}
          onChange={this.changePage}/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { baseGoodsList } = state;
  return {baseGoodsList};
}

export default connect(mapStateToProps)(BaseGoods);
