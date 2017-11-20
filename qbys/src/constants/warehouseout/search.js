import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
const FormItem = Form.Item;
import { connect } from 'dva';


const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        console.log('Received values of form: ', values);
        this.props.dispatch({
            type:'warehouse/fetch',
            payload:{code:'qerp.web.ws.order.query',values:{limit:limit,currentPage:currentPage}}
		})



    });
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
        <Row gutter={40}>
        <Col span={8}  style={{ display: 'block'}}>
          <FormItem {...formItemLayout} label='门店名称'>
            {getFieldDecorator('name')(
              <Input placeholder="请输入" size="large"/>
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
            />
            )}
          </FormItem>
        </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default connect()(WrappedAdvancedSearchForm);