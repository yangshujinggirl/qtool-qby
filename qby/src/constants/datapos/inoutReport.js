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

//进销存报表
class InOutReportForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            inventory:{
                finalInvSumAmount:"",//#String 期末库存总成本
                invSumAmount:"",//#String 期初库存总成本
                recSumAmount:"",//#String 收货总成本
                saleSumCostAmount:"",//#String 销售总成本
                adjustSumCostAmount:"",//#String 损益总成本
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
            title: '损益数量',
            dataIndex: 'adjustQty',
        },{
            title: '损益成本',
            dataIndex: 'adjustCostAmount',
        },{
            title: '盘点损益数',
            dataIndex: 'checkQty',
        },{
            title: '盘点损益成本',
            dataIndex: 'checkAmount',
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
                barcode:"42104", //#String 商品条码
                name:"我是商品1",//#String 商品名称
                displayName:"500ml",//#String 商品规格
                pdCategory1:"食品类",//#String 商品分类
                qty:"20",//#String 期初库存数量
                invAmount:"10",//#String 期初库存成本
                recQty:"50",//#String 收货数量
                recAmount:"20",//#String 收货成本
                posQty:"30",//#String 销售数量
                sumCostAmount:"30",//#String销售成本
                adjustQty:"2",//#String损益数量
                adjustCostAmount:"20",//#String损益成本
                checkQty:"10",//#String 盘点损益数
                checkAmount:"20",//#String 盘点损益成本
                finalQty:"30",//#String 期末库存数量
                finalInvAmount:"20",//#String 期末库存成本
            },
            {
                barcode:"42104", //#String 商品条码
                name:"我是商品1",//#String 商品名称
                displayName:"500ml",//#String 商品规格
                pdCategory1:"食品类",//#String 商品分类
                qty:"20",//#String 期初库存数量
                invAmount:"10",//#String 期初库存成本
                recQty:"50",//#String 收货数量
                recAmount:"20",//#String 收货成本
                posQty:"30",//#String 销售数量
                sumCostAmount:"30",//#String销售成本
                adjustQty:"2",//#String损益数量
                adjustCostAmount:"20",//#String损益成本
                checkQty:"10",//#String 盘点损益数
                checkAmount:"20",//#String 盘点损益成本
                finalQty:"30",//#String 期末库存数量
                finalInvAmount:"20",//#String 期末库存成本
            },
            {
                barcode:"42104", //#String 商品条码
                name:"我是商品1",//#String 商品名称
                displayName:"500ml",//#String 商品规格
                pdCategory1:"食品类",//#String 商品分类
                qty:"20",//#String 期初库存数量
                invAmount:"10",//#String 期初库存成本
                recQty:"50",//#String 收货数量
                recAmount:"20",//#String 收货成本
                posQty:"30",//#String 销售数量
                sumCostAmount:"30",//#String销售成本
                adjustQty:"2",//#String损益数量
                adjustCostAmount:"20",//#String损益成本
                checkQty:"10",//#String 盘点损益数
                checkAmount:"20",//#String 盘点损益成本
                finalQty:"30",//#String 期末库存数量
                finalInvAmount:"20",//#String 期末库存成本
            },
            {
                barcode:"42104", //#String 商品条码
                name:"我是商品1",//#String 商品名称
                displayName:"500ml",//#String 商品规格
                pdCategory1:"食品类",//#String 商品分类
                qty:"20",//#String 期初库存数量
                invAmount:"10",//#String 期初库存成本
                recQty:"50",//#String 收货数量
                recAmount:"20",//#String 收货成本
                posQty:"30",//#String 销售数量
                sumCostAmount:"30",//#String销售成本
                adjustQty:"2",//#String损益数量
                adjustCostAmount:"20",//#String损益成本
                checkQty:"10",//#String 盘点损益数
                checkAmount:"20",//#String 盘点损益成本
                finalQty:"30",//#String 期末库存数量
                finalInvAmount:"20",//#String 期末库存成本
            }
        ];
        let  inventory={
            finalInvSumAmount:"54348.00",//#String 期末库存总成本
            invSumAmount:"54242.00",//#String 期初库存总成本
            recSumAmount:"59342.00",//#String 收货总成本
            saleSumCostAmount:"4342.00",//#String 销售总成本
            adjustSumCostAmount:"5432.00",//#String 损益总成本
        };
        for(let i=0;i<dataList.length;i++){
            dataList[i].key = i+1;
        };
        this.setState({
            inventory:inventory,
            dataSource:dataList,
            total:Number('3'),
            currentPage:Number('0'),
            limit:Number("10")
        });

        const result=GetServerData('qerp.web.rp.inventory.page',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                console.log('进销存报表数据请求成功');
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
                    limit:10,
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
            currentPage:0,
            limit:10,
            rpDate:this.state.rpDate,
            name:this.state.name
        }
        const result=GetServerData('qerp.web.rp.inventory.export',data);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){

            }else{  
                message.error(json.message); 
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
                limit:10,
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
                    <div className="top-data inout-data">
                        <ul>
                            <li>
                                <div>
                                    <p style={{color:"#806EC6"}}><i>¥</i>{this.state.inventory.finalInvSumAmount.split('.')[0]}<span>.{this.state.inventory.finalInvSumAmount.split('.')[1]}</span></p>
                                    <span className="explain-span">
                                        <Tooltip title="期初库存总成本+进货总成本-销售总成本-损益总成本">
                                            期末库存总成本&nbsp;<Icon type="exclamation-circle-o"/>
                                        </Tooltip>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <p style={{color:"#F4A314"}}><i>¥</i>{this.state.inventory.invSumAmount.split('.')[0]}<span>.{this.state.inventory.invSumAmount.split('.')[1]}</span></p>
                                    <span className="explain-span">
                                        <Tooltip title="期初库存总数量*期初商品移动总成本">
                                            期末库存总成本&nbsp;<Icon type="exclamation-circle-o"/>
                                        </Tooltip>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <p style={{color:"#0D89C8"}}><i>¥</i>{this.state.inventory.recSumAmount.split('.')[0]}<span>.{this.state.inventory.recSumAmount.split('.')[1]}</span></p>
                                    <span className="explain-span">
                                        <Tooltip title="收货总数量*收货商品移动总成本">
                                            收货总成本&nbsp;<Icon type="exclamation-circle-o"/>
                                        </Tooltip>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <p style={{color:"#51C193"}}><i>¥</i>{this.state.inventory.saleSumCostAmount.split('.')[0]}<span>.{this.state.inventory.saleSumCostAmount.split('.')[1]}</span></p>
                                    <span className="explain-span">
                                        <Tooltip title="销售总数量*销售商品移动总成本">
                                            销售总成本&nbsp;<Icon type="exclamation-circle-o"/>
                                        </Tooltip>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <p style={{color:"#F24343"}}><i>¥</i>{this.state.inventory.adjustSumCostAmount.split('.')[0]}<span>.{this.state.inventory.adjustSumCostAmount.split('.')[1]}</span></p>
                                    <span className="explain-span">
                                    <Tooltip title="损益总数量*损益商品移动总成本">
                                        损益成本&nbsp;<Icon type="exclamation-circle-o"/>
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

const InOutReport = Form.create()(InOutReportForm);

export default connect(mapStateToProps)(InOutReport);