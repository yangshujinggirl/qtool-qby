import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Pagination,Row,Col} from 'antd';
import { Link } from 'dva/router';
import {GetServerData} from '../../services/services';
import '../../style/dataManage.css';
import EditableTable from '../../components/table/tablebasic';
import moment from 'moment';
import {timeForMattoday} from '../../utils/meth';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

//收货报表
class ReceiptReportForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            total:0,
            currentPage:0,
            limit:15,
            operateST:'',
            operateET:'',
            status:'',
            orderNo:''
        };
        this.columns = [{
            title: '配货单号',
            dataIndex: 'orderNo',
            render: (text, record, index) => {
                return (
                    <div onClick={this.toDetailInfo.bind(this,record)} style={{color:"#35BAB0",cursor:"pointer"}}>{text}</div>
                )
            }
        },{
            title: '商品总数',
            dataIndex: 'qtySum',
        },{
            title: '已收商品数量',
            dataIndex: 'receiveQty',
        },{
            title: '订单状态',
            dataIndex: 'statusStr',
        },{
            title: '收货人',
            dataIndex: 'consignee',
        },{
            title: '最后操作时间',
            dataIndex: 'operateTime',
        }];
    }

    toDetailInfo = (record) =>{
        const pdOrderId=String(record.pdOrderId);
        const paneitem={title:'订单详情',key:'703006edit'+pdOrderId+'info',data:{pdOrderId:pdOrderId,shopId:this.props.shopId,details:record},componkey:'703006info'}
        this.props.dispatch({
            type:'tab/firstAddTab',
            payload:paneitem
        })
    }

    toRoute = (record) =>{
        this.props.dispatch({
            type:'dataManage/getDetailId',
            payload: record.pdOrderId
        })
        this.props.dispatch({
            type:'dataManage/syncHeaderInfo',
            payload: record
        })
        this.context.router.push('/dataManage/receiptDetail');
    }

    //获取数据
    getServerData = (values) =>{
        this.props.dispatch({ type: 'tab/loding', payload:true});
        const result=GetServerData('qerp.web.order.receiveRep',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            this.props.dispatch({ type: 'tab/loding', payload:false});
            if(json.code=='0'){
                let dataList = json.pdOrderVos;
                for(let i=0;i<dataList.length;i++){
                    dataList[i].key = i+1;
                }
                this.setState({
                    dataSource:dataList,
                    total:Number(json.total),
                    currentPage:Number(json.currentPage),
                    limit:Number(json.limit)
                })
            }
            
        })
    }
   

    dateChange = (date, dateString) =>{
        this.setState({
            operateST:dateString[0],
            operateET:dateString[1]
        })
    }

    //表格的方法
    pageChange=(page,pageSize)=>{
        const self = this;
        this.setState({
            currentPage:Number(page)-1
        },function(){
            let data = {
                spShopId:this.props.shopId,
                currentPage:this.state.currentPage,
                limit:this.state.limit,
                operateST:this.state.operateST,
                operateET:this.state.operateET,
                status:this.state.status,
                orderNo:this.state.orderNo
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
                spShopId:this.props.shopId,
                currentPage:this.state.currentPage,
                limit:this.state.limit,
                operateST:this.state.operateST,
                operateET:this.state.operateET,
                status:this.state.status,
                orderNo:this.state.orderNo
            }
            self.getServerData(data);
        })
    }

    handleSubmit = (e) =>{
        const self = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.setState({
                status:values.status,
                orderNo:values.orderNo
            },function(){
                let data = {
                    spShopId:this.props.shopId,
                    currentPage:0,
                    limit:this.state.limit,
                    operateST:this.state.operateST,
                    operateET:this.state.operateET,
                    status:this.state.status,
                    orderNo:this.state.orderNo
                };
                self.getServerData(data);
            })
        })
    }

    getNowFormatDate = () =>{
        const self = this;
            let values = {
                spShopId:this.props.shopId,
                currentPage:0,
                limit:15,
                operateST:this.state.operateST,
                operateET:this.state.operateET
            }
            self.getServerData(values);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="receipt-report">
                <div>
                    {/*搜索部分 */}
                    <Form  className='formbox'>
                        <Row gutter={40} className='formbox_row' style={{marginTop:"20px"}}>
                            <Col span={24} className='formbox_col'>
                                <Row>
                                    <div className='serach_form'>
                                        <FormItem
                                        className="operate-time"
                                        label="最近操作时间"
                                       >
                                            <RangePicker 
                                                value={this.state.operateST?[moment(this.state.operateST, dateFormat), moment(this.state.operateET, dateFormat)]:null}
                                                format={dateFormat}
                                                onChange={this.dateChange.bind(this)} />
                                        </FormItem>
                                        <FormItem
                                        label="订单状态"
                                       >
                                        {getFieldDecorator('status')(
                                            <Select allowClear placeholder="请选择订单状态">
                                                <Option value="10">待收货</Option>
                                                <Option value="20">收货中</Option>
                                                <Option value="30">已收货</Option>
                                            </Select>
                                        )}
                                        </FormItem>
                                        <FormItem
                                        className="operate-time"
                                        label="配货单号"
                                        >
                                        {getFieldDecorator('orderNo')(
                                        <Input placeholder="请输入配货单号" autoComplete="off"/>
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
                    {/* <CommonTable 
                        columns={this.columns} 
                        dataSource={this.state.dataSource}
                        pagination={false}
                        total={20}
                        current={1}
                        pageSize={10}
                        onShowSizeChange={this.onShowSizeChange}
                        pageChange={this.pageChange}
                        /> */}
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
ReceiptReportForm.contextTypes= {
    router: React.PropTypes.object
}
const ReceiptReport = Form.create()(ReceiptReportForm);

export default connect(mapStateToProps)(ReceiptReport);

