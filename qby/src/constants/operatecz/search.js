import { Form, Row, Col, Input, Button,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
import {timeForMats} from '../../utils/meth';
import {removeSpace} from '../../utils/meth';
import moment from 'moment';
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
    state = {
        voucherDateStart: undefined,
        voucherDateEnd:undefined
    };
    componentDidMount(){
        this.getNowFormatDate();
    }
    getNowFormatDate = () => {
       const startRpDate=timeForMats(30).t2
       const endRpDate=timeForMats(30).t1
       this.setState({
           voucherDateStart:startRpDate,
           voucherDateEnd:endRpDate
       },function(){
           this.handleSearch();
       })
   }
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            delete values.time;
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
        removeSpace(values)
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
        this.setState({
            voucherDateStart:dateStrings[0],
            voucherDateEnd:dateStrings[1]
        })
    }

    render() {
        const defaultTime = [moment(timeForMats(30).t2), moment(timeForMats(30).t1)]
        const { getFieldDecorator } = this.props.form;
        return (
            <Form  className='formbox'>
                <Row gutter={40} className='formbox_row'>
                    <Col span={24} className='formbox_col'>
                        <Row>
                            <div className='serach_form'>
                                <FormItem label='门店名称'>
                                    {getFieldDecorator('shopName')(
                                        <Input placeholder="请输入门店名称" className='form_input_width' autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='审核状态'>
                                {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择审核状态">
                                        <Option value='0'>待审核</Option>
                                        <Option value='1'>审核通过</Option>
                                        <Option value='2'>审核不通过</Option>
                                    </Select>
                                )}
                                </FormItem>
                                <FormItem label='充值号'>
                                    {getFieldDecorator('voucherNo')(
                                        <Input placeholder="请输入充值号" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='充值时间'>
                                    {getFieldDecorator('time',
                                      {initialValue:defaultTime}
                                    )(
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

}
function mapStateToProps(state) {
     const {limit,currentPage} = state.operatecz
    return {limit,currentPage};
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default connect(mapStateToProps)(WrappedAdvancedSearchForm);
