import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Row, Col} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import {GetServerData} from '../../services/services';
import moment from 'moment';
import EditableTable from '../../components/table/tablebasic';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
//引入图表
import BarChart from './BarchartTest';
import PieChart from './PiechartTest';
import './clerkSale.less';
//店员销售
class ClerkSaleForm extends React.Component {
  constructor(props) {
      super(props);
      this.state={
          userSales:[],
          totalUserSale:{},
          setsouce:[],
          startDate:'',
          endDate:'',
          orderType:7
      };
      this.amount = <Tooltip placement="top" title='销售订单金额-退款订单金额'>
                      净销售额&nbsp;<Icon type="exclamation-circle-o" />
                    </Tooltip>;
      this.icAmount = <Tooltip placement="top" title='微信转账+微信扫码+支付宝转账+支付宝扫码+现金+银联+App支付'>
                          净收款&nbsp;<Icon type="exclamation-circle-o" /></Tooltip>;
      this.wechatAmount = <Tooltip placement="top" title='微信转账消费+微信转账充值-微信转账退款'>
                          微信转账&nbsp;<Icon type="exclamation-circle-o" /></Tooltip>;
      this.wechatAmounts = <Tooltip placement="top" title='微信扫码消费+微信扫码充值'>
                          微信扫码&nbsp;<Icon type="exclamation-circle-o" /></Tooltip>;
      this.alipayAmount = <Tooltip placement="top" title='支付宝转账消费+支付宝转账充值-支付宝转账退款'>
                          支付宝转账&nbsp;<Icon type="exclamation-circle-o" /></Tooltip>;
      this.alipayAmounts = <Tooltip placement="top" title='支付宝扫码消费+支付宝扫码充值'>
                          支付宝扫码&nbsp;<Icon type="exclamation-circle-o" /></Tooltip>;
      this.appPayAmounts = <Tooltip placement="top" title='APP支付'>
                          APP支付&nbsp;<Icon type="exclamation-circle-o" /></Tooltip>;
      this.cashAmount = <Tooltip placement="top" title='现金消费+现金充值-现金退款'>
                          现金&nbsp;<Icon type="exclamation-circle-o" /></Tooltip>;
      this.unionpayAmount = <Tooltip placement="top" title='银联消费+银联充值-银联退款'>
                          银联&nbsp;<Icon type="exclamation-circle-o" /></Tooltip>;
      this.refundAmount = <Tooltip placement="top" title='所有订单总退款'>
                          退款&nbsp;<Icon type="exclamation-circle-o" /></Tooltip>;
      this.columns = [{
            title: '姓名',
            dataIndex: 'name'
        }, {
            title:this.amount,
            dataIndex: 'saleAmount'
        }, {
            title:this.icAmount,
            dataIndex: 'cleanAmount'
        },{
            title: '订单数',
            dataIndex: 'orderSum'
        },{
            title: this.wechatAmount,
            dataIndex: 'wechatAmount'
        },{
            title: this.wechatAmounts,
            dataIndex: 'scanWechatAmount'
        },{
            title: this.alipayAmount,
            dataIndex: 'alipayAmount'
        },{
            title: this.alipayAmounts,
            dataIndex: 'scanAlipayAmount'
        },{
            title: this.appPayAmounts,
            dataIndex: 'appPay'
        },{
            title: this.unionpayAmount,
            dataIndex: 'unionpayAmount'
        },{
            title: this.cashAmount,
            dataIndex: 'cashAmount'
        },{
            title: '会员消费',
            dataIndex: 'cardConsumeAmount'
        },{
            title: '积分抵扣',
            dataIndex: 'pointAmount'
        },{
            title: this.refundAmount,
            dataIndex: 'returnAmount'
        }];
  }
  componentDidMount(){
    this.getDate()
  }
  getDate() {
    let d= new Date()
    d.setDate(d.getDate()-1);
    let dy=d.getFullYear(); //年
    var dm=("0" + (d.getMonth() + 1)).slice(-2);
    var dd=("0"+d.getDate()).slice(-2);
    let a=dy+'-'+dm+'-'+dd;
    this.setState({
        startDate:a,
        endDate:a
    },()=> {
      this.initdataspuce()
    });
  }
  rowClassName=(record, index)=>{
    if (index % 2) {
        return 'table_gray'
    }else{
        return 'table_white'
    }
  }
  searchTable = () =>{
    this.initdataspuce();
  }
  initdataspuce=(values)=>{
    let params={
        shopId:this.props.shopId,
        startDate:this.state.startDate,
        endDate:this.state.endDate,
        orderType:this.state.orderType
    };
    this.props.dispatch({ type: 'tab/loding', payload:true});
    GetServerData('qerp.web.rp.day.users.list',params)
    .then((json) => {
        this.props.dispatch({ type: 'tab/loding', payload:false});
        if(json.code=='0'){
            //总销售数据列表
            let userSales=json.accounts;
            //总销售数据
            let totalUserSale=json.accountTotal;
            totalUserSale.key = 0;
            totalUserSale.saleAmount = totalUserSale.saleAmountTotal;
            totalUserSale.cleanAmount = totalUserSale.cleanAmountTotal;
            totalUserSale.orderSum = totalUserSale.orderSumTotal;
            totalUserSale.wechatAmount = totalUserSale.wechatAmountTotal;
            totalUserSale.alipayAmount = totalUserSale.alipayAmountTotal;
            totalUserSale.unionpayAmount = totalUserSale.unionpayAmountTotal;
            totalUserSale.cashAmount = totalUserSale.cashAmountTotal;
            totalUserSale.cardConsumeAmount = totalUserSale.cardConsumeAmountTotal;
            totalUserSale.pointAmount = totalUserSale.pointAmountTotal;
            totalUserSale.returnAmount = totalUserSale.returnAmountTotal;
            totalUserSale.scanWechatAmount=totalUserSale.scanSumWechatAmountTotal;
            totalUserSale.scanAlipayAmount=totalUserSale.scanSumAlipayAmountTotal;
            let setsouce=[];
            for(let i=0;i<userSales.length;i++){
                userSales[i].key = i+1;
                setsouce.push(userSales[i]);
            }
            setsouce.push(totalUserSale);
            this.setState({
                userSales:json.accounts,
                totalUserSale:totalUserSale,
                setsouce:setsouce
            })
        }
    })
  }
  dataChange = (dates,dateStrings) =>{
    this.setState({
      startDate:dateStrings[0],
      endDate:dateStrings[1]
    })
  }
  changeSource=(value)=> {
    this.setState({ orderType: value});
  }
  render() {
      const { getFieldDecorator } = this.props.form;
      let d= new Date()
      d.setDate(d.getDate()-1)
      let dy=d.getFullYear() //年
      let dm=d.getMonth()+1//月
      let dd=d.getDate()//日
      let a=dy+'-'+dm+'-'+dd
      return (
          <div className="clerk-sale">
              <div className="clerk-sale-wrapper">
                <div className="toggle-btn">
                  <Button type="primary" size='large' onClick={this.props.resetShopId}>切换门店</Button>
                </div>
                  {/*搜索部分 */}
                  <Form  className='formbox'>
                    <Row gutter={40} className='formbox_row' style={{marginTop:"20px"}}>
                      <Col span={24} className='formbox_col'>
                        <div className='serach_form'>
                          <FormItem label="选择时间">
                            {getFieldDecorator('time',{
                              onChange:this.dataChange,
                              initialValue:[moment(a,dateFormat),moment(a, dateFormat)]
                            })(
                              <RangePicker
                                format="YYYY-MM-DD"/>
                            )}
                          </FormItem>
                          <FormItem
                            label="业务类型">
                            {getFieldDecorator('orderType',{
                              onChange:this.changeSource,
                              initialValue:7
                            })(
                              <Select placeholder="请选择业务类型">
                                <Option key={7} value={7}>全部</Option>
                                <Option key={0} value={0}>门店POS订单</Option>
                                <Option key={6} value={6}>门店APP订单</Option>
                              </Select>
                            )}
                          </FormItem>
                        </div>
                      </Col>
                    </Row>
                    <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
                        <Button type="primary"  onClick={this.searchTable.bind(this)} size='large'>搜索</Button>
                    </div>
                  </Form>
                  <div className="charts-table-wrapper mt15">
                    <div className="charts-wrapper">
                      <p style={{paddingBottom:"20px",fontSize:"14px",color:" #384162"}}>销售数据</p>
                      {/* <TestCharts/> */}
                      <div className='fl' style={{width:"49%"}}>
                          <BarChart userSales={this.state.userSales} totalUserSale={this.state.totalUserSale}/>
                          {/* <Echartsaxis userSales={this.state.userSales} totalUserSale={this.state.totalUserSale}/> */}
                      </div>
                      <div style={{width:"2%",textAlign:"center"}} className='fl'>
                          <div style={{width:'2px',height:'300px',background:'#E7E8EC',margin:"0 auto"}}></div>
                      </div>
                      <div className='fl' style={{width:"49%"}}>
                          <PieChart userSales={this.state.userSales} totalUserSale={this.state.totalUserSale}/>
                      {/* <EchartsPie userSales={this.state.userSales} totalUserSale={this.state.totalUserSale}/> */}
                      </div>
                    </div>
                    <div className="table-wrapper">
                      <p style={{padding:"20px 0px",fontSize:"14px",color:" #384162"}}>详细数据</p>
                      <EditableTable
                        columns={this.columns}
                        dataSource={this.state.setsouce}
                        footer={false}
                        bordered={true}/>
                    </div>
                  </div>
              </div>
          </div>
      );
  }
}

function mapStateToProps(state){
   return {};
}
const ClerkSale = Form.create()(ClerkSaleForm);

export default connect(mapStateToProps)(ClerkSale);
