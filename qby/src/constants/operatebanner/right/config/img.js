import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';
//引入Avatar上传图片组件
import AvatarImg from './avatar';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

//图片edit区
class EditImgForm extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    }
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
	              {getFieldDecorator('img', {
	              })(
	                <AvatarImg/>  
	              )}
	            </FormItem>
                <FormItem
	              label="链接商品"
	              labelCol={{ span: 8 }}
	              wrapperCol={{ span: 9 }}
	            >
	              {getFieldDecorator('code', {
	                rules: [{ message: '请输入商品编码' }],
	                //  initialValue:this.state.currentData.code
	              })(
	                <Input placeholder = '请输入商品编码'/>
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
                    <Button>确定</Button>
	            </FormItem>
            </Form>
		)
	}

	componentDidMount(){
		
	}
}

const ImgEdit = Form.create()(EditImgForm);
export default ImgEdit;