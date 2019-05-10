import React from 'react';
import {GetServerData} from '../../services/services';
import {deepcCloneObj} from '../../utils/commonFc';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col,DatePicker,Radio} from 'antd';
import moment from 'moment';
import Avatar from './avatar';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
import './index.less'

class OperatebannerEditForm extends React.Component{

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	//请求页面初始化数据
  	initDateEdit = (value) =>{
		  //请求用户信息
  		this.props.dispatch({type:'operatebanner/editfetch',payload:value})
    	this.props.dispatch({ type: 'tab/loding', payload:true})
	}

	//删除当前tab
	deleteTab=()=>{
		const pane = eval(sessionStorage.getItem("pane"));
		if(pane.length<=1){
			return
		}
		if(this.props.data){
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:'404000edit'+this.props.data.pdBannerId
			  });
		}else{
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:'404000edit'
			});
		}
	}
	//刷新列表
	refreshList=()=>{
		this.props.dispatch({
      type:'operatebanner/fetch',
      payload:{code:'qerp.web.pd.banner.list',values:this.props.values}
		});
		this.props.dispatch({ type: 'tab/loding', payload:true})
	}
	//初始化state
	initState=()=>{
		this.props.dispatch({
      type:'operatebanner/initState',
      payload:{}
		})
  }

	//保存
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		    if (!err) {
                let data = values;
                if(!this.props.formValue.url){
                    message.error('请上传图片',.8)
                    return false;
                }else{
                    data.url = this.props.formValue.url;
                }
                if(this.props.data){
                    data.pdBannerId = this.props.data.pdBannerId;
                }
								data.type = 10;
								delete data.jumpCode;
								if(values.configureCode){
									values.configureCode = values.configureCode.replace(/\s+/g, "")
								};
								if(values.configureUrl){
									values.configureUrl = values.configureUrl.replace(/\s+/g, "")
								};
                const result=GetServerData('qerp.web.pd.banner.save',{"pdBanner":data});
                result.then((res) => {
                    return res;
                }).then((json) => {
                    if(json.code=='0'){
											if(this.props.data){
												message.success('修改成功',.8);
											}else{
												message.success('新建成功',.8);
											}
											this.deleteTab();
											this.refreshList();
											this.initState();
                    }
                })
            }else{
                return false;
            }
        });
    }

    //到h5配置页面
    toConfigureH5 = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		    if (!err) {
                let data = values;
                if(!this.props.formValue.url){
                    message.error('请上传图片',.8)
                    return false;
                }else{
                    data.url = this.props.formValue.url;
                }
                if(this.props.data){
                    data.pdBannerId = this.props.data.pdBannerId;
                }
								data.type=10;
                const result=GetServerData('qerp.web.pd.banner.save',{"pdBanner":data});
                result.then((res) => {
                    return res;
                }).then((json) => {
                    if(json.code=='0'){
                        this.deleteTab();
                        this.refreshList();
                        this.initState();
                        this.props.dispatch({
                            type:'h5config/syncConfigArr',
                            payload:[]
                        });
                        this.props.dispatch({
                            type:'h5config/syncConfigArrPre',
                            payload:[]
                        });
                        this.props.dispatch({
                            type:'h5config/syncCurrentItem',
                            payload:0
                        });
                        if(this.props.data){
							const pdBannerId=String(this.props.data.pdBannerId);
                            const paneitem={title:'修改H5页面',key:'404000edit'+pdBannerId+'h5',data:{'pdBannerId':pdBannerId,'addNew':0},componkey:'404000editH5'}
                            this.props.dispatch({
                                type:'tab/firstAddTab',
                                payload:paneitem
                            })
						}else{
                            const pdBannerId = json.pdBannerId;
                            const paneitem={title:'新增H5页面',key:'404000edith5',data:{'pdBannerId':pdBannerId,'addNew':1},componkey:'404000editH5'}
                            this.props.dispatch({
                                type:'tab/firstAddTab',
                                payload:paneitem
                            })
						}
                    }

                })
            }else{
                return false;
            }
        });
    }


	//取消
		hindCancel=()=>{
			this.deleteTab()
			this.refreshList()
    }
		jumpChange =(e)=> {
			const {value} = e.target;
			if(value == 1){
				this.props.dispatch({
					type:'operatebanner/syncStatus',
					payload:{
						code:false,
						Url:true
					}
				});
				this.props.form.setFieldsValue({'configureUrl':null})
			}else{
				this.props.dispatch({
					type:'operatebanner/syncStatus',
					payload:{
						code:true,
						Url:false
					}
				});
				this.props.form.setFieldsValue({'configureCode':null})
			};
		}

  	render(){
			console.log(this.props)
			const radioStyle = {
	      display: 'block',
	      height: '30px',
	      lineHeight: '30px',
				marginBottom:'20px'
	    };
			const radioStyle2 = {
	      display: 'block',
	      height: '30px',
	      lineHeight: '30px',
	    };
			const {name,status,rank,jumpCode,configureCode,configureUrl,code,Url} = this.props.formValue
			console.log(jumpCode)
			console.log(code)
      const { getFieldDecorator } = this.props.form;
			console.log(code,Url)
      const fileDomain=eval(sessionStorage.getItem('fileDomain'));
     	return(
        	<Form className="addUser-form operatebanner-form b_banner_edit">
                <FormItem
					label="banner名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: '请输入banner名称'}],
						initialValue:name
					})(
						<Input placeholder="请输入banner名称" maxLength='15' autoComplete="off"/>
					)}
				</FormItem>
                <FormItem
                    label="banner状态"
                    labelCol={{ span: 3,offset: 1 }}
                    wrapperCol={{ span: 6 }}
                >
                  {getFieldDecorator('status', {
                    rules: [{ required: true, message: '请选择banner状态' }],
                    initialValue:status
                  })(
                    <Select placeholder="请选择banner状态">
                        <Option value="1">上线</Option>
                        <Option value="0">下线</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                    label="banner权重"
                    labelCol={{ span: 3,offset: 1 }}
                    wrapperCol={{ span: 6 }}
                >
                {getFieldDecorator('rank', {
                    rules: [{required: true, message: '请输入banner权重'},{pattern:/^100(\.0*)?$|^0*$|^[0-9]?[0-9]?(\.[0-9]*)?$/,message: '权重在0-100之间'}],
                    initialValue:rank
                })(
                    <Input placeholder = '请输入banner权重' autoComplete="off"/>
                )}
                </FormItem>
								<Row>
		              <Col className='jumpCode'>
		                <FormItem
		                  label="跳转"
		                  labelCol={{ span: 3,offset: 1 }}
		                >
		                  {getFieldDecorator('jumpCode',{
												initialValue:jumpCode,
												onChange:this.jumpChange
		                  })(
		                    <RadioGroup>
		                        <Radio style={radioStyle} value={1}>后台配置页面</Radio>
		                        <Radio style={radioStyle2} value={2}>跳转链接</Radio>
		                    </RadioGroup>
		                  )}
		                </FormItem>
		              </Col>
		              <Col className='configureCode'>
		                <FormItem>
		                  {getFieldDecorator('configureCode',{
												initialValue:configureCode
		                  })(
		                    <Input placeholder='请输入跳转页面编码' style={{width:'140px'}} disabled={code} autoComplete="off"/>
		                  )}
		                </FormItem>
		                <FormItem>
		                   {getFieldDecorator('configureUrl',{
												 initialValue:configureUrl
		                    })(
		                     <Input placeholder='请输入跳转链接' style={{width:'140px'}} disabled={Url} autoComplete="off"/>
		                   )}
		                </FormItem>
		              </Col>
		            </Row>
								<FormItem
                    label="展示App"
                    labelCol={{ span: 3,offset: 1 }}
                    wrapperCol={{ span: 6 }}
                >
                  <div>Q掌柜 App</div>
                </FormItem>
                <FormItem
                    label="banner图片"
                    labelCol={{ span: 3,offset: 1 }}
                    wrapperCol={{ span: 6 }}
                >
                {getFieldDecorator('img', {
                })(
                    <Avatar/>
                )}
                </FormItem>
            	<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
              		<Button className='mr30' onClick={this.hindCancel.bind(this)}>取消</Button>
              		<Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
            	</FormItem>
          	</Form>
      	)
  	}
  	componentDidMount(){
    	if(this.props.data){
			  const payload={code:'qerp.web.pd.banner.info',values:{'pdBannerId':this.props.data.pdBannerId,type:10}}
			  //请求表单信息
				this.initDateEdit(payload)
			};
  	}
}
function mapStateToProps(state) {
    const {values,formValue} = state.operatebanner;
    const {configArr,currentItem}= state.h5config;
    return {values,formValue,configArr,currentItem};
}

const OperatebannerEdit = Form.create()(OperatebannerEditForm);
export default connect(mapStateToProps)(OperatebannerEdit);
