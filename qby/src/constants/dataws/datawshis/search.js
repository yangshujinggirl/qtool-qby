import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

class BatchStockSearchForm extends React.Component {
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
            type:'datawshis/fetch',
            payload:{code:'qerp.web.ws.inv.bin.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'datawshis/synchronous',
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
                {getFieldDecorator('names')(
                <Input placeholder="请输入商品编码"/>
                )}
            </FormItem>
            <FormItem label='选择时间'>
                {getFieldDecorator('ccname')(
                    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
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
    const {limit,currentPage} = state.datawshis;
    return {limit,currentPage};
}

const DatawshisSearch = Form.create()(BatchStockSearchForm);
export default connect(mapStateToProps)(DatawshisSearch);