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
const { RangePicker ,MonthPicker} = DatePicker;
const dateFormat = 'YYYY-MM';
const confirm = Modal.confirm;

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
            name:null
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
        },function(){
            let data = {
                currentPage:0,
                limit:10,
                month:this.state.month,
                name:this.state.name
            }
            this.getServerData(data)
        });
    }
    onShowSizeChange=(current, pageSize)=>{
        this.setState({
            limit:pageSize,
            currentPage:current-1
        },function(){
            let data = {
                currentPage:0,
                limit:10,
                month:this.state.month,
                name:this.state.name
            }
            this.getServerData(data)
        })
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

    handleSubmit = (e) =>{
        let data = {
            currentPage:0,
            limit:10,
            month:this.state.month,
            name:this.state.name
        }
        this.getServerData(data)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        var d = new Date()
        var data2=d.getMonth()
        var data1=d.getFullYear()
        if(data2==0){
            data2=12
            data1=d.getFullYear()-1
        }
        const data=String(data1)+'-'+String(data2)
        console.log(this)

        let datas = {
            currentPage:0,
            limit:10,
            month:this.state.month,
            name:this.state.name
        }
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
                                    <MonthPicker  
                                            defaultValue={moment(data, 'YYYY-MM')}
                                            className='noant-calendar-picker'
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
                
                <Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
						onClick={this.exportData.bind(this,76,datas)}
					>
						导出数据
					</Button>
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
                        scroll={{ x: '130%' }}                    
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
        var d = new Date()
        var data2=d.getMonth()
        var data1=d.getFullYear()
        if(data2==0){
            data2=12
            data1=d.getFullYear()-1
        }
        const data=String(data1)+'-'+String(data2)
        this.setState({
            month:data
        },function(){
            const value={
                name:this.state.name,
                month:this.state.month,
                limit:15,
                currentPage:0
            }
            this.getServerData(value)

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