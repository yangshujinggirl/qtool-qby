import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class AdvancedSearchForm extends React.Component {
    state = {
        createTimeST: undefined,
        createTimeET:undefined,
        expectedTimeST:undefined,
        expectedTimeET:undefined
    };
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            this.initWarehouseList(values,this.props.limit,0)
            this.synchronousState(values)
            // this.initselect()
        });
    }
    //搜搜请求数据
    initWarehouseList=(values,limit,currentPage)=>{
        // values.createTimeST=this.state.createTimeST 
        // values.createTimeET=this.state.createTimeET 
        // values.expectedTimeST=this.state.expectedTimeST 
        // values.expectedTimeET=this.state.expectedTimeET 
        values.limit=limit
        values.currentPage=currentPage
        this.props.dispatch({
            type:'goods/fetch',
            payload:{code:'qerp.web.pd.spu.query',values:values}
        })
        this.props.dispatch({type:'tab/loding',payload:true})
    }
    //同步data
    synchronousState=(values)=>{
        values.createTimeST=this.state.createTimeST 
        values.createTimeET=this.state.createTimeET 
        values.expectedTimeST=this.state.expectedTimeST 
        values.expectedTimeET=this.state.expectedTimeET 
        this.props.dispatch({
            type:'goods/synchronous',
            payload:values
        })
    }
    hinddataChange=(dates, dateString)=>{
        this.setState({
            createTimeST:dateString[0],
            createTimeET:dateString[1]
        })
    }
    dataonChanges(date, dateString) {
        this.setState({
            expectedTimeST:dateString[0],
            expectedTimeET:dateString[1]
        })
    }
      //品牌列表
      Categorylist=()=>{
        let value={
            getChildren:false,
            enabled:true
        }
        this.props.dispatch({
            type:'IndexPage/categoryfetch',
            payload:{code:'qerp.web.pd.category.list',values:value}
        })
    }
    initselect=()=>{
		const selectedRows=[]
		const selectedRowKeys=[]
		this.props.dispatch({
	    	type:'goods/select',
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
                                <FormItem label='商品编码'>
                                    {getFieldDecorator('code')(
                                        <Input placeholder="请输入" className='form_input_width'/>
                                    )}
                                </FormItem>
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('name')(
                                        <Input placeholder="请输入" />
                                    )}
                                </FormItem>
                                <FormItem label='品牌分类'>
                                    {getFieldDecorator('pdBrandName')(
                                        <Input placeholder="请输入" />
                                    )}
                                </FormItem>
                                <FormItem label='商品分类'>
                                    {getFieldDecorator('pdCategory1Id')(
                                        <Select allowClear={true} size="large" placeholder="请选择">
                                            {
                                                this.props.pdCategorysList.map((item,index)=>{
                                                    return (<Option value={String(item.pdCategoryId)} key={index}>{item.name}</Option>)
                                                })
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label='是否完整'>
                                    {getFieldDecorator('infoStatus')(
                                        <Select allowClear={true} size="large" placeholder="请选择">
                                            <Option value='1'>是</Option>
                                            <Option value='0'>否</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label='是否在售'>
                                    {getFieldDecorator('status')(
                                        <Select allowClear={true} size="large" placeholder="请选择">
                                            <Option value="10">是</Option>
                                            <Option value="20">否</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label='是否上新'>
                                    {getFieldDecorator('isNew')(
                                        <Select allowClear={true} size="large" placeholder="请选择">
                                            <Option value="true">是</Option>
                                            <Option value="false">否</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label='是否畅销'>
                                    {getFieldDecorator('isHot')(
                                        <Select allowClear={true} size="large" placeholder="请选择">
                                            <Option value="true">是</Option>
                                            <Option value="false">否</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label='直邮商品'>
                                    {getFieldDecorator('isDirectExpress')(
                                        <Select allowClear={true} size="large" placeholder="请选择">
                                            <Option value="1">是</Option>
                                            <Option value="0">否</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label='预售商品'>
                                    {getFieldDecorator('isPresell')(
                                        <Select allowClear={true} size="large" placeholder="请选择">
                                            <Option value="1">是</Option>
                                            <Option value="0">否</Option>
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
         this.Categorylist()
        this.handleSearch()
    }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.goods;
    const {pdCategorysList}=state.IndexPage;
    return {limit,currentPage,pdCategorysList};
}

const Goodssearchform = Form.create()(AdvancedSearchForm);
export default connect(mapStateToProps)(Goodssearchform);