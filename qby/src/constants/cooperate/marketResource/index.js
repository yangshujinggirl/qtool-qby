import React,{ Component } from 'react';
import Columns from './columns/index';
import FilterForm from './FilterForm/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import {connect} from 'dva'
class MarketResource extends Component{
    constructor(props){
        super(props);
        this.state = {
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
    render(){
        const {dataList = [] } = this.props.marketResource;
        const { fields } = this.state;
        return (
            <div className='marketResource'>
                <FilterForm
                  {...fields}
                  submit={this.searchData}
                  onChange={this.handleFormChange}/>
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
