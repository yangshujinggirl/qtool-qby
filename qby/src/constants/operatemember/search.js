import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
import {timeForMat} from '../../utils/meth';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class OperatememberSearchForm extends React.Component {
    state = {
        startTime: '',
        endTime:''
    };
    componentDidMount(){
        this.getNowFormatDate();
    }
    getNowFormatDate = () => {
       const startRpDate=timeForMat(30).t2
       const endRpDate=timeForMat(30).t1
       this.setState({
           startTime:startRpDate,
           endTime:endRpDate
       },function(){
           this.handleSearch();
       })
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
        values.startTime=this.state.startTime;
        values.endTime=this.state.endTime;
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'operatemember/fetch',
            payload:{code:'qerp.web.qpos.mb.card.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    //同步data
    syncState=(values)=>{
        values.startTime=this.state.startTime;
        values.endTime=this.state.endTime;
        this.props.dispatch({
            type:'operatemember/synchronous',
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
                                <FormItem label='会员姓名'>
                                    {getFieldDecorator('mbCardName')(
                                    <Input placeholder="请输入会员姓名" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='会员电话'>
                                    {getFieldDecorator('mbCardMobile')(
                                    <Input placeholder="请输入会员手机" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='会员卡号'>
                                    {getFieldDecorator('mbCardNo')(
                                    <Input placeholder="请输入会员卡号" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='会员级别'>
                                    {getFieldDecorator('mbCardLevel')(
                                    <Select allowClear={true} placeholder="请选择会员级别">
                                        <Option value=''>全部</Option>
                                        <Option value='1'>金卡</Option>
                                        <Option value='2'>银卡</Option>
                                        <Option value='3'>普卡</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='最近使用时间'>
                                        {
                                            <RangePicker
                                                format="YYYY-MM-DD"
                                                value={this.state.startTime?
                                                        [moment(this.state.startTime), moment(this.state.endTime)]
                                                        :null
                                                    }
                                                onChange={this.hindDateChange.bind(this)}
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
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.operatemember;
    return {limit,currentPage};
}


const OperatememberSearch = Form.create()(OperatememberSearchForm);
export default connect(mapStateToProps)(OperatememberSearch);
