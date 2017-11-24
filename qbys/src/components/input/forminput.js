import { Form, Input } from 'antd';
const FormItem = Form.Item;







class App extends React.Component {

    onBlur=(e)=>{
       console.log(e.target.value) 
    }

render() {
    console.log(this)
    const { getFieldDecorator } = this.props.form;
    const rules=[{ required: true, message: 'Please input your note!' }];
    const labelname=null
    return (
    <Form>
        <FormItem
        label={labelname}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        >
        {getFieldDecorator('note', {
            rules: rules,
            initialValue:this.props.values
        })(
            <Input onBlur={this.onBlur.bind(this)}/>
        )}
        </FormItem>
        
        
    </Form>
    );
}
}

const Forminput = Form.create()(App);

export default Forminput;

