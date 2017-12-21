import React from 'react';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col,AutoComplete} from 'antd';
import GoodsInfoTable from './goodsTable';
const FormItem = Form.Item;
const Option = Select.Option;

class OrdercgEditForm extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
            formvalue:{},
            supplierList:[],
            taxRateType:'0',
            taxRateDisabled:true,
            taxRate:''
        }
	}

	//修改数据初始化页面
  	initDateEdit = (value) =>{
		  //请求用户信息
  		this.props.dispatch({type:'account/infofetch',payload:value})
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
				payload:'202000edit'+this.props.data.urUserId
			  });
		}else{
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:'202000edit'
			  });
		}
	}

	//刷新列表
	refreshList=()=>{
		// this.props.dispatch({
        //     type:'account/fetch',
        //     payload:{code:'qerp.web.ur.user.query',values:{limit:this.props.limit,currentPage:0}}
		// })
		// this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}


	//初始化state
	initState=()=>{
		// this.props.dispatch({
        //     type:'account/initState',
        //     payload:{}
		// })
    }
    
	//保存
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
            if (!err) {
                // const newvalues={urUser:values}
                // const result=GetServerData('qerp.web.ur.user.save',newvalues)
                result.then((res) => {
                    return res;
                }).then((json) => {
                    if(json.code=='0'){
                        console.log(json);
                        // if(json.password){
                        //     //显示新创建的用户信息
                        //     this.showNewUserInfoModal('Q本营账户创建成功',json);
                        // }else{
                        //     message.success('信息修改成功',.8);
                        //     this.deleteTab();
                        //     this.refreshAccountList();
                        // }
                    }
                })
            }
		});
	}

	//取消
	hindCancel=()=>{
		this.deleteTab()
		this.refreshList()
    }

    //搜索供应商
    searchSupplier = (value) =>{
        this.state.formvalue.pdSupplierId=null;
        let values={name:value};
        const result=GetServerData('qerp.web.pd.supplier.list',values);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                const suppliers=json.suppliers;
                var supplierList=[];
                for(var i=0;i<suppliers.length;i++){
                    supplierList.push({
                        text:suppliers[i].name,
                        value:suppliers[i].pdSupplierId
                    })
                }
                this.setState({
                    supplierList: supplierList
                });
            }
        })
    } 
    
    //选择供应商
    selectSupplier= (value) =>{
        let taxRate;
        this.state.formvalue.pdSupplierId=value;
        // const dataSource=this.state.supplierList;
        // for(var i=0;i < dataSource.length;i++){
        //     if(dataSource[i].value==value){
        //       taxRate=dataSource[i].taxRate
        //     }
        // }
        // if (!taxRate) {
        //   this.setState({
        //     taxRateType:'0',
        //     taxRateDisabled:true,
        //     taxRate:''
        //   },function(){
        //     this.props.form.setFieldsValue({
        //       taxRateType: this.state.taxRateType,
        //       taxRate:String(this.state.taxRate)
        //     });
        //   })
        // }else{
        //   this.setState({
        //     taxRateType:'1',
        //     taxRateDisabled:false,
        //     taxRate:taxRate
        //   },function(){
        //     this.props.form.setFieldsValue({
        //       taxRateType: this.state.taxRateType,
        //       taxRate:String(this.state.taxRate)
        //     });
        //   })
        // }
    }

  	render(){
		const { getFieldDecorator } = this.props.form;
     	return(
          	<Form className="addUser-form addcg-form">
				<FormItem
					label="供应商名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('supplier', {
						rules: [{ required: true, message: '请输入账号名称'},{pattern:/^.{1,30}$/,message:'请输入1-30字账号名称'}],
						initialValue:''
					})(
                        <AutoComplete
                            dataSource={this.state.supplierList}
                            onSelect={this.selectSupplier}
                            onSearch={this.searchSupplier}
                            placeholder='请选择供应商名称'
                        />
					)}
				</FormItem>
                <FormItem
					label="商品信息"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 12 }}
				>
					{getFieldDecorator('details')(
                        <GoodsInfoTable/>
					)}
				</FormItem>
				{/* 
				<FormItem
					label="职位"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('job', {
						rules: [{ required: true, message: '请输入职位' },{pattern:/^.{1,10}$/,message:'请输入1-10字职位名'}],
						initialValue:this.props.urUser.job
					})(
						<Input placeholder="请输入职位"/>
					)}
				</FormItem>
				<FormItem
					label="邮箱"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('email', {
						rules: [{ required: true, message: '请输入邮箱' }],
						initialValue:this.props.urUser.email
					})(
						<Input placeholder="请输入邮箱"/>
					)}
				</FormItem>
				<FormItem
					label="手机号"
					labelCol={{ span: 3,offset: 1}}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('mobile', {
						rules: [{ required: true, message: '请输入手机号' },{pattern:/^[0-9]{1,20}$/,message:'输入正确手机号'}],
						initialValue:this.props.urUser.mobile
					})(
						<Input placeholder="请输入手机号"/>
					)}
				</FormItem>
            	<FormItem
              		label="账户状态"
              		labelCol={{ span: 3,offset: 1 }}
              		wrapperCol={{ span: 6 }}
            	>
					{getFieldDecorator('status', {
						rules: [{ required: true, message: '请选择账户状态' }],
						initialValue:this.props.urUser.status
					})(
						<Select placeholder="请选择账户状态">
							<Option value="1">启用</Option>
							<Option value="0">禁用</Option>
						</Select>
              		)}
            	</FormItem>
				<FormItem
              		label="权限分配"
              		labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 8 }}
					  >
					<UserTags changeHasTagStatus={this.changeHasTagStatus.bind(this)}/>
					{
						!this.state.hasUserTags
						?
						<p className="error-info">请选择分配权限</p>
						:
						null
					}
            	</FormItem>
            	<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
              		<Button className='mr30' onClick={this.hindCancel.bind(this)}>取消</Button>
              		<Button htmlType="submit" type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
            	</FormItem> */}
          	</Form>
      	)
  	}
  	componentDidMount(){
    	// if(this.props.data){
		// 	  const payload={code:'qerp.web.ur.user.get',values:{'urUserId':this.props.data.urUserId}}
		// 	  //请求信息
		// 	this.initDateEdit(payload)
		// }
  	}
}
function mapStateToProps(state) {
    return {};
}

const OrdercgEdit = Form.create()(OrdercgEditForm);
export default connect(mapStateToProps)(OrdercgEdit);