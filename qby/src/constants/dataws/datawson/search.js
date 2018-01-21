import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';


const FormItem = Form.Item;

class StockSearchForm extends React.Component {
  state = {};

  //点击搜索按钮获取搜索表单数据
  handleSearch = (e) => {
    this.props.form.validateFields((err, values) => {
        this.initStockList(values,this.props.limit,0);
        this.syncState(values);
    });
  }
  //搜索请求数据
  initStockList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'dataws/fetch',
            payload:{code:'qerp.web.pd.invdata.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'dataws/synchronous',
            payload:values
        });
    }

  

  render() {
      const { getFieldDecorator } = this.props.form;
      const adminType=eval(sessionStorage.getItem('adminType'));
    return (
      <Form className='formbox'>
        <Row gutter={40} className='formbox_row'>
            <Col span={24} className='formbox_col'>
                <Row>
                <div className='serach_form'>
                    <FormItem label='商品名称'>
                        {getFieldDecorator('pdSpuName')(
                        <Input placeholder="请输入商品名称" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem label='商品编码'>
                        {getFieldDecorator('pdCode')(
                        <Input placeholder="请输入商品编码" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem label='商品条码'>
                        {getFieldDecorator('pdBarcode')(
                        <Input placeholder="请输入商品条码" autoComplete="off"/>
                        )}
                    </FormItem>
                    </div>
                </Row>
            </Col>
        </Row>
        <div style={{'position':'absolute','right':'0','bottom':'24px'}}>
            <Button type="primary" htmlType="submit" onClick={this.handleSearch.bind(this)} size='large'>搜索</Button>
        </div>
      </Form>
    );
  }

  componentDidMount(){
    this.handleSearch()
}
  
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.datawson;
    return {limit,currentPage};
}

const DatawsonSearch = Form.create()(StockSearchForm);
export default connect(mapStateToProps)(DatawsonSearch);