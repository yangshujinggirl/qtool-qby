import React,{ Component } from 'react';
import {Button} from 'antd'
import Columns from './columns/index';
import FilterForm from './FilterForm/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import {connect} from 'dva'
class MarketResource extends Component{
    constructor(props){
        super(props);
        this.state = {
          componkey:this.props.componkey,
          inputValues:{},
        }
    }
    //初始化数据
    componentWillMount() {
      this.props.dispatch({
          type:'marketResource/fetchList',
          payload:{}
      })
    }
    //pageSize改变时的回调
    onShowSizeChange =({currentPage,limit})=> {
      this.props.dispatch({
        type:'marketResource/fetchList',
        payload:{currentPage,limit,...this.state.inputValues}
      });
    }
    //点击分页
    changePage =(current,limit)=> {
      const currentPage = current-1;
      const values = {...this.state.inputValues,currentPage,limit}
      this.props.dispatch({
          type:'marketResource/fetchList',
          payload:values
      })
    }

    //点击搜索
    searchData =(values)=> {
      this.props.dispatch({
          type:'marketResource/fetchList',
          payload:values
      });
      this.setState({
        inputValues:values
      })
    }
    //点击新增人员
    addStaff =()=> {
      const paneitem={
        title:'新增人员',
        key:`${this.state.componkey}edit`,
        componkey:`${this.state.componkey}edit`,
        data:null
      }
      this.props.dispatch({
          type:'tab/firstAddTab',
          payload:paneitem
      })
    }
    //修改
    handleOperateClick =(record)=> {
      const { limit, currentPage } = this.props.marketResource;
      const { componkey } = this.state;
      const paneitem = {
        title:'修改人员',
        key:`${componkey}edit`+record.marketResId,
        componkey:`${componkey}edit`,
        data:{
          marketResId:record.marketResId,
          listParams:{
            ...this.state.inputValues,
            limit,
            currentPage
          }
        }
      }
      this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
      })
    }
    //市场资源
    render(){
        const { dataList } = this.props.marketResource;
        return (
            <div className='qtools-components-pages'>
                <FilterForm
                  submit={this.searchData}
                />
                <div className="handel-btn-lists">
                  <Button onClick={this.addStaff} size='large' type="primary">新增人员</Button>
                </div>
                <Qtable
                  dataSource = {dataList}
                  columns = {Columns}
                  onOperateClick = {this.handleOperateClick.bind(this)}
                />
                {
                  dataList.length>0?
                  <Qpagination
                    data={this.props.marketResource}
                    onChange={this.changePage}
                    onShowSizeChange = {this.onShowSizeChange}
                  />:null
              }
            </div>
        )
    }
}

function mapStateToProps(state){
    const {marketResource} = state;
    return {marketResource}
}
export default connect(mapStateToProps)(MarketResource)
