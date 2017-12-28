import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class GoodsEditForm extends React.Component{
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
                    label="商品模板"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
	              >
	              {getFieldDecorator('template', {
	              	    // initialValue:2
	              })(
	                <RadioGroup>
                        <Radio value={1}>单列展示</Radio>
                        <Radio value={2}>双列展示</Radio>
	                </RadioGroup>
	              )}
	            </FormItem>
	            <FormItem
                    label="链接商品1"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}  
	            >
                {getFieldDecorator('code', {
                    rules: [{ required: true, message: '请输入商品编码' }],
                    // initialValue:this.state.currentData.code
                })(
                    <Input placeholder = '请输入商品编码'/>
                )}
	            </FormItem>
                <FormItem
                        wrapperCol={{ offset: 8}}
                >
                    <p style={{color:'red'}}>没有该商品编码</p>
                </FormItem>
	            <FormItem
                    label="链接商品2"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
	            >
	              {getFieldDecorator('rowcode', {
                        rules: [{ required: true, message: '请输入商品编码' }],
                        // initialValue:this.state.currentData.rowcode
	              })(
	                <Input placeholder = '请输入商品编码'/>
	              )}
	            </FormItem>
                <FormItem
                        wrapperCol={{ offset: 8}}
                >
                    <p style={{color:'red'}}>没有该商品编码</p>
                </FormItem>
                <FormItem
                        wrapperCol={{ offset: 8}}
                >
                    <p style={{color:'red'}}>输入的商品编码相同</p>
                </FormItem>
	            <FormItem wrapperCol={{offset: 8}}>
                    <Button style={{marginRight:'10px'}}>取消</Button>
                    <Button htmlType="submit">确定</Button>
	            </FormItem>
	        </Form>
		)
	}

	componentDidMount(){
		
	}
}

const GoodsEdit = Form.create()(GoodsEditForm);
export default GoodsEdit;