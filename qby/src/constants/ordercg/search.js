import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import {timeForMat} from '../../utils/meth';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class OrdercgSearchForm extends React.Component {
  state = {
      type:"10",
      createTimeST:'',
      createTimeET:''
  };
  componentDidMount(){
      this.getNowFormatDate();
  }
  getNowFormatDate = () => {
     const startRpDate=timeForMat(30).t2
     const endRpDate=timeForMat(30).t1
     this.setState({
         createTimeST:startRpDate,
         createTimeET:endRpDate
     },function(){
         this.handleSearch();
     })
 }
  //点击搜索按钮获取搜索表单数据
  handleSearch = (e) => {
    this.props.form.validateFields((err, values) => {
        this.initList(values,this.props.limit,0);
        this.syncState(values);
    });
  }


  //搜索请求数据
  initList=(values,limit,currentPage)=>{
        values.type=this.state.type;
        values.limit=limit;
        values.currentPage=currentPage;
        values.createTimeST = this.state.createTimeST;
        values.createTimeET = this.state.createTimeET;
        this.props.dispatch({
            type:'ordercg/fetch',
            payload:{code:'qerp.web.ws.asn.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    //同步data
    syncState=(values)=>{
        values.type=this.state.type;
        values.createTimeST = this.state.createTimeST;
        values.createTimeET = this.state.createTimeET;
        this.props.dispatch({
            type:'ordercg/synchronous',
            payload:values
        });
    }

    //时间搜索部分
    hindDateChange=(dates,dateString)=>{
        this.setState({
            createTimeST:dateString[0],
            createTimeET:dateString[1]
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form  className='formbox'>
                <Row gutter={40} className='formbox_row'>
                    <Col span={24} className='formbox_col'>
                        <Row>
                            <div className='serach_form'>
                                <FormItem label='供应商名称'>
                                    {getFieldDecorator('name')(
                                    <Input placeholder="请输入供应商名称" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='采购单号'>
                                    {getFieldDecorator('asnNo')(
                                    <Input placeholder="请输入采购单号" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品编码'>
                                    {getFieldDecorator('pdCode')(
                                    <Input placeholder="请输入商品编码" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('pdName')(
                                    <Input placeholder="请输入商品名称" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='采购单状态'>
                                    {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择采购单状态">
                                        <Option value='10'>待收货</Option>
                                        <Option value='20'>收货中</Option>
                                        <Option value='30'>已收货</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='付款状态'>
                                    {getFieldDecorator('payStatus')(
                                    <Select allowClear={true} placeholder="请选择付款状态">
                                        <Option value='10'>待付款</Option>
                                        <Option value='20'>已付款</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                {/* 添加下单时间 */}

                                <FormItem label='发票状态'>
                                    {getFieldDecorator('invoiceStatus')(
                                    <Select allowClear={true} placeholder="请选择发票状态">
                                        <Option value={10}>未开始</Option>
                                        <Option value={20}>进行中</Option>
                                        <Option value={30}>已完成</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='是否结案'>
                                    {getFieldDecorator('caseStatus')(
                                    <Select allowClear={true} placeholder="请选择是否结案">
                                        <Option value={1}>是</Option>
                                        <Option value={0}>否</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='下单时间'>
                                    {
                                        <RangePicker
                                            format="YYYY-MM-DD"
                                            value={this.state.createTimeST?
                                                    [moment(this.state.createTimeST), moment(this.state.createTimeET)]
                                                    :null
                                                }
                                            onChange={this.hindDateChange.bind(this)}
                                        />
                                    }
                                </FormItem>
                            </div>
                        </Row>
                    </Col>
                </Row>
                <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
                    <Button type="primary" htmlType="submit" size='large' onClick={this.handleSearch.bind(this)}>搜索</Button>
                </div>
            </Form>
        );
    }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.ordercg;
    return {limit,currentPage};
}


const OrdercgSearch = Form.create()(OrdercgSearchForm);
export default connect(mapStateToProps)(OrdercgSearch);
