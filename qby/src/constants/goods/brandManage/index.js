import React, { Component } from 'react';
import { Button, message} from 'antd'
import { connect } from 'dva'
import {Columns1,Columns2} from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import BrandModal from './components/BrandModal'
import {brandSaveApi} from '../../../services/goodsCenter/brand'
class Brand extends Component{
  constructor(props){
    super(props);
    this.state ={
      message:'',
      title:'',
      visible:false,
      imageUrl:"",
      name:"",
      rank:"",
      status:"",
      eventStatus:"",
      pdBrandId:"",
      mark:null,
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
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'brand/fetchList',
      payload:{currentPage,limit,...this.state.field}
    });
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    this.setState({field:values});
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'brand/fetchList',
      payload:{}
    })
  }
  //新增品牌
  addBrand(){
    this.setState({
      title:"新增品牌",
      visible:true,
      mark:false
    })
  }

  //修改
  handleOperateClick =(record)=> {
    const {url,name,rank,status,eventStatus,pdBrandId} = record;
    this.setState({
      title:"修改品牌",
      visible:true,
      imageUrl:url,
      name,
      rank,
      status,
      eventStatus,
      pdBrandId,
      mark:true
    });
  }
  onOk =(values,clearForm)=> {
    const {currentPage,limit} = this.props.brand;
    const url = this.state.imageUrl;
    const {mark,pdBrandId} = this.state;
    let pdBrand = {};
    if(mark){ //是修改
      pdBrand = {pdBrandId,url,...values}
    }else{
      pdBrand = {url,...values}
    };
    brandSaveApi({pdBrand})
    .then(res => {
      if(res.code == '0'){
        if(mark){ //是修改
          message.success('修改成功',.3);
        }else{
          message.success('新增成功',.3);
        };
        this.props.dispatch({
          type:'brand/fetchList',
          payload:{currentPage,limit,...this.state.field}
        });
        this.setState({
          visible:false,
          name:'',
          rank:'',
          status:'',
          eventStatus:'',
          imageUrl:'',
        },()=>{
          clearForm()
        });
      };
    })
  }

  onCancel =(clearForm)=> {
    this.setState({
      visible:false,
      imageUrl:'',
      name:'',
      rank:'',
      status:'',
      eventStatus:'',
    },()=>{
      clearForm();
    })
  }
  changeImg =(imageUrl)=> {
    this.setState({
      imageUrl
    })
  }
  render(){
    //新增修改品牌
    const changeAddBrand=this.props.data.rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.brand.save"
    })
    const {visible,title,imageUrl,name,rank,status,eventStatus} = this.state;
    const {dataList} = this.props.brand;
    return(
      <div className="qtools-components-pages">
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div className='handel-btn-lists'>
          {
            changeAddBrand &&
            <Button
              type='primary'
              size='large'
              onClick={()=>this.addBrand()}
            >新增品牌
            </Button>
          }
        </div>
        {
          dataSource.length>0 &&
          <Qtable
            dataSource = {dataList}
            columns = {changeAddBrand?Columns1:Columns2}
            onOperateClick = {this.handleOperateClick}
          />
        }

        <Qpagination
          onShowSizeChange = {this.onShowSizeChange}
          data={this.props.brand}
          onChange={this.changePage}/>
        <BrandModal
          title={title}
          name={name}
          rank={rank}
          status={status}
          eventStatus={eventStatus}
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
