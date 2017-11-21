import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
const FormItem = Form.Item;
import { connect } from 'dva';
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class HouseAreaSearchForm extends React.Component {
  state = {

  };

  handleSearch = (e) => {
    this.props.form.validateFields((err, values) => {
        console.log(values)
        console.log('Received values of form: ', values);
        this.initWarehouseList(values,this.props.limit,this.props.currentPage)
        this.synchronousState(values)
    });
  }


  //搜搜请求数据
  initWarehouseList=(values,limit,currentPage)=>{
    values.createTimeST=this.state.createTimeST 
    values.createTimeET=this.state.createTimeET 
    values.limit=limit
    values.currentPage=currentPage
    console.log(values)
    this.props.dispatch({
        type:'warehouse/fetch',
        payload:{code:'qerp.web.ws.order.query',values:values}
    })
    this.props.dispatch({ type: 'tab/loding', payload:true}) 
}


//同步data
synchronousState=(values)=>{
    values.createTimeST=this.state.createTimeST 
    values.createTimeET=this.state.createTimeET 
    this.props.dispatch({
        type:'warehouse/synchronous',
        payload:values
    })
}

hinddataChange=(dates, dateStrings)=>{
    this.setState({
        createTimeST:dateStrings[0],
        createTimeET:dateStrings[1]
    })
  }

  render() {
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      };
      const { getFieldDecorator } = this.props.form;
    return (
      <Form
        // onSubmit={this.handleSearch}
      >
        <Row gutter={40} style={{position:'relative'}}>
            <Col span={22}>
                <Row>
                <Col span={8}  style={{ display: 'block'}}>
                <FormItem {...formItemLayout} label='库区名称'>
                    {getFieldDecorator('name')(
                    <Input placeholder="请输入"/>
                    )}
                </FormItem>
                </Col>
                <Col span={8}  style={{ display: 'block'}}>
                <FormItem {...formItemLayout} label='库区状态'>
                    {getFieldDecorator('status')(
                    <Select allowClear={true} placeholder="请选择">
                    <Option value='10'>待分配</Option>
                    <Option value='40'>待拣核</Option>
                    <Option value='80'>待发货</Option>
                    <Option value='90'>已发货</Option>
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
	console.log(state)
    return {};
}


const HouseAreaSearch = Form.create()(HouseAreaSearchForm);
export default connect(mapStateToProps)(HouseAreaSearch);