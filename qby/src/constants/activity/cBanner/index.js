import React, { Component } from 'react';
import {connect} from 'dva'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import Columns from './columns/index'
import NormalForm from './FilterForm/index'

class Cbanner extends Component{
  constructor(props){
    super(props);
    this.state = {
      fields: {
        userName: {
          value: '',
        },
        name: {
          value: '',
        },
        status: {
          value: '',
        },
      }
    }
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'cBanner/fetchList',
      payload:{}
    })
  }
  //双向绑定表单
  handleFormChange =(changedFields)=> {
    this.setState(
      ( {fields} ) => ({
        fields: { ...fields, ...changedFields },
      })
    )
    console.log(this.state)
  }
  //点击分页
  changePage =(currentPage)=>{
    const { fields } = this.state;
    const formData = {};
    let key;
    for(key in fields){
      formData[key] = fields[key].value;
    }
    const paramsObj = { ...{currentPage}, ...formData }
    this.props.dispatch({
      type:'cBanner/fetchList',
      payload:paramsObj
    })
  }
  //点击搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'cBanner/fetchList',
      payload:values
    })
  }


  render(){
    const { dataList = [] } = this.props.cBanner;
    const { fields } = this.state;
    return(
      <div className='cBanner'>
        <NormalForm
          { ...fields }
          submit={this.searchData}
          onChange={this.handleFormChange}
        />
        <Qtable
          dataSource = {dataList}
          columns = {Columns}/>
        <Qpagination
          data={this.props.cBanner}
          onChange={this.changePage}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {cBanner} = state;
  return {cBanner}
}
export default connect(mapStateToProps)(Cbanner)
// export default Cbanner
