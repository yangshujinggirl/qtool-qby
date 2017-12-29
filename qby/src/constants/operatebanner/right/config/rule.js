import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import { connect } from 'dva';
import {deepcCloneObj} from '../../../../utils/commonFc';

class RuleEditForm extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    }
	}
	
	//显示当时的文本
	showRuleCurrent = (e) =>{
		let tempConfigArr = deepcCloneObj(this.props.configArrPre);
        tempConfigArr[this.props.currentItem].text = e.target.value;
        this.props.dispatch({
            type:'h5config/syncConfigArrPre',
            payload:tempConfigArr
        });
	}

	handleSubmit = (e) =>{
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
                            //initialValue:this.props.currentData.text
                    })(
                        <TextArea rows={6} onKeyUp={this.showRuleCurrent.bind(this)}/>
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

const RuleEdit = Form.create({
	mapPropsToFields(props) { 
		return { 
            text: {value: props.configArrPre[props.currentItem].text?props.configArrPre[props.currentItem].text:''},
		}; 
	}
})(RuleEditForm);

export default connect(mapStateToProps)(RuleEdit);