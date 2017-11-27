// import React from 'react';
// import { connect } from 'dva';
// import { Form, Select, Input, Button ,message,Modal, Row, Col} from 'antd';


// const FormItem = Form.Item;
// const Option = Select.Option;

// class Shipping_form extends React.Component{
// 	constructor(props) {
// 		super(props);
// 	}



// 	handleSubmit = () => {
// 		this.props.form.validateFields((err, values) => {
// 		  if (!err) {
// 			const callFn=this.props.callFn;
// 			if (values.wsExpressId == 1) {
// 			  values.wsExpressName = '圆通';
// 			}else if (values.wsExpressId == 2){
// 			  values.wsExpressName = '中通';
// 			}else if (values.wsExpressId == 3){
// 			  values.wsExpressName = '天天';
// 			}else if (values.wsExpressId == 4){
// 			  values.wsExpressName = '韵达';
// 			}else if (values.wsExpressId == 5){
// 			  values.wsExpressName = '邮政';
// 			}else if (values.wsExpressId == 6){
// 			  values.wsExpressName = '顺丰';
// 			}
// 			callFn(values)
// 			 this.props.form.setFieldsValue({
// 				expressMailno: '',
// 				shippingFee:''
// 			  });
// 		  }
// 		});
// 	  }



// 	//第一个获取焦点
// 	firstInput=()=>{
// 		const ValueorderNos=this.props.form.getFieldInstance('orderNo')
// 		ValueorderNos.focus()
// 	}


//     orderHindent=(e)=>{
//         console.log(e.target.value)
//         //请求数据，带出门店，光标跳转
// 		const ValueorderNos=this.props.form.getFieldInstance('expressMailnos')
// 		ValueorderNos.focus()


// 	}
// 	expressMailnoHindent=()=>{
// 		const ValueorderNos=this.props.form.getFieldInstance('shippingFees')
// 		ValueorderNos.focus()
// 	}

// 	shippingFeeHindent=()=>{
// 		const ValueorderNos=this.props.form.getFieldInstance('expressMailnos')
// 		ValueorderNos.focus()
// 	}
//   	render(){
//     	const { getFieldDecorator,getFieldProps } = this.props.form;
//      	return(
//           	<Form onSubmit={this.handleSubmit}>
// 				<FormItem
// 					label="配货单号"
// 					labelCol={{ span: 3,offset: 1 }}
// 					wrapperCol={{ span: 6 }}
// 				>
// 					{getFieldDecorator('orderNo', {
// 						rules: [{ required: true, message: '请输入账号名称' }],
						
// 					})(
// 						<Input {...getFieldProps('orderNos')} placeholder="请输入配货单号" onPressEnter={this.orderHindent.bind(this)}/>
// 					)}
// 				</FormItem>
// 				<FormItem
// 					label="门店名称"
// 					labelCol={{ span: 3,offset: 1 }}
// 					wrapperCol={{ span: 6 }}
// 				>
// 					{getFieldDecorator('name', {
// 					})(
// 						<Input placeholder="请输入门店名称"/>
// 					)}
// 				</FormItem>
// 				<FormItem
//               		label="物流公司"
//               		labelCol={{ span: 3,offset: 1 }}
//               		wrapperCol={{ span: 6 }}
//             	>
// 					{getFieldDecorator('wsExpressId', {
//                         rules: [{ required: true, message: '请选择物流公司' }],
//                         initialValue:'1'
// 					})(
// 						<Select>
// 							<Option value="1">圆通</Option>
//                             <Option value="2">中通</Option>
//                             <Option value="3">天天</Option>
//                             <Option value="4">韵达</Option>
//                             <Option value="5">邮政</Option>
//                             <Option value="6">顺丰</Option>
// 						</Select>
//               		)}
//             	</FormItem>
// 				<FormItem
// 					label="物流单号"
// 					labelCol={{ span: 3,offset: 1 }}
// 					wrapperCol={{ span: 6 }}
// 				>
// 					{getFieldDecorator('expressMailno', {
// 						rules: [{ required: true, message: '请扫描输入快递单号' }],
// 					})(
// 						<Input placeholder="请扫描输入快递单号" {...getFieldProps('expressMailnos')} onPressEnter={this.expressMailnoHindent.bind(this)}/>
// 					)}
// 				</FormItem>
// 				<FormItem
// 					label="物流费用"
// 					labelCol={{ span: 3,offset: 1}}
// 					wrapperCol={{ span: 6 }}
// 				>
// 					{getFieldDecorator('shippingFee', {
// 						rules: [{ required: true, message: '请输入物流费用' }],
// 					})(
// 						<Input placeholder="请输入物流费用" {...getFieldProps('shippingFees')} onPressEnter={this.shippingFeeHindent.bind(this)}/>
// 					)}
// 				</FormItem>
            	
//           	</Form>
//       	)
// 	  }
// 	  componentDidMount(){
// 		this.firstInput()
// 	  }
	  
// }
// function mapStateToProps(state) {
//     const {} = state.account;
//     return {};
// }

// const Shipping_forms = Form.create()(Shipping_form);
// export default connect(mapStateToProps)(Shipping_forms);






import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button ,Table,message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderNo: '', wsExpressId:'请选择',expressMailno:'', shippingFee:'' ,wsExpressIdes:'1'} ;
  }
  Focus=()=>{
    const ValueorderNos=this.props.form.getFieldInstance('orderNos')
    ValueorderNos.focus()
  }
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const callFn=this.props.callFn;
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
        callFn(values)
         this.props.form.setFieldsValue({
            expressMailno: '',
            shippingFee:''
          });
      }
    });
  }
  HindonKeyUp1=(e)=>{
    if(e.keyCode==13){
      const ValueorderNos=this.props.form.getFieldInstance('expressMailnos')
      ValueorderNos.focus()
    }
  }
  HindonKeyUp2=(e)=>{
    if(e.keyCode==13){
      const ValueorderNos=this.props.form.getFieldInstance('shippingFees')
      ValueorderNos.focus()
    }
  }
  HindonKeyUp3=(e)=>{
    if(e.keyCode==13){
      this.handleSubmit()
      const ValueorderNos=this.props.form.getFieldInstance('expressMailnos')
      ValueorderNos.focus()
    }
  }
  onChange=(value)=>{
    this.setState({
      wsExpressIdes:value
    })
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
            <Input placeholder="请扫描输入配货单号" {...getFieldProps('orderNos')} onKeyUp={this.HindonKeyUp1.bind(this)}/>
          )}
        </FormItem>
        <FormItem
          label="物流公司"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 6 }}
        >
          {getFieldDecorator('wsExpressId', {
            rules: [{ required: true, message: '请选择物流公司' }],
            onChange:this.onChange.bind(this),
            initialValue:this.state.wsExpressIdes
          })(
            <Select placeholder="请选择物流公司">
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
            <Input placeholder="请扫描输入快递单号" {...getFieldProps('expressMailnos')} onKeyUp={this.HindonKeyUp2.bind(this)}/>
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
            <Input placeholder="请输入物流费用" {...getFieldProps('shippingFees')} onKeyUp={this.HindonKeyUp3.bind(this)}/>
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
  }
}
const WrappedApp = Form.create()(App);
export default connect()(WrappedApp);




