import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import moment from 'moment';
import {timeForMat} from '../../../utils/meth';
import {removeSpace} from '../../../utils/meth';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

class Searchform extends React.Component {
    state = {
        firstCosumeTimeST:'',
        firstCosumeTimeET:'',
        lastCosumeTimeST:'',
        lastCosumeTimeET:''
    };
    componentDidMount(){
        this.getNowFormatDate();
    }
    getNowFormatDate = () => {
       const startRpDate=timeForMat(30).t2;
       const endRpDate=timeForMat(30).t1
       this.setState({
           lastCosumeTimeST:startRpDate,
           lastCosumeTimeET:endRpDate
       },function(){
           this.handleSearch();
       })
   }
    //点击搜索按钮获取搜索表单数据
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            delete values.lastCosumeTime;
            values.firstCosumeTimeST=this.state.firstCosumeTimeST
            values.firstCosumeTimeET=this.state.firstCosumeTimeET
            values.lastCosumeTimeST=this.state.lastCosumeTimeST
            values.lastCosumeTimeET=this.state.lastCosumeTimeET
            removeSpace(data)
            this.props.hindFormSearch(values)
        });
    }
    //时间搜索部分
    startDateChange=(dates,dateString)=>{
        this.setState({
            firstCosumeTimeST:dateString[0],
            firstCosumeTimeET:dateString[1]
        })
    }
    //时间搜索
    endDateChange=(dates,dateString)=>{
        this.setState({
            lastCosumeTimeST:dateString[0],
            lastCosumeTimeET:dateString[1]
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
                                        <RangePicker
                                            format={dateFormat}
                                            onChange={this.startDateChange.bind(this)}
                                            />
                                    )}
                                </FormItem>
                                <FormItem label='最后消费时间'>
                                    {getFieldDecorator('lastCosumeTime',{
                                      initialValue:this.state.lastCosumeTimeST
                                        ?[moment(this.state.lastCosumeTimeST), moment(this.state.lastCosumeTimeET)]
                                        :null
                                    })(
                                        <RangePicker
                                            format={dateFormat}
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
}


const SearchForm = Form.create()(Searchform);
export default SearchForm;
