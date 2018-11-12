import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination,Row,Col} from 'antd';
import { Link } from 'dva/router';
import NP from 'number-precision';
import '../../style/dataManage.css';
import EditableTable from '../../components/table/tablebasic';
import moment from 'moment';
import {GetServerData} from '../../services/services';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker,MonthPicker } = DatePicker;
const dateFormat = 'YYYY-MM';
const confirm = Modal.confirm;
import './inoutReport.less'

const OtherCost = ({visible, onCancel, data}) => (
  <Modal
    className="other-cost-modal"
    title="其他成本明细"
    visible={visible}
    onCancel={()=>onCancel()}
    footer={null}>
    <div className="main-content">
      <Table
        className="other-table"
        bordered
        dataSource={data}
        pagination={false}>
        <Table.Column dataIndex="returnSum" title="退货总成本"></Table.Column>
        <Table.Column dataIndex="adjustSum" title="损益总成本"></Table.Column>
        <Table.Column dataIndex="pdExchangeSum" title="调出总成本"></Table.Column>
        <Table.Column dataIndex="otherSum" title="总计"></Table.Column>
      </Table>
      <div className="tips-list">
        <p className="label total-label">字段说明：</p>
        <p className="label">退货总成本：所有商品退货成本总和</p>
        <p className="label">损益总成本：所有商品损益成本总和</p>
        <p className="label">调出总成本：所有商品调出成本总和</p>
        <p className="label total-label">总计：退货总成本+损益总成本-调出总成本</p>
      </div>
    </div>
  </Modal>
)

