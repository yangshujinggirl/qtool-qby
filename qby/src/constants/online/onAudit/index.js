import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table,Input,Icon,Popover,Form,} from 'antd'
import { getPriceListApi,mergeOrderApi,auditOrdeApi,saveAuditOrdeApi,savePriceApi,cancelOrderApi} from '../../../services/online/onAudit'
import { getWareListApi } from '../../../services/goodsCenter/baseGoods.js';
import Qtable from '../../../components/Qtable/index';
import Qpagination from '../../../components/Qpagination/index';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';
import moment from 'moment';
import SplitOrderModal from "./components/SplitOrder"
import ChangePriceModal from "./components/ChangePriceModal"
import MergeModal from "./components/MergeModal"
import MarkStar from "./components/MarkStar"
import Cancel from "./components/CancelModal"
import {timeForMats} from '../../../utils/meth';
import {deepcCloneObj} from "../../../utils/commonFc"


const confirm = Modal.confirm;
const FormItem = Form.Item;
import './index.less'

class OnAudit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEcSuborderPayAmount:0,
      dataSource:[],
      newList:[], //新增订单列表
      apartList:[], //原始订单列表
      ecOrderId:null,//主单id
      ecSuborderId:null, //原始订单的id
      splitVisible:false, //拆单弹窗
      ecSuborderNo:null,//原始子单单号
      newEcSuborderNo:null,//新增子单单号
      suborderPayAmount:0,//原始订单实付金额
      ecSuborderSurplusPayAmount:0,//原始订单剩余实付金额
      totalActPrcie:0,//新增实付金额总和
      priceVisible:false,//修改价格弹窗
      newTotalMoney:0,//新实付总价
      priceList:[],//修价列表
      oldTotalPrice:0,//原实付总价
      mergeVisible:false,
      markVisible:false,
      cancelVisible:false,
      iconTypeRemark:"",
      inputValues:{},
      isLoading:false,
      rowSelection:{
        type:"radio",
        selectedRowKeys:this.props.onAudit.selectedRowKeys,
        onChange:this.onChange,
      },
      pdTaxWarehouses:[]
    }
  }
  componentDidMount =()=> {
    this.getNowFormatDate();
    this.getWareList();
  }
  getNowFormatDate = () => {
   const startRpDate=timeForMats(30).t2;
   const endRpDate=timeForMats(30).t1;
   this.searchData({
     payTimeST:startRpDate,
     payTimeET:endRpDate
   });
 }
 //请求仓库列表
 getWareList =()=> {
   getWareListApi()
   .then(res=>{
     if(res.code == '0'){
       this.setState({
         pdTaxWarehouses:res.pdTaxWarehouses
       })
     }
   })
 }
  componentWillReceiveProps(props) {
    this.setState({
      rowSelection : {
        selectedRowKeys:props.onAudit.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      }
    });
  }
  //单选按钮发生改变
  onChange =(selectedRowKeys,selectedRows)=> {
    // 消除选中状态
    const {rowSelection}=this.state;
    this.setState({
      rowSelection:Object.assign({},rowSelection,{selectedRowKeys})
    });
    if(selectedRows[0]){
      this.setState({
        selectedRowKeys:selectedRowKeys[0],
        ecSuborderId:selectedRows[0].ecSuborderId,
        iconType:selectedRows[0].iconType,
        iconTypeRemark:selectedRows[0].iconTypeRemark,
        ecOrderId:selectedRows[0].ecOrderId,
      });
    };
  }
  //取消订单或审核通过的请求
  cancelOrder =(obj,clearForm)=> {
    this.setState({
      isLoading:true
    });
    const {limit,currentPage} = this.props.onAudit;
    cancelOrderApi(obj)
    .then(res=>{
      if(res.code=="0"){
        if(obj.status == 6){
          message.success("审核通过成功",.8);
        }else{
          this.setState({
            cancelVisible:false,
          });
          clearForm();
          message.success("取消订单成功",.8);
        };
        this.props.dispatch({
          type:'onAudit/fetchList',
          payload:{...this.state.inputValues,limit,currentPage}
        });
        this.setState({
          isLoading:false
        });
      }else{
        this.setState({
          isLoading:false
        });
      };
    });
  }
  //操作
  handleOperateClick(parentRecord,record,type) {
    const {limit,currentPage} = this.props.onAudit;
    let obj={ecSuborderId:parentRecord.ecSuborderId};
    if(type=="audit"){ //审核通过
      obj.status = 6;
      this.cancelOrder(obj);
    }else if(type=="cancel"){ //取消订单
      this.setState({
        cancelVisible:true,
        ecSuborderId:parentRecord.ecSuborderId
      });
      // message.warning('周年庆期间退单功能暂时关闭')
    }else{ //跳转至订单详情
      const postgood = {children:null,code:"801700",menu:1,menuStr:null,name:"发货",rank:null,remark:null,status:1,statusStr:null,urResourceId:801700,url:"qerp.web.ec.express.hk.save"}
      const editorder = {children: null,code: "801400",menu: 1,menuStr: null,name: "修改订单",rank: null,remark: null,status: 1,statusStr: null,urResourceId: 801400,url: "qerp.web.ec.pd.userOrder.save"}
      const paneitem = {
        title:'订单详情',
        key:'804000edit'+parentRecord.ecSuborderId+'info',
        data:{id:parentRecord.ecOrderId,editorder,postgood,record:{channel:parentRecord.channel}},
        componkey:'801000info',
      };
      this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
      });
    };
  }
  //点击分页
  changePage = (current,limit) => {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage,limit}
    this.props.dispatch({
      type:'onAudit/fetchList',
      payload: values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange = ({currentPage,limit})=> {
    this.props.dispatch({
      type:'onAudit/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'onAudit/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    })
  }
  //点击订单拆分按钮
  splitFormChange =()=>{
    if(this.state.rowSelection.selectedRowKeys){
      this.setState({splitVisible:true});
      const {ecOrderId,ecSuborderId} = this.state;
      auditOrdeApi({ecOrderId,ecSuborderId})
      .then(res => {
        if(res.code == "0"){
          let {spus,ecSuborderNo,newEcSuborderNo,suborderPayAmount} = res.ecSuborder;
          suborderPayAmount = Number(suborderPayAmount).toFixed(2);
          spus.map((item,index)=>{
            item.key=index;
            item.surplusQty=item.qty;
            return item;
          });
          this.setState({apartList:spus,ecSuborderNo,newEcSuborderNo,suborderPayAmount,ecSuborderSurplusPayAmount:suborderPayAmount})
        };
      })
    }else{
      message.error("请选择需要拆分的订单",.8);
    };
  }
  //拆分订单取消
  onSplitCancel =()=> {
    this.setState({splitVisible:false,apartList:[],selectedRowKeys:null,newList:[],newEcSuborderPayAmount:0})
    this.onChange(null,[]);
  }
  //确认拆单
  onSplitOk =(obj,clearForm)=> {
    const { limit, currentPage } = this.props.onAudit;
    saveAuditOrdeApi(obj)
    .then(res=>{
      if(res.code=="0"){
        clearForm();
        message.success("订单拆分成功",.8);
        this.setState({splitVisible:false,apartList:[],newList:[],newEcSuborderPayAmount:0});
        this.props.dispatch({
          type:'onAudit/fetchList',
          payload:{...this.state.field,limit,currentPage}
        });
      };
    });
  }
  //点击修改价格按钮
  changePrice =()=> {
    if(this.state.rowSelection.selectedRowKeys){
      this.setState({priceVisible:true})
      const {ecSuborderId} = this.state
      getPriceListApi({ecSuborderId})
      .then(res=>{
        if(res.code=='0'){
          let {spus,suborderPayAmount} = res.ecSuborder;
          suborderPayAmount = Number(suborderPayAmount).toFixed(2);
          spus.map((item,index)=>{
            item.key = index;
            return item;
          });
          this.setState({priceList:spus,oldTotalPrice:suborderPayAmount});
        };
      });
    }else{
      message.error("请选择需要修改价格的订单",.8);
    };
  }
  //修改价格确定
  onPriceOk=(clearForm)=>{
    const {oldTotalPrice,ecSuborderId,newTotalMoney,priceList}=this.state;
    const { limit, currentPage } = this.props.onAudit;
    const spus = deepcCloneObj(priceList);
    spus.map((item)=>{
      delete item.key;
      return item;
    });
    const obj={
      ecSuborderId,
      newEcSuborderPayAmount:newTotalMoney,
      spus
    };
    if(newTotalMoney == Number(oldTotalPrice)){
      savePriceApi(obj)
      .then(res=>{
        if(res.code=="0"){
          clearForm();
          this.setState({newTotalMoney:0,priceVisible:false});
          this.props.dispatch({
            type:'onAudit/fetchList',
            payload:{...this.state.field,limit,currentPage}
          });
        };
      })
    }else{
      message.error("实付金额输入有误",.8)
    };
  }
  //修改价格取消
  onPriceCancel =()=> {
    this.setState({priceVisible:false,priceList:[],newTotalMoney:0,selectedRowKeys:null});
    this.onChange(null,[])
  }
  //点击订单合并按钮
  mergeOrder =()=> {
    this.setState({mergeVisible:true})
  }
  //确定合并
  onMergeOk =(value,clearForm)=> {
    mergeOrderApi(value)
    .then(res=>{
      if(res.code == "0"){
        message.success("合单成功",.8);
        const {limit,currentPage} = this.props;
        clearForm();
        this.setState({mergeVisible:false});
        //重新刷新列表
        this.props.dispatch({
          type:'onAudit/fetchList',
          payload:{...this.state.field,limit,currentPage}
        });
      };
    })
  }
  //取消订单合并
  onMergeCancel =(clearForm)=> {
    clearForm();
    this.setState({mergeVisible:false})
    this.onChange(null,[])
  }
  //点击星标
  markStar =()=> {
    if(this.state.rowSelection.selectedRowKeys){
      this.setState({markVisible:true})
    }else{
      message.error("请选择需要添加星标的订单",.8)
    }
  }
  //确认添加星标
  onMarkOk =(value,clearForm)=> {
    const {limit,currentPage} = this.props;
    value.ecSuborderId = this.state.ecSuborderId;
    value.iconType = 1; //1表示有星标
    cancelOrderApi(value)
    .then(res=>{
      if(res.code == "0"){
        clearForm();
        this.setState({markVisible:false});
        //重新刷新列表
        this.props.dispatch({
          type:'onAudit/fetchList',
          payload:{...this.state.field,limit,currentPage}
        });
      };
    })
  }
  onCancelOk =(value,clearForm)=> {
    const obj={status:5,...value,ecSuborderId:this.state.ecSuborderId}
    this.cancelOrder(obj,clearForm);
  }
  onCancel =(clearForm)=> {
    this.setState({
      cancelVisible:false
    });
    clearForm();
  }
  //取消星标
  onMarkCancel =(clearForm)=> {
    clearForm();
    this.setState({markVisible:false,selectedRowKeys:null});
    this.onChange(null,[])
  }
  //拆单原订单数据改变
  dataChange =(apartList,ecSuborderSurplusPayAmount,newEcSuborderPayAmount,newList)=> {
    this.setState({apartList,ecSuborderSurplusPayAmount,newEcSuborderPayAmount,newList})
  }
  //拆单新订单数据改变
  dataChangeList =(newList)=> {
    this.setState({newList});
  }
  //修改价格数据改变
  priceDataChange=(newTotalMoney,priceList)=>{
    this.setState({newTotalMoney,newTotalMoney})
  }
  render() {
    const rolelists=this.props.data.rolelists;
    //订单拆分
    const dismantle=rolelists.find((currentValue,index)=>{
	       return currentValue.url=="qerp.web.ec.od.auditOrder.dismantle.query"
    });
    //订单合并
    const orderMerge=rolelists.find((currentValue,index)=>{
	       return currentValue.url=="qerp.web.ec.od.auditOrder.merge.save"
    })
    //星标
    const setStar=rolelists.find((currentValue,index)=>{
	       return currentValue.url=="qerp.web.ec.od.auditOrder.icon"
    });
    //修改价格
    const changePrice=rolelists.find((currentValue,index)=>{
	       return currentValue.url=="qerp.web.ec.od.auditOrder.price.query"
    })
    //审核通过
    const auditPass=rolelists.find((currentValue,index)=>{
	       return currentValue.url=="qerp.web.ec.od.auditOrder.save"
    })
    //取消订单
    const auditCancel=rolelists.find((currentValue,index)=>{
	       return currentValue.url=="qerp.web.ec.od.auditOrder.save"
    })
    const { dataSource } = this.props.onAudit;
    const {
      ecSuborderId,
      ecSuborderNo,
      newEcSuborderNo,
      suborderPayAmount,
      newList,
      splitVisible,
      rowSelection,
      apartList,
      totalActPrcie,
      ecSuborderSurplusPayAmount,
      newEcSuborderPayAmount,
      priceVisible,
      priceList,
      oldTotalPrice,
      newTotalMoney,
      mergeVisible,
      markVisible,
      iconTypeRemark,
      expandedRowKeys=[],
      cancelVisible,
      pdTaxWarehouses,
      isLoading
    }=this.state;
    const content = (
      <div className='remark_box'>
        <p className='mark'><span className='name'>名</span> 1. 姓名不规范</p>
        <p className='mark'><span className='zero'>零</span> 2. 商品实付金额为0</p>
        <p className='mark'><span className='ready'>待</span> 3. 该用户有未发货订单</p>
        <p className='mark'><span className='bei'>备</span> 4. 人工添加</p>
      </div>
    );
    dataSource && dataSource.map((item) => {
        item.onOperateClick = (type) => { this.handleOperateClick(item,"",type) };
        item.children.map((subItem,subIndex)=>{
          subItem.onOperateClick = (type) => { this.handleOperateClick(item,subItem,type) };
          subItem.auditPass = auditPass;
          subItem.auditCancel = auditCancel;
          // subItem.isLoading = isLoading;

        })
    });
    return (
      <div className='qtools-components-pages' id="on_audit">
        <FilterForm
            pdTaxWarehouses={pdTaxWarehouses}
            submit={this.searchData}
         />
       <div className="handel-btn-lists onaudit_list">
         {
           dismantle && <Button size='large' type='primary' onClick={this.splitFormChange}> 订单拆分 </Button>
         }
         {
           orderMerge && <Button size='large' type='primary' onClick={this.mergeOrder}> 订单合并 </Button>
         }
         {
           setStar && <Button size='large' type='primary' onClick={this.markStar}> 星标 </Button>
         }
         {
           changePrice && <Button size='large' type='primary' onClick={this.changePrice}> 修改价格 </Button>
         }
         <Popover style={{textAlign:'right'}} content={content} title="标记说明" trigger="hover">
            <a className="remark_intro">
             标记说明<Icon type="question-circle-o" style={{color:"#ED6531",marginLeft:"4px"}}/>
            </a>
          </Popover>
         </div>
         {
           dataSource&&dataSource.length>0 &&
           <Table
             className='main_table'
             bordered
             rowSelection={rowSelection}
             columns={Columns}
             defaultExpandAllRows = {true}
             indentsize={0}
             pagination={false}
             dataSource={dataSource}
             rowKey="key"
           />
         }
        <Qpagination
          data={this.props.onAudit}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}/>
        <SplitOrderModal
          dataChangeList={this.dataChangeList}
          newList = {newList}
          visible={splitVisible}
          onCancel={this.onSplitCancel}
          onOk={this.onSplitOk}
          apartList={apartList}
          ecSuborderId={ecSuborderId}
          ecSuborderNo={ecSuborderNo}
          newEcSuborderNo={newEcSuborderNo}
          suborderPayAmount={suborderPayAmount}
          ecSuborderSurplusPayAmount={ecSuborderSurplusPayAmount}
          newEcSuborderPayAmount={newEcSuborderPayAmount}
          dataChange={this.dataChange}
        />
        <ChangePriceModal
          dataChange={this.priceDataChange}
          onChange={()=>this.onChange([],[])}
          ecSuborderId={ecSuborderId}
          visible={priceVisible}
          priceList={priceList}
          oldTotalPrice={oldTotalPrice}
          newTotalMoney={newTotalMoney}
          onOk={this.onPriceOk}
          onCancel={this.onPriceCancel}
          />
        <MergeModal
          visible={mergeVisible}
          onOk={this.onMergeOk}
          onCancel={this.onMergeCancel}
        />
        <MarkStar
          iconTypeRemark={iconTypeRemark}
          visible={markVisible}
          onOk={this.onMarkOk}
          onCancel={this.onMarkCancel}
        />
      <Cancel
          visible={cancelVisible}
          onOk={this.onCancelOk}
          onCancel={this.onCancel}
          isLoading={isLoading}
        />
      </div>
    )
  }
}
const OnAudits = Form.create()(OnAudit);
function mapStateToProps(state) {
  const {onAudit} = state;
  return {onAudit};
}

export default connect(mapStateToProps)(OnAudits);
