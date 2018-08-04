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
          fields: {
             userName:"",
             name:"",
             shopName:"",
             recTel:"",
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
    changePage =(current)=> {
      const currentPage = current-1;
      const values = {...this.state.fields,currentPage}
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
    //操作
    handleOperateClick =(record)=> {
      const paneitem = {
        title:'修改人员',
        key:`${this.state.componkey}edit`+record.marketResId,
        componkey:`${this.state.componkey}edit`,
        data:{
          marketResId:record.marketResId,
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
            <div className='qtools-components-pages'>
                <FilterForm
                  {...fields}
                  submit={this.searchData}
                  onChange={this.handleFormChange}/>
                <div className="handel-btn-lists">
                  <Button onClick={this.addStaff} size='large' type="primary">新增人员</Button>
                </div>
                <Qtable
                  dataSource = {dataList}
                  columns = {Columns}
                  onOperateClick = {this.handleOperateClick.bind(this)}
                />
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
