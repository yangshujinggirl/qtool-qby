import React, { Component } from 'react';
import { Button, message, Menu, Dropdown,} from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import './index.less'

class cTimer extends Component{
  constructor(props){
    super(props);
    this.state ={
      message:'',
      isVisible:false,
      inputValues:{},
    }
  }

  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'cTimer/fetchList',
      payload:{}
    })
  }
  menu =()=> (
    <Menu>
      <Menu.Item>
        <a style={{color:'#35bab0'}} onClick={()=>this.addTimer(1)}>
        定时调整：商品状态
        </a>
      </Menu.Item>
      <Menu.Item>
        <a style={{color:'#35bab0'}} onClick={()=>this.addTimer(2)}>
          定时调整：商品提示
        </a>
      </Menu.Item>
      <Menu.Item>
        <a style={{color:'#35bab0'}} onClick={()=>this.addTimer(3)}>
          定时调整：保税分润
        </a>
      </Menu.Item>
    </Menu>
  )
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'cTimer/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    })
  }

  //点击分页
  changePage =(current)=> {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage}
    this.props.dispatch({
      type:'cTimer/fetchList',
      payload:values
    })
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'cTimer/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //新增定时
  addTimer(type){
    const paneitem = {
      title:'新增定时',
      key:`${this.props.componkey}edit`+type,
      componkey:`${this.props.componkey}edit`,
      data:{
        type
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    });
  }

  //修改
  handleOperateClick =(record)=> {
    const paneitem = {
      title:'修改定时',
      key:`${this.props.componkey}edit` + record.pdTaskTimeId,
      componkey:`${this.props.componkey}edit`,
      data:{
        pdTaskTimeId:record.pdTaskTimeId
      }
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  render(){
    //增改权限
    const rolelists = this.props.data.rolelists
    const addTimer =rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.task.time.save"
		})
    //增改权限
    const {dataList} = this.props.cTimer;
    return(
      <div className="qtools-components-pages">
        <FilterForm
          submit={this.searchData}
        />
      <div className='handel-btn-lists'>
        {
          addTimer?
          <Dropdown overlay={this.menu()} placement="bottomCenter" overlayClassName='set-time'>
            <Button
              type='primary'
              size='large'
            >新增定时
            </Button>
          </Dropdown>
          :null
        }

        </div>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick}
        />
        <Qpagination
          data={this.props.cTimer}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}
        />
      </div>
    )
  }
}
function mapStateToProps(state){
  const { cTimer } = state;
  return { cTimer };
}
export default connect(mapStateToProps)(cTimer);
