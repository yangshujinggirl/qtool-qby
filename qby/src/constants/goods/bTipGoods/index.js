import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal } from 'antd'

import FilterForm from './components/FilterForm/index.js';
import GoodsList from './components/GoodsList/index.js';
import Qpagination from '../../../components/Qpagination';
import {
  handleSellApi,
  handleNewApi,
  handleHotApi
} from '../../../services/goodsCenter/bTipGoods.js';

const WarnMessage = {
  t1: '商品状态将变为上架状态，Q掌柜将会对外售卖，确认吗',
  t2: '商品状态将变为下架状态，Q掌柜将无法对外售卖，确认吗',
  t3: '商品将会在Q掌柜首页每日上新栏目展示售卖，确认吗',//上新
  t4: '商品将会停止在Q掌柜首页每日上新栏目展示售卖，确认吗',//下新
  t5: '商品将会在Q掌柜首页畅销尖货栏目展示售卖，确认吗？',//畅销
  t6: '商品将会停止在Q掌柜首页畅销尖货栏目展示售卖，确认吗',//下畅销
}
const SuccessTips = {
  t1: '售卖成功',
  t2: '停售成功',
  t3: '上新成功',//上新
  t4: '下新成功',//下新
  t5: '畅销成功',//畅销
  t6: '下畅销成功',//下畅销
}

class BtipGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componkey:this.props.componkey,
      visible:false,
      handleContent:{},
      fields: {
         pdSpuId:"",
         code:'',
         bname:'' ,
         pdBrandName: '',
         pdCategory1Id:'',
         pdCategory2Id:'',
         status:'',
         isNew: '',
         isHot:'',
         isPresell:'' ,
         isDirectExpress:'',
       },
    }
  }
  componentWillMount() {
    this.initData();
  }

  initData() {
    const { rolelists=[] } =this.props.data;
    this.props.dispatch({
      type:'bTipGoodsList/reSetData',
    })
    this.props.dispatch({
      type:'bTipGoodsList/fetchList',
      payload:{}
    })
    this.props.dispatch({
      type:'bTipGoodsList/fetchCategory',
      payload: {
        level:1,
        parentId:null,
        status:1
      }
    });
    //权限
    this.props.dispatch({
      type:'bTipGoodsList/setAuthority',
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
    const { fields } = this.state;
    const paramsObj ={...{currentPage},...fields}
    this.props.dispatch({
      type:'bTipGoodsList/fetchList',
      payload: paramsObj
    });
  }
  //修改pageSize
  changePageSize =(values)=> {
    this.props.dispatch({
      type:'bTipGoodsList/fetchList',
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
    const { type, status } =this.state.handleContent;
    const { selecteKeys } =this.props.bTipGoodsList;
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
    const { selecteKeys } =this.props.bTipGoodsList;
    if(!selecteKeys.length>0) {
      message.error('请勾选商品',1)
      return
    };
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
        status:val,
        type,
        tips
      },
      visible:true
    })
  }
  //单个操作
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
        this.setState({
          handleContent:{tips:'t1'}
        })
        this.sellAndSaleStop([record.pdSpuId],10)
        break;
      case "saleStop":
        this.setState({
          handleContent:{tips:'t2'}
        })
        this.sellAndSaleStop([record.pdSpuId],20)
        break;
    }
  }
  //请求成功后统一处理
  successHandel() {
    //重置勾选为空
    this.props.dispatch({
      type:'bTipGoodsList/resetSelect',
      payload:{selecteKeys:[]}
    });
    //在当前页刷新
    this.props.dispatch({
      type:'bTipGoodsList/fetchList',
      payload:{
        ...this.state.fields,
        limit:this.props.bTipGoodsList.dataPag.limit,
        currentPage:this.props.bTipGoodsList.dataPag.currentPage
      }
    })
  }
  //售卖，停售
  sellAndSaleStop(ids,val) {
    this.setState({
      loading:true
    })
    const params = {
      status:val,
      pdSpuIds:ids
    }
    handleSellApi(params)
    .then(res => {
      const { code } =res;
      if(code == '0') {
        message.success(SuccessTips[this.state.handleContent.tips],1)
        this.successHandel()
      }
      this.setState({
        loading:false,
        visible:false
      })
    })
  }
  //上新
  sellNewGoods(ids,val) {
    this.setState({
      loading:true,
    })
    const params = {
      isNew:val,
      pdSpuIds:ids
    }
    handleNewApi(params)
    .then(res => {
      const { code } =res;
      if(code == '0') {
        message.success(SuccessTips[this.state.handleContent.tips],1)
        this.successHandel()
      }
      this.setState({
        loading:false,
        visible:false
      })
    })
  }
  //畅销
  sellHotGoods(ids,val) {
    this.setState({
      loading:true,
    })
    const params = {
      isHot:val,
      pdSpuIds:ids
    }
    handleHotApi(params)
    .then(res => {
      const { code } =res;
      if(code == '0') {
        message.success(SuccessTips[this.state.handleContent.tips],1)
        this.successHandel()
      }
      this.setState({
        loading:false,
        visible:false
      })
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
    const { limit, currentPage } = this.props.bTipGoodsList.dataPag;
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
        key:`${componkey}edit${record.pdSpuId}`,
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
      type:'bTipGoodsList/setCheckBox',
      payload:record.pdSpuId
    })
  }

  render() {
    const { dataList, categoryList, authorityList, dataPag } = this.props.bTipGoodsList;
    const {
      fields,
      handleContent,
      visible,
      loading
    } = this.state;
    return (
      <div className="bTip-goods-components qtools-components-pages">
        <FilterForm
          {...fields}
          categoryList={categoryList}
          submit={this.searchData}
          onValuesChange={this.handleFormChange}/>
        <div className="handel-btn-lists">
          {
            authorityList.authoritySale&&
            <span>
              <Button size="large" type="primary" onClick={()=>this.massOperation('sell',10)}>批量售卖</Button>
              <Button size="large" type="primary" onClick={()=>this.massOperation('sell',20)}>批量停售</Button>
            </span>
          }
          {
            authorityList.authorityNew&&
            <span>
              <Button size="large" type="primary" onClick={()=>this.massOperation('new',1)}>批量上新</Button>
              <Button size="large" type="primary" onClick={()=>this.massOperation('new',0)}>批量下新</Button>
            </span>
          }
          {
            authorityList.authorityHot&&
            <span>
              <Button size="large" type="primary" onClick={()=>this.massOperation('hot',1)}>批量畅销</Button>
              <Button size="large" type="primary" onClick={()=>this.massOperation('hot',0)}>批量下畅销</Button>
            </span>
          }
        </div>
        <GoodsList
          list={dataList}
          onChange={this.onCheckBoxChange.bind(this)}
          onOperateClick={this.handleOperateClick.bind(this)}/>
        {
          dataList.length>0&&
          <Qpagination
            sizeOptions="2"
            onShowSizeChange={this.changePageSize}
            data={dataPag}
            onChange={this.changePage}/>
        }
        {/* <Modal
					title='批量操作'
					visible={visible}
					onOk={this.onOkModal.bind(this)}
					onCancel={this.onCancelModal.bind(this)}>
          {WarnMessage[handleContent.tips]}
				</Modal> */}
        <Modal
          className="goods-handle-modal-wrap"
					title='批量操作'
					visible={visible}
          footer={null}
					onCancel={this.onCancelModal.bind(this)}>
          <div className="handle-modal-content">
            {WarnMessage[handleContent.tips]}
          </div>
          <div className="handle-modal-footer">
            <Button onClick={this.onCancelModal.bind(this)}>取消</Button>
            <Button
              type='primary'
              loading={loading}
              onClick={this.onOkModal.bind(this)}>确认</Button>
          </div>
				</Modal>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { bTipGoodsList } = state;
  return {bTipGoodsList};
}

export default connect(mapStateToProps)(BtipGoods);
