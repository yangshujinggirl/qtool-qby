import React , { Component } from 'react';
import { connect } from 'dva';
import Qtable from '../../../components/Qtable';
import Qpagination from '../../../components/Qpagination';
import FilterForm from './components/FilterForm';
import columns from './columns';

import './index.less';

class SellManage extends Component {
  constructor(props) {
    super(props);
    this.state={
      fields: {
         spShopName:'',
         deliveryType:'',
         time:'',
       },
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type:'sellManage/fetchList',
      payload:{}
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
    const { fields } = this.state;
    const paramsObj ={...{currentPage},...fields}
    this.props.dispatch({
      type:'sellManage/fetchList',
      payload: paramsObj
    });
  }
  //修改pageSize
  changePageSize =(values)=> {
    this.props.dispatch({
      type:'sellManage/fetchList',
      payload: values
    });
  }
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'sellManage/fetchList',
      payload: values
    });
  }
  render() {
    const { fields } =this.state;
    const { data, list } =this.props.sellManage;
    return(
      <div className="sell-manage-pages">
        <FilterForm
          {...fields}
          submit={this.searchData}
          onValuesChange={this.handleFormChange}/>
        <Qtable
          columns={columns}
          dataSource={list}/>
        {
          list.length>0&&
          <Qpagination
            sizeOptions="2"
            onShowSizeChange={this.changePageSize}
            data={data}
            onChange={this.changePage}/>
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { sellManage } =state;
  return {sellManage};
}
export default connect(mapStateToProps)(SellManage);
