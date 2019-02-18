import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination,Row,Col} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import EditableTable from '../../components/table/tablebasic';
import moment from 'moment';
import {GetServerData} from '../../services/services';
import {removeSpace} from '../../utils/meth';
import Appmodelone  from '../ordermd/modal';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker,MonthPicker } = DatePicker;
const dateFormat = 'YYYY-MM';
const confirm = Modal.confirm;
//利润报表
class ProfitReportForm extends React.Component {
  constructor(props) {
      super(props);
      this.state={
          dataSource:[],
          rpProfit:{
              amount:"",
              saleCostAmount:"",
              profitAmount:""
          },
          total:0,
          currentPage:0,
          limit:15,
          rpDate:'',
          name:'',
          windowHeight:'',
          orderType:7
      };
      this.columns = [{
            title: '商品条码',
            dataIndex: 'barcode',
        },{
            title: '商品名称',
            dataIndex: 'name',
        },{
            title: '商品分类',
            dataIndex: 'pdCategory1',
        },{
            title: '规格',
            dataIndex: 'displayName',
        },{
            title: '销售单均价',
            dataIndex: 'saleSinglePrice',
        },{
            title: '净销售数量',
            dataIndex: 'qty',
        },{
            title: '净销售额',
            dataIndex: 'amount',
        },{
            title: '商品成本',
            dataIndex: 'pdCostAmount',
        },{
            title: '净销售成本',
            dataIndex: 'sumCostAmount',
        },{
            title: '净销售毛利额',
            dataIndex: 'saleProfitAmount',
        },{
            title: '净销售毛利率',
            dataIndex: 'saleProfitRate',
        },{
            title: '调拨数量',
            dataIndex: 'pdExchangeQty',
        },{
            title: '调拨总额',
            dataIndex: 'pdExchangeAmount',
        },{
            title: '调拨成本',
            dataIndex: 'pdExchangeCostAmount',
        },{
            title: '商品毛利额',
            dataIndex: 'pdProfit',
        }];
  }
  componentDidMount(){
      this.getNowFormatDate();
  }
  //获取当前时间
  getNowFormatDate =()=> {
      const self = this;
      var date = new Date(); //前一天;
      var seperator1 = "-";
      var month = date.getMonth();
      let year = date.getFullYear();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if(month == 0){
          month = "12"
          year = year-1;
      }
      var currentdate = year + seperator1 + month;
      this.setState({
          rpDate:currentdate
      },()=>{
          self.getServerData();
      })
  }
  dateChange = (date, dateString) =>{
      this.setState({
          rpDate:dateString
      });
  }
  //页数变化
  pageChange =(current,limit)=> {
      const currentPage = current - 1;
      const {inputValues} = this.state;
      const values = {
        currentPage,
        limit:this.state.limit,
        ...inputValues
      }
      this.setState({
          currentPage
      },()=>{
          this.getServerData(values);
      });
  }
  //一页的条数变化
  onShowSizeChange=(current, limit)=>{
      const {inputValues} = this.state;
      this.setState({
          limit
      },()=>{
          this.getServerData({limit,...inputValues});
      })
  }
  //获取数据
  getServerData = (values) =>{
    let params = {
        shopId:this.props.shopId,
        rpDate:this.state.rpDate?(this.state.rpDate+"-01"):"",
        orderType:7,
        ...values
    }
    this.props.dispatch({ type: 'tab/loding', payload:true});
    GetServerData('qerp.web.rp.profit.page',removeSpace(params))
    .then((json) => {
        this.props.dispatch({ type: 'tab/loding', payload:false});
        if(json.code=='0'){
            let dataList = [];
            dataList = json.rpProfits;
            for(let i=0;i<dataList.length;i++){
                dataList[i].key = i+1;
            };
            let  rpProfit = json.rpProfit;
            this.setState({
                rpProfit:rpProfit,
                dataSource:dataList,
                total:Number(json.total),
                currentPage:Number(json.currentPage),
                limit:Number(json.limit)
            })
        }
    })
  }
  handleSubmit =(e)=> {
      this.props.form.validateFields((err, values) => {
          values.limit = this.state.limit;
          this.getServerData(values);
          const {limit,..._values} = values;
          this.setState({
            inputValues:_values
          });
      });
  }
  //导出数据
  exportDatas = () =>{
      let data = {
          shopId:this.props.shopId,
          rpDate:this.state.rpDate?(this.state.rpDate+"-01"):"",
          name:this.state.name,
          ...this.state.inputValues
      };
      this.exportData(81,data)
  }
  exportData = (type,data) => {
    removeSpace(data);
		const values={
			type:type,
			downloadParam:data,
		}
		const result=GetServerData('qerp.web.sys.doc.task',values);
		result.then((res) => {
			return res;
		}).then((json) => {
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
  render() {
      const { getFieldDecorator } = this.props.form;
      return (
          <div className="daily-bill border-top-style">
              <div>
                <div className="toggle-btn">
                  <Button type="primary" size='large' onClick={this.props.resetShopId}>切换门店</Button>
                </div>
                  {/* 数据展示部分 */}
                  <div className="top-data">
                      <ul>
                        <li>
                          <div>
                            <p style={{color:"#FB6349"}}><i>¥</i>
                            {this.state.rpProfit.amount && this.state.rpProfit.amount!="0"?this.state.rpProfit.amount.split('.')[0]:"0"}
                            <span>.
                            {this.state.rpProfit.amount && this.state.rpProfit.amount!="0"?this.state.rpProfit.amount.split('.')[1]:"00"}
                            </span>
                            </p>
                            <span className="explain-span">
                              <Tooltip title="查询时间范围内，该门店各商品净销售额总和">
                                  净销售额&nbsp;<Icon type="exclamation-circle-o"/>
                              </Tooltip>
                            </span>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p style={{color:"#F7A303"}}><i>¥</i>
                            {this.state.rpProfit.saleCostAmount && this.state.rpProfit.saleCostAmount!="0"?this.state.rpProfit.saleCostAmount.split('.')[0]:"0"}
                            <span>.
                            {this.state.rpProfit.saleCostAmount && this.state.rpProfit.saleCostAmount!="0"?this.state.rpProfit.saleCostAmount.split('.')[1]:"00"}
                            </span></p>
                            <span className="explain-span">
                              <Tooltip title="查询时间范围内，该门店各商品净销售成本总和">
                                  净销售成本&nbsp;<Icon type="exclamation-circle-o"/>
                              </Tooltip>
                            </span>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p style={{color:"#F7A303"}}><i>¥</i>
                            {this.state.rpProfit.cutAmount && this.state.rpProfit.cutAmount!="0"?this.state.rpProfit.cutAmount.split('.')[0]:"0"}
                            <span>.
                            {this.state.rpProfit.cutAmount && this.state.rpProfit.cutAmount!="0"?this.state.rpProfit.cutAmount.split('.')[1]:"00"}
                            </span></p>
                            <span className="explain-span">
                              <Tooltip title="查询时间范围内，该门店各销售订单抹零金额总和 - 各退货订单抹零总和">
                                  抹零金额&nbsp;<Icon type="exclamation-circle-o"/>
                              </Tooltip>
                            </span>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p style={{color:"#51C193"}}><i>¥</i>
                            {this.state.rpProfit.profitAmount && this.state.rpProfit.profitAmount!="0"?this.state.rpProfit.profitAmount.split('.')[0]:"0"}
                            <span>.
                            {this.state.rpProfit.profitAmount && this.state.rpProfit.profitAmount!="0"?this.state.rpProfit.profitAmount.split('.')[1]:"00"}
                            </span></p>
                            <span className="explain-span">
                              <Tooltip title="净销售额 - 净销售成本 - 抹零金额">
                                  净销售毛利&nbsp;<Icon type="exclamation-circle-o"/>
                              </Tooltip>
                            </span>
                          </div>
                        </li>
                      </ul>
                  </div>
                  {/*搜索部分 */}
                  <Form  className='formbox'>
                    <Row gutter={40} className='formbox_row' style={{marginTop:"20px"}}>
                      <Col span={24} className='formbox_col'>
                        <div className='serach_form'>
                          <FormItem className="monthSelect-input" label="订单时间">
                            <MonthPicker
                              allowClear={false}
                              value={this.state.rpDate?moment(this.state.rpDate, dateFormat):null}
                              format={dateFormat}
                              onChange={this.dateChange.bind(this)}/>
                          </FormItem>
                          <FormItem label="商品名称">
                            {getFieldDecorator('name',{
                            })(
                                <Input placeholder="请输入商品名称" autoComplete="off"/>
                            )}
                          </FormItem>
                          <FormItem
                            label="订单类型">
                            {getFieldDecorator('orderType',{
                            })(
                              <Select placeholder="请选择订单来源">
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
                      <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)} size='large'>搜索</Button>
                    </div>
                  </Form>
                  <Button
        						type="primary"
        						size='large'
        						className='mt20'
        						onClick={this.exportDatas.bind(this)}>
        						导出数据
        					</Button>
                  <div className="mt15">
                    <EditableTable
                      columns={this.columns}
                      dataSource={this.state.dataSource}
                      footer={true}
                      pageChange={this.pageChange.bind(this)}
                      pageSizeChange={this.onShowSizeChange.bind(this)}
                      total={this.state.total}
                      limit={this.state.limit}
                      current={this.state.currentPage+1}
                      bordered={true}/>
                  </div>
              </div>
          </div>
      );
  }
}

function mapStateToProps(state){
   return {};
}

const ProfitReport = Form.create()(ProfitReportForm);

export default connect(mapStateToProps)(ProfitReport);
