import React from 'react';
import '../../style/login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { GetServerData} from '../../services/services';

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
    state={
        passworderron:false
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
                            this.context.router.push('/home')
                        }else{      
                            this.setState({
                                passworderron:true,
                            })
                        }
                    })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input className='loin_input_model' placeholder="请输入用户名" />
                    )}
                </FormItem>
                <FormItem className='login_password'>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input type="password" placeholder="请输入密码" className='loin_input_model'/>
                    )}
                    <p className={this.state.passworderron?'passworderron':'hide'}>请输入正确的密码</p>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
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

