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
            this.initWarehouseList(values,this.props.limit,this.props.currentPage)
            this.synchronousState(values)
        });
    }
    //搜搜请求数据
    initWarehouseList=(values,limit,currentPage)=>{
        values.createTimeST=this.state.createTimeST 
        values.createTimeET=this.state.createTimeET 
        values.limit=limit
        values.currentPage=currentPage
        this.props.dispatch({
            type:'wsmove/fetch',
            payload:{code:'qerp.web.ws.move.query',values:values}
        })
        this.props.dispatch({ type: 'tab/loding', payload:true}) 
    }
    //同步data
    synchronousState=(values)=>{
        values.createTimeST=this.state.createTimeST 
        values.createTimeET=this.state.createTimeET 
        this.props.dispatch({
            type:'wsmove/synchronous',
            payload:values
        })
    }
    hinddataChange=(dates, dateStrings)=>{
        this.setState({
            createTimeST:dateStrings[0],
            createTimeET:dateStrings[1]
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} style={{'position':'relative'}}>
                <Row gutter={40} style={{marginRight:'-30px',marginLeft:'-30px',borderBottom:'1px solid #d9d9d9',position:'static'}}>
                    <Col span={24} style={{paddingRight:'60px',paddingLeft:'30px'}}>
                        <Row>
                            <div className='serach_form'>
                                <FormItem label='移库单号'>
                                    {getFieldDecorator('moveNo')(
                                        <Input placeholder="请输入" className='form_input_width'/>
                                    )}
                                </FormItem>
                                <FormItem label='创建人'>
                                    {getFieldDecorator('username')(
                                        <Input placeholder="请输入" />
                                    )}
                                </FormItem>
                                <FormItem label='商品条码'>
                                    {getFieldDecorator('pdBarcode')(
                                        <Input placeholder="请输入" />
                                    )}
                                </FormItem>
                                <FormItem label='调出库位'>
                                    {getFieldDecorator('fromBincode')(
                                        <Input placeholder="请输入" />
                                    )}
                                </FormItem>
                                <FormItem label='调入库位'>
                                    {getFieldDecorator('toBincode')(
                                        <Input placeholder="请输入" />
                                    )}
                                </FormItem>
                                <FormItem label='移库状态'>
                                    {getFieldDecorator('status')(
                                        <Select allowClear={true} placeholder="请选择">
                                            <Option value='10'>待移库</Option>
                                            <Option value='30'>移库完</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label='打印状态'>
                                    {getFieldDecorator('print')(
                                        <Select allowClear={true} placeholder="请选择">
                                            <Option value='false'>未打印</Option>
                                            <Option value='true'>已打印</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label='创建时间'>
                                    {getFieldDecorator('time')(
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
    const {limit,currentPage} = state.wsmove;
    return {limit,currentPage};
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default connect(mapStateToProps)(WrappedAdvancedSearchForm);