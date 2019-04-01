import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';
import {deepcCloneObj} from '../../../../../../utils/commonFc';
import {GetServerData} from '../../../../../../services/services';
import { connect } from 'dva';
//引入Avatar上传图片组件
import AvatarImg from './avatar';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

//图片edit区
class EditImgForm extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
			pdCode:''
	    }
	}

	saveCode = (e) =>{
		let tempConfigArr = deepcCloneObj(this.props.configArrPre);
			tempConfigArr[this.props.currentItem].pdCode = e.target.value;
			this.props.dispatch({
					type:'h5config/syncConfigArrPre',
					payload:tempConfigArr
			});
	}

	handleSubmit = (e) =>{
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			let configArrEnd = deepcCloneObj(this.props.configArr);
			configArrEnd[this.props.currentItem].pdCode =values.pdCode;
			configArrEnd[this.props.currentItem].text = this.props.configArrPre[this.props.currentItem].text;
			this.props.dispatch({
				type:'h5config/syncConfigArr',
				payload:configArrEnd
			});
			if (!err) {
				if(!values.pdCode){
					return false;
				}
				const result=GetServerData('qerp.web.pd.banner.config.pdInfo',values);
			}
		})
	}

	handCancel = () =>{
		this.props.form.setFieldsValue({
			pdCode: this.props.configArr.length?
				  (this.props.configArr[this.props.currentItem].pdCode?this.props.configArr[this.props.currentItem].pdCode:''):
				  ''
		});
		let tempConfigArr = deepcCloneObj(this.props.configArrPre);
		tempConfigArr[this.props.currentItem].pdCode =this.props.configArr.length?
													(this.props.configArr[this.props.currentItem].pdCode?
													 this.props.configArr[this.props.currentItem].pdCode:
													 ''):
													 '';
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
		const { getFieldDecorator,getFieldProps } = this.props.form;
		return (
			<Form>
   	  	<FormItem
            label="显示图片"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 6 }}
            >
					<AvatarImg data={this.props.configArrPre[this.props.currentItem].text?
									this.props.configArrPre[this.props.currentItem].text:
									null}
									/>
        </FormItem>
        <FormItem
	        label="链接商品"
	        labelCol={{ span: 8 }}
	        wrapperCol={{ span: 9 }}
	      >
	        {getFieldDecorator('pdCode', {
	          	rules: [{ message: '请输入商品编码' }],
	           	initialValue:''
	        })(
						<Input placeholder='请输入商品编码' onChange={this.saveCode.bind(this)}/>
	        )}
	      </FormItem>
        <FormItem
                wrapperCol={{ offset: 8}}
                style={{marginBottom:'0',marginTop:'-20px'}}
        >
        {/* 'banner_message' */}
            <p className='banner_message_w'>请输入正确的商品编码</p>
        </FormItem>
        <FormItem
         wrapperCol={{ offset: 8}}
        >
          <Button style={{marginRight:'10px'}} onClick={this.handCancel.bind(this)}>取消</Button>
          <Button onClick={this.handleSubmit.bind(this)}>确定</Button>
        </FormItem>
      </Form>
		)
	}

	componentDidUpdate(){

	}
}

function mapStateToProps(state) {
	const {configArr,configArrPre,currentItem}= state.h5config;
	return {configArr,configArrPre,currentItem};
}

const ImgEdit = Form.create({
	mapPropsToFields(props) {
		return {
			pdCode:Form.createFormField({value: props.configArrPre[props.currentItem].pdCode?props.configArrPre[props.currentItem].pdCode:''})
		};
	}
})(EditImgForm);
export default connect(mapStateToProps)(ImgEdit);
