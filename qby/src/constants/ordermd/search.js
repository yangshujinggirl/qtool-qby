import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class OrdermdSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateStart: '',
            dateEnd:'',
            deliveryTimeST:'',
            deliveryTimeET:''
      };
    }
  
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
        values.deliveryTimeST=this.state.deliveryTimeST;
        values.deliveryTimeET=this.state.deliveryTimeET;
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
        values.deliveryTimeST=this.state.deliveryTimeST;
        values.deliveryTimeET=this.state.deliveryTimeET;
        
        this.props.dispatch({
            type:'ordermd/synchronous',
            payload:values
        });
    }
    
    //时间搜索部分
    hindDateChange=(type,dates,dateString)=>{
        if(type ==1){
            this.setState({
                dateStart:dateString[0],
                dateEnd:dateString[1]
            })
        }else{
            this.setState({
                deliveryTimeST:dateString[0],
                deliveryTimeET:dateString[1]
            })
        }
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
                                    <Input placeholder="请输入门店名称" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='收货人电话'>
                                    {getFieldDecorator('recTel')(
                                    <Input placeholder="请输入收货人电话" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='收货人'>
                                    {getFieldDecorator('recName')(
                                    <Input placeholder="请输入收货人" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='订单号'>
                                    {getFieldDecorator('orderNo')(
                                    <Input placeholder="请输入订单号" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品编码'>
                                    {getFieldDecorator('code')(
                                    <Input placeholder="请输入商品编码" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('pdSpuName')(
                                    <Input placeholder="请输入商品名称" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='订单状态'>
                                    {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择订单状态">
                                        {/* <Option value='10'>待发货</Option> */}
                                        <Option value='11'>待合单</Option>
                                        <Option value='15'>待分配</Option>
                                        <Option value='16'>待检核</Option>
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
                                    <Select allowClear={true} placeholder="请选择是否预售">
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
                                                value={this.state.dateStart?
                                                        [moment(this.state.dateStart, 'YYYY-MM-DD HH:mm:ss'), moment(this.state.dateEnd, 'YYYY-MM-DD HH:mm:ss')]
                                                        :null
                                                    }
                                                onChange={this.hindDateChange.bind(this,1)}
                                            />
                                        }
                                </FormItem>
                                <FormItem label='发货时间'>
                                        {
                                            <RangePicker
                                                showTime
                                                format="YYYY-MM-DD HH:mm:ss"
                                                onChange={this.hindDateChange.bind(this,2)}
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

     getNowFormatDate = () =>{
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
        let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate+" 23:59:59";

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
        var currentdate1 = date2.getFullYear() + seperator1 + month1 + seperator1 + strDate1 + " 00:00:00";
        this.setState({
            dateStart:currentdate1,
            dateEnd:currentdate
        },function(){
            this.handleSearch();
        })
    }

    componentDidMount(){
        this.getNowFormatDate();
    }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.ordermd;
    return {limit,currentPage};
}


const OrdermdSearch = Form.create()(OrdermdSearchForm);
export default connect(mapStateToProps)(OrdermdSearch);