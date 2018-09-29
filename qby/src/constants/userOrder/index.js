import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table} from 'antd'
import { exportDataApi } from '../../services/orderCenter/userOrders'
import Qtable from '../../components/Qtable/index';
import Qpagination from '../../components/Qpagination/index';
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
  render() {
    const dataSource =[{
      id:1,
      code:111,
      youcode:1111,
      time:20180928,
      list:[
        {code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1},
        {code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1},
        {code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1}
      ]
    },{
      id:1,
      code:111,
      youcode:1111,
      time:20180928,
      list:[
        {code:111,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1},
        {code:111,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1},
        {code:111,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1},
        {code:111,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1}
      ]
    },{
      id:1,
      code:111,
      youcode:1111,
      time:20180928,
      list:[
        {code:111,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1},
        {code:111,name:'affff',size:'vdv',qty:'1',sellprice:'23',price:'20',payAmount:1,orderMoney:1,actmoney:1}
      ]
    },]
    //导出数据按钮是否显示
		const exportUserorderData=this.props.data.rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sys.doc.task"
		})
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
    const { dataList=[] } = this.props.userorders;
    return (
      // <div className='qtools-components-pages'>
      //   <FilterForm
      //     submit={this.searchData}
      //     onValuesChange = {this.searchDataChange}
      //   />
      //   <div className="handel-btn-lists">
      //   {
      //     exportUserorderData
      //     ?
      //       <Button
      //         type='primary'
      //         size='large'
      //         onClick={this.exportData}
      //         >导出数据
      //       </Button>
      //     : null
      //   }
      //
      //   </div>
      //   <Qtable
      //     dataSource={dataList}
      //     onOperateClick = {this.handleOperateClick.bind(this)}
      //     columns = {Columns}/>
      //   {
      //       dataList.length>0?
      //       <Qpagination
      //         data={this.props.userorders}
      //         onChange={this.changePage}
      //         onShowSizeChange = {this.onShowSizeChange}
      //       />:null
      //   }
      // </div>
      <div className='qtools-components-pages'>
        <FilterForm
           submit={this.searchData}
           onValuesChange = {this.searchDataChange}
         />
        <Table
          rowSelection={rowSelection}
          columns={Columns}
          defaultExpandAllRows={true}
          expandedRowRender={
            (record) => {
              const length = record.list.length;
              const renderContent2 = (index,value)=>{
                const obj = {
                  children:value,
                  props:{},
                };
                if(index === 0){
                  obj.props.rowSpan = 4;
                }else{
                  obj.props.rowSpan = 0;
                };
                return obj;
              };
              const Columns2 = [{
                   colSpan:0,
                   dataIndex: 'code',

                 },{
                   colSpan:0,
                   dataIndex: 'name',
                 },{
                   colSpan:0,
                   dataIndex: 'size'
                 }, {
                   colSpan:0,
                   dataIndex: 'qty'
                 },{
                   colSpan:0,
                   dataIndex: 'sellprice'
                 },{
                   colSpan:0,
                   dataIndex: 'price'
                 },{
                   colSpan:0,
                   dataIndex: 'payAmount'
                 },{
                   colSpan:0,
                   dataIndex: 'orderMoney',
                 },{
                   colSpan:0,
                   dataIndex: 'actmoney',
                   render:(text,record,index)=>{
                     const obj = {
                       children:<div>
                         <Button type="primary" className="audit">审核通过</Button><br/>
                         <Button>取消订单</Button><br/>
                       </div>,
                       props:{},
                     };
                     if(index === 0){
                       obj.props.rowSpan = 4;
                     }else{
                       obj.props.rowSpan = 0;
                     };
                     return obj;
                   }
                 },{
                   colSpan:0,
                   render:(text,record,index)=>{
                     const obj = {
                       children:<div>
                         <Button type="primary" className="audit">审核通过</Button><br/>
                         <Button>取消订单</Button><br/>
                       </div>,
                       props:{},
                     };
                     if(index === 0){
                       obj.props.rowSpan = 4;
                     }else{
                       obj.props.rowSpan = 0;
                     };
                     return obj;
                   }
                 }];
              return(<Qtable columns = {Columns2} dataSource={record.list}/>)
            }
          }
          dataSource={dataSource}
          />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { userorders } = state;
  return {userorders};
}

export default connect(mapStateToProps)(UserOrder);
