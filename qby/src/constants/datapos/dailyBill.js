import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination,Row, Col} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import EditableTable from '../../components/table/tablebasic';
import {GetServerData} from '../../services/services';
import moment from 'moment';
import Appmodelone from '../ordermd/modal';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const confirm = Modal.confirm;

class DailyBillForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            total:0,
            currentPage:0,
            limit:10,
            startDate:"",
            endDate:"",
            windowHeight:'',
            lastMonthDate:'',
            rpDayAccount:{
                cleanAmount:'',
                amount:'',
                orderSum:'',
                rechargeAmount:''
            }
        };
        this.columns = [{
            title: '订单编号',
            dataIndex: 'orderNo',
        },{
            title: '结算金额',
            dataIndex: 'amount',
        },{
            title: '微信',
            dataIndex: 'wechatAmount',
        },{
            title: '支付宝',
            dataIndex: 'alipayAmount',
        },{
            title: '现金',
            dataIndex: 'cashAmount',
        },{
            title: '银联',
            dataIndex: 'unionpayAmount',
        },{
            title: '会员卡消费',
            dataIndex: 'cardConsumeAmount',
        },{
            title: '积分抵扣',
            dataIndex: 'pointAmount',
        }];
    }

    dateChange = (date, dateString) =>{
        this.setState({
            startDate:dateString[0],
            endDate:dateString[1]
        })
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

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            this.setState({
                type:values.type
            },function(){
                let data = {
                    shopId:this.props.shopId,
                    currentPage:0,
                    limit:10,
                    startDate:this.state.startDate,
                    endDate:this.state.endDate,
                    type:this.state.type
                }
                this.getServerData(data);
            })
        })
    }

    //导出数据
    exportDatas = () =>{
        let data = {
            shopId:this.props.shopId,
            currentPage:0,
            limit:10,
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            type:this.state.type
        }
        this.exportData(80,data)
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



    // setDisabledDate = (current) =>{
    //     return  current+30*24*60*60*1000 && current+30*24*60*60*1000 < moment().endOf('day');
    // }

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
                                <p style={{color:"#FB6349"}}>
                                    <i>¥</i>
                                    {this.state.rpDayAccount.cleanAmount && this.state.rpDayAccount.cleanAmount!="0"?this.state.rpDayAccount.cleanAmount.split('.')[0]:"0"}
                                    <span>.{this.state.rpDayAccount.cleanAmount&&this.state.rpDayAccount.cleanAmount!="0"?this.state.rpDayAccount.cleanAmount.split('.')[1]:"00"}</span>
                                </p>
                                <span className="explain-span">
                                    <Tooltip title="微信+支付宝+现金+银联">
                                        净收款&nbsp;<Icon type="exclamation-circle-o"/>
                                    </Tooltip>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p style={{color:"#F7A303"}}>
                                    <i>¥</i>
                                    {this.state.rpDayAccount.saleAmount&&this.state.rpDayAccount.saleAmount!="0"?this.state.rpDayAccount.saleAmount.split('.')[0]:"0"}
                                    <span>.{this.state.rpDayAccount.saleAmount&&this.state.rpDayAccount.saleAmount!="0"?this.state.rpDayAccount.saleAmount.split('.')[1]:"00"}</span>
                                </p>
                                <span className="explain-span">
                                    <Tooltip title="销售订单金额-退款订单金额">
                                        销售额&nbsp;<Icon type="exclamation-circle-o"/>
                                    </Tooltip>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p style={{color:"#806EC6"}}>
                                {this.state.rpDayAccount.orderQty?this.state.rpDayAccount.orderQty:"0"}
                                </p>
                                <span className="explain-span">
                                    <Tooltip title="销售订单的总数量">
                                        订单量&nbsp;<Icon type="exclamation-circle-o"/>
                                    </Tooltip>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p style={{color:"#51C193"}}>
                                    <i>¥</i>
                                    {this.state.rpDayAccount.rechargeAmount&&this.state.rpDayAccount.rechargeAmount!="0"?this.state.rpDayAccount.rechargeAmount.split('.')[0]:"0"}
                                    <span>
                                    .
                                    {this.state.rpDayAccount.rechargeAmount&&this.state.rpDayAccount.rechargeAmount!="0"?this.state.rpDayAccount.rechargeAmount.split('.')[1]:"00"}
                                    </span>
                                </p>
                                <span className="explain-span">
                                    <Tooltip title="充值订单的总金额">
                                        充值金额&nbsp;<Icon type="exclamation-circle-o"/>
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
                                    label="订单时间">
                                        <RangePicker 
                                            // disabledDate={this.setDisabledDate.bind(this)}
                                            // ranges={{ range: moment["2017-09-01","2017-10-01"] }}     
                                            allowClear={false}
                                            value={this.state.startDate?[moment(this.state.startDate, dateFormat), moment(this.state.endDate, dateFormat)]:null}
                                            format={dateFormat}
                                            onChange={this.dateChange.bind(this)} />
                                    </FormItem>
                                    <FormItem
                                    label="订单分类">
                                    {getFieldDecorator('type')(
                                        <Select allowClear placeholder="请选择订单类型">
                                            <Option value="1">销售订单</Option>
                                            <Option value="2">充值订单</Option>
                                            <Option value="3">退货订单</Option>
                                        </Select>
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

    //获取数据
    getServerData = (values) =>{
        this.props.dispatch({ type: 'tab/loding', payload:true});
        const result=GetServerData('qerp.web.rp.day.account.page',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            this.props.dispatch({ type: 'tab/loding', payload:false});
            if(json.code=='0'){
                let rpDayAccount =json.rpDayAccount;
                let dataList = json.rpDayAccounts;
                if(dataList.length){
                    for(let i=0;i<dataList.length;i++){
                        dataList[i].key = i+1;
                    }
                }
                this.setState({
                    rpDayAccount:rpDayAccount,
                    dataSource:dataList,
                    total:Number(json.total),
                    currentPage:Number(json.currentPage),
                    limit:Number(json.limit)
                })
            }else{  
                message.error(json.message,.8); 
            }
        })
    }

    //获取当前时间
     getNowFormatDate = () =>{
        const self = this;
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var beforeMonth = date.getMonth();
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (beforeMonth >= 1 && beforeMonth <= 9) {
            beforeMonth = "0" + beforeMonth;
        }
        if(beforeMonth == 0){
            beforeMonth = "12"
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        var lastMonthDate = date.getFullYear() + seperator1 + beforeMonth + seperator1 + strDate;
        this.setState({
            startDate:currentdate,
            endDate:currentdate,
            lastMonthDate:lastMonthDate
        },function(){
            let values = {
                shopId:this.props.shopId,
                currentPage:0,
                limit:10,
                startDate:this.state.startDate,
                endDate:this.state.endDate
            }
            self.getServerData(values);
        })
    }

    componentDidMount(){
        //获取当前时间
        this.getNowFormatDate();
    }
}

function mapStateToProps(state){
   return {};
}

const DailyBill = Form.create()(DailyBillForm);

export default connect(mapStateToProps)(DailyBill);