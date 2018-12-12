import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import moment from 'moment';
import * as confgdata  from './confg';
import {timeForMats} from '../../../utils/meth';


const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option
const FormItem = Form.Item;

class Searchform extends React.Component {
    state = {
        startTime: '',
        endTime:'',
    };
    //点击搜索按钮获取搜索表单数据
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            values.payTimeST=this.state.startTime
            values.payTimeET=this.state.endTime
            this.props.hindFormSearch(values)
        });
    }
    //时间搜索部分
    hindDateChange=(dates,dateString)=>{
        this.setState({
            startTime:dateString[0],
            endTime:dateString[1]
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
                                {/* <FormItem label='门店名称'>
                                    {getFieldDecorator('shopName')(
                                        <Input placeholder={confgdata.placeholder_input} autoComplete="off"/>
                                    )}
                                </FormItem> */}
                                <FormItem label='订单号'>
                                    {getFieldDecorator('orderNo')(
                                        <Input placeholder={confgdata.placeholder_input} autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='有赞订单号'>
                                    {getFieldDecorator('outNo')(
                                        <Input placeholder={confgdata.placeholder_input} autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品编码'>
                                    {getFieldDecorator('skuCode')(
                                        <Input placeholder={confgdata.placeholder_input} autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('name')(
                                        <Input placeholder={confgdata.placeholder_input} autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='收货电话'>
                                    {getFieldDecorator('recTelephone')(
                                        <Input placeholder={confgdata.placeholder_input} autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='收货人'>
                                    {getFieldDecorator('recName')(
                                        <Input placeholder={confgdata.placeholder_input} autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='身份证号'>
                                    {getFieldDecorator('idCardNo')(
                                        <Input placeholder={confgdata.placeholder_input} autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='快递单号'>
                                    {getFieldDecorator('expressNo')(
                                        <Input placeholder={confgdata.placeholder_input} autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='订单状态'>
                                    {getFieldDecorator('status')(
                                    <Select allowClear={true} placeholder="请选择">
                                        {
                                            confgdata.orderState.map((item,index)=>{
                                                return <Option value={item.key} key={index}>{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='推送仓库'>
                                    {getFieldDecorator('warehouseId')(
                                    <Select allowClear={true} placeholder="请选择">
                                        {
                                          confgdata.wshouse.map((item,index)=>{
                                              return <Option value={item.key} key={index}>{item.name}</Option>
                                          })
                                        }
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='来源'>
                                    {getFieldDecorator('source')(
                                    <Select allowClear={true} placeholder="请选择">
                                        <Option value={1}>有赞订单</Option>
                                        <Option value={2}>用户订单</Option>
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='下单时间'>
                                        {
                                            <RangePicker
                                                showTime
                                                format={confgdata.dateFormat}
                                                onChange={this.hindDateChange.bind(this)}
                                                value={this.state.startTime?
                                                    [moment(this.state.startTime), moment(this.state.endTime)]
                                                    :null
                                                }
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
    componentDidMount(){
        const startTime=timeForMats(30).t2
        const endTime=timeForMats(30).t1
        this.setState({
            startTime:startTime,
            endTime:endTime
        },function(){
            this.handleSearch()
        })

    }
}


const SearchForm = Form.create()(Searchform);
export default SearchForm;
