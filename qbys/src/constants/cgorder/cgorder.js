import React from 'react';



import { Form, Select, Input, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class App extends React.Component {
	state={
		a:123
	}
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleSelectChange = (e) => {
	console.log(e.target.value)
    this.props.form.setFieldsValue({
	  note: '123',
	  gender:'1'
    });
  }
  render() {
	const { getFieldDecorator } = this.props.form;
	const a=/^\d{1,6}$/
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="Note"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('note', {
            rules: [{ required: true, message: 'Please input your note!' },{pattern:a,message:'请输入1-6位'}],
          })(
            <Input onChange={this.handleSelectChange.bind(this)}/>
          )}
        </FormItem>
        <FormItem
          label="Gender"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Option value="1">male</Option>
              <Option value="2">female</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 8, offset: 4 }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedApp = Form.create()(App);













function Cgorder() {
  	return (
  		<div>
		   <WrappedApp/>
	    </div>
  	);
}

export default Cgorder;


