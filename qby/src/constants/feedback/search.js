import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class SearchForm extends React.Component {
    state={
        createTimeST:null,
        createTimeET:null
    }
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            this.initList(values,this.props.limit,0);
            this.syncState(values);
        });
    }

    //搜索请求数据
    initList=(values,limit,currentPage)=>{
        values.createTimeST=this.state.createTimeST;
        values.createTimeET=this.state.createTimeET;
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'feedback/fetch',
            payload:{code:'qerp.web.sp.feedback.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        values.createTime=this.state.createTime;
        this.props.dispatch({
            type:'feedback/synchronous',
            payload:values
        });
    }
    hindDateChange=(date, dateString)=>{
        this.setState({
            createTimeST:dateString[0],
            createTimeET:dateString[1]
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
                                <FormItem label='反馈编号'>
                                    {getFieldDecorator('feedbackNo')(
                                    <Input placeholder="请输入反馈编号"/>
                                    )}
                                </FormItem>
                                <FormItem label='反馈门店'>
                                    {getFieldDecorator('spShopName')(
                                    <Input placeholder="请输入反馈门店"/>
                                    )}
                                </FormItem>
                                <FormItem label='反馈类型'>
                                {getFieldDecorator('type')(
                                    <Select allowClear={true} placeholder="请选择门店类型">
                                    <Option value='1'>运营相关问题</Option>
                                    <Option value='2'>商品相关问题</Option>
                                    <Option value='3'>设计相关问题</Option>
                                    <Option value='4'>招商相关问题</Option>
                                    <Option value='5'>系统相关问题</Option>
                                    <Option value='6'>其他</Option>
                                    </Select>
                                )}
                                </FormItem>
                                <FormItem label='反馈状态'>
                                    {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择反馈状态">
                                        <Option value='10'>待处理</Option>
                                        <Option value='20'>处理中</Option>
                                        <Option value='30'>已处理</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='处理时长'>
                                    {getFieldDecorator('handleTimeType')(
                                    <Select allowClear={true} placeholder="请选择处理时长">
                                        <Option value='1'>0-5h</Option>
                                        <Option value='2'>5-24h</Option>
                                        <Option value='3'>24h以上</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='反馈时间'>
                                    {getFieldDecorator('time')(
                                        <RangePicker
                                            showTime
                                            format="YYYY-MM-DD"
                                            onChange={this.hindDateChange.bind(this)}
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
    const {limit,currentPage} = state.goodtime;
    return {limit,currentPage};
}

const SearchForms = Form.create()(SearchForm);
export default connect(mapStateToProps)(SearchForms);