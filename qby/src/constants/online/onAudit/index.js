import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table,Input,Icon,Popover,Form,} from 'antd'
import { exportDataApi } from '../../../services/orderCenter/userOrders'
import Qtable from '../../../components/Qtable/index';
import Qpagination from '../../../components/Qpagination/index';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';
import moment from 'moment';

const confirm = Modal.confirm;
const FormItem = Form.Item;
import './index.less'

class OnAudit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newList:[],
      apartList:[],
      orderId:null,
      splitVisible:false,
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
          this.setState({apartList:record.children,orderId:record.key})
        },
      },
    }
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
  onChange =(selectedRowKeys,selectedRows)=> {
    console.log(selectedRowKeys)
    console.log(selectedRows)
    // 消除选中状态
    const {rowSelection}=this.state;
    this.setState({
      rowSelection:Object.assign({},rowSelection,{selectedRowKeys})
    });
    if(selectedRows[0]){
      this.setState({orderId:selectedRows[0].key})
    }
  }
  componentWillMount() {
    this.props.dispatch({
        type:'userorders/fetchList',
        payload:{}
    });
  }
  //操作
  handleOperateClick(record) {
    const paneitem = {
      title:'订单详情',
      key:`${this.props.componkey}edit`+record.orderId,
      componkey:`${this.props.componkey}edit`,
      data:{
        pdSpuId:record.orderId,
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
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
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

  //判断数组里是否含有这组值，并记录现在这组值在新增数组中所处的位置
  isExit =(record)=> {
    const key = record.key; //唯一标识
    let {newList} = this.state;
    let currentIndex;
    const isConsist = newList.some((item,index)=>{
      if(item.key == key ){
        currentIndex = index;
      };
      return (item.key == key);
    });
     /**
      * isconsist Boolean
      * currentIndex Num
      * newList []
     */
    const obj = {isConsist,currentIndex,newList}
    return obj
  }
  //拆分订单做处理--->是新增替换还是删除
  handleSplitOrder =(record,value)=> {
    const {apartList} = this.state;
    if(Number(value) ){ //有值
      /* ---------------------修改剩余数量--------------------- */
      const surpulsQty = Number(record.qty)-Number(value) //剩余数量
      apartList.map((item,index)=>{
        if(item.key==record.key){
          item.surpulsQty = surpulsQty;
        };
        return item;
      });
      /* ---------------------修改剩余数量--------------------- */
      record.apart = value;
      const obj = this.isExit(record);
      if(obj.isConsist){ //存在就替换
        obj.newList.splice(obj.currentIndex,1,record);
      }else{//不存在就新增
        obj.newList.push(record);
      };
      this.setState({newList:obj.newList,apartList})
    }else{ //没值(如果是0就清掉)
      const obj = this.isExit(record);
      if(obj.isConsist){ //数组中原本存在，现在为0就清掉
        obj.newList.splice(obj.currentIndex,1);
      };
      this.setState({newList:obj.newList})
    };
  }
  //订单拆分input失去焦点
  onSplitBlur =(record,e)=>{
    this.props.form.validateFieldsAndScroll((err)=>{
      const index = record.key;
      const attr = "apart"+index;
      const value = e.target.value;
      if(err && !(err.hasOwnProperty(attr))){ //有错，当前列无错
        this.handleSplitOrder(record,value)
      }else if(!err){ //无错
        this.handleSplitOrder(record,value)
      }
    })
  }
  //订单拆分
  splitFormChange =()=>{
    this.setState({splitVisible:true})
  }
  //拆分订单取消
  onSplitCancel =()=> {
    this.setState({splitVisible:false})
    this.onChange([],[]);
  }
  render() {
    const dataSource =[{
      key:1,
      zicode:111,
      youcode:1111,
      qty:4,
      time:'2018-09-28 09:45:23',
      children:[
        {key:11,code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',size:'900g',qty:3,surpulsQty:3,sellprice:'23:00',price:'20:00',payAmount:"49:00",orderMoney:"30:00",actmoney:"79:00"},
        {key:12,code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',size:'900g',qty:3,surpulsQty:3,sellprice:'23:00',price:'20:00',payAmount:"49:00",orderMoney:"30:00",actmoney:"79:00"},
        {key:13,code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',size:'900g',qty:3,surpulsQty:3,sellprice:'23:00',price:'20:00',payAmount:"49:00",orderMoney:"30:00",actmoney:"79:00"},
      ]
    },{
      key:2,
      zicode:111,
      youcode:1111,
      qty:4,
      time:20180928,
      children:[
        {key:21,code:111,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:"33.00"},
        {key:22,code:222,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:"33.00"},
        {key:23,code:333,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:"33.00"},
      ]
    },{
      key:3,
      zicode:111,
      youcode:1111,
      qty:4,
      time:20180928,
      children:[
        {key:31,code:111,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1},
        {key:32,code:111,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1}
      ]
    },]

    /* -----------------------------修改前的colums(上面的)---------------- */
    const columns1 = [{
        title:'商品编码',
        dataIndex:'code',
      },{
        title:'商品名称',
        dataIndex:'name',
      },{
        title:'规格',
        dataIndex:'size',
      },{
        title:'原数量',
        dataIndex:'qty',
      },{
        title:'商品实付金额',
        dataIndex:'payAmount',
      },{
        title:'剩余数量',
        dataIndex:'surpulsQty',
      },{
        title:'拆分数量',
        dataIndex:'apart',
        render:(text,record,index)=>{
          const { getFieldDecorator } = this.props.form;
          const maxNum = record.qty;
          const reg = new RegExp("^(?:[0-"+maxNum+"]"+"{0,1})"+"$");
          return(
            <Form>
              <FormItem>
                {getFieldDecorator(`apart`+index,{
                  rules:[{pattern:reg,message:'请输入小于原数量的整数'}]
                })(
                  <Input onBlur={(e)=>this.onSplitBlur(record,e)}/>
                )}
              </FormItem>
            </Form>
          )
        }
      },
  ]
  /* -----------------------------修改后的colums(下面的)---------------- */
  const columns2= [{
      title:'商品编码',
      dataIndex:'code',
    },{
      title:'商品名称',
      dataIndex:'name',
    },{
      title:'规格',
      dataIndex:'size',
    },{
      title:'数量',
      dataIndex:'apart',
    },{
      title:'商品实付金额',
      dataIndex:'payAmount',

    }
]
    // const apartList = [
    //   {
    //     key:0,
    //     code:'s123232411',
    //     name:'小黄鸭泡沫洗脸洗手液250ml*2',
    //     size:'900g',
    //     qty:1,
    //     payAmount:'20:00',
    //     surpulsQty:1,
    //     apart:'',
    //   }, {
    //     key:1,
    //     code:'s123232412',
    //     name:'小黄鸭泡沫洗脸洗手液250ml*2',
    //     size:'900g',
    //     qty:1,
    //     payAmount:'20:00',
    //     surpulsQty:1,
    //     apart:'',
    //   }
    // ]
    const { dataList=[] } = this.props.onAudit;
    const {newList,splitVisible,rowSelection,apartList}=this.state;
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
           <Button
             size='large'
             type='primary'
             onClick={this.splitFormChange}>
             订单拆分
           </Button>
           <Button
             size='large'
             type='primary'
             onClick={this.addAnswer}>
             订单合单
           </Button>
           <Button
             size='large'
             type='primary'
             onClick={this.addAnswer}>
             星标
           </Button>
           <Button
             size='large'
             type='primary'
             onClick={this.addAnswer}>
             修改价格
           </Button>
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
          indentSize={0}
          pagination={false}
          dataSource={dataSource}
        />
        <Qpagination
          data={this.props.onAudit}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}/>

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
