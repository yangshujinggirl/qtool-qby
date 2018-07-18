import React,{ Component } from 'react';
import {Button} from 'antd'
import Columns from './columns/index';
import FilterForm from './FilterForm/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import './index.css'
import {connect} from 'dva'
class MarketResource extends Component{
    constructor(props){
        super(props);
        this.state = {
          componkey:this.props.componkey,
          fields: {
             userName: {
               value: '',
             },
             name: {
               value: '',
             },
             shopName: {
               value: '',
             },
             recTel: {
               value: '',
             },
           },
        }
    }
    //初始化数据
    componentWillMount() {
      this.props.dispatch({
          type:'marketResource/fetchList',
          payload:{}
      })
    }

    //双向绑定表单
    handleFormChange = (changedFields) => {
      this.setState(({ fields }) => ({
        fields: { ...fields, ...changedFields },
      }));
    }
    //点击分页
    changePage =(currentPage)=> {
      const { fields } = this.state;
      const formData = {};
      let key;
      for(key in fields) {
        formData[key] = fields[key].value;
      }
      const paramsObj ={...{currentPage},...formData}
      this.props.dispatch({
          type:'marketResource/fetchList',
          payload:paramsObj
      })
    }

    //点击搜索
    searchData =(values)=> {
      this.props.dispatch({
          type:'marketResource/fetchList',
          payload:values
      })
    }
    //点击新增人员
    addStaff(){
      const paneitem={
        title:'新增人员',
        key:`${this.state.componkey}edit`,
        componkey:`${this.state.componkey}edit`,
        data:{
          pdSpuId:null,
        }
      }
      this.props.dispatch({
          type:'tab/firstAddTab',
          payload:paneitem
      })
    }

    //市场资源
    render(){
        const {dataList = [] } = this.props.marketResource;
        const { fields } = this.state;
        return (
            <div className='marketResource'>
                <FilterForm
                  {...fields}
                  submit={this.searchData}
                  onChange={this.handleFormChange}/>
                <div className='add'><Button onClick={()=>this.addStaff()} type="primary">新增人员</Button></div>
                <Qtable
                  dataSource={dataList}
                  columns = {Columns}/>
                <Qpagination
                  data={this.props.marketResource}
                  onChange={this.changePage}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {marketResource} = state;
    return {marketResource}
}
export default connect(mapStateToProps)(MarketResource)
