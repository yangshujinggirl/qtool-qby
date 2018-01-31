import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import {timeForMats} from '../../utils/meth';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class OrderposSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            endTime:'',
      };
    }

    //点击搜索按钮获取搜索表单数据
    handleSearch = () => {
        this.props.form.validateFields((err, values) => {
            this.initList(values,this.props.limit,0);
            this.syncState(values);
        });
    }

    //搜索请求数据
    initList=(values,limit,currentPage)=>{
        values.startTime=this.state.startTime;
        values.endTime=this.state.endTime;
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'orderpos/fetch',
            payload:{code:'qerp.web.qpos.st.order.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        values.startTime=this.state.startTime;
        values.endTime=this.state.endTime;
        this.props.dispatch({
            type:'orderpos/synchronous',
            payload:values
        });
    }
    
    //时间搜索部分
    hindDateChange=(dates,dateString)=>{
        this.setState({
            startTime:dateString[0],
            endTime:dateString[1]
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
                                    {getFieldDecorator('spShopName')(
                                    <Input placeholder="请输入门店名称" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='订单号'>
                                    {getFieldDecorator('orderNo')(
                                    <Input placeholder="请输入订单号" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('pdSpuName')(
                                    <Input placeholder="请输入商品名称" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品编码'>
                                    {getFieldDecorator('code')(
                                    <Input placeholder="请输入商品编码" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='订单类型'>
                                    {getFieldDecorator('orderType')(
                                    <Select allowClear={true} placeholder="请选择订单类型">
                                        <Option value='1'>销售订单</Option>
                                        <Option value='3'>退货订单</Option>
                                        <Option value='2'>会员充值</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='订单时间'>
                                        {
                                            <RangePicker
                                                showTime
                                                format="YYYY-MM-DD HH:mm:ss"
                                                value={this.state.startTime?
                                                        [moment(this.state.startTime, 'YYYY-MM-DD HH:mm:ss'), moment(this.state.endTime, 'YYYY-MM-DD HH:mm:ss')]
                                                        :null
                                                    }
                                                onChange={this.hindDateChange.bind(this,1)}
                                            />
                                        }
                                </FormItem>
                            </div>
                        </Row>
                    </Col>
                </Row>
                <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
                    <Button type="primary" size='large' htmlType="submit" onClick={this.handleSearch.bind(this)}>搜索</Button>
                </div>
            </Form>
        );
    }

     getNowFormatDate = () =>{
        const self = this;
        const startRpDate=timeForMats(30).t2
        const endRpDate=timeForMats(30).t1
        this.setState({
            startTime:startRpDate,
            endTime:endRpDate
        },function(){
            this.handleSearch();
        })


        // let date = new Date();
        // let seperator1 = "-";
        // let month = date.getMonth() + 1;
        // let strDate = date.getDate();
        // if (month >= 1 && month <= 9) {
        //     month = "0" + month;
        // }
        // if (strDate >= 0 && strDate <= 9) {
        //     strDate = "0" + strDate;
        // }
        // let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate+" 23:59:59";

        // let date2 = new Date(date);
        // date2.setDate(date.getDate() - 30);
        // let month1 = date2.getMonth() + 1;
        // let strDate1 = date2.getDate();
        // if (month1 >= 1 && month1 <= 9) {
        //     month1 = "0" + month;
        // }
        // if (strDate1 >= 0 && strDate1 <= 9) {
        //     strDate1 = "0" + strDate1;
        // }
        // var currentdate1 = date2.getFullYear() + seperator1 + month1 + seperator1 + strDate1 + " 00:00:00";
        // this.setState({
        //     startTime:currentdate1,
        //     endTime:currentdate
        // },function(){
        //     this.handleSearch();
        // })
    }

    componentDidMount(){
        this.getNowFormatDate();
    }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.orderpos;
    return {limit,currentPage};
}


const OrderposSearch = Form.create()(OrderposSearchForm);
export default connect(mapStateToProps)(OrderposSearch);