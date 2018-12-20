import React, { Component } from 'react';
import { Button, message} from 'antd'
import { connect } from 'dva'
import {Columns1,Columns2} from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import BondModal from './components/BondModal'
import {saveBondApi} from '../../../services/goodsCenter/bondManage'
class BondManage extends Component{
  constructor(props){
    super(props);
    this.state ={
      title:"",
      visible:false,
      flag:null,
      field:{
        name:'',
        lastChangeMan:'',
        status:'',
      }
    }
  }

  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'bondManage/fetchList',
      payload:values
    })
  }

  //点击分页
  changePage =(current)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'bondManage/fetchList',
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
      type:'bondManage/fetchList',
      payload:{}
    })
  }
  //新增说明
  addWarehouse(){
    this.setState({
      title:"新建仓库",
      visible:true,
      flag:false
    })
  }
  //确定
  onOk =(values,clearForm)=> {
    const {flag,pdTaxWarehouseId,field} = this.state;
    const {currentPage,limit} = this.props.bondManage;
    let taxWarehouse = {}
    if(flag){
        taxWarehouse = {pdTaxWarehouseId,...values}
    }else{
        taxWarehouse = values;
    }
    saveBondApi({taxWarehouse})
    .then(res=>{
      if(res.code == "0"){
        if(flag){
          message.success('修改成功');
          this.props.dispatch({
            type:'bondManage/fetchList',
            payload:{currentPage,limit,...field}
          })
        }else{
          message.success('创建成功')
          this.props.dispatch({
            type:'bondManage/fetchList',
            payload:{}
          })
        };
      };
    });
    this.setState({
      visible:false,
      flag:true,
      pdTaxWarehouseId:'',
      name:'',
      cname:'',
      dispExp:'',
      pushPlatform:'',
      status:''
    },()=>{
      clearForm();
    });

  }
  //取消
  onCancel =(clearForm)=> {
    this.setState({
      visible:false,
      flag:true,
      pdTaxWarehouseId:'',
      name:'',
      cname:'',
      dispExp:'',
      pushPlatform:'',
      status:''
    },()=>{
      clearForm();
    });
  }

  //修改
  handleOperateClick =(record)=> {
    const {name,cname,dispExp,pushPlatform,status,pdTaxWarehouseId} = record;
    this.setState({
      title:"修改仓库",
      visible:true,
      flag:true,
      pdTaxWarehouseId,
      name,
      cname,
      dispExp,
      pushPlatform,
      status
    })
  }
  render(){
    //增改仓库
    const  changeAddWarehouse= this.props.data.rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.taxWarehouse.save"
    });
    const {dataList} = this.props.bondManage;
    const {visible,title,name,cname,dispExp,pushPlatform,status} = this.state;
    return(
      <div className="qtools-components-pages">
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div className='handel-btn-lists'>
          {
            changeAddWarehouse &&
            <Button
              type='primary'
              size='large'
              onClick={()=>this.addWarehouse()}
            >新增仓库
            </Button>
          }
        </div>
        {
          dataList.length>0 &&
          <Qtable
            dataSource = {dataList}
            columns = {changeAddWarehouse?Columns1:Columns2}
            onOperateClick = {this.handleOperateClick}
          />
        }
        <Qpagination
          data={this.props.bondManage}
          onChange={this.changePage}/>
        <BondModal
          title={title}
          visible={visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          name={name}
          cname={cname}
          dispExp={dispExp}
          pushPlatform={pushPlatform}
          status={status}
        />
      </div>
    )
  }
}
function mapStateToProps(state){
  const { bondManage } = state;
  return { bondManage };
}
export default connect(mapStateToProps)(BondManage);
