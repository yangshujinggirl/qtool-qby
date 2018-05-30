import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Row,Col} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import {GetServerData} from '../../services/services';
import {timeForMattoday} from '../../utils/meth';
import EditableTable from '../../components/table/tablebasic';
import Appmodelone  from '../ordermd/modal';
import moment from 'moment';
import TableLink from '../../components/table/tablelink';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const confirm = Modal.confirm;

class InventorydiffLogIndexForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[{
                barcode1:'123',
                barcode:'23'
            }],
            total:0,
            currentPage:0,
            limit:15,
            adjustTimeST:"",
            adjustTimeET:"",
            windowHeight:''
        };
        this.columns = [
            {
                title: '商品损益单号',
                dataIndex: 'barcode1',
                render: (text, record) => {
                    return (
                      <TableLink text={text} hindClick={this.editInfo.bind(this,record)} type='1'/>
                    );
                }
            },
            {
                title: '盘点sku数量',
                dataIndex: 'barcode',
            },
            {
                title: '盘点商品数量',
                dataIndex: 'name',
            },
            {
                title: '创建人',
                dataIndex: 'displayName',
            },
            {
                title: '盘点时间',
                dataIndex: 'averageRecPrice',
            }
        ];
    }

    editInfo=(record)=>{
        const spOrderId=String(record.spOrderId)
		const paneitem={title:'订单详情',key:'707000edit'+spOrderId+'infoinventory',data:{spOrderId:spOrderId},componkey:'707000infoinventory'}
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
            self.gethindServerData(data);
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
            self.gethindServerData(data);
        })
    }

    handleSearch = (e) =>{
        const self = this;
        this.props.form.validateFields((err, values) => {
            const data = {
                spShopId:this.props.shopId,
                currentPage:0,
                limit:this.state.limit,
                adjustTimeST:this.state.adjustTimeST,
                adjustTimeET:this.state.adjustTimeET,
                type:2
            }
            self.gethindServerData(data);
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
                                        label="选择时间"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                            <RangePicker 
                                                format={dateFormat}
                                                onChange={this.dateChange.bind(this)} />
                                        </FormItem>
                                        <FormItem
                                        label="订单号"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                        {getFieldDecorator('name3')(
                                            <Input placeholder="请输入商品名称" autoComplete="off"/>
                                        )}
                                        </FormItem>
                                        <FormItem
                                        label="商品名称"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                        {getFieldDecorator('name2')(
                                            <Input placeholder="请输入商品名称" autoComplete="off"/>
                                        )}
                                        </FormItem>
                                        <FormItem
                                        label="商品条码"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                        {getFieldDecorator('name1')(
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
    gethindServerData = (values) =>{
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
    componentDidMount(){
        //获取当前时间
        // this.handleSearch();
    }
}

function mapStateToProps(state){
  	return {};
}

const InventorydiffLogIndex = Form.create()(InventorydiffLogIndexForm);

export default connect(mapStateToProps)(InventorydiffLogIndex);