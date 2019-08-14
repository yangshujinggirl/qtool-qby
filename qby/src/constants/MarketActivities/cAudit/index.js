import React, { Component } from 'react';
import { Button, Modal, message } from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import moment from 'moment';

class cAudit extends Component{
  constructor(props){
    super(props);
    this.state = {
      inputValues:{},
    }
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'cAudit/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    })
  }
  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage,limit}
    this.props.dispatch({
      type:'cAudit/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'cAudit/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'cAudit/fetchList',
      payload:{}
    })
  }
  handleOperateClick=(record,type)=>{
    const paneitem = {
      title:'活动审核',
      key:`${this.props.componkey}edit`+record.spOrderId,
      componkey:`${this.props.componkey}info`,
      data:{
        type,
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  render(){
    const {dataLists} = this.props;
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
        />
        <div className="handel-btn-lists">
          {
            <Button
              onClick={this.addPush}
              size='large'
              type='primary'>新增推送
            </Button>
          }
        </div>
        <Qtable
          dataSource = {dataLists}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick}
        />
        {
          dataLists.length>0?
          <Qpagination
            data={this.props}
            onChange={this.changePage}
            onShowSizeChange = {this.onShowSizeChange}
          />:null
        }
      </div>
    );
  }
}
function mapStateToProps(state){
  const {cAudit} = state;
  return cAudit
}
export default connect(mapStateToProps)(cAudit);
