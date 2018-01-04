import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
const FormItem = Form.Item;
import { connect } from 'dva';
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class TransactionSearchForm extends React.Component {
  state = {};

  //点击搜索按钮获取搜索表单数据
  handleSearch = (e) => {
    this.props.form.validateFields((err, values) => {
        values.invType = '10';
        this.initList(values,this.props.limit,0);
        this.syncState(values);
    });
  }


  //搜索请求数据
  initList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'transaction/fetch',
            payload:{code:'qerp.web.ws.inv.trans.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'transaction/synchronous',
            payload:values
        });
    }

  

  render() {
      const { getFieldDecorator } = this.props.form;
      const adminType=eval(sessionStorage.getItem('adminType'));
    return (
        <Form  className='formbox'>
        <Row gutter={40} className='formbox_row'>
            <Col span={24} className='formbox_col'>
                <Row>
                    <div className='serach_form'>
                    
                    <FormItem label='商品名称'>
                    {getFieldDecorator('barcode')(
                    <Input placeholder="请输入商品名称"/>
                    )}
                </FormItem>
                <FormItem label='商品编码'>
                    {getFieldDecorator('name')(
                    <Input placeholder="请输入商品编码"/>
                    )}
                </FormItem>
                <FormItem label='商品条码'>
                    {getFieldDecorator('ccname')(
                    <Input placeholder="请输入商品条码"/>
                    )}
                </FormItem>
                <FormItem label='到期日期'>
                    {getFieldDecorator('ccnamsse')(
                        <Select defaultValue="jack">
                            <Option value="jack">已过期</Option>
                            <Option value="lucy">7天内过期</Option>
                            <Option value="disabled">30天内过期</Option>
                            <Option value="1">90天内过期</Option>
                      </Select>
                    )}
                </FormItem>

                
                    </div>
                </Row>
            </Col>
        </Row>
        <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
            <Button type="primary" htmlType="submit" onClick={this.handleSearch.bind(this)} size='large'>搜索</Button>
        </div>
      </Form>
    );
  }
  componentDidMount(){
    // this.handleSearch();
  }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.datawstime;
    return {limit,currentPage};
}

const DatawstimeSearch = Form.create()(TransactionSearchForm);
export default connect(mapStateToProps)(DatawstimeSearch);