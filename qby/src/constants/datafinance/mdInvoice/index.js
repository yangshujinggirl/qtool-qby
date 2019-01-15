import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination,Row, Col} from 'antd';
import { Link } from 'dva/router';
import EditableTable from '../../../components/table/tablebasic';
import {GetServerData} from '../../../services/services';
import {removeSpace} from '../../../utils/meth'
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
            limit:15,
            month:'',
            name:null,
            datalen:'100'
        };
    }

    dateChange = (date, dateString) =>{
        this.setState({
            month:dateString
        })
    }

    //分页变化
    pageChange =(current,limit)=> {
      const currentPage = current - 1;
        this.setState({
            currentPage
        },function(){
          const {inputValues} = this.state;
            let data = {
                currentPage,
                limit:this.state.limit,
                month:this.state.month,
                ...inputValues
            }
            this.getServerData(data)
        });
    }

    //一页条数变化
    onShowSizeChange=(current, limit)=>{
      this.setState({
        limit,
        currentPage:0
      },function(){
        const {inputValues} = this.state;
        const values = {limit,...inputValues}
        this.getServerData(values)
      });
    }
    //导出
    exportData = (type,data) => {
  		const values = {
  			type:76,
        month:this.state.month,
        ...this.state.inputValues
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
			   };
	     })
	    }
      handleSubmit = (e) =>{
        this.props.form.validateFields((err, values) => {
          if (!err) {
            let paramsObj = {
              limit:this.state.limit,
              month:this.state.month,
              ...values
            };
            removeSpace(paramsObj);
            this.getServerData(paramsObj);
            const {limit,..._values} = paramsObj;
            this.setState({
              inputValues:_values
            });
          };
        })
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

        return (
            <div>
                <Form  className='formbox'>
                    <Row gutter={40} className='formbox_row'>
                        <Col span={24} className='formbox_col'>
                            <Row>
                                <div className='serach_form'>
                                    <FormItem label='门店名称'>
                                        {getFieldDecorator('name')(
                                        <Input placeholder="请输入门店名称" autoComplete="off"/>
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
                                            onChange={this.dateChange.bind(this)}
                                            allowClear={false} />
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
      						onClick={this.exportData}
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
                        scroll={{ x: this.state.datalen}}
                        />
                </div>
            </div>
        );
    }

    //获取数据
    getServerData = (values) =>{
        this.props.dispatch({ type: 'tab/loding', payload:true});
        const result=GetServerData('qerp.web.sp.shopdata.query',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            this.props.dispatch({ type: 'tab/loding', payload:false});
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
                    width:300
                },{
                    title: '销售总金额',
                    dataIndex: 'amount',
                     width:120
                },{
                    title: '销售数量',
                    dataIndex: 'salesSumQty',
                    width:120
                },{
                    title: '退货总金额',
                    dataIndex: 'returnAmount',
                     width:120
                },{
                    title: '退货数量',
                    dataIndex: 'refundSumQty',
                    width:120
                }];
                for(var i = 0;i < categoryNames.length; i++){
                    tempcolumns.push({
                      title: categoryNames[i],
                      dataIndex: ['changeName'+i],
                      width:120

                    })
                };
                tempcolumns.push({
                    title: "详细信息",
                    dataIndex:"detailInfo",
                    width:120,
                    render: (text, record, index) => {
                        return <span className={record.url?'theme-color pointer':'placehold-color'} onClick={this.downLoad.bind(this,record)}>下载</span>
                    },
                })
                this.columns = tempcolumns;
                var datalen=0
                for(var i=0;i<this.columns.length;i++){
                    datalen=datalen+Number(this.columns[i].width)
                }

                this.setState({
                    dataSource:dataList,
                    total:Number(json.total),
                    currentPage:Number(json.currentPage),
                    limit:Number(json.limit),
                    datalen:datalen
                })
            }
        })
    }

    downLoad = (record)=>{
        if(record.url){
            window.open(record.url)
        }
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
