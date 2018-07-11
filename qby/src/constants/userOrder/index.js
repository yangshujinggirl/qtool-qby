import React,{ Component } from 'react';
import { connect } from 'dva';

import Qtable from '../../components/Qtable/index';
import Qpagination from '../../components/Qpagination/index';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';
import {getList} from '../../services/orderCenter/userOrders.js';



class UserOrder extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    let params = {"dateStart":"2018-06-10 00:00:00","dateEnd":"2018-07-09 23:59:59","deliveryTimeST":"","deliveryTimeET":"","limit":15,"currentPage":0}
    this.props.dispatch({
        type:'userorders/fetchList',
        payload:{values:params}
    });
    // getList(params)
    // .then(res =>{
    //   console.log(res)
    // },error => {
    //   console.log(error)
    // })
  }
  //操作
  handleOperateClick(record,type) {
    switch(type) {
      case "detail" :
        console.log('详情');
        break;
      case "edit" :
        console.log('编辑');
        break;
    }
  }
  //点击分页
  changePage = (currentPage) => {
    this.props.dispatch({
      type:'userorders/fetchList',
      payload: {values:{currentPage}}
    });
  }
  render() {
    const { dataList=[] } = this.props.userorders;
    return (
      <div>
        <FilterForm />
        <Qtable
          dataSource={dataList}
          onOperateClick={this.handleOperateClick.bind(this)}
          columns = {Columns}/>
        <Qpagination
          data={this.props.userorders}
          onChange={this.changePage}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { userorders } = state;
  return {userorders};
}

export default connect(mapStateToProps)(UserOrder);
