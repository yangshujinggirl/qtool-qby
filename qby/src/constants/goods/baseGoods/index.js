import React, { Component } from 'react';
import { connect } from 'dva';

import FilterForm from './components/FilterForm/index.js';
import GoodsList from './components/GoodsList/index.js';

class BaseGoods extends Component {
  render() {
    console.log(this.props.goods)
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
