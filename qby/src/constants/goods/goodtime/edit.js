import React from 'react';
import {GetServerData} from '../../../services/services';
import {deepcCloneObj} from '../../../utils/commonFc';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col,DatePicker,Radio,Checkbox} from 'antd';
import moment from 'moment';
const CheckboxGroup = Checkbox.Group;

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class GoodEditForm extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			//初始值
			inittaskName:null,
			initcodes:null,
			//功能值
			check1:false,
			check2:false,
			check3:false,
			check4:false,
			check5:false,
			check6:false,
			taskTime:null, 
			salestatus:null,//是否在售
			statusnew:null,//是否上架
			statushot:null//是否畅销
		}
	}

	//请求页面初始化数据
  	initDateEdit = (value) =>{
		  //请求用户信息
  		this.props.dispatch({type:'orderth/editfetch',payload:value})
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
				payload:'203000edit'+this.props.data.wsAsnId
			  });
		}else{
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:'203000edit'
			  });
		}
	}

	//刷新列表
	refreshList=()=>{
		this.props.dispatch({
            type:'orderth/fetch',
            payload:{code:'qerp.web.ws.asn.query',values:this.props.values}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}


	//初始化state
	initState=()=>{
		this.props.dispatch({
            type:'orderth/initState',
            payload:{}
		})
    }

	kg=(arr)=>{
        arr!=''
         return arr 
     }

	//保存
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, value) => {
		    if (!err) {
			   console.log(value)
			   value.taskTime=this.state.taskTime
			   value.salestatus=this.state.salestatus
			   value.statusnew=this.state.statusnew
			   value.statushot=this.state.statushot
			   const codes=value.codes.split(/\s+/).filter(this.kg)
			   console.log(codes)
				
			   if(this.state.salestatus == null && this.state.statusnew ==null && this.state.statushot==null){
				message.error('请选择定时操作');
			  }else{
				const values={
					taskTime:value,
					codes:codes
				}
				const result=GetServerData('qerp.web.pd.task.time.save',values)
				result.then((res) => {
					return res;
				  }).then((json) => {
					  console.log(json)
					  if(json.code=='0'){
						  //删除当前tab，刷新列表页
						//    if(this.props.InFo){
						// 	  message.success('定时修改成功');
						//    }else{
						// 	  message.success('定时设置成功');
						//    }
						 
					  }
					})
			  }
            }
        });
	}

	//取消
	hindCancel=()=>{
		this.deleteTab()
		this.refreshList()
    }

    //输入订单编号请求数据
    spOrderNoblue=(e)=>{
        const spOrderNovalue=e.target.value
        const values={spOrderNo:spOrderNovalue}
        const result=GetServerData('qerp.web.ws.asn.save.pre',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                let goodsInfoList = json.details;
                let goodsInfo=[];
                for(var i=0;i<goodsInfoList.length;i++){
                    let tempJson = {};
                    tempJson.key=i
                    tempJson.qtyline=true
                    tempJson.priceline=true	
                    tempJson.pdCode = goodsInfoList[i].pdCode
                    tempJson.pdName = goodsInfoList[i].pdName
                    tempJson.pdSkuType = goodsInfoList[i].pdSkuType
                    tempJson.qty = goodsInfoList[i].qty
                    tempJson.price = goodsInfoList[i].price
					tempJson.wsAsnDetailId = goodsInfoList[i].wsAsnDetailId
					tempJson.spOrderDetailId = goodsInfoList[i].spOrderDetailId
                    goodsInfo.push(tempJson);
                }
                let tempFormvalue = deepcCloneObj(this.props.formValue);
                tempFormvalue.supplier = json.spShopName;
                tempFormvalue.spOrderId = json.spOrderId;
                this.props.dispatch({
                    type:'orderth/syncEditInfo',
                    payload:tempFormvalue
                });
                this.props.dispatch({
                    type:'orderth/syncGoodsInfo',
                    payload:goodsInfo
                });
                this.props.form.setFieldsValue({
                    supplier:json.spShopName,
                });
            }else{
                message.error(json.message);
            }
        })
    }
    
    //选择预计送达时间
	chooseArriveTime = (date, dateString) =>{
		let tempFormvalue =deepcCloneObj(this.props.formValue);
		tempFormvalue.expectedTime = dateString;
        this.props.dispatch({
            type:'orderth/syncEditInfo',
            payload:tempFormvalue
        })
    }
    
    //收货仓库列表
	warehouseList = () =>{
		let value={type:1};
		const result=GetServerData('qerp.web.ws.warehouse.all.list',value);
		result.then((res) => {
			return res;
		}).then((json) => {
			this.setState({
				warehouses:json.warehouses
			})
		})
	}

	onChange1=(e)=>{
		console.log(e.target.checked)
		if(this.state.check1==true && e.target.checked==false){
			this.setState({
				check1:false,
				check2:false,
				salestatus:null
			})
		}else{
			this.setState({
				check1:e.target.checked,
				check2:!e.target.checked,
				salestatus:e.target.checked?1:0
			})
		} 

	}
	onChange2=(e)=>{
		console.log(e.target.checked)
		if(this.state.check2==true && e.target.checked==false){
			this.setState({
				check1:false,
				check2:false,
				salestatus:null
			})
		}else{
			this.setState({
				check1:!e.target.checked,
				check2:e.target.checked,
				salestatus:e.target.checked?0:1
			})
		} 
	}
	onChange3=(e)=>{
		console.log(e.target.checked)
		if(this.state.check3==true && e.target.checked==false){
			this.setState({
				check3:false,
				check4:false,
				statusnew:null
			})
		}else{
			this.setState({
				check3:e.target.checked,
				check4:!e.target.checked,
				statusnew:e.target.checked?1:0
			})
		}
	}
	onChange4=(e)=>{
		console.log(e.target.checked)
		if(this.state.check4==true && e.target.checked==false){
			this.setState({
				check3:false,
				check4:false,
				statusnew:null
			})
		}else{
			this.setState({
				check4:e.target.checked,
				check3:!e.target.checked,
				statusnew:e.target.checked?0:1
			})
		}
	}
	onChange5=(e)=>{
		console.log(e.target.checked)
		if(this.state.check5==true && e.target.checked==false){
			this.setState({
				check5:false,
				check6:false,
				statushot:null
			})
		}else{
			this.setState({
				check5:e.target.checked,
				check6:!e.target.checked,
				statushot:e.target.checked?1:0
			})
		}

	}
	onChange6=(e)=>{
		console.log(e.target.checked);
		console.log(this.state.check6);
	   if(this.state.check6==true && e.target.checked==false){
		   this.setState({
			   check5:false,
			   check6:false,
			   statushot:null
		   })
	   }else{
		   this.setState({
			   check6:e.target.checked,
			   check5:!e.target.checked,
			   statushot:e.target.checked?0:1
		   })
	   }
	}
	timeChange=(date,dateString)=>{
		console.log(dateString);
        this.setState({
            taskTime:dateString
        })
	}
  	render(){
		const { getFieldDecorator } = this.props.form;
     	return(
          	<Form className="addUser-form addcg-form">
                <FormItem
					label="定时名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('taskName', {
						rules: [{ required: true, message: '请输入订单编号'}],
						// initialValue:this.props.formValue.taskName
					})(
						<Input placeholder="请输入订单编号"/>
					)}
				</FormItem>
				<FormItem
					label="商品编码"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('codes', {
						rules: [{ required: true, message: '请输入订单编号'}],
						// initialValue:this.props.formValue.taskName
					})(
						<TextArea rows={4} />
					)}
				</FormItem>
                <FormItem
					label="定时时间"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span:6 }}
					>
					{getFieldDecorator('taskTime', {
						rules: [{ required: true, message: '请输入定时时间' }],
						// initialValue:this.props.InFo?moment(this.state.timing):null
					})(
					<DatePicker  format="YYYY-MM-DD HH:mm" showTime onChange={this.timeChange.bind(this)}/>
					)}
				</FormItem>
                <FormItem
					label="定时操作"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span:16 }}
					>
					{getFieldDecorator('codesinitsssss', {
					})(
						<div>
							<Checkbox onChange={this.onChange1.bind(this)} checked={this.state.check1}>售卖</Checkbox>
							<Checkbox onChange={this.onChange2.bind(this)} checked={this.state.check2}>停售</Checkbox>
							<Checkbox onChange={this.onChange3.bind(this)} checked={this.state.check3}>上新</Checkbox>
							<Checkbox onChange={this.onChange4.bind(this)} checked={this.state.check4}>下新</Checkbox>
							<Checkbox onChange={this.onChange5.bind(this)} checked={this.state.check5}>畅销</Checkbox>
							<Checkbox onChange={this.onChange6.bind(this)} checked={this.state.check6}>下畅销</Checkbox>
						</div>
					)}
        		</FormItem>
            	<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
              		<Button className='mr30' onClick={this.hindCancel.bind(this)}>取消</Button>
              		<Button htmlType="submit" type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
            	</FormItem>
          	</Form>
      	)
  	}
  	componentDidMount(){
		

          //请求仓库列表信息
		// this.warehouseList();
    	// if(this.props.data){
		// 	  const payload={code:'qerp.web.ws.asn.detail',values:{'wsAsnId':this.props.data.wsAsnId,'needReturnQty':1}}
		// 	  //请求表单信息
		// 	this.initDateEdit(payload)
		// }
  	}
}
function mapStateToProps(state) {
    const {values,formValue,goodsInfo} = state.orderth;
    console.log(goodsInfo);
    return {values,formValue,goodsInfo};
}

const GoodEditForms = Form.create()(GoodEditForm);
export default connect(mapStateToProps)(GoodEditForms);