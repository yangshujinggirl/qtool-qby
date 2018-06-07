import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination,Row,Col} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import EditableTable from '../../components/table/tablebasic';
import {GetServerData} from '../../services/services';
import {timeForMattoday} from '../../utils/meth';
import moment from 'moment';
import Appmodelone  from '../ordermd/modal';
import RemarkText from './remarkModal';
import TableLink from '../../components/table/tablelink';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const confirm = Modal.confirm;

class AdjustLogIndexForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            total:0,
            currentPage:0,
            limit:15,
            adjustTimeST:"",
            adjustTimeET:"",
            visible:false,
            remarkText:'',
            windowHeight:''
        };
        this.columns = [{
            title: '商品损益单号',
            dataIndex: 'adjustNo',
            render: (text, record) => {
                return (
                  <TableLink text={text} hindClick={this.editInfo.bind(this,record)} type='1'/>
                );
            }
        },{
            title: '损益商品数量',
            dataIndex: 'qty',
        },{
            title: '损益类型',
            dataIndex: 'typeStr',
        },{
            title: '创建人',
            dataIndex: 'operater',
        },{
            title: '损益时间',
            dataIndex: 'operateTime',
        }];
    }

    //跳转
    editInfo=(record)=>{
        const adjustId=String(record.adjustId)
		const paneitem={title:'订单详情',key:'707000edit'+adjustId+'info',data:{id:adjustId,adjustNo:record.adjustNo,qty:record.qty,typeStr:record.typeStr,operater:record.operater,operateTime:record.operateTime,remark:record.remark},componkey:'707000info'}
       	this.props.dispatch({
			type:'tab/firstAddTab',
			payload:paneitem
		})
    }

    dateChange = (date, dateString) =>{
        this.setState({
            adjustTimeST:dateString[0],
            adjustTimeET:dateString[1]
        })
    }

    //表格的方法
    pageChange=(page,pageSize)=>{
        this.setState({
            limit:pageSize,
            currentPage:Number(page)-1
        },function(){
            this.handleSearch()
        })
    }
    onShowSizeChange=(current, pageSize)=>{
        const self = this;
        this.setState({
            limit:pageSize,
            currentPage:0
        },function(){
            this.handleSearch()
        })
    }

    handleSearch = (e) =>{
        this.props.form.validateFields((err, values) => {
            values.adjustTimeST=this.state.adjustTimeST
            values.adjustTimeET=this.state.adjustTimeET
            values.limit=this.state.limit
            values.currentPage=this.state.currentPage
            values.spShopId=this.props.spShopId
            this.props.dispatch({ type: 'tab/loding', payload:true});
            const result=GetServerData('qerp.web.qpos.pd.adjust.detail',values)
            result.then((res) => {
                return res;
            }).then((json) => {
                this.props.dispatch({ type: 'tab/loding', payload:false});
                if(json.code=='0'){
                    const dataList = json.adjustSpus;
                    for(let i=0;i<dataList.length;i++){
                        dataList[i].key = i+1;
                    };
                    this.setState({
                        dataSource:dataList,
                        total:Number(json.total),
                        currentPage:Number(json.currentPage),
                        limit:Number(json.limit)
                    })
                }
            })
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="daily-bill border-top-style">
                <div> 
                {/*搜索部分 */}
                <Form  className='formbox'>
                    <Row gutter={40} className='formbox_row' style={{marginTop:"20px"}}>
                        <Col span={24} className='formbox_col'>
                            <Row>
                                <div className='serach_form'>
                                <FormItem
                                    label="损益时间"
                                    >
                                        <RangePicker 
                                            format={dateFormat}
                                            onChange={this.dateChange.bind(this)} />
                                </FormItem>
                                <FormItem
                                    label="损益类型"
                                    >
                                    {getFieldDecorator('type')(
                                       <Select allowClear placeholder="请选择损益类型">
                                            <Option value="3">店铺活动赠品</Option>
                                            <Option value="4">仓储快递损坏</Option>
                                            <Option value="1">商品丢失损坏</Option>
                                            <Option value="2">盘点差异调整</Option>
                                            <Option value="5">过期商品处理</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="订单号"
                                    >
                                    {getFieldDecorator('name12')(
                                        <Input placeholder="请输入订单号" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="商品名称"
                                    >
                                    {getFieldDecorator('name')(
                                        <Input placeholder="请输入商品名称" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="商品条码"
                                    >
                                    {getFieldDecorator('name')(
                                        <Input placeholder="请输入商品条码" autoComplete="off"/>
                                    )}
                                </FormItem>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
                        <Button type="primary"  onClick={this.handleSearch.bind(this)} size='large'>搜索</Button>
                    </div>
                </Form>
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
        //获取当前时间
        this.handleSearch();
    }
}



const AdjustLogIndex = Form.create()(AdjustLogIndexForm);

export default connect()(AdjustLogIndex);