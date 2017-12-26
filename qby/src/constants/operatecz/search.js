import { Form, Row, Col, Input, Button,Select ,DatePicker} from 'antd';
import { connect } from 'dva';

const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
    state = {
        createTimeST: undefined,
        createTimeET:undefined
    };
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            this.initWarehouseList(values,this.props.limit,0)
            this.synchronousState(values)
        });
    }
    //搜搜请求数据
    initWarehouseList=(values,limit,currentPage)=>{
        values.voucherDateStart=this.state.voucherDateStart 
        values.voucherDateEnd=this.state.voucherDateEnd 
        values.limit=limit
        values.currentPage=currentPage
        this.props.dispatch({
            type:'operatecz/fetch',
            payload:{code:'qerp.web.sp.voucher.query',values:values}
        })
        this.props.dispatch({type:'tab/loding',payload:true})
    }
    //同步data
    synchronousState=(values)=>{
        values.voucherDateStart=this.state.voucherDateStart 
        values.voucherDateEnd=this.state.voucherDateEnd 
        this.props.dispatch({
            type:'operatecz/synchronous',
            payload:values
        })
    }
    hinddataChange=(dates, dateStrings)=>{
        console.log(dateStrings)
        this.setState({
            voucherDateStart:dateStrings[0],
            voucherDateEnd:dateStrings[1]
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
                                        <Input placeholder="请输入" className='form_input_width'/>
                                    )}
                                </FormItem>
                                <FormItem label='审核状态'>
                                {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择">
                                        <Option value='0'>待审核</Option>
                                        <Option value='1'>审核通过</Option>
                                        <Option value='2'>审核不通过</Option>
                                    </Select>
                                )}
                                </FormItem>
                                <FormItem label='充值号'>
                                    {getFieldDecorator('voucherNo')(
                                        <Input placeholder="请输入" />
                                    )}
                                </FormItem>
                                <FormItem label='充值时间'>
                                    {getFieldDecorator('time')(
                                        <RangePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            onChange={this.hinddataChange.bind(this)}
                                        />
                                    )}
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
         this.handleSearch()
       
    }
}
function mapStateToProps(state) {
     const {limit,currentPage} = state.operatecz
    return {limit,currentPage};
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default connect(mapStateToProps)(WrappedAdvancedSearchForm);