import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker,message} from 'antd';
import { connect } from 'dva';
import {GetServerData} from '../../services/services';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class OrderdbSearchForm extends React.Component {
    state = {
        warehouses:[],
        orderstate:[
            {
                value:'待发货',
                key:'1'
            },
            {
                value:'运输中',
                key:'2'
            },
            {
                value:'收货中',
                key:'3'
            },
            {
                value:'已收货',
                key:'4'
            }
        ],
        dateStart1:null,
        dateEnd1:null,
        dateStart2:null,
        dateEnd2:null
    };

    //点击搜索按钮获取搜索表单数据
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            values.dateStart1=this.state.dateStart1
            values.dateEnd1=this.state.dateEnd1
            values.dateStart2=this.state.dateStart2
            values.dateEnd2=this.state.dateEnd2
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
            dateStart1:dateString[0],
            dateEnd1:dateString[1]
        })
    }
    hindDateChange2=(dates,dateString)=>{
        this.setState({
            dateStart2:dateString[0],
            dateEnd2:dateString[1]
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
                                    {getFieldDecorator('outwsWarehouseIdsd')(
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

    componentDidMount(){
        this.wslist();
        this.handleSearch()
    }
}


const OrderdbSearch = Form.create()(OrderdbSearchForm);
export default OrderdbSearch;