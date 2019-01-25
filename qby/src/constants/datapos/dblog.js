import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Row,Col,AutoComplete} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import {GetServerData} from '../../services/services';
import {timeForMattoday} from '../../utils/meth';
import {removeSpace} from '../../utils/meth';
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
            inputValues:{},
            shopId:null,
            dataSource:[],
            dataSources:[],
            datadetail:[{
              barcode1:'123',
              barcode:'23'
            }],
            total:0,
            currentPage:0,
            limit:15,
            exchangeTimeStart:"",
            exchangeTimeEnd:"",
            windowHeight:'',
            dbstate:[{
              name:'待收货',
              key:'10'
            },{
              name:'收货中',
              key:'20'
            },{
              name:'已收货',
              key:'30'
            },{
              name:'已撤销',
              key:'40'
            }]
        };
        this.columns = [
            {
              title: '商品调拨单号',
              dataIndex: 'exchangeNo',
              render: (text, record) => {
                return (
                  <TableLink text={text} hindClick={this.editInfo.bind(this,record)} type="1"/>
                );
              }
            },
            {
              title: '需求门店',
              dataIndex: 'inShopName',
            },
            {
              title: '调拨商品数量',
              dataIndex: 'qtySum',
            },
            {
              title: '调拨总价',
              dataIndex: 'amountSum',
            },
            {
              title: '调拨状态',
              dataIndex: 'statusStr',
            },{
              title: '创建时间',
              dataIndex: 'createTime',
            },{
              title: '门店收货完成时间',
              dataIndex: 'receiveTime'
            }
        ];
    }
    componentDidMount(){
       this.handleSearch();
    }
    handleSearch = (e) =>{
      this.props.form.validateFields((err, values) => {
        values.exchangeTimeStart = this.state.exchangeTimeStart;
        values.exchangeTimeEnd = this.state.exchangeTimeEnd;
        values.limit = this.state.limit;
        values.outShopId = this.props.shopId;
        removeSpace(values);
        this.sendRequest(values);
        const {limit,..._values} = values;
        this.setState({
          inputValues:_values
        });
      })
    }
    //发送请求
    sendRequest =(values)=> {
      this.props.dispatch({ type: 'tab/loding', payload:true});
      const result = GetServerData('qerp.web.sp.exchange.list',values)
      result.then((res) => {
        return res;
      }).then((json) => {
        this.props.dispatch({ type: 'tab/loding', payload:false});
        if(json.code == '0'){
          const dataList = json.exchangeNos;
          for(let i=0;i<dataList.length;i++){
            dataList[i].key = i+1;
          };
          this.setState({
            dataSource:dataList,
            total:Number(json.total),
            currentPage:Number(json.currentPage),
            limit:Number(json.limit)
          });
        };
      })
    }
    editInfo =(record)=> {
		    const paneitem={
          title:'调拨详情',
          key:'707000edit'+record.qposPdExchangeId+'infodb',
          data:{
            outShopId:this.props.shopId,
            qposPdExchangeId:record.qposPdExchangeId,
            exchangeNo:record.exchangeNo
          },componkey:'707000infodb1'
        }
       	this.props.dispatch({
          type:'tab/firstAddTab',
          payload:paneitem
		    })
    }
    dateChange =(date, dateString)=> {
      this.setState({
        exchangeTimeStart:dateString[0],
        exchangeTimeEnd:dateString[1]
      });
    }
    //分页变化
    pageChange =(page,pageSize)=> {
      const {inputValues} = this.state;
      const currentPage = page - 1 ;
      this.setState({
        currentPage
      },function(){
        let data = {
          currentPage,
          limit:this.state.limit,
          outShopId:this.props.shopId,
          exchangeTimeStart:this.state.exchangeTimeStart,
          exchangeTimeEnd:this.state.exchangeTimeEnd,
          ...inputValues
        }
        this.sendRequest(data);
      });
    }
    //每页条数变化
    onShowSizeChange =(current, limit)=> {
      const {inputValues} = this.state;
      this.setState({
        limit
      },function(){
        let data = {
          limit,
          outShopId:this.props.shopId,
          exchangeTimeStart:this.state.exchangeTimeStart,
          exchangeTimeEnd:this.state.exchangeTimeEnd,
          ...inputValues
        }
        this.sendRequest(data);
      });
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
                                        label="调拨时间"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                          <RangePicker
                                                format={dateFormat}
                                                onChange={this.dateChange.bind(this)} />
                                        </FormItem>
                                        <FormItem label="调拨状态">
                                        {getFieldDecorator('status')(
                                            <Select allowClear={true} placeholder="请选择调拨状态">
                                            {
                                                this.state.dbstate.map((item,index)=>{
                                                    return <Option value={String(item.key)} key={index}>{item.name}</Option>
                                                })
                                            }
                                         </Select>
                                        )}
                                        </FormItem>
                                        <FormItem
                                        label="订单号"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                        {getFieldDecorator('exchangeNo')(
                                            <Input placeholder="请输入订单号" autoComplete="off"/>
                                        )}
                                        </FormItem>
                                        <FormItem
                                        label="商品名称"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                        {getFieldDecorator('name')(
                                            <Input placeholder="请输入商品名称" autoComplete="off"/>
                                        )}
                                        </FormItem>
                                        <FormItem
                                        label="商品条码"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                        {getFieldDecorator('code')(
                                            <Input placeholder="请输入商品条码" autoComplete="off"/>
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
}

function mapStateToProps(state){
  	return {};
}

const DbLogIndex = Form.create()(InventorydiffLogIndexForm);

export default connect(mapStateToProps)(DbLogIndex);
