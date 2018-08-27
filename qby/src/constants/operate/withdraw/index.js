import React, { Component } from 'react';
import { Button, Modal, message } from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import moment from 'moment';

class Withdraw extends Component{
  constructor(props){
    super(props);
    this.state ={
      field:{
        shopName:'',
        status:'',
        payStatus:'',
        carryCashNo:'',
        dateStart:'',
        dateEnd:''
      },
    }
  }
  //初始化数据
  componentWillMount(){
    this.initData()
  }
  //初始数据
  initData =()=> {
    this.props.dispatch({
      type:'withdraw/fetchList',
      payload:{}
    })
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    const {rangePicker,..._values} = values;
    if(rangePicker&&rangePicker[0]){
      _values.dateStart =  moment(new Date(rangePicker[0]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');;
      _values.dateEnd = moment(new Date(rangePicker[1]._d).getTime()).format('YYYY-MM-DD HH:mm:ss');;
    }
    this.setState({field:_values});
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'withdraw/fetchList',
      payload:values
    })
  }
  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.field,currentPage,limit}
    this.props.dispatch({
      type:'withdraw/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'withdraw/fetchList',
      payload:{currentPage,limit}
    });
  }
  //处理表格的点击事件
  handleOperateClick(record,type){
    switch(type) {
      case "detail":
        this.getDetail(record)
        break;
      case "edit":
        this.getEdit(record)
        break;
    }
  }
  getDetail =(record)=> {
    const paneitem = {
      title:'提现详情',
      key:`${this.props.componkey}info`,
      componkey:`${this.props.componkey}info`,
      data:{
        spCarryCashId:record.spCarryCashId,
      }
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  render(){
    const {dataList} = this.props.withdraw;
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick.bind(this)}
        />
        <Qpagination
          data={this.props.withdraw}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}
        />
        <Modal
          visible={this.state.visible}
          closable = { true }
          onOk={this.onOk}
          onCancel={this.onCancel}
          wrapClassName='billModal'
        >
          <Form>
            <FormItem
              label="提现门店"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{expireDate}</span>
            </FormItem>
            <FormItem
              label="提现金额"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{expireDate}</span>
            </FormItem>
            <FormItem
              label='不通过理由'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('status')(
                <Select allowClear={true} placeholder="请选择审核状态" className='select'>
                    <Option value={0}>待审核 </Option>
                    <Option value={1}>审核通过 </Option>
                    <Option value={2}>审核不通过</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
function mapStateToProps(state){
  const {withdraw} = state;
  return {withdraw};
}
export default connect(mapStateToProps)(Withdraw);
