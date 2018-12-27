import React, { Component } from 'react';
import { Button, message} from 'antd'
import { connect } from 'dva'
import {Columns1,Columns2} from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import ExplainModal from './components/ExplainModal'
import {saveExplainApi} from "../../../services/goodsCenter/cExplain"
class Cexplain extends Component{
  constructor(props){
    super(props);
    this.state = {
      title:"",
      visible:false,
      name:'',
      rank:'',
      status:'',
      text:'',
      field:{
        name:'',
        urUserName:'',
        status:'',
      }
    }
  }

  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'cExplain/fetchList',
      payload:values
    })
  }

  //点击分页
  changePage =(current)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'cExplain/fetchList',
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
      type:'cExplain/fetchList',
      payload:{}
    })
  }
  //新增说明
  addExplain(){
    this.setState({
      title:"新建商品说明",
      visible:true,
      flag:false
    });
  }
  //确定
  onOk =(values,clearForm)=> {
    const {currentPage,limit}= this.props.cExplain;
    const {flag,pdExplainId,field} = this.state;
    let explain={}
    if(flag){ //修改
      explain={pdExplainId,...values}
    }else{
      explain=values
    }
    saveExplainApi({explain})
    .then(res=>{
      if(res.code == "0"){
        if(flag){
          message.success('修改成功');
          this.props.dispatch({
            type:'cExplain/fetchList',
            payload:{limit,currentPage,...field}
          });
        }else{
          message.success('新增成功')
          this.props.dispatch({
            type:'cExplain/fetchList',
            payload:{}
          });
        };
        this.setState({
          visible:false,
          name:'',
          text:'',
          rank:'',
          status:'',
        },()=>{
          clearForm();
        });
      }
    })
  }
  //取消
  onCancel =(clearForm)=> {
    this.setState({
      visible:false,
      name:'',
      text:'',
      rank:'',
      status:'',
    },()=>{
      clearForm();
    });
  }

  //修改
  handleOperateClick =(record)=> {
    const {name,text,rank,status,pdExplainId} = record;
    this.setState({
      title:"修改商品说明",
      visible:true,
      flag:true,
      name,
      text,
      rank,
      status,
      pdExplainId
    })
  }
  render(){
    //增改说明
    const changeAddExplain = this.props.data.rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.brand.explaination.list"
    });
    const {dataList} = this.props.cExplain;
    const {visible,title,name,text,rank,status} = this.state;
    return(
      <div className="qtools-components-pages">
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div className='handel-btn-lists'>
          {
            changeAddExplain &&
            <Button
              type='primary'
              size='large'
              onClick={()=>this.addExplain()}
            >新增说明
            </Button>
          }
        </div>
        <Qtable
          dataSource = {dataList}
          columns = {changeAddExplain ? Columns1 : Columns2}
          onOperateClick = {this.handleOperateClick}
        />
        <Qpagination
          data={this.props.cExplain}
          onChange={this.changePage}/>
        <ExplainModal
          title={title}
          visible={visible}
          name={name}
          text={text}
          rank={rank}
          status={status}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      </div>
    )
  }
}
function mapStateToProps(state){
  const { cExplain } = state;
  return { cExplain };
}
export default connect(mapStateToProps)(Cexplain);
