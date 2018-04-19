import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';

class Searchform extends React.Component {
    state = {
        firstCosumeTime:'',
        lastCosumeTime:'',
    };
    //点击搜索按钮获取搜索表单数据
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            values.firstCosumeTime=this.state.starttime
            values.lastCosumeTime=this.state.endtime
            this.props.hindFormSearch(values)
        });
    }
    //时间搜索部分
    startDateChange=(dates,dateString)=>{
        this.setState({
            firstCosumeTime:dateString
        })
    }
    //时间搜索
    endDateChange=(dates,dateString)=>{
        this.setState({
            lastCosumeTime:dateString
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
                                <FormItem label='用户姓名'>
                                    {getFieldDecorator('userName')(
                                        <Input placeholder="请输入" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='身份证号'>
                                    {getFieldDecorator('idCardNo')(
                                        <Input placeholder="请输入" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='手机号'>
                                    {getFieldDecorator('telephoneNo')(
                                        <Input placeholder="请输入" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='初次消费时间'>
                                    {getFieldDecorator('firstCosumeTime')(
                                        <DatePicker  
                                            format={dateFormat} 
                                            className='noant-calendar-picker'
                                            onChange={this.startDateChange.bind(this)}
                                            />
                                    )}
                                </FormItem>
                                <FormItem label='最后消费时间'>
                                    {getFieldDecorator('lastCosumeTime')(
                                        <DatePicker  
                                            format={dateFormat} 
                                            className='noant-calendar-picker'
                                            onChange={this.endDateChange.bind(this)}
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


const SearchForm = Form.create()(Searchform);
export default SearchForm;