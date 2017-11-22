import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
const FormItem = Form.Item;
import { connect } from 'dva';
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class AccountSearchForm extends React.Component {
  state = {};

  //点击搜索按钮获取搜索表单数据
  handleSearch = (e) => {
    this.props.form.validateFields((err, values) => {
        this.initHouseAreaList(values,this.props.limit,this.props.currentPage);
        this.syncState(values);
    });
  }


  //搜索请求数据
  initHouseAreaList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'account/fetch',
            payload:{code:'qerp.web.ur.user.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'account/synchronous',
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
                    <FormItem label='姓名'>
                        {getFieldDecorator('name')(
                        <Input placeholder="请输入库区名称"/>
                        )}
                    </FormItem>
                    <FormItem label='所属身份'>
                        {getFieldDecorator('status')(
                        <Select allowClear={true} placeholder="请选择">
                            <Option value="1">总部</Option>
                            <Option value="0">吴江仓库</Option>
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
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.account;
    return {limit,currentPage};
}


const AccountSearch = Form.create()(AccountSearchForm);
export default connect(mapStateToProps)(AccountSearch);