import { Form, Row, Col, Input, Button, Icon,Select} from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option

class AdvancedSearchForm extends React.Component {
    //搜索
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            this.initWarehouseList(values,this.props.limit,0)
            this.synchronousState(values)
            this.initselect()
        });
    }
    //搜搜请求数据
    initWarehouseList=(values,limit,currentPage)=>{
        values.limit=limit
        values.source='1'
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'onlinegood/fetch',
            payload:{code:'qerp.web.ec.pd.spu.query',values:values}
        })
        this.props.dispatch({type:'tab/loding',payload:true})
    }
    //同步data
    synchronousState=(values)=>{
        this.props.dispatch({
            type:'onlinegood/synchronous',
            payload:values
        })
    }
    
    initselect=()=>{
		const selectedRows=[]
		const selectedRowKeys=[]
		this.props.dispatch({
	    	type:'onlinegood/select',
	    	payload:{selectedRowKeys,selectedRows}
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
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('name')(
                                        <Input placeholder="请输入" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品编码'>
                                    {getFieldDecorator('code')(
                                        <Input placeholder="请输入" className='form_input_width' autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品条码'>
                                    {getFieldDecorator('barcode')(
                                        <Input placeholder="请输入" className='form_input_width' autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品品牌'>
                                    {getFieldDecorator('pdBrandName')(
                                        <Input placeholder="请输入" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem label='商品状态'>
                                    {getFieldDecorator('spuStatus')(
                                        <Select allowClear={true} placeholder="请选择">
                                            <Option value="10">售卖</Option>
                                            <Option value="20">停售</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label='商品完整'>
                                    {getFieldDecorator('infoStatus')(
                                        <Select allowClear={true} placeholder="请选择">
                                            <Option value='1'>完整</Option>
                                            <Option value='0'>不完整</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label='保税仓库'>
                                    {getFieldDecorator('warehouseId')(
                                        <Select allowClear={true} placeholder="请选择">
                                            <Option value='1'>杭州下沙保税</Option>
                                            <Option value='2'>重庆丰趣保税</Option>
                                            <Option value='3'>香港天弋丽直邮</Option>
                                            <Option value='5'>德国直邮</Option>
                                            <Option value='6'>杭州学月保税</Option>
                                            <Option value='4'>知识付费</Option>
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
         this.handleSearch()
    }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.onlinegood;
    return {limit,currentPage};
}

const Goodssearchform = Form.create()(AdvancedSearchForm);
export default connect(mapStateToProps)(Goodssearchform);