import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';
import { connect } from 'dva';
import {deepcCloneObj} from '../../../../utils/commonFc';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class GoodsEditForm extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {

	    }
    }

    radioChange = (e) =>{
        let tempConfigArr = deepcCloneObj(this.props.configArr);
        tempConfigArr[this.props.currentItem].template =e.target.value;
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
                    label="商品模板"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
	              >
	              {getFieldDecorator('template', {
	              	    initialValue:this.props.data?Number(this.props.data.template):1
	              })(
	                <RadioGroup onChange={this.radioChange.bind(this)}>
                        <Radio value={1}>单列展示</Radio>
                        <Radio value={2}>双列展示</Radio>
	                </RadioGroup>
	              )}
	            </FormItem>
                {
                    this.props.data?
                    (
                    this.props.data.template == 1?
                    <FormItem
                        label="链接商品"
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
                    :
                    <div>
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
                            <p style={{color:'red'}}>输入的商品编码相同</p>
                        </FormItem>
                    </div>
                    )
                    :null
                }
                <FormItem
                        wrapperCol={{ offset: 8}}
                >
                    <p style={{color:'red'}}>没有该商品编码</p>
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

const GoodsEdit = Form.create()(GoodsEditForm);
export default connect(mapStateToProps)(GoodsEdit);