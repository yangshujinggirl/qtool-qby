import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class SearchForm extends React.Component {
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            this.initList(values,this.props.limit,0);
            this.syncState(values);
        });
    }

    //搜索请求数据
    initList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'operatesp/fetch',
            payload:{code:'qerp.web.sp.shop.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'operatesp/synchronous',
            payload:values
        });
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
                                    {getFieldDecorator('name')(
                                    <Input placeholder="请输入门店名称"/>
                                    )}
                                </FormItem>
                                <FormItem label='门店电话'>
                                    {getFieldDecorator('mobile')(
                                    <Input placeholder="请输入门店电话"/>
                                    )}
                                </FormItem>
                                <FormItem label='门店姓名'>
                                    {getFieldDecorator('shopman')(
                                    <Input placeholder="请输入门店姓名"/>
                                    )}
                                </FormItem>
                                <FormItem label='门店状态'>
                                    {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择门店状态">
                                       <Option value='0'>待开业</Option>
                                       <Option value='10'>开业中</Option>
                                       <Option value='20'>关业中</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='门店类型'>
                                    {getFieldDecorator('shopType')(
                                    <Select allowClear={true} placeholder="请选择门店类型">
                                       <Option value='1'>直营</Option>
                                       <Option value='2'>联营</Option>
                                       <Option value='3'>加盟</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='所在省份'>
                                    {getFieldDecorator('province')(
                                        <Input placeholder="请输入所在省份"/>
                                    )}
                                </FormItem>
                                <FormItem label='所在城市'>
                                    {getFieldDecorator('city')(
                                        <Input placeholder="请输入所在城市"/>
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