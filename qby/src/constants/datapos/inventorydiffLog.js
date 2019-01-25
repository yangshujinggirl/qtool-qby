import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Row,Col} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import {GetServerData} from '../../services/services';
import {removeSpace} from '../../utils/meth';
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
            windowHeight:'',
            inputValues:{}
        };
        this.columns = [
            {
                title: '商品盘点单号',
                dataIndex: 'checkNo',
                render: (text, record) => {
                    return (
                      <TableLink text={text} hindClick={this.editInfo.bind(this,record)} type='1'/>
                    );
                }
            },
            {
                title: '盘点sku数量',
                dataIndex: 'skuSum',
            },
            {
                title: '盘点商品数量',
                dataIndex: 'qty',
            },
            {
                title: '创建人',
                dataIndex: 'operater',
            },
            {
                title: '盘点时间',
                dataIndex: 'operateTime',
            }
        ];
    }
    componentDidMount(){
      this.handleSearch();
    }
    handleSearch = (e) =>{
      this.props.form.validateFields((err, values) => {
        values.checkTimeST = this.state.checkTimeStart;
        values.checkTimeET = this.state.checkTimeEnd;
        values.limit = this.state.limit;
        removeSpace(values);
        this.sendRequest(values);
        const {limit,..._values} = values;
        this.setState({
          inputValues:_values
        });
        console.log(_values)
      });
    }
    sendRequest =(values)=> {
      let params = {
        shopId:this.props.shopId,
        ...values
      };
      this.props.dispatch({ type: 'tab/loding', payload:true});
      const result = GetServerData('qerp.web.pd.check.query',params);
      result.then((res) => {
          return res;
      }).then((json) => {
        if(json.code=='0'){
          this.props.dispatch({ type: 'tab/loding', payload:false});
          const checkNos = json.checkNos;
          for(let i=0;i<checkNos.length;i++){
              checkNos[i].key = i+1;
          };
          this.setState({
            dataSource:checkNos,
            total:Number(json.total),
            currentPage:Number(json.currentPage),
            limit:Number(json.limit)
          });
        };
      })
    }
    //页数发生变化
    pageChange =(page,limit)=> {
      const currentPage = page - 1;
      const values = {
        currentPage,
        limit:this.state.limit,
        ...this.state.inputValues
      };
      this.setState({
        currentPage,
      },function(){
          this.sendRequest(values);
      });
    }
    //每页条数发生变化
    onShowSizeChange =(current,limit)=> {
        const values = {limit,...this.state.inputValues};
        this.setState({
            limit,
        },function(){
            this.sendRequest(values)
        })
    }
    editInfo=(record)=>{
      const paneitem = {
        title:'盘点详情',
        key:'707000edit'+record.checkId+'infoinventory',
        data:{
          id:record.checkId,
          checkNo:record.checkNo,
          skuSum:record.skuSum,
          qty:record.qty,
          operater:record.operater,
          operateTime:record.operateTime
        },
        componkey:'707000infoinventory'
      };
      this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
      });
    }
    dateChange = (date, dateString) =>{
      this.setState({
        checkTimeStart:dateString[0],
        checkTimeEnd:dateString[1]
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
                                        {getFieldDecorator('checkNo')(
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
                                        {getFieldDecorator('barcode')(
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

const InventorydiffLogIndex = Form.create()(InventorydiffLogIndexForm);

export default connect()(InventorydiffLogIndex);
