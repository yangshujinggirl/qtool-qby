import React from 'react';
import {
  Table,
  Input, Icon,Row, Col,
  Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination} from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import {GetServerData} from '../../services/services';
import './IntegralStatements.less';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker  } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const confirm = Modal.confirm;

const columns = [{
    title: '订单号',
    dataIndex: 'orderNo',
    key: 'orderNo',
  }, {
    title: '结算积分',
    dataIndex: 'pointAmount',
    key: 'pointAmount',
  }, {
    title: '积分类型',
    dataIndex: 'pointType',
    key: 'pointType',
  },{
    title: '会员卡号',
    dataIndex: 'cardNo',
    key: 'cardNo',
  },{
    title: '会员类型',
    dataIndex: 'isLocalShopStr',
    key: 'isLocalShopStr',
  },{
    title: '订单时间',
    dataIndex: 'orderTime',
    key: 'orderTime',
  }];

class SearchForm extends React.Component {
  search() {
    this.props.form.validateFields((er,values) => {
      this.props.handleSearch('0','15')
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { orderST, orderET, upDatePointType, upDateDateTime } = this.props;
    return(
      <div className="search-form point-forms">
        <Form className='formbox'>
          <FormItem label="订单时间" labelCol={{ span: 5 }} wrapperCol={{span: 12}}>
            {
              getFieldDecorator('orderTime',{
                initialValue:[moment(orderST, dateFormat), moment(orderET, dateFormat)],
                onChange:(date,dateString)=>upDateDateTime(date,dateString)
              })(
                <RangePicker />
              )
            }
          </FormItem>
          <FormItem label="订单分类" labelCol={{ span: 5 }} wrapperCol={{span: 10}}>
            {
              getFieldDecorator('pointType',{
                initialValue:'0',
                onChange:upDatePointType
              })(
                <Select>
                  <Option value="0" key="0">全部</Option>
                  <Option value="1" key="1">消费赠送</Option>
                  <Option value="4" key="4">现金抵值</Option>
                  <Option value="3" key="3">退货抵扣</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem>
              <Button type="primary" icon="search" onClick={this.search.bind(this)}>搜索</Button>
          </FormItem>
          <div className="export-div">
              <Button type="primary" onClick={this.props.exportList}>导出数据</Button>
          </div>
        </Form>
      </div>
    )
  }
}

class IntegralStatements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalData:{},
      list:[],
      total:0,
      currentPage:0,
      limit:10,
      orderST:'',
      orderET:'',
      pointType:0
    }
  }
  componentDidMount() {
    this.getNowFormatDate()
  }
  //获取当前时间
  getNowFormatDate = () =>{
    let nowDate = moment().format('YYYY-MM-DD');
    let lastDate = moment().add(-1,'month').format('YYYY-MM-DD');
    this.setState({
      orderST:lastDate,
      orderET:nowDate
    },() => {
      this.getList(this.state.currentPage,this.state.limit)
    })
  }
  //更新时间
  upDateDateTime(date,dateString) {
    this.setState({
        orderST:dateString[0],
        orderET:dateString[1]
    })
  }
  //更新时间
  upDatePointType(value) {
    this.setState({
        pointType:value,
    })
  }
  exportList() {
    const { pointType, orderST, orderET} =this.state;
    let params = {
      downloadParam:{
        pointType,
        orderST,
        orderET,
      },
      type:88
    }
    GetServerData('qerp.web.rp.mbcard.point.export',params)
    .then((res) => {
      console.log(res)
    },(err) => {

    })
  }
  exportList = (type,data) => {
    const { pointType, orderST, orderET} =this.state;
    const values={
      type:88,
      downloadParam:{
        pointType,
        orderST,
        orderET,
        spShopId:this.props.shopId
      }
    }
    GetServerData('qerp.web.sys.doc.task',values)
    .then((json) => {
      if(json.code=='0'){
        var _dispatch=this.props.dispatch
        confirm({
          title: '数据已经进入导出队列',
          content: '请前往下载中心查看导出进度',
          cancelText:'稍后去',
          okText:'去看看',
          onOk() {
            const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
            _dispatch({
              type:'tab/firstAddTab',
              payload:paneitem
            });
            _dispatch({
              type:'downlaod/fetch',
              payload:{code:'qerp.web.sys.doc.list',values:{limit:15,currentPage:0}}
            });
          },
          onCancel() {

          },
          });
      }
    })
  }
  getList(currentPage, limit ) {
    let { pointType, orderST, orderET } = this.state;
    let params = {
          pointType:pointType||0,
          orderST,
          orderET,
          currentPage,
          limit,
          shopId:this.props.shopId
        }
    this.setState({ limit:limit, currentPage:currentPage });
    GetServerData('qerp.web.rp.mbcard.point.page',params)
    .then((res) => {
      const { limit, total, currentPage, rpMbcardPoints, deductPoints, toDeductTotalPoints, allocatePoints } =res;
      this.setState({
        total:Number(total),
        totalData:{
          deductPoints,
          toDeductTotalPoints,
          allocatePoints
        },
        list:rpMbcardPoints
      })
    },(err) => {
      console.log(err)
    })
  }
  onShowSizeChange(current, pageSize) {
    current--;
    this.getList(current, pageSize);
  }
  changePage(page, pageSize) {
    page--;
    this.getList(page, pageSize);
  }
  rowClassName=(record, index)=>{
    if (index % 2) {
        return 'table_gray'
    }else{
        return 'table_white'
    }
  }
  formatData(value) {
    value = String(value);
    // others.otherSum.split('.')[0]
    if(value.indexOf('.')!=-1) {
      value = value.split('.');
      return value;
    } else {
      value = [value,'00'];
      return value;
    }
  }
  render() {
    let { totalData, list, currentPage, total, limit, orderST, orderET } = this.state;
    console.log(list)
    return(
      <div className="integral-statements-pages">
        <div className="toggle-btn">
          <Button type="primary" size='large' onClick={this.props.resetShopId}>切换门店</Button>
        </div>
        <div className="total-data-action">
          <div className="data-list">
            <div className="item-wrap">
              <p className="nums">
                <span className="big-size">{totalData.allocatePoints}</span>
              </p>
              <p className="label">
                <Tooltip title="统计订单时间内，门店消费赠送总积分 - 门店退货扣减总积分">
                    发放积分数&nbsp;<Icon type="exclamation-circle-o"/>
                </Tooltip>
              </p>
            </div>
            <div className="item-wrap">
              <p className="nums">
                <span className="big-size">{totalData.deductPoints}</span>
              </p>
              <p className="label">
                <Tooltip title="统计订单时间内，门店积分抵值总数">
                    抵扣积分数&nbsp;<Icon type="exclamation-circle-o"/>
                </Tooltip>
              </p>
            </div>
            <div className="item-wrap">
              <p className="nums">
                <span className="big-size">{totalData.toDeductTotalPoints}</span>
              </p>
              <p className="label">
                <Tooltip title="门店待抵扣积分总数">
                  积分池待抵扣总积分&nbsp;<Icon type="exclamation-circle-o"/>
                </Tooltip>
              </p>
            </div>
          </div>
        </div>
        <SearchFilter
          orderST={orderST}
          orderET={orderET}
          exportList={this.exportList.bind(this)}
          upDatePointType={this.upDatePointType.bind(this)}
          upDateDateTime={this.upDateDateTime.bind(this)}
          handleSearch={this.getList.bind(this)}/>
        <Table
          bordered
          dataSource={list}
          pagination={false}
          columns={columns}
          rowClassName={this.rowClassName.bind(this)}/>
          {
            list.length>0&&
            <Pagination
              className="point-pages"
              showSizeChanger
              onShowSizeChange={this.onShowSizeChange.bind(this)}
              onChange={this.changePage.bind(this)}
              pageSizeOptions={['10','12','15','17','20','50','100','200']}
              current={currentPage+1}
              pageSize={limit}
              total={total} />
          }
      </div>
    )
  }
}
const SearchFilter = Form.create()(SearchForm);
function mapStateToProps(state){
   return {};
}

export default connect(mapStateToProps)(IntegralStatements);
