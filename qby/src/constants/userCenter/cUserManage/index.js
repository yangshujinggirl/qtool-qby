import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, message, Modal,Row,Col,Table} from 'antd'
import Qtable from '../../../components/Qtable/index';
import Qpagination from '../../../components/Qpagination/index';
import FilterForm from './FilterForm/index'
import Columns from './columns/index';
import moment from 'moment';
const confirm = Modal.confirm;

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields:{
        spShopName:'',
        orderNo:'',
        pdSpuName:'',
        code:'',
        mobilePhone:'',
        orderStatus:'',
        platform:'',
        deliveryType:'',
        rangePicker:'',
      },
    }
  }
  componentWillMount() {
    this.props.dispatch({
        type:'cUserManage/fetchList',
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
  changePage = (current) => {
    const currentPage = current-1;
    const values = {...this.state.fields,currentPage}
    this.props.dispatch({
      type:'cUserManage/fetchList',
      payload: values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'cUserManage/fetchList',
      payload:{currentPage,limit,...this.state.fields}
    });
  }
  //搜索框数据发生变化
  searchDataChange =(changedFields)=> {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'cUserManage/fetchList',
      payload:values
    })
  }
  render() {
    const { dataList } = this.props.cUserManage;
    return (
      <div className='qtools-components-pages'>
        <FilterForm
          {...this.state.fields}
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}/>
        <Qtable
          dataSource={dataList}
          onOperateClick = {this.handleOperateClick.bind(this)}
          columns = {Columns}/>
        {
            dataList.length>0?
            <Qpagination
              data={this.props.cUserManage}
              onChange={this.changePage}
              onShowSizeChange = {this.onShowSizeChange}
            />:null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { cUserManage } = state;
  return {cUserManage};
}

export default connect(mapStateToProps)(UserManage);
