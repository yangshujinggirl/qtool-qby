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

class ServerBill extends Component{
  constructor(props){
    super(props);
    this.state ={
      loading:true,
      message:'',
      isVisible:false,
      field:{
        customServiceNo:'',
        customServiceTheme:'',
        waiter:'',
        status:'',
        handleTimeType:'',
        createTimeST:"",
        createTimeET:'',
      }
    }
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'serverBill/fetchList',
      payload:values
    })
  }
  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage,limit}
    this.props.dispatch({
      type:'serverBill/fetchList',
      payload:values
    })
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    const {rangePicker,..._values} = values;
    if(rangePicker&&rangePicker[0]){
      _values.createTimeST =  moment(new Date(rangePicker[0]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');
      _values.createTimeET = moment(new Date(rangePicker[1]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');
    }
    this.setState({field:_values});
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'serverBill/fetchList',
      payload:{}
    })
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
    const paneitem = {
      title:'工单处理',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
      data:{
        pdSpuId:record.customServiceId
      }
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'serverBill/fetchList',
      payload:{currentPage,limit}
    });
  }
  render(){
    const {dataList} = this.props.serverBill;
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
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
