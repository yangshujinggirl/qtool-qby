import React, { Component } from 'react';
import { Button, message} from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import AddBills from './AddBill'
import ajax from '../../../utils/req.js'
import { addBillApi } from '../../../services/server/server'
import moment from 'moment';
import {timeForMats} from '../../../utils/meth';

class ServerBill extends Component{
  constructor(props){
    super(props);
    this.state ={
      loading:true,
      message:'',
      isVisible:false,
      inputValues:{}
    }
  }
  componentWillMount() {
    this.getNowFormatDate();
  }
  getNowFormatDate = () => {
   const startRpDate=timeForMats(30).t2;
   const endRpDate=timeForMats(30).t1;
   this.searchData({
     createTimeST:startRpDate,
     createTimeET:endRpDate
   });
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'serverBill/fetchList',
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
      type:'serverBill/fetchList',
      payload:values
    })
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'serverBill/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //新增工单
  addBill(){
    this.setState({isVisible:true})
  }
  onCancel =(resetFiledsFunc)=> {
    this.setState({isVisible:false});
    resetFiledsFunc();
  }
  //确定
  onOk =(values,resetFiledsFunc)=> {
      addBillApi(values)
      .then(res=> {
        if(res.code=='0'){
          message.success(res.message,.8);
          this.props.dispatch({
            type:'serverBill/fetchList',
            payload:{}
          });
        }
        this.setState({isVisible:false});
        resetFiledsFunc();
      },err=>{
        message.error(err.message,.8);
        resetFiledsFunc();
      });
  }
  //点击跳转到详情
  handleOperateClick =(record)=> {
    const {limit,currentPage} = this.props.serverBill;
    debugger
    const paneitem = {
      title:'工单处理',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
      data:{
        pdSpuId:record.customServiceId,
        listParams:{
          limit,
          currentPage,
          ...this.state.inputValues
        }
      }
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }

  render(){
    const {dataList} = this.props.serverBill;
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
        />
      <div className="handel-btn-lists">
          <Button
            type='primary'
            size='large'
            onClick={()=>this.addBill()}
          >新增工单
          </Button>
          <AddBills
            visible={this.state.isVisible}
            onCancel={this.onCancel}
            onOk={this.onOk}
          />
        </div>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick}
        />
        {
          dataList.length>0&&
          <Qpagination
            data={this.props.serverBill}
            onChange={this.changePage}
            onShowSizeChange = {this.onShowSizeChange}/>
        }
      </div>
    )
  }
}
function mapStateToProps(state){
  const { serverBill } = state;
  return { serverBill };
}
export default connect(mapStateToProps)(ServerBill);
