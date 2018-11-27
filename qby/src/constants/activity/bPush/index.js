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
import {timeForMats} from '../../../utils/meth';

class Bpush extends Component{
  constructor(props){
    super(props);
    this.state = {
      bsPushId:'',
      bPushName:'',
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
      selectedRows:[],
      rowSelection:{
         type:'radio',
         selectedRowKeys:this.props.bPush.selectedRowKeys,
         onChange:this.onChange
       }
    }
  }
  componentWillMount() {
    this.getNowFormatDate();
  }
  getNowFormatDate = () => {
   const startRpDate=timeForMats(30).t2;
   const endRpDate=timeForMats(30).t1;
   const {field} = this.state;
   this.setState({
     field:{
       ...field,
       pushTimeST:startRpDate,
       pushTimeET:endRpDate,
       }
     },function(){
       this.searchData({
         pushTimeST:startRpDate,
         pushTimeET:endRpDate
       });
   })
  }
  componentWillReceiveProps(props) {
    this.setState({
      rowSelection : {
        selectedRowKeys:props.bPush.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      }
    });
  }
  onChange =(selectedRowKeys, selectedRows) =>{
    // 消除选中状态
    const {rowSelection}=this.state;
    this.setState({
      rowSelection:Object.assign({},rowSelection,{selectedRowKeys})
    });
    // 消除选中状态
    if(selectedRows[0]){
      this.setState({
        title:selectedRows[0].title,
        bsPushId:selectedRows[0].bsPushId,
        selectedRows:selectedRows[0]
      });
    };
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'bPush/fetchList',
      payload:values
    });
  }

  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage,limit}
    this.props.dispatch({
      type:'bPush/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'bPush/fetchList',
      payload:{currentPage,limit,...this.state.field}
    });
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    const {rangePicker,..._values} = values;
    if(rangePicker&&rangePicker[0]){
      _values.startTime =  moment(rangePicker).format('YYYY-MM-DD HH:mm:ss');;
      _values.endTime = moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');;
    }
    this.setState({field:_values});
  }
  //新增推送
  addPush =()=> {
    const paneitem = {
      title:'新建推送',
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
      key:`${this.state.componkey}info`,
      componkey:`${this.state.componkey}info`,
      data:{
        bsPushId:record.bsPushId,
        title:record.title,
        pushTime:record.pushTime,
        msgContent:record.msgContent,
        alertTypeStr:record.alertTypeStr,
        pushMan:record.pushMan,
        pushContent:record.alertTypeContent
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //修改推送
  getEdit(record){
    const { limit, currentPage } = this.props.bPush;
    const paneitem = {
      title:'修改推送',
      key:`${this.state.componkey}edit`+record.bsPushId,
      componkey:`${this.state.componkey}edit`,
      data:{
        bsPushId:record.bsPushId,
        status:record.status,
        listParams:{
          ...this.state.fields,
          limit,
          currentPage
        }
      }
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
    if(!this.state.bsPushId){
      message.warning('请选择要撤销的推送',.8);
    }else{
      if(this.state.selectedRows.status == 10){
        this.setState({isPushVisible:true})
      }else{
        message.warning('只有待推送状态才可撤销');
        this.onChange([],[])
      };
    };
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
    };
    createBpushApi(values)
    .then(res => {
      const { limit, currentPage } = this.props.bPush;
      if(res.code=='0'){
        message.success(res.message);
        this.props.dispatch({
          type:'bPush/fetchList',
          payload:{
            ...this.state.fields,
            limit,
            currentPage
          }
        });
        this.setState({isPushVisible:false})
      }else{
        this.setState({isPushVisible:false});
        this.onChange([],[]);
      }
    })
  }
  //取消撤销
  onCancel =()=>{
    this.setState({isPushVisible:false});
    this.onChange([],[]);
  }
  render(){
    const rolelists=this.props.data.rolelists
    //新增推送
    const addPush=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.bPush.save"
		})
    //撤销推送
    const revokePush=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.bPush.revoke"
		})
    const {dataList} = this.props.bPush;
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div className="handel-btn-lists">
          {
            addPush?
              <Button
                onClick={this.addPush}
                size='large'
                type='primary'>
                新增推送
              </Button>
            :null
          }
          {
            revokePush?
              <Button
                onClick={this.cancelPush}
                size='large'
                type='primary'>
                撤销推送
              </Button>
            :null
          }
        </div>
        <Modal
            bodyStyle={{fontSize:'24px','padding':'50px'}}
            visible= {this.state.isPushVisible}
            cancelText="不撤销了"
            okText='确定撤销'
            onCancel= {this.onCancel}
            onOk = {this.onOk}
          >
            <p>你正在撤消标题为{this.state.title}的推送，确认撤消？</p>
        </Modal>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick.bind(this)}
          select
          rowSelection = {this.state.rowSelection}
        />
        {
          dataList.length>0?
          <Qpagination
            data={this.props.bPush}
            onChange={this.changePage}
            onShowSizeChange = {this.onShowSizeChange}
          />:null
        }

      </div>
    );
  }
}
function mapStateToProps(state){
  const {bPush} = state;
  return {bPush};
}
export default connect(mapStateToProps)(Bpush);
