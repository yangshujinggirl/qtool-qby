import React, { Component } from 'react';
import { connect } from 'dva';

import FilterForm from './components/FilterForm/index.js';
import GoodsList from './components/GoodsList/index.js';

class BaseGoods extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    let params = {"limit":16,"currentPage":0,"source":"0"}
    this.props.dispatch({
      type:'baseGoodsList/fetchList',
      payload:{
        values:params
      }
    })
  }
  render() {
    // console.log(this.props.goods)
    return (
      <div>
        <FilterForm />
        <GoodsList />
      </div>
    )
  }
}
function mapStateToProps(state) {
  console.log(state)
  const { goods } = state;
  return {goods};
}

export default connect(mapStateToProps)(BaseGoods);
