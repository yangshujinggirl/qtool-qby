import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal } from 'antd'

import FilterForm from './components/FilterForm/index.js';
import GoodsList from './components/GoodsList/index.js';
import Qpagination from '../../../components/Qpagination';
import { exportDataApi, handleSellApi } from '../../../services/online/productInfo.js';

const SuccessTips = {
  t1: '售卖成功',
  t2: '停售成功',
  t3: '上新成功',//上新
  t4: '下新成功',//下新
  t5: '畅销',//畅销
  t6: '下畅销',//下畅销
}

class BtipGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componkey:this.props.componkey,
      selecteKeys:[],
      tips:'',
      fields: {
         pdSpuId:'',
         code:'',
         oname:'',
         barCode:'',
         pdBrandName:'',
         status:'',
         warehouseId:'',
       },
    }
  }
  componentWillMount() {
    this.initPage()
  }
  initPage() {
    const { rolelists=[] } =this.props.data;
    //初始化时reSetData
    this.props.dispatch({
      type:'productGoodsList/reSetData',
    })
    this.props.dispatch({
      type:'productGoodsList/fetchList',
      payload:{}
    })
    //权限
    this.props.dispatch({
      type:'productGoodsList/setAuthority',
      payload: rolelists
    });
  }
  //双向绑定表单
  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }
  //分页
  changePage = (currentPage) => {
    currentPage--;
    //清空勾选
    this.setState({
      selecteKeys:[],
    })
    const { fields } = this.state;
    const paramsObj ={...{currentPage},...fields}
    this.props.dispatch({
      type:'productGoodsList/fetchList',
      payload: paramsObj
    });
  }
  //修改pageSize
  changePageSize =(values)=> {
    this.props.dispatch({
      type:'productGoodsList/fetchList',
      payload: values
    });
  }
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'productGoodsList/fetchList',
      payload: values
    });
  }
  //导出数据
  exportData () {
    const { dataPag } = this.props.productGoodsList;
    const { fields } = this.state;
    let params={
      type:32,
      downloadParam:{
        ...fields,
        limit:dataPag.limit,
        currentPage:dataPag.currentPage
      },
    }
    exportDataApi(params)
    .then((res) => {
      const { code } =res;
      if(code == '0') {
        var _dispatch=this.props.dispatch
        Modal.confirm({
          title: '数据已经进入导出队列',
          content: '请前往下载中心查看导出进度',
          cancelText:'稍后去',
          okText:'去看看',
          onOk() {
            const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
            _dispatch({
              type:'tab/firstAddTab',
              payload:paneitem
            });
            _dispatch({
              type:'downlaod/fetch',
              payload:{code:'qerp.web.sys.doc.list',values:{limit:16,currentPage:0}}
            });
          },
          onCancel() {

          },
        });
      }
    })

  }
  //操作
  handleOperateClick(record,type) {
    switch(type) {
      case "detail":
        this.getDetail(record)
        break;
      case "edit":
        this.getEdit(record)
        break;
      case "log":
        this.getLog(record)
        break;
      case "sell":
        this.setState({tips:'t1'})
        this.sellAndSaleStop([record.pdSpuId],10)
        break;
      case "saleStop":
        this.setState({tips:'t2'})
        this.sellAndSaleStop([record.pdSpuId],20)
        break;
    }
  }
  //请求成功后统一处理
  successHandel() {
    message.success(SuccessTips[this.state.tips],1)
    //在当前页刷新
    this.props.dispatch({
      type:'productGoodsList/fetchList',
      payload:{
        currentPage:this.props.productGoodsList.currentPage
      }
    })
  }
  //售卖，停售
  sellAndSaleStop(ids,val) {
    const params = {
      status:val,
      pdSpuIds:ids
    }
    handleSellApi(params)
    .then(res => {
      const { code } =res;
      if(code == '0') {
        this.successHandel()
      }
    })
  }
  //详情
  getDetail(record) {
    const paneitem={
      title:'商品详情',
      key:`${this.state.componkey}edit${record.pdSpuId}info`,
      componkey:`${this.state.componkey}info`,
      data:{
        pdSpuId:record.pdSpuId,
        source:record.source
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  //编辑。
  getEdit(record) {
    const { limit, currentPage } = this.props.productGoodsList;
    const { componkey } = this.state;
    const paneitem={
      title:'商品编辑',
      key:`${componkey}edit${record.pdSpuId}`,
      componkey:`${componkey}edit`,
      data:{
        listParams:{
          ...this.state.fields,
          limit,
          currentPage
        },
        pdSpuId:record.pdSpuId,
        source:record.source,
        key:`${componkey}edit${record.pdSpuId}`
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  //日志
  getLog(record) {
    const paneitem={
      title:'商品日志',
      key:`${this.state.componkey}editconfig${record.pdSpuId}info`,
      componkey:`${this.state.componkey}editconfig`,
      data:{
        pdSpuId:record.pdSpuId,
        source:record.source,
        key:`${this.state.componkey}edit${record.pdSpuId}`
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }

  render() {
    const { dataList, authorityList, dataPag } = this.props.productGoodsList;
    const {fields} = this.state;
    return (
      <div className="bTip-goods-components qtools-components-pages">
        <FilterForm
          {...fields}
          submit={this.searchData}
          onValuesChange={this.handleFormChange}/>
        <div className="handel-btn-lists">
          {
            authorityList.authorityExport&&
            <Button size="large" type="primary" onClick={()=>this.exportData()}>导出数据</Button>
          }
        </div>
        <GoodsList
          list={dataList}
          onOperateClick={this.handleOperateClick.bind(this)}/>
        {
          dataList.length>0&&
          <Qpagination
            sizeOptions="2"
            onShowSizeChange={this.changePageSize}
            data={dataPag}
            onChange={this.changePage}/>
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { productGoodsList } = state;
  return {productGoodsList};
}

export default connect(mapStateToProps)(BtipGoods);
