import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table,Input,Icon,Popover,Form,} from 'antd'
import { getPriceListApi,mergeOrderApi } from '../../../services/online/onAudit'
import Qtable from '../../../components/Qtable/index';
import Qpagination from '../../../components/Qpagination/index';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';
import moment from 'moment';
import SplitOrderModal from "./components/SplitOrder"
import ChangePriceModal from "./components/ChangePriceModal"
import MergeModal from "./components/MergeModal"
import MarkStar from "./components/MarkStar"

const confirm = Modal.confirm;
const FormItem = Form.Item;
import './index.less'

class OnAudit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      newList:[], //新增订单列表
      apartList:[], //原始订单列表
      ecSuborderId:null, //原始订单的id
      splitVisible:false, //拆单弹窗
      apartListCode:null,
      ecSuborderPayAmount:0,//原始订单实付金额
      ecSuborderSurplusPayAmount:0,//原始订单剩余实付金额
      totalActPrcie:0,//新增实付金额总和
      priceVisible:false,//修改价格弹窗
      newTotalMoney:0,//新实付总价
      priceList:[],//修价列表
      oldTotalPrice:0,//原实付总价
      mergeVisible:false,
      markVisible:false,
      field:{
        spShopName:'',
        orderNo:'',
        pdSpuName:'',
        code:'',
        mobile:'',
        orderStatus:'',
        dateTimeST:'',
        dateTimeET:'',
      },
      rowSelection:{
        type:"radio",
        selectedRowKeys:this.props.onAudit.selectedRowKeys,
        onChange:this.onChange,
        onSelect: (record, selected, selectedRows) => {
          this.setState({
            iconType:record.iconType,
            iconTypeRemark:record.iconTypeRemark,
            apartList:record.children,
            ecSuborderId:record.key,
            apartListCode:record.ecSuborderNo,
            ecSuborderPayAmount:record.children[0].actmoney,
            ecSuborderSurplusPayAmount:record.children[0].actmoney,
          })
        },
      },
    }
  }
  componentDidMount =()=> {
    this.props.dispatch({
      type:"onAudit/fetchList",
      payload:{}
    })
  }
  componentWillReceiveProps(props) {
    this.setState({
      dataSource:props.onAudit.dataSource,
      rowSelection : {
        selectedRowKeys:props.onAudit.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      }
    });
  }
  onChange =(selectedRowKeys,selectedRows)=> {
    // 消除选中状态
    const {rowSelection}=this.state;
    this.setState({
      rowSelection:Object.assign({},rowSelection,{selectedRowKeys})
    });
    if(selectedRows[0]){
      this.setState({ecSuborderId:selectedRows[0].key})
    }
  }
  //操作
  handleOperateClick(record) {
    const paneitem = {
      title:'订单详情',
      key:`${this.props.componkey}edit`+record.ecSuborderId,
      componkey:`${this.props.componkey}edit`,
      data:{
        pdSpuId:record.ecSuborderId,
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //点击分页
  changePage = (current,limit) => {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage,limit}
    this.props.dispatch({
      type:'userorders/fetchList',
      payload: values
    });
  }
  //pagedisplayName改变时的回调
  onShowdisplayNameChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'userorders/fetchList',
      payload:{currentPage,limit}
    });
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    const {rangePicker,..._values} = values;
    if(rangePicker&&rangePicker[0]){
      _values.dateTimeST =  moment(new Date(rangePicker[0]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');
      _values.dateTimeET = moment(new Date(rangePicker[1]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');
    }
    this.setState({field:_values});
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'userorders/fetchList',
      payload:values
    })
  }
  //订单拆分
  splitFormChange =()=>{
    this.setState({splitVisible:true})
  }
  //拆分订单取消
  onSplitCancel =()=> {
    this.setState({splitVisible:false,apartList:[]})
    this.onChange([],[]);
  }
  //确认拆单
  onSplitOk =(newList)=> {
    const {
      apartList, //原始订单列表
      ecSuborderId, //原始订单的id
      apartListCode,
      ecSuborderPayAmount,//原始订单实付金额
      ecSuborderSurplusPayAmount,//原始订单剩余实付金额
      totalActPrcie//新增实付金额总和
    } = this.state;
    let oldSuborder = {
      ecSuborderId,
      ecSuborderPayAmount,
      ecSuborderSurplusPayAmount,
      spus:apartList
    }
  }
  //修改价格确定
  onPriceOk=()=>{

  }
  //修改价格取消
  onPriceCancel =()=> {
    this.setState({priceVisible:false,priceList:[],newTotalMoney:0});
    this.onChange([],[])
  }
  //确定合并
  onMergeOk =(value,clearForm)=> {
      mergeOrderApi(value)
      .then(res=>{
        if(res.code == "0"){
          clearForm();
          this.setState({mergeVisible:false})
        };
      })
  }
  onMergeCancel =(clearForm)=> {
    clearForm();
    this.setState({mergeVisible:false})
  }
  //确认添加星标
  onMarkOk =(value,clearForm)=> {
    value.ecSuborderId = this.state.ecSuborderId;
    value.iconType = 1; //1表示有星标
    mergeOrderApi(value)
    .then(res=>{
      if(res.code == "0"){
        clearForm();
        this.setState({mergeVisible:false})
        //重新刷新列表

      };
    })
  }
  //取消星标
  onMarkCancel =(clearForm)=> {
    clearForm();
    this.setState({markVisible:false})
  }
  markStar =()=> {
    this.setState({markVisible:true})
  }
  //订单合并
  mergeOrder =()=> {
    this.setState({mergeVisible:true})
  }
  //拆单原订单数据改变
  dataChange =(apartList,ecSuborderSurplusPayAmount)=> {
    this.setState({apartList,ecSuborderSurplusPayAmount})
  }
  //修改价格数据改变
  priceDataChange=(newTotalMoney,priceList)=>{
    this.setState({newTotalMoney,newTotalMoney})
  }
  changePrice =()=> {
    //const {ecSuborderId} = this.state
    // getPriceListApi({ecSuborderId})
    // .then(res=>{
    //   if(res.code=='0'){
    //     this.setState({priceList:res.ecSuborder.spus,oldTotalPrice:ecSuborderPayAmount})
    //   }
    // });
    let priceList = [
      {key:11,index:0,skuCode:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,payAmount:'60.00',},
      {key:12,index:1,skuCode:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,payAmount:'20.00',},
      {key:13,index:3,skuCode:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,payAmount:'20.00',},
    ]
    let oldTotalPrice = "100.00";
    this.setState({priceList,oldTotalPrice})

    this.setState({
      priceVisible:true
    })
  }

  render() {
    const dataSource =[{
      iconType:1,
      iconTypeRemark:"兴兴",
      sign:0,
      key:1,
      ecSuborderNo:111,
      outNo:1111,
      sumQty:4,
      suborderAmount:"99.00",
      suborderPayAmount:"99.00",
      time:'2018-09-28 09:45:23',
      children:[
        {skuCode:'s123232412',key:11,name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,surpulssumQty:3,sellprice:'23.00',price:'20.00',payAmount:"49"},
        {skuCode:'s123232412',key:12,name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,surpulssumQty:3,sellprice:'23.00',price:'20.00',payAmount:"49"},
        {skuCode:'s123232412',key:13,name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,surpulssumQty:3,sellprice:'23.00',price:'20.00',payAmount:"49"},
      ]
    },{
      iconType:1,
      iconTypeRemark:"兴兴",
      sign:1,
      key:2,
      ecSuborderNo:111,
      outNo:1111,
      sumQty:4,
      time:20180928,
      suborderAmount:"99.00",
      suborderPayAmount:"99.00",
      children:[
        {key:21,skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23',amount:'20',payAmount:1},
        {key:22,skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23',amount:'20',payAmount:1},
        {key:23,skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23',amount:'20',payAmount:1},
      ]
    },{
      iconType:1,
      iconTypeRemark:"兴兴",
      sign:1,
      key:3,
      ecSuborderNo:111,
      outNo:1111,
      sumQty:4,
      time:20180928,
      suborderAmount:"99.00",
      suborderPayAmount:"99.00",
      children:[
        {key:31,skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23',amount:'20',payAmount:1},
        {key:32,skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23',amount:'20',payAmount:1}
      ]
    },]
    dataSource.map((item,index)=>{
      item.children.map((newItem,newIndex)=>{
        newItem.orderMoney=item.suborderAmount;
        newItem.actmoney=item.suborderPayAmount;
        return newItem;
      });
      return item;
    });
    // const { dataSource } = this.props.onAudit;
    const {
      ecSuborderId,
      newList,
      splitVisible,
      rowSelection,
      apartList,
      apartListCode,
      ecSuborderPayAmount,
      totalActPrcie,
      ecSuborderSurplusPayAmount,
      priceVisible,
      priceList,
      oldTotalPrice,
      newTotalMoney,
      mergeVisible,
      markVisible,
      iconTypeRemark
    }=this.state;
    const content = (
      <div>
        <p>1.姓名不规范</p>
        <p>2.商品实付金额为0</p>
        <p>3.该用户有未发货订单</p>
      </div>
    );
    return (
      <div className='qtools-components-pages on_audit'>
        <FilterForm
           submit={this.searchData}
           onValuesChange = {this.searchDataChange}
         />
         <div className="handel-btn-lists">
           <Button size='large' type='primary' onClick={this.splitFormChange}> 订单拆分 </Button>
           <Button size='large' type='primary' onClick={this.mergeOrder}> 订单合单 </Button>
           <Button size='large' type='primary' onClick={this.markStar}> 星标 </Button>
           <Button size='large' type='primary' onClick={this.changePrice}> 修改价格 </Button>
           <Popover style={{textAlign:'right'}} content={content} title="标记说明" trigger="hover">
              <a className="remark_intro">
               标记说明<Icon type="question-circle-o" style={{color:"#ED6531",marginLeft:"4px"}}/>
              </a>
            </Popover>
         </div>
        <Table
          className='main_table'
          bordered
          rowSelection={rowSelection}
          columns={Columns}
          defaultExpandAllRows={true}
          indentsize={0}
          pagination={false}
          dataSource={dataSource}
        />
        <Qpagination
          data={this.props.onAudit}
          onChange={this.changePage}
          onShowsizeChange = {this.onShowsizeChange}/>
        <SplitOrderModal
          visible={splitVisible}
          onCancel={this.onSplitCancel}
          onOk={this.onSplitOk}
          apartList={apartList}
          ecSuborderId={ecSuborderId}
          apartListCode={apartListCode}
          ecSuborderPayAmount={ecSuborderPayAmount}
          ecSuborderSurplusPayAmount={ecSuborderSurplusPayAmount}
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
