import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';
import { connect } from 'dva';
import {deepcCloneObj} from '../../../../../utils/commonFc';
import {GetServerData2} from '../../../../../services/services';
import {GetServerData} from '../../../../../services/services';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class GoodsEditForm extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {}
    }

    radioChange = (e) =>{
        let tempConfigArr = deepcCloneObj(this.props.configArrPre);
        let configArrEnd = deepcCloneObj(this.props.configArr);
        tempConfigArr[this.props.currentItem]={};
        tempConfigArr[this.props.currentItem].template =e.target.value;
        tempConfigArr[this.props.currentItem].type = 2;
        configArrEnd[this.props.currentItem]={};
        configArrEnd[this.props.currentItem].template =e.target.value;
        configArrEnd[this.props.currentItem].type = 2;
        this.props.dispatch({
            type:'h5config/syncConfigArrPre',
            payload:tempConfigArr
        });
        this.props.dispatch({
            type:'h5config/syncConfigArr',
            payload:configArrEnd
        });
    }

    handleSubmit = (e) =>{
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
                if(values.rowcode){
                    if(values.rowcode == values.code){
                        message.error('输入的商品编码相同',.8);
                        return false;
                    }else{
                        let data = {"code":values.code};
                        const result=GetServerData2('qerp.web.pd.cbanner.config.pdInfo',data);
                        result.then((res) => {
                            return res;
                        }).then((json) => {
                            if(json.code == "0"){
                                let tempData = this.props.data;
                                tempData.pdSpu = {};
                                tempData.pdSpu.url =  json.pdSpu.url;
                                tempData.pdSpu.name = json.pdSpu.name;
                                tempData.pdSpu.price = json.pdSpu.price;
                                let data2={"code":values.rowcode};
                                const result2=GetServerData2('qerp.web.pd.cbanner.config.pdInfo',data2);
                                result2.then((res) => {
                                    return res;
                                }).then((json) => {
                                    if(json.code == "0"){
                                        tempData.rowPdSpu = {};
                                        tempData.rowPdSpu.url =  json.pdSpu.url;
                                        tempData.rowPdSpu.name = json.pdSpu.name;
                                        tempData.rowPdSpu.price = json.pdSpu.price;
                                        let tempConfigArr = deepcCloneObj(this.props.configArrPre);
                                        tempConfigArr[this.props.currentItem] =tempData;
                                        this.props.dispatch({
                                            type:'h5config/syncConfigArrPre',
                                            payload:tempConfigArr
                                        });
                                        let configArrEnd = deepcCloneObj(this.props.configArr);
                                        configArrEnd[this.props.currentItem] = tempData;
                                        this.props.dispatch({
                                            type:'h5config/syncConfigArr',
                                            payload:configArrEnd
                                        });
                                    }else{
                                        // message.error('未找到商品2编码',.8);
                                        message.error('商品2'+json.message,1);
                                    }
                                })
                            }else{
                                // message.error('未找到商品1编码',.8);
                                message.error('商品1'+json.message,1);
                            }
                        })
                    }
                }else{
                    const result=GetServerData('qerp.web.pd.cbanner.config.pdInfo',values);
                    result.then((res) => {
                        return res;
                    }).then((json) => {
                        if(json.code == "0"){
                            let tempData = this.props.data;
                            tempData.pdSpu = {};
                            tempData.pdSpu.url =  json.pdSpu.url;
                            tempData.pdSpu.name = json.pdSpu.name;
                            tempData.pdSpu.price = json.pdSpu.price;
                            let tempConfigArr = deepcCloneObj(this.props.configArrPre);
                            tempConfigArr[this.props.currentItem] =tempData;
                            this.props.dispatch({
                                type:'h5config/syncConfigArrPre',
                                payload:tempConfigArr
                            });
                            let configArrEnd = deepcCloneObj(this.props.configArr);
                            configArrEnd[this.props.currentItem] = tempData;
                            this.props.dispatch({
                                type:'h5config/syncConfigArr',
                                payload:configArrEnd
                            });
                        }
                    })
                }
			}
		})
    }

    handCancel = () =>{
		this.props.form.setFieldsValue({
			code: this.props.configArr.length?
				  (this.props.configArr[this.props.currentItem].code?this.props.configArr[this.props.currentItem].code:''):
                  '',
            rowcode: this.props.configArr.length?
            (this.props.configArr[this.props.currentItem].rowcode?this.props.configArr[this.props.currentItem].rowcode:''):
            ''
		});
		let tempConfigArr = deepcCloneObj(this.props.configArrPre);
		tempConfigArr[this.props.currentItem].code =this.props.configArr.length?
													(this.props.configArr[this.props.currentItem].code?
													 this.props.configArr[this.props.currentItem].code:
													 ''):
													 '';
		tempConfigArr[this.props.currentItem].rowcode =this.props.configArr.length?
													(this.props.configArr[this.props.currentItem].rowcode?
													 this.props.configArr[this.props.currentItem].rowcode:
													 ''):
													 '';
		this.props.dispatch({
				type:'h5config/syncConfigArrPre',
				payload:tempConfigArr
		});
	}

    //实时保存商品编码
	saveGoodCode = (e) =>{
        let tempConfigArr = deepcCloneObj(this.props.configArrPre);
        tempConfigArr[this.props.currentItem].code = e.target.value;
        this.props.dispatch({
            type:'h5config/syncConfigArrPre',
            payload:tempConfigArr
        });
    }

    //实时保存商品编码
    saveRowCode = (e) =>{
        let tempConfigArr = deepcCloneObj(this.props.configArrPre);
        tempConfigArr[this.props.currentItem].rowcode = e.target.value;
        this.props.dispatch({
            type:'h5config/syncConfigArrPre',
            payload:tempConfigArr
        });
    }

	render(){
        const { getFieldDecorator } = this.props.form;
		return (
            this.props.data.template == 1?
            <Form>
	     	  	<FormItem
                    label="商品模板"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
	              >
	                <RadioGroup onChange={this.radioChange.bind(this)} value={Number(this.props.data.template)}>
                        <Radio value={1}>单列展示</Radio>
                        <Radio value={2}>双列展示</Radio>
	                </RadioGroup>
	            </FormItem>
                <FormItem
                    label="链接商品"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                >
                {getFieldDecorator('code', {
                    rules: [{ required: true, message: '请输入商品编码' }],
                    // initialValue:this.state.currentData.code
                })(
                    <Input placeholder = '请输入商品编码' onChange={this.saveGoodCode.bind(this)}/>
                )}
                </FormItem>
	            <FormItem wrapperCol={{offset: 8}}>
                    <Button style={{marginRight:'10px'}} onClick={this.handCancel.bind(this)}>取消</Button>
                    <Button onClick={this.handleSubmit.bind(this)}>确定</Button>
	            </FormItem>
	        </Form>
            :
            <Form>
                <FormItem
                    label="商品模板"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
	              >
	                <RadioGroup onChange={this.radioChange.bind(this)} value={Number(this.props.data.template)}>
                        <Radio value={1}>单列展示</Radio>
                        <Radio value={2}>双列展示</Radio>
	                </RadioGroup>
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
                    <Input placeholder = '请输入商品编码' onChange={this.saveGoodCode.bind(this)}/>
                )}
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
                    <Input placeholder = '请输入商品编码' onChange={this.saveRowCode.bind(this)}/>
                )}
                </FormItem>
                {/* <p style={{color:'red'}}>输入的商品编码相同</p> */}
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
    const {configArr,currentItem,configArrPre}= state.h5config;
	return {configArr,currentItem,configArrPre};
}

const GoodsEdit = Form.create({
    mapPropsToFields(props) {
		return {
            code:Form.createFormField({value: props.configArrPre[props.currentItem].code?props.configArrPre[props.currentItem].code:''}) ,
            rowcode:Form.createFormField({value: props.configArrPre[props.currentItem].rowcode?props.configArrPre[props.currentItem].rowcode:''})
		};
	}
})(GoodsEditForm);
export default connect(mapStateToProps)(GoodsEdit);
