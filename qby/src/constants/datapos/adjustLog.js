import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination,Row,Col} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import EditableTable from '../../components/table/tablebasic';
import {GetServerData} from '../../services/services';
import moment from 'moment';
import Appmodelone  from '../ordermd/modal';
import RemarkText from './remarkModal';
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
            dataIndex: 'diffQty',
        },{
            title: '损益金额',
            dataIndex: 'adjustAmount',
        },{
            title: '操作人',
            dataIndex: 'operater',
        },{
            title: '操作时间',
            dataIndex: 'operateTime',
        },{
            title: '损益备注',
            dataIndex: 'remark',
            render: (text, record, index) => {
                return (
                    <span style={{color:"#35BAB0",cursor:"pointer"}} onClick={this.showRemark.bind(this,record)}>查看</span>
                )
            }
        }];
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
                                    label="商品名称"
                                    >
                                    {getFieldDecorator('name')(
                                        <Input autoComplete="off"/>
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
                <Button 
						type="primary" 
						size='large'
						className='mt20'
						onClick={this.exportDatas.bind(this)}
					>
						导出数据
					</Button>
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
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        this.setState({
            adjustTimeST:currentdate,
            adjustTimeET:currentdate
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
        this.getNowFormatDate();
    }
}

function mapStateToProps(state){
   return {};
}

const AdjustLogIndex = Form.create()(AdjustLogIndexForm);

export default connect(mapStateToProps)(AdjustLogIndex);