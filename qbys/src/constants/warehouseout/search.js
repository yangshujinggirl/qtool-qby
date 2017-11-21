import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
const FormItem = Form.Item;
import { connect } from 'dva';


const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
class AdvancedSearchForm extends React.Component {
  state = {
    createTimeST: undefined,
    createTimeET:undefined
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
        onSubmit={this.handleSearch}
      >
        <Row gutter={40} style={{position:'relative'}}>
            <Col span={22}>
                <Row>
                <Col span={8}  style={{ display: 'block'}}>
          <FormItem {...formItemLayout} label='门店名称'>
            {getFieldDecorator('name')(
              <Input placeholder="请输入"/>
            )}
          </FormItem>
        </Col>
        <Col span={8}  style={{ display: 'block'}}>
          <FormItem {...formItemLayout} label='收货人电话'>
            {getFieldDecorator('recTelephone')(
              <Input placeholder="请输入" />
            )}
          </FormItem>
        </Col>
        <Col span={8}  style={{ display: 'block'}}>
          <FormItem {...formItemLayout} label='收货人'>
            {getFieldDecorator('recName')(
              <Input placeholder="请输入" />
            )}
          </FormItem>
        </Col>
        <Col span={8}  style={{ display: 'block'}}>
          <FormItem {...formItemLayout} label='配货单号'>
            {getFieldDecorator('orderNo')(
              <Input placeholder="请输入" />
            )}
          </FormItem>
        </Col>
        <Col span={8}  style={{ display: 'block'}}>
          <FormItem {...formItemLayout} label='商品条码'>
            {getFieldDecorator('barcode')(
              <Input placeholder="请输入" />
            )}
          </FormItem>
        </Col>
        <Col span={8}  style={{ display: 'block'}}>
          <FormItem {...formItemLayout} label='订单状态'>
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
        <Col span={8}  style={{ display: 'block'}}>
          <FormItem {...formItemLayout} label='打印状态'>
            {getFieldDecorator('print')(
                <Select allowClear={true} placeholder="请选择">
                    <Option value='false'>未打印</Option>
                    <Option value='true'>已打印</Option>
                </Select>
            )}
          </FormItem>
        </Col>
        <Col span={8}  style={{ display: 'block'}}>
          <FormItem {...formItemLayout} label='订单类型'>
            {getFieldDecorator('type')(
              <Select allowClear={true} placeholder="请选择">
                <Option value='10'>门店</Option>
                <Option value='11'>直邮</Option>
                <Option value='20'>采退</Option>
            </Select>
            )}
          </FormItem>
        </Col>



        <Col span={8}  style={{ display: 'block'}}>
          <FormItem {...formItemLayout} label='合单时间'>
            {getFieldDecorator('time')(
              <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              style={{'width':'100%'}}
              onChange={this.hinddataChange.bind(this)}
            />
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
      this.handleSearch()
  }
}
function mapStateToProps(state) {
	console.log(state)
    const {limit,currentPage} = state.warehouse;
    return {limit,currentPage};
}


const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default connect(mapStateToProps)(WrappedAdvancedSearchForm);