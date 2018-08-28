import React, { Component } from 'react';
import { Button, Modal, message } from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../../components/Qtable/index'; //表单
import Qpagination from '../../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'

class DataDistribute extends Component{
  constructor(props){
    super(props);
    this.state ={
      field:{
        shopName:'',
        type:'',
      }
    }
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'dataDistribute/fetchList',
      payload:values
    })
  }
  //点击分页
  changePage =(current)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'dataDistribute/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'dataDistribute/fetchList',
      payload:{currentPage,limit}
    });
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    this.setState({field:values});
  }
  //初始化数据
  componentWillMount(){
    debugger
    this.props.dispatch({
      type:'dataDistribute/fetchList',
      payload:{}
    })
  }
  render(){
    const {dataList} = this.props.dataspcun.distributeData;
    console.log(dataList)
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div className="handel-btn-lists">
            <Button size='large' type='primary'>导出数据</Button>
        </div>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
        />
        <Qpagination
          data={this.props.dataspcun}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}
        />
      </div>
    )
  }
}
function mapStateToProps(state){
  const {dataspcun} = state;
  return {dataspcun};
}
export default connect(mapStateToProps)(DataDistribute);
