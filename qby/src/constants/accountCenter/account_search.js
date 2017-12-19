import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
const FormItem = Form.Item;
import { connect } from 'dva';
import {cloneObj} from '../../utils/commonFc';
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;




class AccountSearchForm extends React.Component {
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            this.synchronousState(values)
            this.initWarehouseList(values,this.props.limit,0)
        });
    }
    //搜索请求数据
    initWarehouseList=(values,limit,currentPage)=>{
        let data = cloneObj(values);
        data.limit = limit;
        data.currentPage = currentPage;
        this.props.dispatch({
            type:'account/fetch',
            payload:{code:'qerp.web.ur.user.query',values:data}
        })
        this.props.dispatch({type:'tab/loding',payload:true})
    }
    //同步data
    synchronousState=(values)=>{
        this.props.dispatch({
            type:'account/synchronous',
            payload:values
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
                    <FormItem label='姓名'>
                        {getFieldDecorator('name')(
                            <Input placeholder="请输入" className='form_input_width'/>
                        )}
                    </FormItem>
                    
                    {
                        adminType=='10'?
                        <FormItem label='所属身份'>
                        {getFieldDecorator('warehouseId')(
                            <Select allowClear={true} placeholder="请选择">
                                <Option value='-1'>总部管理</Option>
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
    const {limit,currentPage} = state.account;
    const {warehouses}=state.IndexPage;
    return {limit,currentPage,warehouses};
}


const AccountSearch = Form.create()(AccountSearchForm);
export default connect(mapStateToProps)(AccountSearch);

