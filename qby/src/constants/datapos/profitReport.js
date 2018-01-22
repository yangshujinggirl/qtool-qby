import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination,Row,Col} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import EditableTable from '../../components/table/tablebasic';
import moment from 'moment';
import {GetServerData} from '../../services/services';
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
            windowHeight:''
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
            title: '销售数量',
            dataIndex: 'qty',
        },{
            title: '销售额',
            dataIndex: 'amount',
        },{
            title: '商品成本',
            dataIndex: 'pdCostAmount',
        },{
            title: '销售成本',
            dataIndex: 'sumCostAmount',
        },{
            title: '销售毛利额',
            dataIndex: 'saleProfitAmount',
        },{
            title: '销售毛利率',
            dataIndex: 'saleProfitRate',
        },{
            title: '损益数量',
            dataIndex: 'adjustQty',
        },{
            title: '损益成本',
            dataIndex: 'adjustCostAmount',
        },{
            title: '商品毛利额',
            dataIndex: 'pdProfit',
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
                currentPage:this.state.currentPage,
                limit:this.state.limit,
                rpDate:this.state.rpDate?(this.state.rpDate+"-01"):"",
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
                currentPage:this.state.currentPage,
                limit:this.state.limit,
                rpDate:this.state.rpDate?(this.state.rpDate+"-01"):"",
                name:this.state.name
            };
            self.getServerData(data);
        })
    }

    //获取数据
    getServerData = (values) =>{
        this.props.dispatch({ type: 'tab/loding', payload:true});
        const result=GetServerData('qerp.web.rp.profit.page',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                this.props.dispatch({ type: 'tab/loding', payload:false});
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

    handleSubmit = (e) =>{
        e.preventDefault();
        const self = this;
        this.props.form.validateFields((err, values) => {
            this.setState({
                name:values.name
            },function(){
                let data = {
                    shopId:this.props.shopId,
                    currentPage:"0",
                    limit:this.state.limit,
                    rpDate:this.state.rpDate?(this.state.rpDate+"-01"):"",
                    name:this.state.name
                }
                self.getServerData(data);
            })
        })
    }

    //导出数据
    exportDatas = () =>{
        let data = {
            shopId:this.props.shopId,
            rpDate:this.state.rpDate?(this.state.rpDate+"-01"):"",
            name:this.state.name
        }
        this.exportData(81,data)
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
            month = "12"
            year = year-1;
        }
        var currentdate = year + seperator1 + month;
        this.setState({
            rpDate:currentdate
        },function(){
            let values = {
                shopId:this.props.shopId,
                currentPage:"0",
                limit:"15",
                rpDate:this.state.rpDate?(this.state.rpDate+"-01"):""
            }
            self.getServerData(values);
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="daily-bill border-top-style">
                <div>
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
                                        <Tooltip title="时间段内商品销售结算金额总和">
                                            销售额&nbsp;<Icon type="exclamation-circle-o"/>
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
                                        <Tooltip title="商品成本*销售数量">
                                            销售成本&nbsp;<Icon type="exclamation-circle-o"/>
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
                                        <Tooltip title="销售额-销售成本">
                                            销售毛利&nbsp;<Icon type="exclamation-circle-o"/>
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
                                <Row>
                                    <div className='serach_form'>
                                        <FormItem
                                        className="monthSelect-input"
                                        label="订单时间"
                                       >
                                            <MonthPicker 
                                            value={this.state.rpDate?moment(this.state.rpDate, dateFormat):null}
                                            format={dateFormat}
                                            onChange={this.dateChange.bind(this)}/>
                                        </FormItem>
                                        <FormItem
                                        label="商品名称"
                                       >
                                        {getFieldDecorator('name')(
                                            <Input  autoComplete="off"/>
                                        )}
                                        </FormItem>
                                    </div>
                                </Row>
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
						onClick={this.exportDatas.bind(this)}
					>
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
                            bordered={true}
                            />
                    </div>   
                </div>
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

const ProfitReport = Form.create()(ProfitReportForm);

export default connect(mapStateToProps)(ProfitReport);