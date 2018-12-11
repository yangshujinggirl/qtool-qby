import React , { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Qtable from '../../../components/Qtable';
import Qpagination from '../../../components/Qpagination';
import FilterForm from './components/FilterForm';
import columns from './columns';

import './index.less';

class FreightDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
      fields: {
         time:[],
       },
       startDate:'',
       endDate:''
    }
  }
  componentDidMount() {
    this.getNowFormatDate()
  }
  //获取当前时间
  getNowFormatDate = () =>{
    let nowDate = moment().format('YYYY-MM-DD');
    let lastDate = moment().add(-1,'month').format('YYYY-MM-DD');
    this.setState({
      startDate:lastDate,
      endDate:nowDate,
      fields:{
        time:[lastDate,nowDate]
      }
    },() => {
      this.getList()
    })
  }
  getList=(value)=> {
    let params = {
      shopId:this.props.shopId
    }
    const { time } =this.state.fields;
    if(time.length>0) {
      params.startDate = moment(time[0]).format('YYYY-MM-DD');
      params.endDate = moment(time[1]).format('YYYY-MM-DD');
    }
    if(value) {
      params = {...params,...value}
    }
    this.props.dispatch({
      type:'freightDetail/fetchList',
      payload:params
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
    currentPage--;
    this.getList({currentPage})
  }
  render() {
    const { fields, endDate, startDate } =this.state;
    const { data, list, totalData } =this.props.freightDetail;
    return(
      <div className="frieght-detail-pages">
        <FilterForm
          {...fields}
          startDate={startDate}
          endDate={endDate}
          submit={this.getList}
          onValuesChange={this.handleFormChange}/>
        <div className="total-data">
          共<span className="num">{totalData.totalOrders}</span>单，
          配送费用<span className="num">{totalData.totalExpressAmount}</span>元
        </div>
        <Qtable
          columns={columns}
          dataSource={list}/>
        {
          list.length>0&&
          <Qpagination
            sizeOptions="1"
            onShowSizeChange={(value)=>this.getList(value)}
            data={data}
            onChange={this.changePage}/>
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { freightDetail } =state;
  return {freightDetail};
}
export default connect(mapStateToProps)(FreightDetail);
