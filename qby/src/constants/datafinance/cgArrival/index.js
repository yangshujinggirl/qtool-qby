import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination,Row, Col} from 'antd';
import { Link } from 'dva/router';
import EditableTable from '../../../components/table/tablebasic';
import {GetServerData} from '../../../services/services';
import moment from 'moment';
import Appmodelone from '../../ordermd/modal';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const confirm = Modal.confirm;


class CgArrivalIndexForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            inputValues:{},
            dataSource:[],
            total:0,
            currentPage:0,
            limit:15,
            createTimeST:'',
            createTimeET:'',
            searchvalue:null
        };
        this.columns = [{
            title: '供应商名称',
            dataIndex: 'supplierName'
          },{
            title: '到货金额(含税)',
            dataIndex: 'receivedAmount'
          },{
            title: '到货数量',
            dataIndex: 'receivedQty'
          }];
    }

    dateChange = (date, dateString) =>{
        this.setState({
            createTimeST:dateString[0],
            createTimeET:dateString[1]
        })
    }

    //表格的方法
    pageChange=(current,limit)=>{
        const {inputValues} = this.state;
        const currentPage = current - 1;
        const values = {currentPage,limit,...inputValues}
        this.setState({
            currentPage:Number(current)-1,
            limit
        },function(){
            this.searchgetServerData(values)
        });
    }
    onShowSizeChange=(currentPage, limit)=>{
        const {inputValues} = this.state;
        const values = {currentPage,limit,...inputValues}
        this.setState({
            currentPage,
            limit
        },function(){
            this.searchgetServerData(values)
        });
    }
    exportData = (type,data) => {
  		const values = {
  			type:type,
  			downloadParam:data,
  		};
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
     //获取数据
     searchgetServerData = (values) =>{
        values.limit = this.state.limit;
        this.props.dispatch({ type: 'tab/loding', payload:true});
        const result=GetServerData('qerp.web.ws.purchasedata.query',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            this.props.dispatch({ type: 'tab/loding', payload:false});
            if(json.code=='0'){
                let dataList = json.purchasedatas;
                if(dataList.length){
                    for(let i=0;i<dataList.length;i++){
                        dataList[i].key = i+1;
                    };
                };
                this.setState({
                    searchvalue:values,
                    dataSource:dataList,
                    total:Number(json.total),
                    limit:json.limit,
                    currentPage:json.currentPage
                });
            }
        })
    }


    handleSubmit = () =>{
        this.props.form.validateFields((err, values) => {
            values.createTimeST=this.state.createTimeST
            values.createTimeET=this.state.createTimeET
            this.searchgetServerData(values);
            this.setState({
              inputValues:values
            });
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
                                    <FormItem label='供应商名称'>
                                        {getFieldDecorator('supplierName')(
                                            <Input placeholder="请输入供应商名称" autoComplete="off"/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="收货时间"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                        <RangePicker
                                            value={this.state.createTimeST?[moment(this.state.createTimeST, dateFormat),moment(this.state.createTimeET, dateFormat)]:null}
                                            format={dateFormat}
                                            onChange={this.dateChange.bind(this)} />
                                    </FormItem>
                                </div>
                        </Row>
                    </Col>
                </Row>
                <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
                    <Button type="primary"  onClick={this.handleSubmit.bind(this)} size='large'>搜索</Button>
                </div>
                </Form>
                <Button
                    type="primary"
                    size='large'
                    className='mt20'
                    onClick={this.exportData.bind(this,75,this.state.searchvalue)}
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
                        />
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.handleSubmit()
    }
}



const CgArrivalIndex = Form.create()(CgArrivalIndexForm);

export default connect()(CgArrivalIndex);
