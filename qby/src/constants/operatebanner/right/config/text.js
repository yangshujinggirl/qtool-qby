import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class TextEditForm extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    }
    }
    
	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<Form>
	     	  	<FormItem
	                wrapperCol={{offset: 2, span: 20 }}
	              >
                {getFieldDecorator('text', {
                //   initialValue:this.state.currentData.text
                })(
                    <TextArea rows={6}/>
                )}
	            </FormItem>
	            <FormItem wrapperCol={{offset: 8}}>
                    <Button style={{marginRight:'10px'}}>取消</Button>
                    <Button>确定</Button>
	            </FormItem>
	        </Form>
		)
	}

	componentDidMount(){
		
	}
}

const TextEdit = Form.create()(TextEditForm);
export default TextEdit;