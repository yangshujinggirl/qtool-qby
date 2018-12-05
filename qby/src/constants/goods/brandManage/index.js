import React, { Component } from 'react';
import { Button, message} from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import BrandModal from './components/BrandModal'
class Brand extends Component{
  constructor(props){
    super(props);
    this.state ={
      message:'',
      title:'',
      visible:false,
      imageUrl:[],
      field:{
        name:'',
        status:'',
        eventStatus:''
      }
    }
  }

  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'brand/fetchList',
      payload:values
    })
  }

  //点击分页
  changePage =(current)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'brand/fetchList',
      payload:values
    })
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    this.setState({field:values});
  }
  //初始化数据
  componentWillMount(){
    const {limit,currentPage} = this.props.brand;
    this.props.dispatch({
      type:'brand/fetchList',
      payload:{limit,currentPage}
    })
  }
  //新增定时
  addBrand(){
    this.setState({
      title:"新增品牌",
      visible:true
    })
  }

  //修改
  handleOperateClick =(record)=> {
    this.setState({
      title:"修改品牌",
      visible:true
    })
  }
  onOk =(value,clearForm)=> {
    this.setState({
      visible:false

    },()=>{
      clearForm()
    })
  }
  onCancel =(clearForm)=> {
    this.setState({
      visible:false,
      imageUrl:'',
    },()=>{
      clearForm();
    })
  }
  changeImg =(imageUrl)=> {
    console.log(imageUrl)
    this.setState({
      imageUrl
    })
  }
  render(){
    const {visible,title,imageUrl} = this.state;
    const {dataList} = this.props.brand;
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
            onClick={()=>this.addBrand()}
          >新增品牌
          </Button>
        </div>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick}
        />
        <Qpagination
          data={this.props.brand}
          onChange={this.changePage}/>
        <BrandModal
          title={title}
          onOk={this.onOk}
          onCancel={this.onCancel}
          visible={visible}
          changeImg={this.changeImg}
          imageUrl={imageUrl}
        />
      </div>
    )
  }
}
function mapStateToProps(state){
  const { brand } = state;
  return { brand };
}
export default connect(mapStateToProps)(Brand);
