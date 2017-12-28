import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';
import {deepcCloneObj} from '../../../../utils/commonFc';
import {GetServerData} from '../../../../services/services';
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
			code:''
	    }
	}
		
	saveCode = (e) =>{
		let tempConfigArr = deepcCloneObj(this.props.configArr);
			tempConfigArr[this.props.currentItem].code = e.target.value;
			this.props.dispatch({
					type:'h5config/syncConfigArr',
					payload:tempConfigArr
			});
	}

	handleSubmit = (e) =>{
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if(!values.code){
					return false;
				}
				const result=GetServerData('qerp.web.pd.banner.config.pdInfo',values);
				// result.then((res) => {
				// 	return res;
				// }).then((json) => {
				// 	if(json.code == "0"){
						
				// 	}
				// })
			}
		})
	}

	initFc = () =>{
		const syncInitFc = {
			changeFormValue:this.changeFormValue
		}
		this.props.dispatch({
			type:'h5config/syncInitFc',
			payload:syncInitFc
		});
	}
	
	changeFormValue = (index) =>{
		this.props.form.setFieldsValue({
			code: this.props.configArr[index].code?this.props.configArr[index].code:'',
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
	                <AvatarImg/>  
	            </FormItem>
                <FormItem
	              label="链接商品"
	              labelCol={{ span: 8 }}
	              wrapperCol={{ span: 9 }}
	            >
	              {getFieldDecorator('code', {
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
                    <Button style={{marginRight:'10px'}}>取消</Button>
                    <Button onClick={this.handleSubmit.bind(this)}>确定</Button>
	            </FormItem>
            </Form>
		)
	}

	componentDidMount(){
		this.initFc()
	}
}

function mapStateToProps(state) {
	const {configArr,currentItem}= state.h5config;
	return {configArr,currentItem};
}

const ImgEdit = Form.create()(EditImgForm);
export default connect(mapStateToProps)(ImgEdit);