import '../../style/login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { GetServerData} from '../../services/service';

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
    state={
        passworderron:false,
        messages:null
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const result=GetServerData('qerp.web.bs.login',values)
                result.then((res) => {
                    return res;
                }).then((json) => {
                    if(json.code=='0'){
                        sessionStorage.setItem('name', JSON.stringify(json.name));
                        sessionStorage.setItem('adminType', JSON.stringify(json.adminType));
                        sessionStorage.setItem('wsName', JSON.stringify(json.wsName));
                        sessionStorage.setItem('fileDomain', JSON.stringify(json.fileDomain));
                        this.context.router.push('/home')
                       
                    }else{
                        this.setState({
                            passworderron:true,
                            messages:json.message
                        })
                    }
                })
            }
        });
    }
    password=()=>{
        this.setState({
            passworderron:false
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input className='loin_input_model' placeholder="请输入用户名" />
                    )}
                </FormItem>
                <FormItem className='login_password'>
                    {getFieldDecorator('password', {
                        rules:[{required:true, message:'请输入正确的密码'}]
                    })(
                        <Input type="password" placeholder="请输入密码" className='loin_input_model' onChange={this.password.bind(this)}/>
                    )}
                    <p className={this.state.passworderron?'passworderron':'hide'}>{this.state.messages}</p>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                </FormItem>
                <Checkbox className='check'>记住密码</Checkbox>
            </Form>
        );
    }
}

NormalLoginForm.contextTypes= {
    router: React.PropTypes.object
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;

