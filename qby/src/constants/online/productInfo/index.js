import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal } from 'antd'

import FilterForm from './components/FilterForm/index.js';
import GoodsList from './components/GoodsList/index.js';
import Qpagination from '../../../components/Qpagination';
import { exportDataApi, handleSellApi,productOnlineApi,productNewApi,productHotApi } from '../../../services/online/productInfo.js';

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
      visible:false,
      handleContent:{},
      inputValues:{},
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
  //分页
  changePage = (currentPage) => {
    currentPage--;
    //清空勾选
    this.setState({
      selecteKeys:[],
    });
    const { inputValues } = this.state;
    const paramsObj ={...{currentPage},...inputValues}
    this.props.dispatch({
      type:'productGoodsList/fetchList',
      payload: paramsObj
    });
  }
  //修改pageSize
  changePageSize =({currentPage,limit})=> {
    const { inputValues } = this.state;
    const paramsObj = {limit,...inputValues}
    this.props.dispatch({
      type:'productGoodsList/fetchList',
      payload: paramsObj
    });
  }
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'productGoodsList/fetchList',
      payload: values
    });
    this.setState({
      inputValues:values
    })
  }
  //导出数据
  exportData () {
    const { dataPag } = this.props.productGoodsList;
    const {inputValues} = this.state;
    for(var i in inputValues){
      if(inputValues[i] && typeof(inputValues[i]) == 'string'){
        inputValues[i] = inputValues[i].trim();
      };
    }
    let params={
      type:32,
      downloadParam:{
        ...inputValues,
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
    // message.success(SuccessTips[this.state.tips],1)
    const {limit,currentPage} = this.props.productGoodsList.dataPag
    //重置勾选为空
    this.props.dispatch({
      type:'productGoodsList/resetSelect',
      payload:{selecteKeys:[]}
    })
    //在当前页刷新
    this.props.dispatch({
      type:'productGoodsList/fetchList',
      payload:{
        ...this.state.fields,
        limit,
        currentPage
      }
    })
  }
  //售卖，停售
  // sellAndSaleStop(ids,val) {
  //   const params = {
  //     status:val,
  //     pdSpuIds:ids
  //   }
  //   handleSellApi(params)
  //   .then(res => {
  //     const { code } =res;
  //     if(code == '0') {
  //       this.successHandel()
  //     }
  //   })
  // }
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
    const { limit, currentPage } = this.props.productGoodsList.dataPag;
    const { componkey } = this.state;
    const paneitem={
      title:'商品编辑',
      key:`${componkey}edit${record.pdSpuId}`,
      componkey:`${componkey}edit`,
      data:{
        listParams:{
          ...this.state.inputValues,
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
  massOperation =(type,val)=> {
    const { selecteKeys } =this.props.productGoodsList;
    if(!selecteKeys.length>0) {
      message.error('请勾选商品',1)
      return
    };
    let tips;
    switch(type){
      case 'sell':
        tips = val==10 ? 't1' :'t2';
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
        type,
        status:val,
        tips
      },
      visible:true
    })
  }
  onCancelModal =()=> {
    this.setState({
      visible:false
    })
  }
  onOkModal =()=> {
    const { type, status } =this.state.handleContent;
    const { selecteKeys } =this.props.productGoodsList;
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
  //上线下线
  sellAndSaleStop(ids,val) {
    this.setState({
      loading:true,
    })
    const params = {
      status:val,
      pdSpuIds:ids
    }
    productOnlineApi(params)
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
    productNewApi(params)
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
    productHotApi(params)
    .then(res => {
      const { code } =res;
      if(code == '0') {
        message.success(SuccessTips[this.state.handleContent.tips],1)
        this.successHandel()
      } else {
        this.setState({visible:false})
      };
      this.setState({
        loading:false,
        visible:false
      });
    })
  }
  //多选
  onCheckBoxChange(record) {
    this.props.dispatch({
      type:'productGoodsList/setCheckBox',
      payload:record.pdSpuId
    })
  }
  render() {
    //批量上下线
    const isSell=this.props.data.rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.spu.status"
		})
    //批量New
    const isNew=this.props.data.rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.ospu.statusnew"
		})
    //批量Hot
    const isHot=this.props.data.rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.ospu.statushot"
    })
    const { dataList, authorityList, dataPag } = this.props.productGoodsList;
    const {
      fields,
      handleContent,
      visible,
      loading
    } = this.state;
    return (
      <div className="bTip-goods-components qtools-components-pages">
        <FilterForm
          submit={this.searchData}
          onValuesChange={this.handleFormChange}/>
        <div className="handel-btn-lists">
          {
            authorityList.authorityExport&&
            <Button size="large" type="primary" onClick={()=>this.exportData()}>导出数据</Button>
          }
          {
            isSell &&
            <span>
              <Button size="large" type="primary" onClick={()=>this.massOperation('sell',10)}>批量上线</Button>
              <Button size="large" type="primary" onClick={()=>this.massOperation('sell',20)}>批量下线</Button>
            </span>
          }
          {
            isNew &&
            <span>
              <Button size="large" type="primary" onClick={()=>this.massOperation('new',true)}>批量NEW</Button>
              <Button size="large" type="primary" onClick={()=>this.massOperation('new',false)}>批量下NEW</Button>
            </span>
          }
          {
            isHot &&
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
          onOk={this.onOkModal}
          onCancel={this.onCancelModal}
					visible={visible}
          closable={false}
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
  const { productGoodsList } = state;
  return {productGoodsList};
}

export default connect(mapStateToProps)(BtipGoods);
