import { Form, Select, Input, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class App extends React.Component {
    //修改保存
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.hindCancel()
                const result=GetServerData('qerp.web.bs.userinfo',values)
                result.then((res) => {
                    return res;
                }).then((json) => {
                    if(json.code=='0'){
                        message.success('修改成功')
                        this.props.hindCancel()
                    }
                }) 
            }
        });
    }
    render() {
        const {hindCancel} = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form  style={{width:"100%"}}>
                <FormItem
                    label="姓名"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 6 }}
                    >
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入姓名' }],
                })(
                    <Input />
                )}
                </FormItem>
                <FormItem
                    label="身份证号"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 6 }}
                >
                    {getFieldDecorator('acc', {
                        rules: [{ required: true, message: 'Please input your note!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="收货人"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 6 }}
                >
                    {getFieldDecorator('people', {
                        rules: [{ required: true, message: 'Please input your note!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="收货电话"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 6 }}
                >
                {getFieldDecorator('tel', {
                    rules: [{ required: true, message: 'Please input your note!' }],
                })(
                        <Input />
                )}
                </FormItem>
                <FormItem
                    label="收货地址"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Please input your note!' }],
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