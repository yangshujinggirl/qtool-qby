import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
import {GetServerData} from '../../services/services';
const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class OrderdbSearchForm extends React.Component {
    state = {
        warehouses:[]
    };

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
            type:'orderdb/fetch',
            payload:{code:'qerp.web.sp.exchange.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'orderdb/synchronous',
            payload:values
        });
    }

    //请求仓库列表
    wslist=()=>{
        const values={type:'1'}
        const result=GetServerData('qerp.web.ws.warehouse.all.list',values);
        result.then((res) => {
           return res;
        }).then((json) => {
            console.log(json)
           if(json.code=='0'){
                const warehouses=json.warehouses
                this.setState({
                    warehouses:warehouses
                })
           }else{
               message.error(json.message);
           }

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
                                <FormItem label='调拨单号'>
                                    {getFieldDecorator('allocationNo')(
                                    <Input placeholder="请输入调拨单号"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品编码'>
                                    {getFieldDecorator('code')(
                                    <Input placeholder="请输入商品编码"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('spuName')(
                                    <Input placeholder="请输入商品名称"/>
                                    )}
                                </FormItem>
                                <FormItem label='调入仓库'>
                                    {getFieldDecorator('callwsWarehouseId')(
                                    <Select allowClear={true} placeholder="请选择调入仓库">
                                    {
                                        this.state.warehouses.map((item,index)=>{
                                            return <Option value={String(item.wsWarehouseId)} key={index}>{item.name}</Option>
                                        })
                                    }
                                    </Select>
                                    )}
                                </FormItem>
                                <FormItem label='调出仓库'>
                                    {getFieldDecorator('outwsWarehouseId')(
                                    <Select allowClear={true} placeholder="请选择调出仓库">
                                    {
                                        this.state.warehouses.map((item,index)=>{
                                            return <Option value={String(item.wsWarehouseId)} key={index}>{item.name}</Option>
                                        })
                                    }
                                    </Select>
                                    )}
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
        this.wslist();
    }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.orderdb;
    return {limit,currentPage};
}


const OrderdbSearch = Form.create()(OrderdbSearchForm);
export default connect(mapStateToProps)(OrderdbSearch);