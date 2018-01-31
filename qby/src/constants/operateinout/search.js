import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class OperateinoutSearchForm extends React.Component {
    state = {
        dateStart: '',
        dateEnd:''
    };

  //点击搜索按钮获取搜索表单数据
  handleSearch = (e) => {
    this.props.form.validateFields((err, values) => {
        this.initList(values,this.props.limit,0);
        this.syncState(values);
    });
  }


  //搜索请求数据
  initList=(values,limit,currentPage)=>{
        values.dateStart=this.state.dateStart;
        values.dateEnd=this.state.dateEnd;
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'operateinout/fetch',
            payload:{code:'qerp.web.sp.money.detail',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        values.dateStart=this.state.dateStart;
        values.dateEnd=this.state.dateEnd;
        this.props.dispatch({
            type:'operateinout/synchronous',
            payload:values
        });
    }

    //时间搜索部分
    hindDateChange=(dates,dateString)=>{
        this.setState({
            dateStart:dateString[0],
            dateEnd:dateString[1]
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
                                    <Input placeholder="请输入门店名称" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='收支筛选'>
                                    {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择收支筛选">
                                        <Option value='1'>充值</Option>
                                        <Option value='2'>支出</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='费用筛选'>
                                    {getFieldDecorator('type')(
                                    <Select allowClear={true} placeholder="请选择费用筛选">
                                        <Option value='21'>订单费用</Option>
                                        <Option value='11'>门店充值</Option>
                                        <Option value='22'>物流费用</Option>
                                        <Option value='25'>收银结算</Option>
                                        <Option value='24'>取消退款</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='时间选择'>
                                        {
                                            <RangePicker
                                                showTime
                                                format="YYYY-MM-DD HH:mm:ss"
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

    componentDidMount(){}
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.operateinout;
    return {limit,currentPage};
}


const OperateinoutSearch = Form.create()(OperateinoutSearchForm);
export default connect(mapStateToProps)(OperateinoutSearch);