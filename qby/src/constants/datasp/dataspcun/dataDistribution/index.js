import React, { Component } from 'react';
import { Button, Modal, message } from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../../components/Qtable/index'; //表单
import Qpagination from '../../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import { exportDataApi } from '../../../../services/orderCenter/userOrders'
import './index.less'
const confirm = Modal.confirm;

class DataDistribute extends Component{
  constructor(props){
    super(props);
    this.state ={
      field:{
        shopName:'',
        type:'',
      }
    }
  }
  //初始化数据
  componentWillMount(){
    const {pdSkuId,pdSpuId} = this.props.data;
    this.props.dispatch({
      type:'dataspcun/initId',
      payload:{pdSkuId,pdSpuId}
    })
    this.props.dispatch({
      type:'dataspcun/fetchList',
      payload:{pdSkuId,pdSpuId}
    })
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'dataspcun/fetchList',
      payload:values
    })
  }
  //点击分页
  changePage =(current)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'dataspcun/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'dataspcun/fetchList',
      payload:{currentPage,limit}
    });
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    this.setState({field:values});
  }

  //导出数据
  exportData =()=> {
    const values ={type:77,downloadParam:{...this.state.field}}
    exportDataApi(values)
    .then(res => {
      if(res.code == '0'){
        confirm({
          title: '数据已经进入导出队列',
          content: '请前往下载中心查看导出进度',
          cancelText:'稍后去',
          okText:'去看看',
          onOk() {
            const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
            this.props.dispatch({
              type:'tab/firstAddTab',
              payload:paneitem
            });
            this.props.dispatch({
              type:'downlaod/fetch',
              payload:{code:'qerp.web.sys.doc.list',values:{limit:15,currentPage:0}}
            });
          },
        });
      }
    },err => {
      message.error('导出数据失败')
    })
  }
  render(){
    const {dataList} = this.props.dataspcun.distributeData;
    const {total} = this.props.dataspcun.distributeData;
    return(
      <div className='qtools-components-pages inventory'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div className="handel-btn-lists">
            <Button
              size='large'
              type='primary'
              onClick={this.exportData}
              >导出数据</Button>
        </div>
        <div className='total'>共有 { total } 家门店有此商品</div>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
        />
        <Qpagination
          data={this.props.dataspcun.distributeData}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}
        />
      </div>
    )
  }
}
function mapStateToProps(state){
  const {dataspcun} = state;
  return {dataspcun};
}
export default connect(mapStateToProps)(DataDistribute);
