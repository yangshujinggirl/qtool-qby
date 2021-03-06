import React, { Component } from 'react';
import { Button, Modal, message,Form,Select,Input } from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import { checkApi } from '../../../services/operate/withdraw'
import moment from 'moment';
import {timeForMats} from '../../../utils/meth';
const FormItem = Form.Item;
const Option = Select.Option;

class Withdraw extends Component{
  constructor(props){
    super(props);
    this.state ={
      checkStatus:false,
      shopName:'',
      amount:'',
      spCarryCashId:'',
      inputValues:{}
    }
  }
  componentWillMount() {
    this.getNowFormatDate();
  }
  getNowFormatDate = () => {
   const startRpDate=timeForMats(30).t2;
   const endRpDate=timeForMats(30).t1;
   this.searchData({
     dateStart:startRpDate,
     dateEnd:endRpDate
   });
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'withdraw/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    })
  }
  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage,limit}
    this.props.dispatch({
      type:'withdraw/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'withdraw/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //处理表格的点击事件
  handleOperateClick(record,type){
    switch(type) {
      case "detail":
        this.getDetail(record);
        break;
      case "edit":
        this.getEdit(record);
        break;
    }
  }
  getDetail =(record)=> {
    const paneitem = {
      title:'提现详情',
      key:`${this.props.componkey}edit${record.spCarryCashId}info`,
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
  getEdit =(record)=> {
      this.setState({
        visible:true,
        shopName:record.shopName,
        amount:record.amount,
        spCarryCashId:record.spCarryCashId
      })
  }
  notCheck =()=> {
    this.setState({
      checkStatus:true
    },function(){
      this.props.form.validateFieldsAndScroll((err,values) => {
        if(!err){ //审核通过1 审核不通过2
          values.status = 2;
          values.spCarryCashId = this.state.spCarryCashId;
          checkApi({spCarryCashs:values})
          .then(res => {
            if(res.code == "0"){
              this.setState({
                visible:false,
              });
              this.initData();
            };
          })
          this.props.form.resetFields(['remark']);
        };
      });
    });
  }
  check =()=> {
    this.setState({
      checkStatus:false
    },()=>{
      this.props.form.validateFieldsAndScroll((err,values) => {
        if(!err){ //审核通过1 审核不通过2
          values.status = 1;
          values.spCarryCashId = this.state.spCarryCashId;
          checkApi({spCarryCashs:values})
          .then(res => {
            if(res.code == "0"){
              this.setState({
                visible:false,
              });
              this.initData();
            }
          });
          this.props.form.resetFields(['remark']);
        };
      });
    });
  }
  onCancel =()=> {
    this.setState({
      visible:false
    });
    this.props.form.resetFields(['remark']);
  }
  render(){
    const {dataList} = this.props.withdraw;
    const { getFieldDecorator }= this.props.form;
    const { shopName,amount,checkStatus} = this.state
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div className="mt15">
          <Qtable
            dataSource = {dataList}
            columns = {Columns}
            onOperateClick = {this.handleOperateClick.bind(this)}
          />
        </div>
        <Qpagination
          data={this.props.withdraw}
          onChange={this.changePage}
          onShowSizeChange = {this.onShowSizeChange}
        />
        <Modal
          visible={this.state.visible}
          closable = { true }
          onCancel={this.onCancel}
          wrapClassName='withdraw'
          footer={null}
        >
          <Form>
            <FormItem
              label="提现门店"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{shopName}</span>
            </FormItem>
            <FormItem
              label="提现金额"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{amount}</span>
            </FormItem>
            <FormItem
              label='不通过理由'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('remark',{
                rules:[{required:checkStatus,message:'请输入不通过理由'}]
              })(
                <Input placeholder='请输入不通过的理由' maxLength='50' autoComplete="off"/>
              )}
            </FormItem>
          </Form>
          <div className='btnbox'>
            <Button size='large' onClick={this.notCheck} className='check'>审核不通过</Button>
            <Button type="primary" onClick={this.check} size='large'>审核通过</Button>
          </div>
        </Modal>
      </div>
    )
  }
}
const Withdraws = Form.create()(Withdraw)
function mapStateToProps(state){
  const {withdraw} = state;
  return {withdraw};
}
export default connect(mapStateToProps)(Withdraws);
