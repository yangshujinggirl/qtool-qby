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
		let tempConfigArr = deepcCloneObj(this.props.configArr);
        tempConfigArr[this.props.currentItem].text = e.target.value;
        this.props.dispatch({
            type:'h5config/syncConfigArr',
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
                    <Button style={{marginRight:'10px'}}>取消</Button>
                    <Button>确定</Button>
	            </FormItem>
	        </Form>
		)
	}

	componentDidMount(){
		
	}
}

function mapStateToProps(state) {
	const {configArr,currentItem}= state.h5config;
	return {configArr,currentItem};
}

const RuleEdit = Form.create({
	mapPropsToFields(props) { 
		return { 
            text: {value: props.configArr[props.currentItem].text?props.configArr[props.currentItem].text:''},
		}; 
	}
})(RuleEditForm);

export default connect(mapStateToProps)(RuleEdit);