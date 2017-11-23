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
        this.initList(values,this.props.limit,this.props.currentPage);
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

  render() {
      const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} style={{'position':'relative'}}>
        <Row gutter={40} style={{marginRight:'-30px',marginLeft:'-30px',borderBottom:'1px solid #d9d9d9',position:'static'}}>
            <Col span={24} style={{paddingRight:'60px',paddingLeft:'30px'}}>
                <Row>
                <div className='serach_form'>
                    <FormItem label='商品条码'>
                        {getFieldDecorator('barcode')(
                        <Input placeholder="请输入库区名称"/>
                        )}
                    </FormItem>
                    <FormItem label='商品名称'>
                        {getFieldDecorator('name')(
                        <Input placeholder="请输入库区名称"/>
                        )}
                    </FormItem>
                    <FormItem label='所属仓库'>
                        {getFieldDecorator('wsId')(
                        <Select allowClear={true} placeholder="请选择所属仓库">
                            <Option value="1">吴江</Option>
                            <Option value="0">总部</Option>
                        </Select>
                        )}
                    </FormItem>
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
            <Button type="primary" htmlType="submit">搜索</Button>
        </div>
      </Form>
    );
  }
  componentDidMount(){}
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.batchStock;
    return {limit,currentPage};
}

const BatchStockSearch = Form.create()(BatchStockSearchForm);
export default connect(mapStateToProps)(BatchStockSearch);