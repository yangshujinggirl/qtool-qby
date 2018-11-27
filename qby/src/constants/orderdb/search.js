import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker,message} from 'antd';
import { connect } from 'dva';
import {GetServerData} from '../../services/services';
import moment from 'moment';
import {timeForMat} from '../../utils/meth';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class OrderdbSearchForm extends React.Component {
    state = {
        warehouses:[],
        orderstate:[
            {
                value:'待发货',
                key:'10'
            },
            {
                value:'运输中',
                key:'20'
            },
            {
                value:'收货中',
                key:'30'
            },
            {
                value:'已收货',
                key:'40'
            }
        ],
        createTimeStart:null,
        createTimeEnd:null,
        finishTimeStart:null,
        finishTimeEnd:null
    };
    componentDidMount(){
        this.getNowFormatDate();
        this.wslist();
    }
    getNowFormatDate = () => {
       const startRpDate=timeForMat(30).t2
       const endRpDate=timeForMat(30).t1
       this.setState({
           createTimeStart:startRpDate,
           createTimeEnd:endRpDate
       },function(){
           this.handleSearch();
       });
   }

    //点击搜索按钮获取搜索表单数据
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            values.createTimeStart=this.state.createTimeStart
            values.createTimeEnd=this.state.createTimeEnd
            values.finishTimeStart=this.state.finishTimeStart
            values.finishTimeEnd=this.state.finishTimeEnd
            this.props.OrderdbFormSearch(values)
        });
    }
    //请求仓库列表
    wslist=()=>{
        const values={type:'1'}
        const result=GetServerData('qerp.web.ws.warehouse.all.list',values);
        result.then((res) => {
           return res;
        }).then((json) => {
            if(json.code=='0'){
                const warehouses=json.warehouses
                this.setState({
                    warehouses:warehouses
                })
            }else{
               message.error(json.message,.8);
            }
        })
    }

    hindDateChange1=(dates,dateString)=>{
        this.setState({
            createTimeStart:dateString[0],
            createTimeEnd:dateString[1]
        })
    }
    hindDateChange2=(dates,dateString)=>{
        this.setState({
            finishTimeStart:dateString[0],
            finishTimeEnd:dateString[1]
        })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form  className='formbox'>
                <Row gutter={40} className='formbox_row'>
                    <Col span={24} className='formbox_col'>
                        <Row>
                            <div className='serach_form'>
                                <FormItem label='调拨单号'>
                                    {getFieldDecorator('allocationNo')(
                                    <Input placeholder="请输入调拨单号" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品编码'>
                                    {getFieldDecorator('code')(
                                    <Input placeholder="请输入商品编码" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('spuName')(
                                    <Input placeholder="请输入商品名称" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='调入仓库'>
                                    {getFieldDecorator('callwsWarehouseId')(
                                    <Select allowClear={true} placeholder="请选择调入仓库">
                                    {
                                        this.state.warehouses.map((item,index)=>{
                                            return <Option value={String(item.wsWarehouseId)} key={index}>{item.name}</Option>
                                        })
                                    }
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='调出仓库'>
                                    {getFieldDecorator('outwsWarehouseId')(
                                    <Select allowClear={true} placeholder="请选择调出仓库">
                                    {
                                        this.state.warehouses.map((item,index)=>{
                                            return <Option value={String(item.wsWarehouseId)} key={index}>{item.name}</Option>
                                        })
                                    }
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='订单状态'>
                                    {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择调出仓库">
                                    {
                                        this.state.orderstate.map((item,index)=>{
                                            return <Option value={String(item.key)} key={index}>{item.value}</Option>
                                        })
                                    }
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='下单时间'>
                                    <RangePicker
                                        format="YYYY-MM-DD"
                                        value={this.state.createTimeStart?
                                                [moment(this.state.createTimeStart), moment(this.state.createTimeEnd)]
                                              :null
                                          }
                                        onChange={this.hindDateChange1.bind(this)}
                                    />
                                </FormItem>
                                <FormItem label='发货时间'>
                                    <RangePicker
                                        format="YYYY-MM-DD"
                                        onChange={this.hindDateChange2.bind(this)}
                                    />
                                </FormItem>




                            </div>
                        </Row>
                    </Col>
                </Row>
                <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
                    <Button type="primary" htmlType="submit" size='large' onClick={this.handleSearch.bind(this)}>搜索</Button>
                </div>
            </Form>
        );
    }
}


const OrderdbSearch = Form.create()(OrderdbSearchForm);
export default OrderdbSearch;
