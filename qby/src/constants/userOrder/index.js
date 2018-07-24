import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message} from 'antd'
import { exportDataApi } from '../../services/orderCenter/userOrders'
import Qtable from '../../components/Qtable/index';
import Qpagination from '../../components/Qpagination/index';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';

class UserOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field:{
        spShopName:'',
        orderNo:'',
        pdSpuName:'',
        mobile:'',
        orderStatus:'',
        startTime:'',
        endTime:'',
      },
    }
  }
  componentWillMount() {
    let params = {"dateStart":"2018-06-10 00:00:00","dateEnd":"2018-07-09 23:59:59","deliveryTimeST":"","deliveryTimeET":"","limit":15,"currentPage":0}
    this.props.dispatch({
        type:'userorders/fetchList',
        payload:{values:params}
    });
  }
  //操作
  handleOperateClick(record) {
    const paneitem = {
      title:'订单详情',
      key:`${this.props.componkey}info`,
      componkey:`${this.props.componkey}info`,
      data:{
        pdSpuId:record.spOrderId,
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //点击分页
  changePage = (currentPage) => {
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'userorders/fetchList',
      payload: values
    });
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    const {rangePicker,..._values} = values;
    if(rangePicker){
      _values.startTime =  rangePicker[0]._d.getTime();
      _values.endTime = rangePicker[1]._d.getTime();
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
    const values ={type:19,...this.state.field}
    console.log(values)
    exportDataApi(values)
    .then(res => {
      if(res.code == '0'){
        confirm({
					title: '数据已经进入导出队列',
					content: '请前往下载中心查看导出进度',
					cancelText:'稍后去',
					okText:'去看看',
					onOk() {
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
    const { dataList=[] } = this.props.userorders;
    return (
      <div className='userOrder'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <Button
          className='output'
          type='primary'
          size='large'
          onClick={this.exportData}
          >导出数据
        </Button>
        <Qtable
          dataSource={dataList}
          onOperateClick = {this.handleOperateClick.bind(this)}
          columns = {Columns}/>
        <Qpagination
          data={this.props.userorders}
          onChange={this.changePage}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { userorders } = state;
  return {userorders};
}

export default connect(mapStateToProps)(UserOrder);
