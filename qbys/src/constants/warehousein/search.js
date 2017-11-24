import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class AdvancedSearchForm extends React.Component {
    state = {
        createTimeST: undefined,
        createTimeET:undefined,
        expectedTimeST:undefined,
        expectedTimeET:undefined
    };
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            this.initWarehouseList(values,this.props.limit,this.props.currentPage)
            this.synchronousState(values)
        });
    }
    //搜搜请求数据
    initWarehouseList=(values,limit,currentPage)=>{
        values.createTimeST=this.state.createTimeST 
        values.createTimeET=this.state.createTimeET 
        values.expectedTimeST=this.state.expectedTimeST 
        values.expectedTimeET=this.state.expectedTimeET 
        values.limit=limit
        values.currentPage=currentPage
        this.props.dispatch({
            type:'wsin/fetch',
            payload:{code:'qerp.web.ws.asn.query',values:values}
        })
        this.props.dispatch({ type: 'tab/loding', payload:true}) 
    }
    //同步data
    synchronousState=(values)=>{
        values.createTimeST=this.state.createTimeST 
        values.createTimeET=this.state.createTimeET 
        values.expectedTimeST=this.state.expectedTimeST 
        values.expectedTimeET=this.state.expectedTimeET 
        this.props.dispatch({
            type:'wsin/synchronous',
            payload:values
        })
    }
    hinddataChange=(dates, dateStrings)=>{
        this.setState({
            createTimeST:dateString[0],
            createTimeET:dateString[1]
        })
    }
    dataonChanges(date, dateString) {
        this.setState({
            expectedTimeST:dateString[0],
            expectedTimeET:dateString[1]
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form  onSubmit={this.handleSearch}    style={{'position':'relative'}}>
                <Row gutter={40} style={{marginRight:'-30px',marginLeft:'-30px',borderBottom:'1px solid #d9d9d9',position:'static'}}>
                    <Col span={24} style={{paddingRight:'60px',paddingLeft:'30px'}}>
                        <Row>
                            <div className='serach_form'>
                                <FormItem label='商品条码'>
                                    {getFieldDecorator('pdBarcode')(
                                        <Input placeholder="请输入" className='form_input_width'/>
                                    )}
                                </FormItem>
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('pdName')(
                                        <Input placeholder="请输入" />
                                    )}
                                </FormItem>
                                <FormItem label='发货主体名称'>
                                    {getFieldDecorator('name')(
                                        <Input placeholder="请输入" />
                                    )}
                                </FormItem>
                                <FormItem label='收货单号'>
                                    {getFieldDecorator('asnNo')(
                                        <Input placeholder="请输入" />
                                    )}
                                </FormItem>
                                <FormItem label='订单状态'>
                                    {getFieldDecorator('status')(
                                        <Select allowClear={true} size="large" placeholder="请选择">
                                            <Option value='10'>待收货</Option>
                                            <Option value='20'>收货中</Option>
                                            <Option value='30'>已收货</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label='预计送达时间'>
                                    {getFieldDecorator('time1')(
                                        <RangePicker
                                            showTime
                                            format="YYYY-MM-DD"
                                            onChange={this.dataonChanges.bind(this)}
                                        />
                                    )}
                                </FormItem>
                                <FormItem label='订单时间'>
                                    {getFieldDecorator('time2')(
                                        <RangePicker
                                            showTime
                                            format="YYYY-MM-DD"
                                            onChange={this.hinddataChange.bind(this)}
                                        />
                                    )}
                                </FormItem>     
                            </div>
                        </Row>
                    </Col>
                </Row>
                <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
                    <Button type="primary" htmlType="submit">搜索</Button>
                </div>
            </Form>
        );
    }
    componentDidMount(){
        this.handleSearch()
    }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.wsin;
    return {limit,currentPage};
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default connect(mapStateToProps)(WrappedAdvancedSearchForm);