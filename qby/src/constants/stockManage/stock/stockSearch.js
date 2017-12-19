import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
const FormItem = Form.Item;
import { connect } from 'dva';
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

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
            type:'stock/fetch',
            payload:{code:'qerp.web.ws.inv.spu.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'stock/synchronous',
            payload:values
        });
    }

    //请求仓库列表
	wsList=()=>{
        this.props.dispatch({
            type:'IndexPage/wslistfetch',
            payload:{code:'qerp.web.ws.warehouse.all.list',values:{}}
        })
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
                    <FormItem label='商品条码'>
                        {getFieldDecorator('barcode')(
                        <Input placeholder="请输入商品条码"/>
                        )}
                    </FormItem>
                    <FormItem label='商品名称'>
                        {getFieldDecorator('name')(
                        <Input placeholder="请输入商品名称"/>
                        )}
                    </FormItem>
                    {
                                    adminType=='10'?
                                    <FormItem label='所属仓库'>
                                    {getFieldDecorator('wsWarehouseId')(
                                        <Select allowClear={true} placeholder="请选择">
                                            {
                                                this.props.warehouses.map((item,index)=>{
                                                    return  <Option value={item.wsWarehouseId} key={index}>{item.name}</Option>
                                                })
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                                :null
                                }
                    
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
    this.wsList();
}
  
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.stock;
    const {warehouses}=state.IndexPage;
    return {limit,currentPage,warehouses};
}

const StockSearch = Form.create()(StockSearchForm);
export default connect(mapStateToProps)(StockSearch);