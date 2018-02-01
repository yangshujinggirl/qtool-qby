import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination,Row,Col} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import {GetServerData} from '../../services/services';
// import CommonTable from './commonTable';
import EditableTable from '../../components/table/tablebasic';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD hh:mm:ss';
class ReceiptDetailsForm extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.state={
            dataSource:[],
            total:0,
            currentPage:0,
            limit:15,
            operateST:'',
            operateET:'',
            keywords:'',
            windowHeight:'',
            detailsInfo:{
                "orderNo": "",
                "qtySum": "",
                "receiveQty": "",
                "statusStr": "",
            }
        };
        this.columns = [{
            title: '商品条码',
            dataIndex: 'pdBarcode',
        },{
            title: '商品名称',
            dataIndex: 'pdSpuName',
        },{
            title: '商品规格',
            dataIndex: 'pdSkuType',
        },{
            title: '成本价',
            dataIndex: 'price',
        },{
            title: '预收数量',
            dataIndex: 'qty',
        },{
            title: '已收数量',
            dataIndex: 'receiveQty',
        },{
            title: '差异',
            dataIndex: 'differenceQty',
        },{
            title: '最后收货人',
            dataIndex: 'consignee',
        },{
            title: '最后操作时间',
            dataIndex: 'updateTime',
        }];
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
            currentPage:page-1
        },function(){
            let data = {
                shopId:this.props.shopId,
                pdOrderId:this.props.data.pdOrderId,
                currentPage:this.state.currentPage,
                limit:this.state.limit,
                operateST:this.state.operateST,
                operateET:this.state.operateET,
                keywords:this.state.keywords
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
                pdOrderId:this.props.data.pdOrderId,
                currentPage:this.state.currentPage,
                limit:this.state.limit,
                operateST:this.state.operateST,
                operateET:this.state.operateET,
                keywords:this.state.keywords
            }
            self.getServerData(data);
        })
    }

    //获取数据
    getServerData = (values) =>{
        const result=GetServerData('qerp.web.order.receiveRepDetail',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                let dataList = json.details;
                for(let i=0;i<dataList.length;i++){
                    dataList[i].key = i+1;
                }
                this.setState({
                    dataSource:dataList,
                    total:Number(json.total),
                    currentPage:Number(json.currentPage),
                    limit:Number(json.limit)
                });
            }else{  
                message.error(json.message,.8); 
            }
        })
    }

    handleSubmit = (e) =>{
        const self = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.setState({
                keywords:values.keywords
            },function(){
                let values = {
                    shopId:this.props.data.shopId,
                    pdOrderId:this.props.data.pdOrderId,
                    currentPage:0,
                    limit:this.state.limit,
                    operateST:this.state.operateST,
                    operateET:this.state.operateET,
                    keywords:this.state.keywords
                }
                self.getServerData(values);
            })
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="ph-info">
                <div className="scroll-wrapper">
                    <div className="info-title">
                        配货单信息
                    </div>
                    <div className="info-content">
                        <label>配货单号：</label><span>{this.state.detailsInfo.orderNo}</span>
                        <label>商品总数：</label><span>{this.state.detailsInfo.qtySum}</span>
                        <label>已收商品数量：</label><span>{this.state.detailsInfo.receiveQty}</span>
                        <label>订单状态：</label><span>{this.state.detailsInfo.statusStr}</span>
                    </div>
                    <div className="info-title">
                        商品收货明细
                    </div>
                    {/*搜索部分 */}
                    <Form  className='formbox'>
                        <Row gutter={40} className='formbox_row' style={{marginTop:"20px"}}>
                            <Col span={24} className='formbox_col'>
                                <Row>
                                    <div className='serach_form'>
                                        <FormItem
                                            label="商品名称／条形码"
                                            className="goods-key"
                                           >
                                        {getFieldDecorator('keywords')(
                                            <Input  autoComplete="off"/>
                                        )}
                                        </FormItem>
                                        <FormItem
                                            label="操作时间"
                                           >
                                        {getFieldDecorator('time')(
                                            <RangePicker onChange={this.dateChange.bind(this)} 
                                            format={dateFormat}/>
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
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.setState({
            detailsInfo:this.props.data.details
        })
        if(this.props.data.pdOrderId){
            let values = {
                shopId:this.props.data.shopId,
                pdOrderId:this.props.data.pdOrderId,
                currentPage:0,
                limit:15
            };
            this.getServerData(values);
        }
        //添加
        this.props.dispatch({
            type:'dataposManage/initKey',
            payload: "4"
        })
    }
}

function mapStateToProps(state){
    const {detailInfo,headerInfo,detailId} = state.dataposManage;
    return {detailInfo,headerInfo,detailId};
}

const ReceiptDetails = Form.create()(ReceiptDetailsForm);

export default connect(mapStateToProps)(ReceiptDetails);