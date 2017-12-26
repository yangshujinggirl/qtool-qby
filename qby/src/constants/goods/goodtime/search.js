import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class SearchForm extends React.Component {
    state = {
        type: "20",
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
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'goodtime/fetch',
            payload:{code:'qerp.web.pd.task.time.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'goodtime/synchronous',
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
                                <FormItem label='商品编码'>
                                    {getFieldDecorator('code')(
                                    <Input placeholder="请输入门店名称"/>
                                    )}
                                </FormItem>
                                <FormItem label='最后修改人'>
                                    {getFieldDecorator('updateUserName')(
                                    <Input placeholder="请输入退货单号"/>
                                    )}
                                </FormItem>
                                <FormItem label='定时操作'>
                                    {getFieldDecorator('opstatus')(
                                    <Select allowClear={true} placeholder="请选择退货单状态">
                                        <Option value='1'>售卖</Option>
                                        <Option value='2'>停售</Option>
                                        <Option value='3'>上新</Option>
                                        <Option value='4'>下新</Option>
                                        <Option value='5'>畅销</Option>
                                        <Option value='6'>下畅销</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='状态'>
                                    {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择退货单状态">
                                       <Option value='1'>待执行</Option>
                                       <Option value='2'>已执行</Option>
                                       <Option value='0'>无效</Option>
                                    </Select>
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