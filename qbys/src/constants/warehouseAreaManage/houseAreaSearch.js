import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
const FormItem = Form.Item;
import { connect } from 'dva';
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class HouseAreaSearchForm extends React.Component {
  state = {};

  //点击搜索按钮获取搜索表单数据
  handleSearch = (e) => {
    this.props.form.validateFields((err, values) => {
        this.initHouseAreaList(values,this.props.limit,0);
        this.syncState(values);
    });
  }


  //搜索请求数据
  initHouseAreaList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'houseAreaManage/fetch',
            payload:{code:'qerp.web.ws.area.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'houseAreaManage/synchronous',
            payload:values
        });
    }

    //请求仓库列表
	wsList=()=>{
        this.props.dispatch({
            type:'IndexPage/wslistfetch',
            payload:{code:'qerp.web.ws.warehouse.all.list',values:{}}
        })
	}

  render() {
      const { getFieldDecorator } = this.props.form;
      const adminType=eval(sessionStorage.getItem('adminType'));
    return (
        <Form  className='formbox'>
            <Row gutter={40} className='formbox_row'>
                <Col span={24} className='formbox_col'>
                    <Row>
                        <div className='serach_form'>
                            <FormItem label='库区名称'>
                                {getFieldDecorator('keywords')(
                                <Input placeholder="请输入库区名称"/>
                                )}
                            </FormItem>
                            <FormItem label='库区状态'>
                                {getFieldDecorator('status')(
                                <Select allowClear={true} placeholder="请选择库区状态">
                                    <Option value="1">启用</Option>
                                    <Option value="0">禁用</Option>
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
                                :
                                null
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
      //请求仓库列表
    this.wsList();
  }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.houseAreaManage;
    const {warehouses}=state.IndexPage;
    return {limit,currentPage,warehouses};
}


const HouseAreaSearch = Form.create()(HouseAreaSearchForm);
export default connect(mapStateToProps)(HouseAreaSearch);