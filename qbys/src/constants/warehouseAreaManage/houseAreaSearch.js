import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
const FormItem = Form.Item;
import { connect } from 'dva';
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class HouseAreaSearchForm extends React.Component {
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
            type:'houseAreaManage/fetch',
            payload:{code:'qerp.web.ws.area.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'houseAreaManage/synchronous',
            payload:values
        });
    }

  render() {
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      };
      const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={40} style={{position:'relative'}}>
            <Col span={22}>
                <Row>
                <Col span={8}  style={{ display: 'block'}}>
                <FormItem {...formItemLayout} label='库区名称'>
                    {getFieldDecorator('keywords')(
                    <Input placeholder="请输入库区名称"/>
                    )}
                </FormItem>
                </Col>
                <Col span={8}  style={{ display: 'block'}}>
                <FormItem {...formItemLayout} label='库区状态'>
                    {getFieldDecorator('status')(
                    <Select allowClear={true} placeholder="请选择库区状态">
                        <Option value="1">启用</Option>
                        <Option value="0">禁用</Option>
                    </Select>
                    )}
                </FormItem>
                </Col>
                </Row>
            </Col>
            <Col span={2} style={{'position':'absolute','right':'0','bottom':'20px'}}>
                <Row type="flex" justify="space-between" align="bottom">
                    <Col span={8}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                    </Col>   
                </Row>
            </Col>
        </Row>
      </Form>
    );
  }
  componentDidMount(){
     
  }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.houseAreaManage;
    return {limit,currentPage};
}


const HouseAreaSearch = Form.create()(HouseAreaSearchForm);
export default connect(mapStateToProps)(HouseAreaSearch);