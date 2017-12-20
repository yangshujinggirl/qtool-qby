import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class OrdermdSearchForm extends React.Component {
  state = {
        dateStart: undefined,
        dateEnd:undefined
  };

  //点击搜索按钮获取搜索表单数据
  handleSearch = (e) => {
    this.props.form.validateFields((err, values) => {
        this.initList(values,this.props.limit,0);
        this.syncState(values);
    });
  }


  //搜索请求数据
  initList=(values,limit,currentPage)=>{
        values.dateStart=this.state.dateStart;
        values.dateEnd=this.state.dateEnd;
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'ordermd/fetch',
            payload:{code:'qerp.web.sp.order.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        values.dateStart=this.state.dateStart;
        values.dateEnd=this.state.dateEnd;
        this.props.dispatch({
            type:'ordermd/synchronous',
            payload:values
        });
    }
    
    //时间搜索部分
    hindDateChange=(dates, dateString)=>{
        this.setState({
            dateStart:dateString[0],
            dateEnd:dateString[1]
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
                                <FormItem label='门店名称'>
                                    {getFieldDecorator('shopName')(
                                    <Input placeholder="请输入门店名称"/>
                                    )}
                                </FormItem>
                                <FormItem label='收货人电话'>
                                    {getFieldDecorator('recTel')(
                                    <Input placeholder="请输入收货人电话"/>
                                    )}
                                </FormItem>
                                <FormItem label='收货人'>
                                    {getFieldDecorator('recName')(
                                    <Input placeholder="请输入收货人"/>
                                    )}
                                </FormItem>
                                <FormItem label='订单号'>
                                    {getFieldDecorator('orderNo')(
                                    <Input placeholder="请输入订单号"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品编码'>
                                    {getFieldDecorator('code')(
                                    <Input placeholder="请输入商品编码"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('pdSpuName')(
                                    <Input placeholder="请输入商品名称"/>
                                    )}
                                </FormItem>
                                <FormItem label='订单状态'>
                                    {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择订单状态">
                                        <Option value='10'>待发货</Option>
                                        <Option value='20'>已发货</Option>
                                        <Option value='30'>已取消</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='订单类型'>
                                    {getFieldDecorator('type')(
                                    <Select allowClear={true} placeholder="请选择订单类型">
                                        <Option value='10'>门店</Option>
                                        <Option value='11'>直邮</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='订单来源'>
                                    {getFieldDecorator('source')(
                                    <Select allowClear={true} placeholder="请选择订单来源">
                                        <Option value='1'>Q掌柜</Option>
                                        <Option value='2'>Q本营</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='预售订单'>
                                    {getFieldDecorator('preSellStatus')(
                                    <Select allowClear={true} placeholder="请选择">
                                        <Option value='1'>是</Option>
                                        <Option value='0'>否</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='下单时间'>
                                        {
                                            <RangePicker
                                                showTime
                                                format="YYYY-MM-DD HH:mm:ss"
                                                onChange={this.hindDateChange.bind(this)}
                                            />
                                        }
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
        
    }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.ordermd;
    return {limit,currentPage};
}


const OrdermdSearch = Form.create()(OrdermdSearchForm);
export default connect(mapStateToProps)(OrdermdSearch);