//进销存报表
class InOutReportForm extends React.Component {
    constructor(props) {
      super(props);
      this.state={
          dataSource:[],
          finalInvAmountSum:null,
          invAmountSum:null,
          receiptAmountSum:null,
          saleAmountSum:null,
          adjustPdCheckAmountSum:null,
          total:0,
          currentPage:0,
          limit:15,
          rpDate:'',
          name:'',
          windowHeight:'',
          others:{},
          rpInventoryHeaderVo:[]
      };
      this.columns = [{
            title: '序号',
            dataIndex: 'key',
        },{
            title: '商品条码',
            dataIndex: 'barcode',
        },{
            title: '商品名称',
            dataIndex: 'pdSpuName',
        },{
            title: '商品分类',
            dataIndex: 'pdCategory1',
        },{
            title: '规格',
            dataIndex: 'displayName',
        },{
            title: '期初库存数量',
            dataIndex: 'qty',
        },{
            title: '期初库存成本',
            dataIndex: 'invAmount',
        },{
            title: '收货数量',
            dataIndex: 'recQty',
        },{
            title: '收货成本',
            dataIndex: 'recAmount',
        },{
            title: '销售数量',
            dataIndex: 'posQty',
        },{
            title: '销售成本',
            dataIndex: 'sumCostAmount',
        },{
            title: '退货数量',
            dataIndex: 'returnQty',
        },{
            title: '退货成本',
            dataIndex: 'returnSumAmount',
        },{
            title: '损益数量',
            dataIndex: 'adjustQty',
        },{
            title: '损益成本',
            dataIndex: 'adjustCostAmount',
        },/*{
            title: '盘点损益数',
            dataIndex: 'checkQty',
        },{
            title: '盘点损益成本',
            dataIndex: 'checkAmount',
        },*/{
            title: '调出数量',
            dataIndex: 'pdExchangeQty',
        },{
            title: '调出成本',
            dataIndex: 'pdExchangeAmount',
        },{
            title: '期末库存数量',
            dataIndex: 'finalQty',
        },{
            title: '期末库存成本',
            dataIndex: 'finalInvAmount',
        }];
    }
    dateChange = (date, dateString) =>{
      this.setState({
          rpDate:dateString
      });
    }
    //表格的方法
    pageChange=(page,pageSize)=>{
        const self = this;
        this.setState({
            currentPage:page-1
        },function(){
            let data = {
                shopId:this.props.shopId,
                currentPage:this.state.currentPage,
                limit:this.state.limit,
                time:this.state.rpDate,
                name:this.state.name
            }
            self.getServerData(data);
        });
    }
    onShowSizeChange=(current, pageSize)=>{
        const self = this;
        this.setState({
            limit:pageSize,
            currentPage:0
        },function(){
            let data = {
                shopId:this.props.shopId,
                currentPage:this.state.currentPage,
                limit:this.state.limit,
                time:this.state.rpDate,
                name:this.state.name
            };
            self.getServerData(data);
        })
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
    //获取数据
    getServerData = (values) =>{
        this.props.dispatch({ type: 'tab/loding', payload:true});
        const result=GetServerData('qerp.web.qpos.rp.inventory.page',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            this.props.dispatch({ type: 'tab/loding', payload:false});
            if(json.code=='0'){
                const finalInvAmountSum=json.finalInvAmountSum //期末库存总成本
                const invAmountSum=json.invAmountSum //期初库存总成本
                const receiptAmountSum=json.receiptAmountSum // 收货总成本
                const saleAmountSum=json.saleAmountSum //销售总成本
                const adjustPdCheckAmountSum=json.adjustPdCheckAmountSum//损益总成本
                const dataList = json.inventorys;
                for(let i=0;i<dataList.length;i++){
                    dataList[i].key = i+1;
                };
                let others = json.rpInventoryHeaderVo;
                for(let key in others) {
                  others[key]= NP.round(others[key], 2)
                };
                this.setState({
                    finalInvAmountSum:finalInvAmountSum,
                    invAmountSum:invAmountSum,
                    receiptAmountSum:receiptAmountSum,
                    saleAmountSum:saleAmountSum,
                    adjustPdCheckAmountSum:adjustPdCheckAmountSum,
                    dataSource:dataList,
                    total:Number(json.total),
                    currentPage:Number(json.currentPage),
                    limit:Number(json.limit),
                    others,
                    rpInventoryHeaderVo:[others]
                });
            }
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const self = this;
        this.props.form.validateFields((err, values) => {
            this.setState({
                name:values.name
            },function(){
                let data = {
                    shopId:this.props.shopId,
                    currentPage:0,
                    limit:this.state.limit,
                    time:this.state.rpDate,
                    name:this.state.name
                }
                self.getServerData(data);
            })
        })
    }
    //导出数据
    exportList = () =>{
        let data = {
            shopId:this.props.shopId,
            rpDate:this.state.rpDate,
            name:this.state.name
        }
        this.exportData(82,data)
    }
    exportData = (type,data) => {
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
    //获取当前时间
    getNowFormatDate = () =>{
        const self = this;
        var date = new Date(); //前一天;
        var seperator1 = "-";
        var month = date.getMonth();
        let year = date.getFullYear();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if(month == 0){
            month = "12";
            year = year-1;
        }
        var currentdate = year + seperator1 + month;
        this.setState({
            rpDate:currentdate
        },function(){
            let values = {
                shopId:this.props.shopId,
                currentPage:0,
                limit:15,
                time:this.state.rpDate,
                name:this.state.name
            };
            self.getServerData(values);
        })
    }
    //显示Modal
    showModal() {
      this.setState({ visible:true })
    }
    onCancel() {
      this.setState({ visible:false })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, others, rpInventoryHeaderVo } =this.state;
        return (
          <div className="daily-bill border-top-style">
            <div>
              <div className="toggle-btn">
                <Button type="primary" size='large' onClick={this.props.resetShopId}>切换门店</Button>
              </div>
              {/* 数据展示部分 */}
              <div className="top-data inout-data">
                  <ul>
                    <li>
                      <div>
                        <p style={{color:"#806EC6"}}><i>¥</i>
                        {this.state.finalInvAmountSum&&this.state.finalInvAmountSum!="0"?this.state.finalInvAmountSum.split('.')[0]:"0"}
                        <span>.
                        {this.state.finalInvAmountSum&&this.state.finalInvAmountSum!="0"?this.state.finalInvAmountSum.split('.')[1]:"00"}
                        </span>
                        </p>
                        <span className="explain-span">
                          <Tooltip title="期初库存总成本 + 收货总成本 - 销售总成本 + 其他成本">
                              期末库存总成本&nbsp;<Icon type="exclamation-circle-o"/>
                          </Tooltip>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <p style={{color:"#F4A314"}}><i>¥</i>
                        {this.state.invAmountSum&&this.state.invAmountSum!="0"?this.state.invAmountSum.split('.')[0]:"0"}
                        <span>.
                        {this.state.invAmountSum&&this.state.invAmountSum!="0"?this.state.invAmountSum.split('.')[1]:"00"}
                        </span></p>
                        <span className="explain-span">
                          <Tooltip title="查询时间范围内，该门店上期期末成本">
                              期初库存总成本&nbsp;<Icon type="exclamation-circle-o"/>
                          </Tooltip>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <p style={{color:"#0D89C8"}}><i>¥</i>
                        {this.state.receiptAmountSum&&this.state.receiptAmountSum!="0"?this.state.receiptAmountSum.split('.')[0]:"0"}
                        <span>.
                        {this.state.receiptAmountSum&&this.state.receiptAmountSum!="0"?this.state.receiptAmountSum.split('.')[1]:"00"}
                        </span></p>
                        <span className="explain-span">
                          <Tooltip title="查询时间范围内，该门店各商品收货成本总和">
                              收货总成本&nbsp;<Icon type="exclamation-circle-o"/>
                          </Tooltip>
                        </span>
                      </div>
                      </li>
                      <li>
                          <div>
                              <p style={{color:"#FB6349"}}><i>¥</i>
                              {this.state.saleAmountSum&&this.state.saleAmountSum!="0"?this.state.saleAmountSum.split('.')[0]:"0"}
                              <span>.
                              {this.state.saleAmountSum&&this.state.saleAmountSum!="0"?this.state.saleAmountSum.split('.')[1]:"00"}
                              </span></p>
                              <span className="explain-span">
                                  <Tooltip title="查询时间范围内，该门店各商品销售成本总和">
                                      销售总成本&nbsp;<Icon type="exclamation-circle-o"/>
                                  </Tooltip>
                              </span>
                          </div>
                      </li>
                      <li>
                        <div onClick={this.showModal.bind(this)} style={{cursor:'pointer'}}>
                          <p style={{color:"#51C193",cursor:'pointer'}}><i>¥</i>
                          {
                            others.otherSum&&this.formatData(others.otherSum)[0]
                          }
                          <span>.
                          {
                            others.otherSum&&this.formatData(others.otherSum)[1]
                          }
                          </span></p>
                          <span className="explain-span">
                          <Tooltip>
                              <span style={{color:"#51C193"}}>其他成本>></span>
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
                      <FormItem label="订单时间" className="monthSelect-input">
                          <MonthPicker
                          allowClear={false}
                          value={this.state.rpDate?moment(this.state.rpDate, dateFormat):null}
                          format={dateFormat}
                          onChange={this.dateChange.bind(this)}/>
                      </FormItem>
                      <FormItem label="商品名称" >
                      {getFieldDecorator('name')(
                          <Input placeholder="请输入商品名称" autoComplete="off"/>
                      )}
                      </FormItem>
                    </div>
                  </Col>
                </Row>
                <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)} size='large'>搜索</Button>
                </div>
              </Form>
              {/* <Button
        						type="primary"
        						size='large'
        						className='mt20 mb15'
        						onClick={this.exportList.bind(this)}
        					>
        						导出数据
        					</Button> */}
              <EditableTable
                columns={this.columns}
                dataSource={this.state.dataSource}
                footer={true}
                pageChange={this.pageChange.bind(this)}
                pageSizeChange={this.onShowSizeChange.bind(this)}
                total={this.state.total}
                limit={this.state.limit}
                current={this.state.currentPage+1}
                bordered={true}
                scroll={{ x: '130%' }}/>
            </div>
            <OtherCost
              data={rpInventoryHeaderVo}
              visible={visible}
              onCancel={this.onCancel.bind(this)}/>
          </div>
        );
    }

    componentDidMount(){
        this.getNowFormatDate();
    }
}

function mapStateToProps(state){
   return {};
}

const InOutReport = Form.create()(InOutReportForm);

export default connect(mapStateToProps)(InOutReport);
