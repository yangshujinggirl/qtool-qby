import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import { connect } from 'dva';
import {deepcCloneObj} from '../../../../../../utils/commonFc';

class TextEditForm extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    }
	}

	//显示当时的文本
	showTextCurrent = (e) =>{
		let tempConfigArr = deepcCloneObj(this.props.configArrPre);
        tempConfigArr[this.props.currentItem].text = e.target.value;
        this.props.dispatch({
            type:'h5config/syncConfigArrPre',
            payload:tempConfigArr
        });
	}

	handleSubmit = (e) =>{
		console.log(this.props)
		e.preventDefault();
		let configArrEnd = deepcCloneObj(this.props.configArr);
			configArrEnd[this.props.currentItem].text = this.props.configArrPre[this.props.currentItem].text;
			this.props.dispatch({
				type:'h5config/syncConfigArr',
				payload:configArrEnd
			});
	}

	handCancel = () =>{
		this.props.form.setFieldsValue({
			text: this.props.configArr.length?
				  (this.props.configArr[this.props.currentItem].text?this.props.configArr[this.props.currentItem].text:''):
				  ''
		});
		let tempConfigArr = deepcCloneObj(this.props.configArrPre);
		tempConfigArr[this.props.currentItem].text =this.props.configArr.length?
													(this.props.configArr[this.props.currentItem].text?
													 this.props.configArr[this.props.currentItem].text:
													 ''):
													 '';
		this.props.dispatch({
				type:'h5config/syncConfigArrPre',
				payload:tempConfigArr
		});
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
                    <TextArea maxLength='500' rows={6} onChange={this.showTextCurrent.bind(this)}/>
                )}
	            </FormItem>
	            <FormItem wrapperCol={{offset: 8}}>
                    <Button style={{marginRight:'10px'}} onClick={this.handCancel.bind(this)}>取消</Button>
                    <Button onClick={this.handleSubmit.bind(this)}>确定</Button>
	            </FormItem>
	        </Form>
		)
	}

	componentDidMount(){

	}
}

function mapStateToProps(state) {
	const {configArr,configArrPre,currentItem}= state.h5config;
	return {configArr,configArrPre,currentItem};
}

const TextEdit = Form.create({
	mapPropsToFields(props) {
		return {
            text: Form.createFormField({value: props.configArrPre[props.currentItem].text?props.configArrPre[props.currentItem].text:''}),
		};
	}
})(TextEditForm);

export default connect(mapStateToProps)(TextEdit);
