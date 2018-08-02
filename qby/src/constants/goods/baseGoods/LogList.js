import React,{ Component } from 'react';
import Columns from './columns/index.js';
import Qtable from '../../../components/Qtable';
import Qpagination from '../../../components/Qpagination';
import { getLogListApi } from '../../../services/goodsCenter/baseGoods';

class LogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logData:{}
    }
  }
  componentWillMount() {
    this.getLogList({
        pdSpuId:this.props.data.pdSpuId
    })
  }
  getLogList(values) {
    getLogListApi(values)
    .then(res => {
      this.setState({
        logData:res
      })
    })
  }
  //点击分页
  changePage = (currentPage) => {
    this.props.dispatch({
      type:'userorders/fetchList',
      payload: {values:{currentPage}}
    });
  }
  render() {
    const dataSource = [];
    const { data=[] } =this.state.logData;
    return(
      <div>
        <Qtable
          dataSource={data}
          columns = {Columns}/>
        <Qpagination
          data={this.state.logData}
          onChange={this.changePage}/>
      </div>
    )
  }
}


export default LogList;
