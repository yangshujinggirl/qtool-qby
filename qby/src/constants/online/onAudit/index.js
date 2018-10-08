import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table,Input,Icon,Popover} from 'antd'
import { exportDataApi } from '../../../services/orderCenter/userOrders'
import Qtable from '../../../components/Qtable/index';
import Qpagination from '../../../components/Qpagination/index';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';
import moment from 'moment';
const confirm = Modal.confirm;
import './index.less'

class UserOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  //导出数据
  exportData =()=> {
    const values ={type:12,downloadParam:{...this.state.field}}
    exportDataApi(values)
    .then(res => {
      if(res.code == '0'){
        confirm({
					title: '数据已经进入导出队列',
					content: '请前往下载中心查看导出进度',
					cancelText:'稍后去',
					okText:'去看看',
					onOk:()=> {
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
  //订单拆分
  onChange =()=>{

  }
  render() {
    const dataSource =[{
      key:1,
      zicode:111,
      youcode:1111,
      qty:4,
      time:'2018-09-28 09:45:23',
      children:[
        {key:11,code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',size:'900g',qty:'1',sellprice:'23:00',price:'20:00',payAmount:"49:00",orderMoney:"30:00",actmoney:"79:00"},
        {key:12,code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',size:'900g',qty:'1',sellprice:'23:00',price:'20:00',payAmount:"49:00",orderMoney:"30:00",actmoney:"79:00"},
        {key:13,code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',size:'900g',qty:'1',sellprice:'23:00',price:'20:00',payAmount:"49:00",orderMoney:"30:00",actmoney:"79:00"},
      ]
    },{
      key:2,
      zicode:111,
      youcode:1111,
      qty:4,
      time:20180928,
      children:[
        {key:21,code:111,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1},
        {key:22,code:222,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1},
        {key:23,code:333,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1},
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
    //导出数据按钮是否显示
		// const exportUserorderData=this.props.data.rolelists.find((currentValue,index)=>{
		// 	return currentValue.url=="qerp.web.sys.doc.task"
		// })
    const rowSelection = {
      type:"radio",
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
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
        dataIndex:'actPrice',
      },{
        title:'剩余数量',
        dataIndex:'surpulsQty',
      },{
        title:'拆分数量',
        dataIndex:'apart',
        render:(text,record,index)=>{
          return(
            <Input type='text' onChange={this.onChange}/>
          )
        }
      },
  ]
    const apartList = [
      {
        code:'s123232412',
        name:'小黄鸭泡沫洗脸洗手液250ml*2',
        size:'900g',
        qty:1,
        actPrice:'20:00',
        surpulsQty:1,
        apart:'',
      }, {
        code:'s123232412',
        name:'小黄鸭泡沫洗脸洗手液250ml*2',
        size:'900g',
        qty:1,
        actPrice:'20:00',
        surpulsQty:1,
        apart:'',
      }
    ]
    const { dataList=[] } = this.props.userorders;
    const newList=[];
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
             onClick={this.addAnswer}>
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
          dataSource={dataSource}
        />
        <Qpagination
          data={this.props.bAnswer}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}/>
        <Modal
          width={920}
          title='订单拆分'
          visible={false}
        >
          <div className='wrapper_order'>
            <div className='old_order'>
              <div className='origin_order'>
                <p>原始订单号：YH02130000700001</p>
                <p>
                  <span>原始订单实付金额：YH02130000700001</span>
                  <span>订单剩余实付金额：22.00</span>
                </p>
              </div>
              <Qtable
                dataSource={apartList}
                columns={columns1}
                bordered
              />
            </div>
            <div className='old_order'>
              <div className='origin_order'>
                <p>原始订单号：YH02130000700001</p>
                <p>
                  <span>原始订单实付金额：YH02130000700001</span>
                  <span>订单剩余实付金额：22.00</span>
                </p>
              </div>
              <Qtable
                dataSource={newList}
                columns={columns1}
                bordered
              />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { userorders } = state;
  return {userorders};
}

export default connect(mapStateToProps)(UserOrder);
