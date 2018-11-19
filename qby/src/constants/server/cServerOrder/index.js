import React, { Component } from 'react';
import { connect } from 'dva';
import FilterForm from './components/FilterForm';
import Qtable from '../../../components/Qtable';
import Qpagination from '../../../components/Qpagination';
import columns from './columns/index.js';
import { getListApi } from '../../../services/server/cServerOrder';
import './index.less';

class CserverOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
         ticketId:'',
         subject:'',
         status:'',
         priority:'',
         agentGroupname:'',
        //  cellphone:'',
         handleTimeType:'',
         creatertime:''
       },
    }
  }
  componentDidMount() {
    this.initPage()
  }
  initPage() {
    this.props.dispatch({
      type:'cServerOrder/fetchList',
      payload:{}
    })
  }
  //双向绑定表单
  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'cServerOrder/fetchList',
      payload: values
    });
  }
  changePage = (currentPage) => {
    currentPage--;
    const { fields } = this.state;
    const paramsObj ={...{currentPage},...fields}
    this.props.dispatch({
      type:'cServerOrder/fetchList',
      payload: paramsObj
    });
  }
  //修改pageSize
  changePageSize =(values)=> {
    this.props.dispatch({
      type:'cServerOrder/fetchList',
      payload: values
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

  render() {
    const { data } = this.props.cServerOrder;
    return (
      <div className="qtools-components-pages">
        <FilterForm
          submit={this.searchData}
          onValuesChange={this.handleFormChange}/>
        <div className="table-list">
          <Qtable
            dataSource={data.list}
            onOperateClick={this.getDetail.bind(this)}
            columns={columns}/>
        </div>
        {
          data.list.length>0&&
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
  const { cServerOrder } =state;
  return { cServerOrder };
}
export default connect(mapStateToProps)(CserverOrder);
