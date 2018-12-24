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
} from '../../../services/goodsCenter/cTipGoods.js';

const WarnMessage = {
  t1: '商品状态将变为上架状态，Qtools将对外售卖，确认吗',
  t2: '商品状态将变为下架状态，Qtools将无法对外售卖，确认吗',
  t3: '商品将会在Qtools首页NEW栏目展示售卖，确认吗',//上新
  t4: '商品将会停止在Qtools首页NEW栏目展示售卖，确认吗',//下新
  t5: '商品将会在Qtools首页HOT栏目展示售卖，确认吗？',//畅销
  t6: '商品将会停止在Qtools首页HOT栏目展示售卖，确认吗',//下畅销
}
const SuccessTips = {
  t1: '上线成功',
  t2: '下线成功',
  t3: '上新成功',//上新
  t4: '下新成功',//下新
  t5: '畅销成功',//畅销
  t6: '下畅销成功',//下畅销
}

class CtipGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componkey:this.props.componkey,
      visible:false,
      handleContent:{},
      fields: {
         pdSpuId:"",
         code:'' ,
         cname:'',
         pdBrandName:'',
         pdCategory1Id:'',
         pdCategory2Id:'',
         cstatus:'',
         isNew:'',
         isHot:'',
       },
    }
  }
  componentWillMount() {
    this.initData();
  }

  initData() {
    const { rolelists=[] } =this.props.data;
    //初始化时reSetData
    this.props.dispatch({
      type:'cTipGoodsList/reSetData',
    })
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
    //权限
    this.props.dispatch({
      type:'cTipGoodsList/setAuthority',
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
    const { fields } = this.state;
    const paramsObj ={...{currentPage},...fields}
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
      type:'cTipGoodsList/fetchList',
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
    const { selecteKeys } =this.props.cTipGoodsList;
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
    const { selecteKeys } =this.props.cTipGoodsList;
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
      type:'cTipGoodsList/resetSelect',
      payload:{selecteKeys:[]}
    });
    //在当前页刷新
    this.props.dispatch({
      type:'cTipGoodsList/fetchList',
      payload:{
        ...this.state.fields,
        limit:this.props.cTipGoodsList.dataPag.limit,
        currentPage:this.props.cTipGoodsList.dataPag.currentPage
      }
    })
  }
  //上线下线
  sellAndSaleStop(ids,val) {
    this.setState({
      loading:true,
    })
    const params = {
      cstatus:val,
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
      } else {
        this.setState({visible:false})
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
      key:`${this.state.componkey}edit${record.pdSpuId}info`+Math.random(),
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
    const { limit, currentPage } = this.props.cTipGoodsList.dataPag;
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
  //多选
  onCheckBoxChange(record) {
    this.props.dispatch({
      type:'cTipGoodsList/setCheckBox',
      payload:record.pdSpuId
    })
  }
  render() {
    const { dataList, categoryList, authorityList, dataPag } = this.props.cTipGoodsList;
    const {
      fields,
      handleContent,
      visible,
      loading
    } = this.state;
    return (
      <div className="cTip-goods-components qtools-components-pages">
        <FilterForm
          {...fields}
          categoryList={categoryList}
          submit={this.searchData}
          onValuesChange={this.handleFormChange}/>
        <div className="handel-btn-lists">
          {
            authorityList.authoritySale&&
            <span>
              <Button size="large" type="primary" onClick={()=>this.massOperation('sell',10)}>批量上线</Button>
              <Button size="large" type="primary" onClick={()=>this.massOperation('sell',20)}>批量下线</Button>
            </span>
          }
          {
            authorityList.authorityNew&&
            <span>
              <Button size="large" type="primary" onClick={()=>this.massOperation('new',true)}>批量NEW</Button>
              <Button size="large" type="primary" onClick={()=>this.massOperation('new',false)}>批量下NEW</Button>
            </span>
          }
          {
            authorityList.authorityHot&&
            <span>
              <Button size="large" type="primary" onClick={()=>this.massOperation('hot',true)}>批量HOT</Button>
              <Button size="large" type="primary" onClick={()=>this.massOperation('hot',false)}>批量下HOT</Button>
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
        <Modal
          className="goods-handle-modal-wrap"
					title='批量操作'
					visible={visible}
          footer={null}>
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
  const { cTipGoodsList } = state;
  return {cTipGoodsList};
}

export default connect(mapStateToProps)(CtipGoods);
