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
            dataSource:[{
                "barcode":'123456'
            }],
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
            dataIndex: 'barcode',
            render: (text, record) => {
                return (
                  <TableLink text={text} hindClick={this.editInfo.bind(this,record)} type='1'/>
                );
            }
        },{
            title: '损益商品数量',
            dataIndex: 'name',
        },{
            title: '损益类型',
            dataIndex: 'displayName',
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
        const spOrderId=String(record.spOrderId)
		const paneitem={title:'订单详情',key:'707000edit'+spOrderId+'info',data:{spOrderId:spOrderId},componkey:'707000info'}
       	this.props.dispatch({
			type:'tab/firstAddTab',
			payload:paneitem
		})
		// this.props.dispatch({
		// 	type:'ordermd/initsyncDetailList',
		// 	payload:{}
		// })
    }
    showRemark = (record) =>{
        this.setState({
            remarkText:record.remark,
            visible:true
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
        const self = this;
        this.setState({
            currentPage:page-1
        },function(){
            let data = {
                spShopId:this.props.shopId,
                currentPage:this.state.currentPage,
                limit:this.state.limit,
                adjustTimeST:this.state.adjustTimeST,
                adjustTimeET:this.state.adjustTimeET,
                name:this.state.name,
                type:1
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
                adjustTimeST:this.state.adjustTimeST,
                adjustTimeET:this.state.adjustTimeET,
                name:this.state.name,
                type:1
            }
            self.getServerData(data);
        })
    }

    handleSearch = (e) =>{
        const self = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.setState({
                name:values.name
            },function(){
                let data = {
                    spShopId:this.props.shopId,
                    currentPage:0,
                    limit:this.state.limit,
                    adjustTimeST:this.state.adjustTimeST,
                    adjustTimeET:this.state.adjustTimeET,
                    name:this.state.name,
                    type:1
                }
                self.getServerData(data);
            })
        })
    }

    //导出数据
    exportDatas = () =>{
        let data = {
            spShopId:this.props.shopId,
            adjustTimeST:this.state.adjustTimeST,
            adjustTimeET:this.state.adjustTimeET,
            name:this.state.name,
            type:1
        }
        this.exportData(85,data)
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

    //改变visible
    changeVisible = () =>{
        this.setState({
            visible:false
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
                                            value={this.state.adjustTimeST?
                                                    [moment(this.state.adjustTimeST, dateFormat), moment(this.state.adjustTimeET, dateFormat)]
                                                    :null
                                                }
                                            format={dateFormat}
                                            onChange={this.dateChange.bind(this)} />
                                </FormItem>
                                <FormItem
                                    label="损益类型"
                                    >
                                    {getFieldDecorator('tyoe')(
                                       <Select allowClear placeholder="请选择损益类型">
                                            <Option value="1">店铺活动赠品</Option>
                                            <Option value="2">仓储快递损坏</Option>
                                            <Option value="3">商品丢失损坏</Option>
                                            <Option value="4">盘点差异调整</Option>
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
                {/* <Button 
						type="primary" 
						size='large'
						className='mt20'
						onClick={this.exportDatas.bind(this)}
					>
						导出数据
					</Button> */}
                <RemarkText visible={this.state.visible} changeVisible={this.changeVisible.bind(this)}
                            remarkText={this.state.remarkText}/>
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
        const result=GetServerData('qerp.web.qpos.pd.adjust.detail',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            this.props.dispatch({ type: 'tab/loding', payload:false});
            if(json.code=='0'){
                let dataList = json.adjustSpus;
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
    }

    //获取当前时间
    getNowFormatDate = () =>{
        const self = this;
        const startRpDate=timeForMattoday(30).t2
        const endRpDate=timeForMattoday(30).t1
        this.setState({
            adjustTimeST:startRpDate,
            adjustTimeET:endRpDate
        },function(){
            let values = {
                spShopId:this.props.shopId,
                currentPage:0,
                limit:15,
                adjustTimeST:this.state.adjustTimeST,
                adjustTimeET:this.state.adjustTimeET,
                type:1
            }
            self.getServerData(values);  
        })
    }

    componentDidMount(){
        //获取当前时间
        // this.getNowFormatDate();
    }
}



const AdjustLogIndex = Form.create()(AdjustLogIndexForm);

export default connect()(AdjustLogIndex);