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
        this.initList(values,this.props.limit,this.props.currentPage);
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
                    <FormItem label='单据编号'>
                        {getFieldDecorator('docNo')(
                        <Input placeholder="请输入单据编号"/>
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
    const {limit,currentPage} = state.transaction;
    return {limit,currentPage};
}

const TransactionSearch = Form.create()(TransactionSearchForm);
export default connect(mapStateToProps)(TransactionSearch);