import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal } from 'antd'

import FilterForm from './components/FilterForm/index.js';
import GoodsList from './components/GoodsList/index.js';
import Qpagination from '../../../components/Qpagination';
import { handleSellApi } from '../../../services/goodsCenter/cTipGoods.js';

const WarnMessage = {
  t1: '商品状态将变为上架状态，Q掌柜将会对外售卖，确认吗',
  t2: '商品状态将变为下架状态，Q掌柜将会对外售卖，确认吗',
  t3: '商品将会在Q掌柜首页每日上新栏目展示售卖，确认吗',//上新
  t4: '商品将会停止在Q掌柜首页畅销尖货栏目展示售卖，在其他栏目继续展示售卖，确认吗',//下新
  t5: '商品将会在Q掌柜首页畅销尖货栏目展示售卖，确认吗？',//畅销
  t6: '商品状态将变为上新状态，Q掌柜将会对外售卖，确认吗',//下畅销
}
const SuccessTips = {
  t1: '售卖成功',
  t2: '售售成功',
  t3: '上新成功',//上新
  t4: '下新成功',//下新
  t5: '畅销',//畅销
  t6: '下畅销',//下畅销
}

class CtipGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componkey:this.props.componkey,
      visible:false,
      handleContent:{},
      selecteKeys:[],
      fields: {
         code: {
           value: '',
         },
         cname: {
           value: '',
         },
         brandName: {
           value: '',
         },
         pdCategory1Name: {
           value: '',
         },
         infoStatus: {
           value: '',
         },
         eventNew: {
           value: '',
         },
         eventHot: {
           value: '',
         },
       },
    }
  }
  componentWillMount() {
    this.initData()
  }
  initData() {
    this.props.dispatch({
      type:'cTipGoodsList/fetchList',
      payload:{}
    })
    this.props.dispatch({
      type:'cTipGoodsList/fetchCategory',
      payload: {
        level:1,
        parentId:null,
        status:1
      }
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
    const formData = {};
    let key;
    for(key in fields) {
      formData[key] = fields[key].value;
    }
    const paramsObj ={...{currentPage},...formData}
    this.props.dispatch({
      type:'cTipGoodsList/fetchList',
      payload: paramsObj
    });
  }
  //修改pageSize
  changePageSize =(values)=> {
    this.props.dispatch({
      type:'cTipGoodsList/fetchList',
      payload: values
    });
  }
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'bTipGoodsList/fetchList',
      payload: values
    });
  }
  //Modal取消
  onCancelModal() {
    this.setState({
      visible:false,
    })
  }
  //Modal确定
  onOkModal() {
    const { type, status, selecteKeys } =this.state.handleContent;
    switch(type) {
      case 'sell':
        this.sellAndSaleStop(selecteKeys,status)
        break;
      case 'new':
        this.sellNewGoods(selecteKeys,status)
        break;
      case 'hot':
        this.sellHotGoods(selecteKeys,status)
        break;
    }
  }
  //批量操作
  massOperation(type,val) {
    const { selecteKeys } =this.state;
    if(!selecteKeys.length>0) {
      message.error('请勾选商品',1)
      return
    }
    let tips;
    switch(type) {
      case 'sell':
        tips = val==10?'t1':'t2';
        break;
      case 'new':
        tips = val?'t3':'t4';
        break;
      case 'hot':
        tips = val?'t5':'t6';
        break;
    }
    this.setState({
      handleContent:{
        selecteKeys,
        status:val,
        type,
        tips
      },
      visible:true
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
        this.sellAndSaleStop([record.pdSpuId],10)
        break;
      case "saleStop":
        this.sellAndSaleStop([record.pdSpuId],20)
        break;
    }
  }
  //请求成功后统一处理
  successHandel() {
    this.props.dispatch({
      type:'cTipGoodsList/fetchList',
      payload:{}
    })
    this.setState({
      visible:false,
      selecteKeys:[]
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
        message.success(SuccessTips[this.state.handleContent.tips])
        this.successHandel()
      } else {
        this.setState({visible:false})
      }
    })
  }
  //上新
  sellNewGoods(ids,val) {
    const params = {
      isNew:val,
      pdSpuIds:ids
    }
    handleSellApi(params)
    .then(res => {
      const { code } =res;
      if(code == '0') {
        message.success(SuccessTips[this.state.handleContent.tips])
        this.successHandel()
      } else {
        this.setState({visible:false})
      }
    })
  }
  //畅销
  sellHotGoods(ids,val) {
    const params = {
      isHot:val,
      pdSpuIds:ids
    }
    handleSellApi(params)
    .then(res => {
      const { code } =res;
      if(code == '0') {
        message.success(SuccessTips[this.state.handleContent.tips])
        this.successHandel()
      } else {
        this.setState({visible:false})
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
    const paneitem={
      title:'商品编辑',
      key:`${this.state.componkey}edit${record.pdSpuId}`,
      componkey:`${this.state.componkey}edit`,
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
  //多选
  onCheckBoxChange(record) {
    this.props.dispatch({
      type:'cTipGoodsList/setCheckBox',
      payload:record.pdSpuId
    })
    const selecteKeys = [...this.state.selecteKeys,record.pdSpuId];
    this.setState({
      selecteKeys
    })
  }
  render() {
    const { dataList, categoryList } = this.props.cTipGoodsList;
    const {fields, handleContent, visible} = this.state;
    return (
      <div className="cTip-goods-components qtools-components-pages">
        <FilterForm
          {...fields}
          categoryList={categoryList}
          submit={this.searchData}
          onChange={this.handleFormChange}/>
        <div className="handel-btn-lists">
          <Button size="large" type="primary" onClick={()=>this.massOperation('sell',10)}>批量售卖</Button>
          <Button size="large" type="primary" onClick={()=>this.massOperation('sell',20)}>批量停售</Button>
          <Button size="large" type="primary" onClick={()=>this.massOperation('new',true)}>批量上新</Button>
          <Button size="large" type="primary" onClick={()=>this.massOperation('new',false)}>批量下新</Button>
          <Button size="large" type="primary" onClick={()=>this.massOperation('hot',true)}>批量畅销</Button>
          <Button size="large" type="primary" onClick={()=>this.massOperation('hot',false)}>批量下畅销</Button>
        </div>
        <GoodsList
          list={dataList}
          onChange={this.onCheckBoxChange.bind(this)}
          onOperateClick={this.handleOperateClick.bind(this)}/>
        <Qpagination
          sizeOptions="2"
          onShowSizeChange={this.changePageSize}
          data={this.props.cTipGoodsList}
          onChange={this.changePage}/>
          <Modal
  					title='批量操作'
  					visible={visible}
  					onOk={this.onOkModal.bind(this)}
  					onCancel={this.onCancelModal.bind(this)}>
            {WarnMessage[handleContent.tips]}
  				</Modal>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { cTipGoodsList } = state;
  return {cTipGoodsList};
}

export default connect(mapStateToProps)(CtipGoods);
