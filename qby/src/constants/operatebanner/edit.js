import React from 'react';
import {GetServerData} from '../../services/services';
import {deepcCloneObj} from '../../utils/commonFc';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col,DatePicker,Radio} from 'antd';
import moment from 'moment';
import Avatar from './avatar';
const FormItem = Form.Item;
const Option = Select.Option;

class OperatebannerEditForm extends React.Component{

	constructor(props) {
		super(props);
		this.state = {}
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
		})
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
                    message.error('请上传图片')
                    return false;
                }else{
                    data.url = this.props.formValue.url;
                }
                if(this.props.data){
                    data.pdBannerId = this.props.data.pdBannerId;
                }
                const result=GetServerData('qerp.web.pd.banner.save',{"pdBanner":data});
                result.then((res) => {
                    return res;
                }).then((json) => {
                    if(json.code=='0'){
						if(this.props.data){
							message.success('修改成功');
						}else{
							message.success('新建成功');
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
                    message.error('请上传图片')
                    return false;
                }else{
                    data.url = this.props.formValue.url;
                }
                if(this.props.data){
                    data.pdBannerId = this.props.data.pdBannerId;
                }
                const result=GetServerData('qerp.web.pd.banner.save',{"pdBanner":data});
                result.then((res) => {
                    return res;
                }).then((json) => {
                    if(json.code=='0'){
                        if(this.props.data){
							const pdBannerId=String(this.props.data.pdBannerId);
                            const paneitem={title:'修改H5页面',key:'404000edit'+pdBannerId+'h5',data:{pdBannerId:pdBannerId},componkey:'404000editH5'}
                            this.props.dispatch({
                                type:'tab/firstAddTab',
                                payload:paneitem
                            })
						}else{
                            const paneitem={title:'新增H5页面',key:'404000edith5',data:null,componkey:'404000editH5'}
                            this.props.dispatch({
                                type:'tab/firstAddTab',
                                payload:paneitem
                            })
						}
                    }
                    this.deleteTab();
                    this.refreshList();
                    this.initState();
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

  	render(){
        const { getFieldDecorator } = this.props.form;
        const fileDomain=eval(sessionStorage.getItem('fileDomain'));
     	return(
          	<Form className="addUser-form operatebanner-form">
                <FormItem
					label="banner名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: '请输入banner名称'}],
						initialValue:this.props.formValue.name
					})(
						<Input placeholder="请输入banner名称" maxLength='15'/>
					)}
				</FormItem>
                <FormItem
                    label="banner状态"
                    labelCol={{ span: 3,offset: 1 }}
                    wrapperCol={{ span: 6 }}
                >
                  {getFieldDecorator('status', {
                    rules: [{ required: true, message: '请选择banner状态' }],
                    initialValue:this.props.formValue.status
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
                    rules: [{required: true, message: '请输入banner权重'}],
                    initialValue:this.props.formValue.rank
                })(
                    <Input placeholder = '请输入banner权重'/>
                )}
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
                    <Button className='mr30' onClick={this.toConfigureH5.bind(this)}>配置页面</Button>
              		<Button htmlType="submit" type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
            	</FormItem>
          	</Form>
      	)
  	}
  	componentDidMount(){
    	if(this.props.data){
			  const payload={code:'qerp.web.pd.banner.info',values:{'pdBannerId':this.props.data.pdBannerId}}
			  //请求表单信息
			this.initDateEdit(payload)
		}
  	}
}
function mapStateToProps(state) {
    const {values,formValue} = state.operatebanner;
    return {values,formValue};
}

const OperatebannerEdit = Form.create()(OperatebannerEditForm);
export default connect(mapStateToProps)(OperatebannerEdit);