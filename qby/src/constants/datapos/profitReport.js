import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import EditableTable from '../../components/table/tablebasic';
import moment from 'moment';
import {GetServerData} from '../../services/services';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker,MonthPicker } = DatePicker;
const dateFormat = 'YYYY-MM';

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
            limit:10,
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
        this.setState({
            currentPage:page-1
        });
    }
    onShowSizeChange=(current, pageSize)=>{
        this.setState({
            limit:pageSize,
            currentPage:current-1
        })
    }

    //获取数据
    getServerData = (values) =>{
        let dataList = [
            {
                barcode:"34523201",
                name:"商品1",
                displayName:"小规格",
                pdCategory1:"零食类",
                saleSinglePrice:"23",
                qty:"30",
                amount:"34523.00",
                pdCostAmount:"16",
                sumCostAmount:"18",
                saleProfitAmount:"3",
                saleProfitRate:"6",
                adjustQty:"10",
                adjustCostAmount:"3",
                pdProfit:"23"
            },
            {
                barcode:"34523201",
                name:"商品1",
                displayName:"小规格",
                pdCategory1:"零食类",
                saleSinglePrice:"23",
                qty:"30",
                amount:"34523.00",
                pdCostAmount:"16",
                sumCostAmount:"18",
                saleProfitAmount:"3",
                saleProfitRate:"6",
                adjustQty:"10",
                adjustCostAmount:"3",
                pdProfit:"23"
            },
            {
                barcode:"34523201",
                name:"商品1",
                displayName:"小规格",
                pdCategory1:"零食类",
                saleSinglePrice:"23",
                qty:"30",
                amount:"34523.00",
                pdCostAmount:"16",
                sumCostAmount:"18",
                saleProfitAmount:"3",
                saleProfitRate:"6",
                adjustQty:"10",
                adjustCostAmount:"3",
                pdProfit:"23"
            },
            {
                barcode:"34523201",
                name:"商品1",
                displayName:"小规格",
                pdCategory1:"零食类",
                saleSinglePrice:"23",
                qty:"30",
                amount:"34523.00",
                pdCostAmount:"16",
                sumCostAmount:"18",
                saleProfitAmount:"3",
                saleProfitRate:"6",
                adjustQty:"10",
                adjustCostAmount:"3",
                pdProfit:"23"
            }
        ];
        let  rpProfit={
            amount:"2432.00",
            saleCostAmount:"543.00",
            profitAmount:"223.00"
        };
        this.setState({
            rpProfit:rpProfit
        })
        for(let i=0;i<dataList.length;i++){
            dataList[i].key = i+1;
        }
        this.setState({
            dataSource:dataList,
            total:Number('3'),
            currentPage:Number('0'),
            limit:Number("10")
        })

        const result=GetServerData('qerp.web.rp.profit.page',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                let dataList = ""
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
                    limit:"10",
                    rpDate:this.state.rpDate,
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
            currentPage:"0",
            limit:"10",
            rpDate:this.state.rpDate,
            name:this.state.name
        }
        const result=GetServerData('qerp.qpos.rp.profit.export',data);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){

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
                limit:"10",
                rpDate:this.state.rpDate
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
                                    <p style={{color:"#FB6349"}}><i>¥</i>{this.state.rpProfit.amount.split('.')[0]}<span>.{this.state.rpProfit.amount.split('.')[1]}</span></p>
                                    <span className="explain-span">
                                        <Tooltip title="时间段内商品销售结算金额总和">
                                            销售额&nbsp;<Icon type="exclamation-circle-o"/>
                                        </Tooltip>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <p style={{color:"#F7A303"}}><i>¥</i>{this.state.rpProfit.saleCostAmount.split('.')[0]}<span>.{this.state.rpProfit.saleCostAmount.split('.')[1]}</span></p>
                                    <span className="explain-span">
                                        <Tooltip title="商品成本*销售数量">
                                            销售成本&nbsp;<Icon type="exclamation-circle-o"/>
                                        </Tooltip>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <p style={{color:"#51C193"}}><i>¥</i>{this.state.rpProfit.profitAmount.split('.')[0]}<span>.{this.state.rpProfit.profitAmount.split('.')[1]}</span></p>
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
                    <Form className="search-form">
                        <FormItem
                        label="订单时间"
                        labelCol={{ span: 5 }}
                        wrapperCol={{span: 10}}>
                            <MonthPicker 
                            value={this.state.rpDate?moment(this.state.rpDate, dateFormat):null}
                            format={dateFormat}
                            onChange={this.dateChange.bind(this)}/>
                        </FormItem>
                        <FormItem
                        label="商品名称"
                        labelCol={{ span: 5 }}
                        wrapperCol={{span: 10}}>
                        {getFieldDecorator('name')(
                            <Input/>
                        )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" icon="search" onClick={this.handleSubmit.bind(this)}>搜索</Button>
                        </FormItem>
                        <div className="export-div">
                            <Button className="export-btn" onClick={this.exportList.bind(this)}>导出数据</Button>
                        </div>
                    </Form>
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