import { Form, Select, Input, Button ,Cascader,message} from 'antd';
import {GetServerData} from '../../../services/services';
import './orderuser.css';


const FormItem = Form.Item;
const Option = Select.Option;

class App extends React.Component {
    state={
        recProvince:null,
        recCity:null,
        recDistrict:null
    }
    //修改保存
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.ecOrderId=this.props.ecOrderId
                values.recProvince=this.state.recProvince
                values.recCity=this.state.recCity
                values.recDistrict=this.state.recDistrict
                const result=GetServerData('qerp.web.ec.od.userOrder.save',values)
                result.then((res) => {
                    return res;
                }).then((json) => {
                    if(json.code=='0'){
                        message.success('修改成功')
                        this.props.hindCancel()
                        this.props.infofetch(this.props.ecOrderId)
                    }
                })
            }
        });
    }

    initCitylist=(recProvince,recCity,recDistrict)=>{
        this.setState({
            recProvince:recProvince,
            recCity:recCity,
            recDistrict:recDistrict
        })
    }

    hindrecProvince=(e)=>{
        this.setState({
            recProvince:e.target.value
        })
    }

    hindrecCity=(e)=>{
        this.setState({
            recCity:e.target.value
        })
    }

    hindrecDistrict=(e)=>{
        this.setState({
            recDistrict:e.target.value
        })
    }
    render() {
        const {hindCancel} = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form  style={{width:"100%"}}>
                <FormItem
                    label="姓名"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 8 }}
                    >
                {getFieldDecorator('idCardName', {
                    rules: [{ required: true, message: '请输入姓名' }],
                })(
                    <Input />
                )}
                </FormItem>
                <FormItem
                    label="身份证号"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('idCardNo', {
                        rules: [{ required: true, message: '请输入身份证号' },{pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,message:'请输入合法的身份证号'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="收货人"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('recName', {
                        rules: [{ required: true, message: '请输入收货人' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="收货电话"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 8 }}
                >
                {getFieldDecorator('recTelephone', {
                    rules: [{ required: true, message: '请输入收货电话' }],
                })(
                        <Input />
                )}
                </FormItem>


                <FormItem
                    label="收货城市"
                    labelCol={{ span: 3,offset: 1 }}
                    wrapperCol={{ span: 11 }}
                    className='lists'
                    >
                        {getFieldDecorator('spAddressId', {
                          rules:[{required:true,message:"请填写收货城市"}]
                        })(
                            <div className='lists-con'>
                                <Input value={this.state.recProvince} onChange={this.hindrecProvince.bind(this)} placeholder='省'/>
                                <Input value={this.state.recCity} onChange={this.hindrecCity.bind(this)} placeholder='市'/>
                                <Input value={this.state.recDistrict} onChange={this.hindrecDistrict.bind(this)} placeholder='区'/>
                                <span style={{color:'#d9d9d9'}}>(注:依次为省、市、区)</span>
                            </div>
                        )}
                </FormItem>
                <FormItem
                    label="收货地址"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('recAddress', {
                        rules: [{ required: true, message: '请输入收货地址' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 4, offset: 4 }}
                >
                    <div>
                        <Button onClick={hindCancel} className='mr10'>
                            取消
                        </Button>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                            确定
                        </Button>
                    </div>
                </FormItem>
            </Form>
        );
    }

}

const WrappedApp = Form.create()(App);


export default WrappedApp;
