import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class AdvancedSearchForm extends React.Component {
    state = {
        createTimeST: undefined,
        createTimeET:undefined,
    };
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            this.initWarehouseList(values,this.props.limit,0)
            this.synchronousState(values)
            this.initselect()
            
        });
    }
    //搜搜请求数据
    initWarehouseList=(values,limit,currentPage)=>{
        values.createTimeST=this.state.createTimeST 
        values.createTimeET=this.state.createTimeET 
        values.limit=limit
        values.currentPage=currentPage
        this.props.dispatch({
            type:'wscheck/fetch',
            payload:{code:'qerp.web.ws.check.query',values:values}
        })
        this.props.dispatch({type:'tab/loding',payload:true})
    }
    //同步data
    synchronousState=(values)=>{
        values.createTimeST=this.state.createTimeST 
        values.createTimeET=this.state.createTimeET 
        
        this.props.dispatch({
            type:'wscheck/synchronous',
            payload:values
        })
    }
    
    dataonChanges(date, dateString) {
        this.setState({
            createTimeST:dateString[0],
            createTimeET:dateString[1]
        })
    }
      //请求仓库列表
    wsList=()=>{
        this.props.dispatch({
            type:'IndexPage/wslistfetch',
            payload:{code:'qerp.web.ws.warehouse.all.list',values:{}}
        })
    }
    initselect=()=>{
		const selectedRows=[]
		const selectedRowKeys=[]
		this.props.dispatch({
			type:'wscheck/select',
			payload:{selectedRowKeys,selectedRows}
		})
	}
    render() {
        const adminType=eval(sessionStorage.getItem('adminType'));
        const { getFieldDecorator } = this.props.form;
        return (
            <Form  className='formbox'>
                <Row gutter={40} className='formbox_row'>
                    <Col span={24} className='formbox_col'>
                        <Row>
                            <div className='serach_form'>
                                <FormItem label='盘点单号'>
                                    {getFieldDecorator('checkNo')(
                                        <Input placeholder="请输入" className='form_input_width'/>
                                    )}
                                </FormItem>
                                <FormItem label='创建人'>
                                    {getFieldDecorator('username')(
                                        <Input placeholder="请输入" />
                                    )}
                                </FormItem>
                                <FormItem label='商品条码'>
                                    {getFieldDecorator('pdBarcode')(
                                        <Input placeholder="请输入" />
                                    )}
                                </FormItem>
                                <FormItem label='盘点库位'>
                                    {getFieldDecorator('bincode')(
                                        <Input placeholder="请输入" />
                                    )}
                                </FormItem>
                                <FormItem label='盘点状态'>
                                    {getFieldDecorator('status')(
                                        <Select allowClear={true} size="large" placeholder="请选择">
                                            <Option value='10'>待盘点</Option>
                                            <Option value='20'>盘点中</Option>
                                            <Option value='30'>盘点完</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label='打印状态'>
                                    {getFieldDecorator('print')(
                                        <Select allowClear={true} size="large" placeholder="请选择">
                                           <Option value='false'>未打印</Option>
                                           <Option value='true'>已打印</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                {
                                    adminType=='10'?
                                    <FormItem label='所属仓库'>
                                    {getFieldDecorator('wsWarehouseId')(
                                        <Select allowClear={true} placeholder="请选择">
                                            {
                                                this.props.warehouses.map((item,index)=>{
                                                    return  <Option value={item.wsWarehouseId} key={index}>{item.name}</Option>
                                                })
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                                :null
                                }
                                
                                <FormItem label='创建时间'>
                                    {getFieldDecorator('time1')(
                                        <RangePicker
                                            showTime
                                            format="YYYY-MM-DD"
                                            onChange={this.dataonChanges.bind(this)}
                                        />
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
        this.wsList()
         this.handleSearch()
    }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.wscheck;
    const {warehouses}=state.IndexPage;
    return {limit,currentPage,warehouses};
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default connect(mapStateToProps)(WrappedAdvancedSearchForm);