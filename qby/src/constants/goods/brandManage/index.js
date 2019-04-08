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
      logoUrl:"",
      actUrl:"",
      name:"",
      rank:"",
      status:"",
      eventStatus:"",
      pdBrandId:"",
      configureCode:'',
      mark:null,
      inputValues:{
        sortByFlg:1
      }
    }
  }

  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'brand/fetchList',
      payload:values
    });
    const _values = {...this.state.inputValues,...values};
    this.setState({
      inputValues:_values
    })
  }

  //点击分页
  changePage =(current)=> {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage}
    this.props.dispatch({
      type:'brand/fetchList',
      payload:values
    })
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'brand/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    this.setState({inputValues:values});
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'brand/fetchList',
      payload:{sortByFlg:1}
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
    const {url,actUrl,name,rank,status,eventStatus,pdBrandId,configureCode} = record;
    this.setState({
      title:"修改品牌",
      visible:true,
      logoUrl:url,
      actUrl,
      name,
      rank,
      status,
      eventStatus,
      pdBrandId,
      mark:true,
      configureCode,
    });
  }
  onOk =(values,clearForm)=> {
    const {currentPage,limit} = this.props.brand;
    const url = this.state.logoUrl;
    const actUrl = this.state.actUrl;
    const {mark,pdBrandId} = this.state;
    let pdBrand = {};
    if(mark){ //是修改
      pdBrand = {pdBrandId,url,actUrl,...values}
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
          payload:{currentPage,limit,...this.state.inputValues}
        });
        this.setState({
          visible:false,
          name:'',
          rank:'',
          status:'',
          eventStatus:'',
          logoUrl:'',
        },()=>{
          clearForm()
        });
      };
    })
  }

  onCancel =(clearForm)=> {
    this.setState({
      visible:false,
      logoUrl:'',
      actUrl:'',
      name:'',
      rank:'',
      status:'',
      eventStatus:'',
    },()=>{
      clearForm();
    })
  }
  changeLogoImg =(logoUrl)=> {
    this.setState({
      logoUrl
    })
  }
  changeActImg =(actUrl)=> {
    this.setState({
      actUrl
    });
  }

  render(){
    //新增修改品牌
    const changeAddBrand=this.props.data.rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.brand.save"
    })
    const {visible,title,logoUrl,actUrl,name,rank,status,eventStatus,configureCode} = this.state;
    console.log(eventStatus)
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
        <Qtable
          dataSource = {dataList}
          columns = {changeAddBrand?Columns1:Columns2}
          onOperateClick = {this.handleOperateClick}
        />
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
          changeLogoImg={this.changeLogoImg}
          changeActImg={this.changeActImg}
          actUrl={actUrl}
          logoUrl={logoUrl}
          configureCode={configureCode}
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
