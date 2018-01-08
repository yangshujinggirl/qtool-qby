import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class SearchForm extends React.Component {
    state={
        createTime:null,
    }
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            this.initList(values,this.props.limit,0);
            this.syncState(values);
        });
    }

    //搜索请求数据
    initList=(values,limit,currentPage)=>{
        values.createTime=this.state.createTime;
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
    hinddataChange=(date, dateString)=>{
        this.setState({
            createTime:dateString,
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
                                <FormItem label='门店类型'>
                                {getFieldDecorator('type')(
                                    <Select allowClear={true} placeholder="请选择门店类型">
                                    <Option value='1'>待执行</Option>
                                    <Option value='2'>已执行</Option>
                                    <Option value='0'>无效</Option>
                                    </Select>
                                )}
                                </FormItem>
                                <FormItem label='反馈状态'>
                                    {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择反馈状态">
                                        <Option value='1'>待执行</Option>
                                        <Option value='2'>已执行</Option>
                                        <Option value='0'>无效</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='处理时长'>
                                    {getFieldDecorator('handleTimeType')(
                                    <Select allowClear={true} placeholder="请选择处理时长">
                                        <Option value='1'>待执行</Option>
                                        <Option value='2'>已执行</Option>
                                        <Option value='0'>无效</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='反馈时间'>
                                    {getFieldDecorator('time')(
                                        <DatePicker
                                            showTime
                                            format="YYYY-MM-DD"
                                            className='noant-calendar-picker'
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
        // this.handleSearch()
    }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.goodtime;
    return {limit,currentPage};
}

const SearchForms = Form.create()(SearchForm);
export default connect(mapStateToProps)(SearchForms);