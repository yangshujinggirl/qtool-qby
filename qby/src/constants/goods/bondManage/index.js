import React, { Component } from 'react';
import { Button, message} from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import BondModal from './components/BondModal'
class BondManage extends Component{
  constructor(props){
    super(props);
    this.state ={
      title:"",
      visible:false,
      field:{
        code:'',
        updateUserName:'',
        opstatus:'',
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
      visible:true
    })
  }
  //确定
  onOk =(values,clearForm)=> {
    this.setState({
      visible:false
    },()=>{
      clearForm();
    });

  }
  //取消
  onCancel =(clearForm)=> {
    this.setState({
      visible:false,
    },()=>{
      clearForm();
    });
  }

  //修改
  handleOperateClick =(record)=> {
    this.setState({
      title:"修改仓库",
      visible:true
    })
  }
  render(){
    const {dataList} = this.props.bondManage;
    const {visible,title} = this.state;
    return(
      <div className="qtools-components-pages">
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div className='handel-btn-lists'>
              <Button
                type='primary'
                size='large'
                onClick={()=>this.addWarehouse()}
              >新增仓库
              </Button>
          </div>
          <Qtable
            dataSource = {dataList}
            columns = {Columns}
            onOperateClick = {this.handleOperateClick}
          />
          <Qpagination
            data={this.props.bondManage}
            onChange={this.changePage}/>
          <BondModal
            title={title}
            visible={visible}
            onOk={this.onOk}
            onCancel={this.onCancel}
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
