import React, { Component } from 'react';
import { Button, Modal, message } from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './components/FilterForm/index'
import moment from 'moment';

class Banswer extends Component{
  constructor(props){
    super(props);
    this.state ={
      componkey:this.props.componkey,
      field:{
        title:'',
        userName:'',
        type:'',
        status:'',
      },
    }
  }
  //初始化数据
  componentWillMount(){
    this.initData()
  }
  //初始数据
  initData =()=> {
    this.props.dispatch({
      type:'bAnswer/fetchList',
      payload:{}
    })
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    this.setState({field:values});
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'bAnswer/fetchList',
      payload:values
    })
  }
  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage,limit}
    this.props.dispatch({
      type:'bAnswer/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'bAnswer/fetchList',
      payload:{currentPage,limit}
    });
  }
  //处理表格的点击事件
  handleOperateClick(record){
    const { limit, currentPage } = this.props.bAnswer;
    const { componkey } = this.state;
    const paneitem = {
      title:'修改B端问答',
      key:`${componkey}edit`+record.pdAnswerId,
      componkey:`${componkey}edit`,
      data:{
        listParams:{
          ...this.state.fields,
          limit,
          currentPage
        },
        key:`${componkey}edit`+record.pdAnswerId,
        pdAnswerId:record.pdAnswerId
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  addAnswer =()=> {
    const paneitem = {
      title:'新增B端问答',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
      data:{
        key:`${this.props.componkey}edit`,
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }

  render(){
    const { dataList } = this.props.bAnswer;

    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}/>
        <div className="handel-btn-lists">
          <Button
            size='large'
            type='primary'
            onClick={this.addAnswer}>
            新增问答
          </Button>
        </div>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick.bind(this)}/>
        {
          dataList.length>0&&
          <Qpagination
            data={this.props.bAnswer}
            onChange={this.changePage}
            onShowSizeChange = {this.onShowSizeChange}/>
        }
      </div>
    )
  }
}
function mapStateToProps(state){
  const { bAnswer } = state;
  return { bAnswer };
}
export default connect(mapStateToProps)(Banswer);