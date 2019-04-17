import React, { Component } from 'react';
import {Button,message,Modal} from 'antd'
import {connect} from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import ConfirmCancel from './components/confirmCancel.js'
import { confirmCancelApi } from '../../../services/operate/cDown/index'

class cDown extends Component{
  constructor(props){
    super(props);
    this.state = {
      type:3,
      confirmLoading:false,
      bActPriceId:'',
      confirmVisible:false,
      componkey:this.props.componkey,
      inputValues:{},
      rowSelection:{
        selectedRowKeys:this.props.cDown.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      },
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      rowSelection : {
        selectedRowKeys:props.cDown.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      }
    })
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'cDown/fetchList',
      payload:{type:3}
    })
  }
  onChange =(selectedRowKeys,selectedRows)=> {
    const {rowSelection}=this.state;
    this.setState({
      rowSelection:Object.assign({},rowSelection,{selectedRowKeys})
    })
    if(selectedRows[0]){
      this.setState({
        activityId:selectedRows[0].activityId,
        name:selectedRows[0].name,
        beginTime:selectedRows[0].beginTime,
        endTime:selectedRows[0].endTime,
        selectedRows:selectedRows[0],
      })
    }
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'cDown/fetchList',
      payload:values
    });
    const _values = {...this.state.inputValues,...values}
    this.setState({
      inputValues:_values
    })
  }
  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage,limit,type:3}
    this.props.dispatch({
      type:'cDown/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'cDown/fetchList',
      payload:{currentPage,limit,...this.state.inputValues,type:3}
    });
  }

  //新增直降
  createbActPrice =()=>{
    const paneitem = {
      title:'新建C端直降',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
      data:{
        inputValues:this.state.inputValues
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    });
  }
  //改变弹窗确认的loading
  changeLoading =(value)=> {
    this.setState({
      confirmLoading:value
    })
  }
  //强制失效点击取消
  onCancel =(resetFiledsFunc)=> {
    this.setState({confirmVisible:false})
    resetFiledsFunc()
  }
  //强制失效点击确定
  onOk =(values,resetFiledsFunc)=> {
    values.activityId = this.state.activityId;
    confirmCancelApi(values)
    .then((res) => {
      if(res.code == '0'){
        message.success(res.message);
        resetFiledsFunc();//清除数据
        this.props.dispatch({ //刷新列表
          type:'cDown/fetchList',
          payload:{type:3}
        });
        this.setState({confirmVisible:false,confirmLoading:false,activityId:''});
      }else{
        this.setState({confirmLoading:false});
      };
    });
  }
  //操作
  handleOperateClick(record,type) {
    if(type == "info"){
      const paneitem = {
        title:'C端直降详情',
        key:`${this.state.componkey}editinfo`+record.activityId,
        componkey:`${this.state.componkey}info`,
        data:{
          activityId:record.activityId,
          inputValues:this.state.inputValues
        }
      }
      this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
      });
    }else if(type == 'edit'){
      const paneitem = {
        title:'修改c端直降',
        key:`${this.state.componkey}edit`+record.activityId,
        componkey:`${this.state.componkey}edit`,
        data:{
          activityId:record.activityId
        },
      };
      this.props.dispatch({
          type:'tab/firstAddTab',
          payload:paneitem
      });
    };
  }
  //强制失效
  confirmCancel =()=> {
    if(this.state.activityId){
      const {status} = this.state.selectedRows;
      if(status == 2){
        message.warning('当前状态无法强制失效',.8)
      }else if(status == 3){
        message.warning('当前状态已失效',.8)
      }else{
        this.setState({
          confirmVisible:true
        });
      };
    }else{
      message.error('请选择需要失效的选项',.8)
    };
  }
  render(){
    const {confirmVisible,confirmLoading,name,beginTime,endTime} = this.state
    const {dataList} = this.props.cDown;
    const {menus} = this.props;
    const operation = menus.find(item=>(item.type=="operation") );
    const bact = operation.children.find(item=>(item.code=="401200"))
    const rolelists = ( bact.children.find(item=>(item.code=='401800')) ).children;
    //新增活动进价
    const addbActPrice = rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.sp.activity.save"
    })
    //强制失效
    const inject = rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.sp.activity.invalid"
    })
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
        />
        <div className="handel-btn-lists">
          {
            addbActPrice &&
            <Button onClick={this.createbActPrice}  size='large' type='primary'>新增限时促销</Button>
          }
          {
            inject &&
            <Button onClick={this.confirmCancel}  size='large' type='primary'>强制失效</Button>
          }
        </div>
        <ConfirmCancel
          name={name}
          beginTime={beginTime}
          endTime={endTime}
          changeLoading={this.changeLoading}
          confirmLoading={confirmLoading}
          visible={confirmVisible}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
        <Qtable
          onOperateClick = {this.handleOperateClick.bind(this)}
          dataSource = {dataList}
          columns = {Columns}
          select
          rowSelection = {this.state.rowSelection}
        />
        {
          dataList.length>0?
          <Qpagination
            data={this.props.cDown}
            onChange={this.changePage}
            onShowSizeChange = {this.onShowSizeChange}
          />:null
        }
      </div>
    )
  }
}
function mapStateToProps(state){
  const {cDown} = state;
  const {menus} = state.tab;
  return {cDown,menus};
}
export default connect(mapStateToProps)(cDown);
