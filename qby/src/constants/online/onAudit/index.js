import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table,Input,Icon,Popover,Form,} from 'antd'
import { getPriceListApi,mergeOrderApi,saveAuditOrdeApi } from '../../../services/online/onAudit'
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
            // apartList:record.children,
            ecOrderId:record.ecOrderId,
            ecSuborderId:record.ecSuborderId,
            // apartListCode:record.ecSuborderNo,
            // ecSuborderPayAmount:record.children[0].actmoney,
            // ecSuborderSurplusPayAmount:record.children[0].actmoney,
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
      _values.dateTimeST =  moment(new Date(rangePicker[0])).format('YYYY-MM-DD HH:mm:ss');
      _values.dateTimeET = moment(new Date(rangePicker[1])).format('YYYY-MM-DD HH:mm:ss');
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
    this.setState({splitVisible:true});
    // const {ecOrderId,ecSuborderId} = this.state;
    // auditOrdeApi({ecOrderId,ecSuborderId})
    // .then(res => {
    //   if(res.code == "0"){
    //     this.setState({apartList:res.spus,ecSuborderNo,newEcSuborderNo})
    //   };
    // })
    let apartList = [
      {ecSuborderDetailId:1,pdSpuId:1,pdSkuId:null,code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,payAmount:"200.44"},
      {ecSuborderDetailId:2,pdSpuId:1,pdSkuId:null,code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,payAmount:"500.89"},
      {ecSuborderDetailId:3,pdSpuId:1,pdSkuId:null,code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,payAmount:"299.17"}
    ]
      apartList.map((item,index)=>{
        item.key=index;
        item.surpulsQty=item.qty;
        return item;
      })
      let [ecSuborderNo,newEcSuborderNo,suborderPayAmount] = ["YH021809130000700001","YH021809130000700003",'1000.50']
      this.setState({apartList,ecSuborderNo,newEcSuborderNo,suborderPayAmount,ecSuborderSurplusPayAmount:suborderPayAmount})
  }

  //拆分订单取消
  onSplitCancel =()=> {
    this.setState({splitVisible:false,apartList:[]})
    this.onChange([],[]);
  }
  //确认拆单
  onSplitOk =(obj)=> {
    const { limit, currentPage } = this.props.onAudit;
    // saveAuditOrdeApi(obj)
    // .then(res=>{
    //   if(res.code=="0"){
    //     this.setState({splitVisible:false})
    //   }
    // });
    this.setState({splitVisible:false});
    // this.props.dispatch({
    //   type:'onAudit/fetchList',
    //   payload:{...this.state.field,limit,currentPage}
    // });
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
      {skuCode:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,payAmount:'60.00',},
      {skuCode:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,payAmount:'20.00',},
      {skuCode:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,payAmount:'20.00',},
    ]
    priceList.map((item,index)=>{
      item.key = index;
    });
    let oldTotalPrice = "100.00";
    this.setState({priceList,oldTotalPrice,priceVisible:true});
  }

  render() {
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
      priceVisible,
      priceList,
      oldTotalPrice,
      newTotalMoney,
      mergeVisible,
      markVisible,
      iconTypeRemark
    }=this.state;
    console.log(ecSuborderNo)
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
         {
           dataSource.length>0 &&
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
         }

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
          ecSuborderNo={ecSuborderNo}
          newEcSuborderNo={newEcSuborderNo}
          suborderPayAmount={suborderPayAmount}
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
