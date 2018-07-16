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
class ServerBill extends Component{
  constructor(props){
    super(props);
    this.state ={
      message:'',
      isVisible:false,
      field:{
        customServiceNo:'',
        customServiceTheme:'',
        waiter:'',
        status:'',
        handleTime:'',
      }
    }
  }

  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'userFeedBack/fetchList',
      payload:values
    })
  }

  //点击分页
  changePage =(currentPage)=> {
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'userFeedBack/fetchList',
      payload:values
    })
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    const {rangePicker,..._values} = values;
    if(rangePicker){
      _values.createTimeST =  rangePicker[0]._d.getTime();
      _values.createTimeET = rangePicker[1]._d.getTime();
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
  onCancel =()=> {
    this.setState({isVisible:false})
  }
  onOk =(values)=> {
    // this.setState({isVisible:false});
    addBillApi(values)
    .then((res) => {
      if(res.code == '0'){
        // message.success(res.message);
      }else{
        console.log(res.message)
      }
    })
  }
  render(){
    const {dataList} = this.props.serverBill;
    return(
      <div className='server'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
      <div style={{margin:'15px 0'}}>
          <Button type='primary'
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
          columns = {Columns}/>
        <Qpagination
          data={this.props.serverBill}
          onChange={this.changePage}/>
      </div>
    )
  }
}
function mapStateToProps(state){
  const { serverBill } = state;
  return { serverBill };
}
export default connect(mapStateToProps)(ServerBill);