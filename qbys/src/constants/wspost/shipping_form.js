import { connect } from 'dva';
import { Form, Select, Input, Button ,Table,message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { orderNo: '', wsExpressId:'请选择',expressMailno:'', shippingFee:'' ,wsExpressIdes:'1'} ;
	}

	//配货单号回车
	orderNoHindonKeyUp=(e)=>{
		if(e.keyCode==13){
			const ValueorderNos=this.props.form.getFieldInstance('expressMailnos')
			ValueorderNos.focus()
		}
	}
	//物流单号回车
	expressMailnoHindonKeyUp=(e)=>{
		if(e.keyCode==13){
			const ValueorderNos=this.props.form.getFieldInstance('shippingFees')
			ValueorderNos.focus()
		}
	}
	//物流费用回车
	shippingFeeHindonKeyUp=(e)=>{
		if(e.keyCode==13){
			this.handleSubmit()
			const ValueorderNos=this.props.form.getFieldInstance('expressMailnos')
			ValueorderNos.focus()
		}
	}
	//进入页面焦点设置
	Focus=()=>{
		const ValueorderNos=this.props.form.getFieldInstance('orderNos')
		ValueorderNos.focus()
	}
	//submit
	handleSubmit = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				//数据请求
				console.log(values)
				if (values.wsExpressId == 1) {
					values.wsExpressName = '圆通';
				  }else if (values.wsExpressId == 2){
					values.wsExpressName = '中通';
				  }else if (values.wsExpressId == 3){
					values.wsExpressName = '天天';
				  }else if (values.wsExpressId == 4){
					values.wsExpressName = '韵达';
				  }else if (values.wsExpressId == 5){
					values.wsExpressName = '邮政';
				  }else if (values.wsExpressId == 6){
					values.wsExpressName = '顺丰';
				  }
				  const valuesdata=values
				this.props.form.setFieldsValue({
					expressMailno: '',
					shippingFee:''
				});
				this.props.dispatch({
					type:'wspost/submitdata',
					payload:valuesdata
				})


			}
		});
	}

	//init form
	initform=()=>{
		this.props.form.resetFields()
	}





	
	
	render() {
		const { getFieldDecorator,getFieldProps} = this.props.form;
		return (
		<Form>
			<FormItem
			label="配货单号"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 6 }}
			>
			{getFieldDecorator('orderNo', {
				rules: [{ required: true, message: '请扫描输入配货单号' }]
			})(
				<Input placeholder="请扫描输入配货单号" {...getFieldProps('orderNos')} onKeyUp={this.orderNoHindonKeyUp.bind(this)}/>
			)}
			</FormItem>
			<FormItem
			label="物流公司"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 6 }}
			>
			{getFieldDecorator('wsExpressId', {
				rules: [{ required: true, message: '请选择物流公司' }],
				initialValue:'1'
			})(
				<Select>
					<Option value="1">圆通</Option>
					<Option value="2">中通</Option>
					<Option value="3">天天</Option>
					<Option value="4">韵达</Option>
					<Option value="5">邮政</Option>
					<Option value="6">顺丰</Option>
				</Select>
			)}
			</FormItem>
			<FormItem
			label="物流单号"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 6 }}
			>
			{getFieldDecorator('expressMailno', {
				rules: [{ required: true, message: '请扫描输入快递单号' }]
			})(
				<Input placeholder="请扫描输入快递单号" {...getFieldProps('expressMailnos')} onKeyUp={this.expressMailnoHindonKeyUp.bind(this)}/>
			)}
			</FormItem>
			<FormItem
			label="物流费用"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 6 }}
			>
			{getFieldDecorator('shippingFee', {
				rules: [{ required: true, message: '请输入物流费用' }]
			})(
				<Input placeholder="请输入物流费用" {...getFieldProps('shippingFees')} onKeyUp={this.shippingFeeHindonKeyUp.bind(this)}/>
			)}
			</FormItem>
			<FormItem
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 6 }}
			>
			<Button type="primary" htmlType="submit" style={{display:'none', height:'0px'}}></Button>
			</FormItem>
		</Form>
		);
	}
componentDidMount(){
	this.Focus()
	this.props.dispatch({
		type:'wspost/initform',
		payload:this.initform
	})



}
}
const WrappedApp = Form.create()(App);
export default connect()(WrappedApp);




