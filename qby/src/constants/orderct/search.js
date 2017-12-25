import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class OrderctSearchForm extends React.Component {
    state = {
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
            type:'orderct/fetch',
            payload:{code:'qerp.web.sp.ctorder.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'orderct/synchronous',
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
                                <FormItem label='供应商名称'>
                                    {getFieldDecorator('name')(
                                    <Input placeholder="请输入供应商名称"/>
                                    )}
                                </FormItem>
                                <FormItem label='退货单号'>
                                    {getFieldDecorator('asnNo')(
                                    <Input placeholder="请输入退货单号"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品编码'>
                                    {getFieldDecorator('pdCode')(
                                    <Input placeholder="请输入商品编码"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('pdName')(
                                    <Input placeholder="请输入商品名称"/>
                                    )}
                                </FormItem>
                               
                                <FormItem label='订单状态'>
                                    {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择订单状态">
                                        <Option value='10'>待发货</Option>
                                        <Option value='20'>已发货</Option>
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
        
    }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.orderct;
    return {limit,currentPage};
}


const OrderctSearch = Form.create()(OrderctSearchForm);
export default connect(mapStateToProps)(OrderctSearch);