import React, { Component } from 'react';
import {Button,message,Modal} from 'antd'
import {connect} from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import ConfirmCancel from './components/confirmCancel.js'
import {forceInvalidApi} from '../../../services/operate/themeAct/index'

class ThemeAct extends Component{
  constructor(props){
    super(props);
    this.state = {
      confirmVisible:false,
      confirmLoading:false,
      inputValues:{},
      rowSelection:{
        selectedRowKeys:this.props.themeAct.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      },
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      rowSelection : {
        selectedRowKeys:props.themeAct.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      },
    });
  }
  onChange =(selectedRowKeys,selectedRows)=> {
    const {rowSelection}=this.state;
    this.setState({
      rowSelection:Object.assign({},rowSelection,{selectedRowKeys})
    });
    if(selectedRows[0]){
      this.setState({
        showTimeEnd:selectedRows[0].showTimeEnd,
        showTimeStart:selectedRows[0].showTimeStart,
        themeName:selectedRows[0].themeName,
        themeActivityId:selectedRows[0].themeActivityId,
      });
    };
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'themeAct/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    });
  }
  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage,limit}
    this.props.dispatch({
      type:'themeAct/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'themeAct/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'themeAct/fetchList',
      payload:{}
    })
  }
  //新增主题
  addTheme =()=> {
    const paneitem = {
      title:'新增主题',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }

  setConfirmLoading =()=> {
    this.setState({
      confirmLoading:true
    });
  }

  //操作
  handleOperateClick(record,type) {
    if(type == 'edit'){
      const paneitem = {
        title:'修改主题',
        key:`${this.props.componkey}edit`+record.themeActivityId,
        componkey:`${this.props.componkey}edit`,
        data:{
          infos:{
            themeName:record.themeName,
            showTimeStart:record.showTimeStart,
            showTimeEnd:record.showTimeEnd,
            rank:record.rank,
            pics:record.pics,
            pageCode:record.pageCode,
            pdThemeActivityDetail:record.pdThemeActivityDetail,
            remark:record.remark,
            themeActivityId:record.themeActivityId,
          }
        },
      };
      this.props.dispatch({
          type:'tab/firstAddTab',
          payload:paneitem
      });
    }
  }
  //点击强制失效
  forceCancel=()=>{
    this.setState({
      confirmVisible:true
    })
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
    values.themeActivityId = this.state.themeActivityId;
    forceInvalidApi(values)
    .then((res) => {
      if(res.code == '0'){
        message.success(res.message);
        resetFiledsFunc();//清除数据
        this.props.dispatch({ //刷新列表
          type:'themeAct/fetchList',
          payload:{}
        });
        this.setState({confirmVisible:false,confirmLoading:false});
      }else{
        this.setState({confirmLoading:false});
      };
    });
  }
  render(){
    const {
      confirmLoading,
      confirmVisible,
      themeName,
      showTimeStart,
      showTimeEnd,
    } = this.state;
    const {dataList} = this.props.themeAct;
    const {rolelists} = this.props.data
    //新增主题
    const addtheme = rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.theme.activity.save"
    })
    //强制失效
    const confirmInval = rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.theme.activity.invalid"
    })
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
        />
        <div className="handel-btn-lists">
          {
            addtheme&&
            <Button onClick={this.addTheme}  size='large' type='primary'>新增主题</Button>
          }
          {
            confirmInval&&
            <Button type='primary' size='large' onClick={this.forceCancel}>强制失效</Button>
          }

        </div>
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
            data={this.props.themeAct}
            onChange={this.changePage}
            onShowSizeChange = {this.onShowSizeChange}
          />:null
        }
        <ConfirmCancel
          changeLoading={this.changeLoading}
          confirmLoading={confirmLoading}
          themeName={themeName}
          showTimeStart={showTimeStart}
          showTimeEnd={showTimeEnd}
          visible={confirmVisible}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      </div>
    )
  }
}
function mapStateToProps(state){
  const {themeAct} = state;
  return {themeAct};
}
export default connect(mapStateToProps)(ThemeAct);
