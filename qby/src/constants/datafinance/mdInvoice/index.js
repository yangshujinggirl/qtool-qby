import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination,Row, Col} from 'antd';
import { Link } from 'dva/router';
import EditableTable from '../../../components/table/tablebasic';
import {GetServerData} from '../../../services/services';
import moment from 'moment';
import Appmodelone from "../../ordermd/modal";
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM';

class MdInvoiceIndexForm extends React.Component {
    constructor(props) {
        super(props);
        this.columns=[];
        this.state={
            dataSource:[],
            total:0,
            currentPage:0,
            limit:10,
            month:'',
            exportData:{}
        };
    }

    dateChange = (date, dateString) =>{
        this.setState({
            month:dateString
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
        const self = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.setState({
                name:values.name
            },function(){
                let data = {
                    currentPage:0,
                    limit:10,
                    month:this.state.month,
                    name:this.state.name
                }
                this.setState({
                    exportData:data
                });
                self.getServerData(data);
            })
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form  className='formbox'>
                    <Row gutter={40} className='formbox_row'>
                        <Col span={24} className='formbox_col'>
                            <Row>
                                <div className='serach_form'>
                                    <FormItem label='商品名称'>
                                        {getFieldDecorator('name')(
                                        <Input placeholder="请输入商品名称"/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="选择时间"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                        <DatePicker  
                                            value={this.state.month?moment(this.state.month, dateFormat):null}
                                            format={dateFormat}
                                            onChange={this.dateChange.bind(this)} />
                                    </FormItem>
                                </div>
                        </Row>
                    </Col>
                </Row>
                <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)} size='large'>搜索</Button>
                </div>
                </Form>
                {/* 导出 */}
                <Appmodelone 
						text="导出数据" 
						title="导出数据" 
						count="数据已经进入导出队列，请前往下载中心查看导出进度"
						okText="去看看"
						cancelText="稍后去"
						dataValue={this.state.exportData}
						type="76"
						/>
                {/* <Button 
						type="primary" 
						size='large'
						className='mt20'
						onClick={this.exportData}
					>
                        导出数据
				</Button> */}
                <div className='mt15'>
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

    //获取数据
    getServerData = (values) =>{
        const result=GetServerData('qerp.web.sp.shopdata.query',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                let dataList = json.shopdatas;
                let categoryNames = json.categoryNames;
                if(dataList.length){
                    for(let i=0;i<dataList.length;i++){
                        dataList[i].key = i+1;
                        for(var j = 0;j < dataList[i].categoryAmounts.length; j++){
                            dataList[i]['changeName'+j] = dataList[i].categoryAmounts[j];
                        }
                    }
                }
                let tempcolumns = [{
                    title: '门店名称',
                    dataIndex: 'name',
                },{
                    title: '销售总金额',
                    dataIndex: 'amount'
                },{
                    title: '销售数量',
                    dataIndex: 'salesSumQty'
                },{
                    title: '退货总金额',
                    dataIndex: 'returnAmount'
                },{
                    title: '退货数量',
                    dataIndex: 'refundSumQty'
                }];
                for(var i = 0;i < categoryNames.length; i++){
                    tempcolumns.push({
                      title: categoryNames[i],
                      dataIndex: ['changeName'+i]
                    })
                };
                tempcolumns.push({
                    title: "详细信息",
                    dataIndex:"detailInfo",
                    render: (text, row, index) => {
                        return <span style={{color:"#35BAB0"}} onClick={this.downLoad.bind(this,row)}>下载</span>
                    },
                })
                this.columns = tempcolumns;

                this.setState({
                    dataSource:dataList,
                    total:Number(json.total),
                    currentPage:Number(json.currentPage),
                    limit:Number(json.limit)
                })
            }
        })
    }

    downLoad = (row)=>{
        console.log(row);
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
        var currentdate = date.getFullYear() + seperator1 + month;
        this.setState({
            month:currentdate,
        },function(){
            let values = {
                currentPage:0,
                limit:10,
                month:this.state.month,
            }
            this.setState({
                exportData:values
            })
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

const MdInvoiceIndex = Form.create()(MdInvoiceIndexForm);

export default connect(mapStateToProps)(MdInvoiceIndex);