import React, { Component } from 'react';
import {Button} from 'antd'
import { connect } from 'dva';
import FilterForm from './components/FilterForm';
import Qtable from '../../../components/Qtable';
import Qpagination from '../../../components/Qpagination';
import columns from './columns/index.js';
import './index.less';

class ExchangeAct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValues:{}
    }
  }
  componentDidMount() {
    this.initPage()
  }
  initPage() {
    this.props.dispatch({
      type:'exchangeAct/fetchList',
      payload:{}
    })
  }
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'exchangeAct/fetchList',
      payload: values
    });
    this.setState({
      inputValues:values
    })
  }
  changePage = (currentPage) => {
    currentPage--;
    const { inputValues } = this.state;
    const paramsObj ={...{currentPage},...inputValues}
    this.props.dispatch({
      type:'exchangeAct/fetchList',
      payload: paramsObj
    });
  }
  //修改pageSize
  changePageSize =(values)=> {
    const { inputValues } = this.state;
    const paramsObj = {...inputValues,...values}
    this.props.dispatch({
      type:'exchangeAct/fetchList',
      payload:paramsObj
    });
  }
  getDetail(record) {
    const { componkey } =this.props;
    const paneitem={
      title:'C端客服工单详情',
      key:`${componkey}edit${record.udeskTicketId}info`,
      componkey:`${componkey}info`,
      data:{
        udeskTicketId:record.udeskTicketId,
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  addGoods =()=> {
    const paneitem = {
      title:'新建商品',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }

  render() {
    const { dataList } = this.props.exchangeAct;
    return (
      <div className="qtools-components-pages">
        <FilterForm
          submit={this.searchData}
        />
        <div className="handel-btn-lists">
        {
          1 ?
            <Button
              type='primary'
              size='large'
              onClick={this.addGoods}>
              新增商品
            </Button>
          : null
        }

        </div>
        <div className="table-list">
          <Qtable
            dataSource={dataList}
            onOperateClick={this.getDetail.bind(this)}
            columns={columns}/>
        </div>
        {
          dataList.length>0&&
          <Qpagination
            sizeOptions="1"
            onChange={this.changePage}
            onShowSizeChange={this.changePageSize}
            data={data}/>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { exchangeAct } =state;
  return { exchangeAct };
}
export default connect(mapStateToProps)(ExchangeAct);
