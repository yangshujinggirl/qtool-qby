import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Row,Col} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import {GetServerData} from '../../services/services';
import EditableTable from '../../components/table/tablebasic';
import Appmodelone  from '../ordermd/modal';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const confirm = Modal.confirm;

class InventorydiffLogIndexForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            total:0,
            currentPage:0,
            limit:15,
            adjustTimeST:"",
            adjustTimeET:"",
            windowHeight:''
        };
        this.columns = [{
            title: '商品条码',
            dataIndex: 'barcode',
        },{
            title: '商品名称',
            dataIndex: 'name',
        },{
            title: '规格',
            dataIndex: 'displayName',
        },{
            title: '成本价',
            dataIndex: 'averageRecPrice',
        },{
            title: '损益数量',
            dataIndex: 'qty',
        },{
            title: '损益金额',
            dataIndex: 'adjustAmount',
        },{
            title: '操作人',
            dataIndex: 'operater',
        },{
            title: '操作时间',
            dataIndex: 'operateTime',
        }];
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
                type:2
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
                type:2
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
                    type:2
                }
                self.getServerData(data);
            })
        })
    }

    //导出数据
    exportDatas = () =>{
        let data = {
            spShopId:this.props.shopId,
            currentPage:0,
            limit:15,
            adjustTimeST:this.state.adjustTimeST,
            adjustTimeET:this.state.adjustTimeET,
            name:this.state.name,
            type:2
        }
        this.exportData(86,data)
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

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="daily-bill">
                <div className="mb15">
                    {/*搜索部分 */}
                    <Form  className='formbox'>
                        <Row gutter={40} className='formbox_row' style={{marginTop:"20px"}}>
                            <Col span={24} className='formbox_col'>
                                <Row>
                                    <div className='serach_form'>
                                        <FormItem
                                        label="盘点损益时间"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                            <RangePicker 
                                                value={this.state.adjustTimeST?[moment(this.state.adjustTimeST, dateFormat), moment(this.state.adjustTimeET, dateFormat)]:null}
                                                format={dateFormat}
                                                onChange={this.dateChange.bind(this)} />
                                        </FormItem>
                                        <FormItem
                                        label="商品名称"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                        {getFieldDecorator('name')(
                                            <Input placeholder="请输入商品名称" autoComplete="off"/>
                                        )}
                                        </FormItem>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
                            <Button type="primary" htmlType="submit" onClick={this.handleSearch.bind(this)} size='large'>搜索</Button>
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
                </div>
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
        );
    }

    //获取数据
    getServerData = (values) =>{
        this.props.dispatch({ type: 'tab/loding', payload:true});
        const result=GetServerData('qerp.web.qpos.pd.adjust.detail',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                this.props.dispatch({ type: 'tab/loding', payload:false});
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
        let date = new Date();
        let seperator1 = "-";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;

        let date2 = new Date(date);
        date2.setDate(date.getDate() - 30);
        let month1 = date2.getMonth() + 1;
        let strDate1 = date2.getDate();
        if (month1 >= 1 && month1 <= 9) {
            month1 = "0" + month;
        }
        if (strDate1 >= 0 && strDate1 <= 9) {
            strDate1 = "0" + strDate1;
        }
        var currentdate1 = date2.getFullYear() + seperator1 + month1 + seperator1 + strDate1;
        this.setState({
            adjustTimeST:currentdate1,
            adjustTimeET:currentdate
        },function(){
            let values = {
                spShopId:this.props.shopId,
                currentPage:0,
                limit:15,
                adjustTimeST:this.state.adjustTimeST,
                adjustTimeET:this.state.adjustTimeET,
                type:2
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

const InventorydiffLogIndex = Form.create()(InventorydiffLogIndexForm);

export default connect(mapStateToProps)(InventorydiffLogIndex);