import React, { Component } from 'react';
import { Button, message} from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
class cTimer extends Component{
  constructor(props){
    super(props);
    this.state ={
      message:'',
      isVisible:false,
      field:{
        code:'',
        updateUserName:'',
        opstatus:'',
        status:'',
      }
    }
  }

  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'cTimer/fetchList',
      payload:values
    })
  }

  //点击分页
  changePage =(currentPage)=> {
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'cTimer/fetchList',
      payload:values
    })
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    this.setState({field:values});
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'cTimer/fetchList',
      payload:{}
    })
  }
  //新增定时
  addTimer(){
    console.log(this.props)
    const paneitem = {
      title:'新增定时',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
      data:{
        pdSpuId:null,
      },
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    });
  }
  //修改
  handleOperateClick =(record)=> {
    const paneitem = {
      title:'修改定时',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
      data:{
        pdSpuId:record.spOrderId
      }
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  render(){
    const {dataList} = this.props.cTimer;
    return(
      <div className='server'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
      <div>
          <Button
            className='btn'
            type='primary'
            size='large'
            onClick={()=>this.addTimer()}
          >新增定时
          </Button>
        </div>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick}
        />
        <Qpagination
          data={this.props.cTimer}
          onChange={this.changePage}/>
      </div>
    )
  }
}
function mapStateToProps(state){
  const { cTimer } = state;
  return { cTimer };
}
export default connect(mapStateToProps)(cTimer);
