import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
const FormItem = Form.Item;
import { connect } from 'dva';
import {GetServerData} from '../../services/services';
const Option = Select.Option

class HousePositionSearchForm extends React.Component {
    state = {
        wsAreaList:[]
    };

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
            type:'wsPositionManage/fetch',
            payload:{code:'qerp.web.ws.bin.query',values:values}
        });
        this.props.dispatch({ type:'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'wsPositionManage/synchronous',
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
        const adminType=eval(sessionStorage.getItem('adminType'));
      const { getFieldDecorator } = this.props.form;
        return (
            <Form  className='formbox'>
            <Row gutter={40} className='formbox_row'>
                <Col span={24} className='formbox_col'>
                    <Row>
                        <div className='serach_form'>
                            <FormItem label='库位编码'>
                                {getFieldDecorator('keywords')(
                                <Input placeholder="请输入库位编码"/>
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
                            <FormItem label='所属库区'>
                                {getFieldDecorator('wsAreaId')(
                                <Select allowClear={true} placeholder="请选择所属库区">
                                    {
                                        this.state.wsAreaList.map((item,index)=>{
                                            return <Option key={index} value={String(item.wsAreaId)}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                                )}
                            </FormItem>
                            <FormItem label='库位类型'>
                                {getFieldDecorator('type')(
                                <Select allowClear={true} placeholder="请选择库位类型">
                                    <Option value='10'>零拣</Option>
                                    <Option value='11'>存储</Option>
                                    <Option value='15'>过渡</Option>
                                    <Option value='20'>次品</Option>
                                </Select>
                                )}
                            </FormItem>
                            <FormItem label='库位状态'>
                                {getFieldDecorator('status')(
                                <Select allowClear={true} placeholder="请选择库位状态">
                                    <Option value='1'>启用</Option>
                                    <Option value='0'>禁用</Option>
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
        this.wsList()
        //进行数据请求获取库区列表
        const value={'limit':100};
        const result=GetServerData('qerp.web.ws.area.query',value);
            result.then((res) => {
                return res;
            }).then((json) => {
                if(json.code==0){
                    const data=json.wsAreas;
                    this.setState({
                        wsAreaList:data
                    })
                }
            })
    }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.wsPositionManage;
    const {warehouses}=state.IndexPage;
    return {limit,currentPage,warehouses};
}


const HousePositionSearch = Form.create()(HousePositionSearchForm);
export default connect(mapStateToProps)(HousePositionSearch);