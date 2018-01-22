import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class OperatesupplierSearchForm extends React.Component {
    state = {};

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
            type:'operatesupplier/fetch',
            payload:{code:'qerp.web.pd.supplier.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'operatesupplier/synchronous',
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
                                    <Input placeholder="请输入供应商名称" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='合作状态'>
                                    {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择合作状态">
                                        <Option value='10'>合作中</Option>
                                        <Option value='20'>待合作</Option>
                                        <Option value='21'>停止合作</Option>
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

    componentDidMount(){}
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.operatesupplier;
    return {limit,currentPage};
}


const OperatesupplierSearch = Form.create()(OperatesupplierSearchForm);
export default connect(mapStateToProps)(OperatesupplierSearch);