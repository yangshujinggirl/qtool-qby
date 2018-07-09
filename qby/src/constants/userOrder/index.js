import React,{ Component } from 'react';
import { connect } from 'dva';

import Qtable from '../../components/Qtable/index';
import Qpagination from '../../components/Qpagination/index';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';



class UserOrder extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    let params = {"dateStart":"2018-06-10 00:00:00","dateEnd":"2018-07-09 23:59:59","deliveryTimeST":"","deliveryTimeET":"","limit":15,"currentPage":0}
    this.props.dispatch({
        type:'userorder/fetchList',
        payload:{values:params}
    });
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
      type:'userorder/fetchList',
      payload: {values:{currentPage}}
    });
  }
  render() {
    const { dataList=[] } = this.props.userorder;
    return (
      <div>
        <FilterForm />
        <Qtable
          dataSource={dataList}
          onOperateClick={this.handleOperateClick.bind(this)}
          columns = {Columns}/>
        <Qpagination
          data={this.props.userorder}
          onChange={this.changePage}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { userorder } = state;
  return {userorder};
}

export default connect(mapStateToProps)(UserOrder);
