import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
const FormItem = Form.Item;
import { connect } from 'dva';
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

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
            type:'batchStock/fetch',
            payload:{code:'qerp.web.ws.inv.bin.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'batchStock/synchronous',
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
      <Form  className='formbox'>
        <Row gutter={40} className='formbox_row'>
            <Col span={24} className='formbox_col'>
                <Row>
                <div className='serach_form'>
                    <FormItem label='商品名称'>
                        {getFieldDecorator('name')(
                        <Input placeholder="请输入商品名称"/>
                        )}
                    </FormItem>
                    <FormItem label='商品条码'>
                        {getFieldDecorator('barcode')(
                        <Input placeholder="请输入商品条码"/>
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
                    <FormItem label='库区'>
                        {getFieldDecorator('wsAreaCode')(
                        <Input placeholder="请输入库区名称"/>
                        )}
                    </FormItem>
                    <FormItem label='库位'>
                        {getFieldDecorator('wsBinCode')(
                        <Input placeholder="请输入库位名称"/>
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
    this.wsList();
  }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.batchStock;
    const {warehouses}=state.IndexPage;
    return {limit,currentPage,warehouses};
}

const BatchStockSearch = Form.create()(BatchStockSearchForm);
export default connect(mapStateToProps)(BatchStockSearch);