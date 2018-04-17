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
        values.currentPage=currentPage
        this.props.dispatch({
            type:'goods/fetch',
            payload:{code:'qerp.web.pd.spu.query',values:values}
        })
        this.props.dispatch({type:'tab/loding',payload:true})
    }
    //同步data
    synchronousState=(values)=>{
        this.props.dispatch({
            type:'goods/synchronous',
            payload:values
        })
    }
    
    //商品列表
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
                                    {getFieldDecorator('status')(
                                        <Select allowClear={true} placeholder="请选择">
                                            <Option value="10">停售</Option>
                                            <Option value="20">售卖</Option>
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
                                    {getFieldDecorator('isHot')(
                                        <Select allowClear={true} placeholder="请选择">
                                            <Option value="true">杭州仓</Option>
                                            <Option value="false">重庆仓</Option>
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