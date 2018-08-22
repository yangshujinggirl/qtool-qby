import React, { Component } from 'react';
import { Button, Modal, message } from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import { createBpushApi } from '../../../services/activity/bPush'
import './index'
import moment from 'moment';

class Cpush extends Component{
  constructor(props){
    super(props);
    this.state ={
      cPushId:'',
      cPushName:'',
      isPushVisible:false,
      componkey:this.props.componkey,
      field:{
        title:'',
        creater:'',
        status:'',
        alertType:'',
        pushTimeST:'',
        pushTimeET:'',
      },
      rowSelection:{
         type:'radio',
         selectedRowKeys:[],
         onChange:this.onChange
     }
    }
  }
  //tabel---radio按钮变化
  onChange =(selectedRowKeys,selectedRows)=> {
    const {rowSelection}=this.state;
    this.setState({
      rowSelection:Object.assign({},rowSelection,{selectedRowKeys})
    });
    if(selectedRows[0]){
      this.setState({
        cPushName:selectedRows[0].title,
        cPushId:selectedRows[0].bsPushId,
        selectedRows:selectedRows[0]
      });
    };
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'cPush/fetchList',
      payload:values
    })
  }
  //点击分页
  changePage =(current)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'cPush/fetchList',
      payload:values
    })
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'cPush/fetchList',
      payload:{currentPage,limit}
    });
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    const {rangePicker,..._values} = values;
    if(rangePicker){
      _values.pushTimeST =  moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
      _values.pushTimeET = moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
    }
    this.setState({field:_values});
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'cPush/fetchList',
      payload:{pushType:20}
    });
  }
  //新增推送
  addPush =()=> {
    const paneitem = {
      title:'创建推送',
      key:`${this.state.componkey}edit`,
      componkey:`${this.state.componkey}edit`,
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //点击跳转详情页
  getDetail(record){
    const paneitem = {
      title:'推送详情',
      key:`${this.state.componkey}info`+record.bsPushId,
      componkey:`${this.state.componkey}info`,
      data:{
        pdSpuId:record.bsPushId,
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //修改推送
  getEdit(record){
    const paneitem = {
      title:'修改推送',
      key:`${this.state.componkey}edit`,
      componkey:`${this.state.componkey}edit`,
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //处理表格的点击事件
  handleOperateClick(record,type){
    switch(type) {
      case "detail":
        this.getDetail(record)
        break;
      case "edit":
        this.getEdit(record)
        break;
    }
  }
  //撤销推送
  cancelPush =()=> {
    if(!this.state.cPushId){
      message.warning('请选择要撤销的推送');
    }else{
      this.setState({isPushVisible:true})
    }
  }
  //确定撤销
  onOk =()=>{
    const {
      title,
      pushTime,
      msgContent,
      alertTypeStr,
      pushPerson,
      bsPushId,
      pushNow,
      alertType,
      alertTypeContent} = this.state.selectedRows;
    const values = {
      title,
      pushTime,
      pushNow,
      msgContent,
      alertTypeStr,
      alertType,
      pushPerson,
      bsPushId,
      status:30,
      alertTypeContent
    }
    createBpushApi(values)
    .then(res => {
      if(res.code == '0'){
        this.props.dispatch({ //刷新列表
          type:'tab/firstAddTab',
          payload:paneitem
        });
        this.state.rowSelection.onChange([],[]); //取消选中
        message.success(res.message);
        this.setState({isPushVisible:false})
      }
    });
  }
  //取消撤销
  onCancel =()=>{
    this.state.rowSelection.onChange([],[]);//取消选中
    this.setState({isPushVisible:false})
  }
  render(){
    const rolelists=this.props.data.rolelists
    //新增推送
    const addPush=rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.cpush.save"
    })
    //撤销推送
    const revokePush=rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.cpush.revoke"
    })
    const {dataList} = this.props.cPush;
    const { isPushVisible, cPushName, rowSelection } = this.state;
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div className="handel-btn-lists">
          {
            addPush?
            <Button onClick={this.addPush} size='large' type='primary'>新增推送</Button>
            :null
          }
          {
            revokePush?
            <Button onClick={this.cancelPush} size='large' type='primary'>撤销推送</Button>
            :null
          }
        </div>
        <Modal
            bodyStyle={{fontSize:'24px','padding':'50px'}}
            visible= {isPushVisible}
            cancelText="不撤销了"
            okText='确定撤销'
            onCancel= {this.onCancel}
            onOk = {this.onOk}
          >
            <p>你正在撤消标题为{cPushName}的推送，确认撤消？</p>
        </Modal>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick.bind(this)}
          select
          rowSelection = {rowSelection}
        />
        <Qpagination
          data={this.props.cPush}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}
        />
      </div>
    )
  }
}
function mapStateToProps(state){
  const {cPush} = state;
  return {cPush};
}
export default connect(mapStateToProps)(Cpush);
