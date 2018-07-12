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
    this.state = {
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
  //
  formData(obj) {
    console.log(obj)
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
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'baseGoodsList/fetchList',
      payload: values
    });
  }
  render() {
    const { dataList=[] } = this.props.baseGoodsList;
    const {fields} = this.state;
    return (
      <div className="base-goods-components">
        <FilterForm
          {...fields}
          submit={this.searchData}
          onChange={this.handleFormChange}/>
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
