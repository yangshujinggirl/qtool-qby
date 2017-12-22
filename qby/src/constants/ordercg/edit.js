import React from 'react';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col,AutoComplete,DatePicker,Radio } from 'antd';
import moment from 'moment';
import GoodsInfoTable from './goodsTable';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class OrdercgEditForm extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
            formvalue:{
				shippingFeeType:10,
				nothasFacepay:true,
				shippingFee:null,
				taxRateType:1,
				taxRateDisabled:false,
				taxRate:'',
			},
            supplierList:[],
			warehouses:[]
        }
	}

	//修改数据初始化页面
  	initDateEdit = (value) =>{
		  //请求用户信息
  		this.props.dispatch({type:'ordercg/editfetch',payload:value})
    	this.props.dispatch({ type: 'tab/loding', payload:true})
	}

	//删除当前tab
	deleteTab=()=>{
		const pane = eval(sessionStorage.getItem("pane"));
		if(pane.length<=1){
			return
		}
		if(this.props.data){
			// this.props.dispatch({
			// 	type:'tab/initDeletestate',
			// 	payload:'202000edit'+this.props.data.urUserId
			//   });
		}else{
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:'202000edit'
			  });
		}
	}

	//刷新列表
	refreshList=()=>{
		this.props.dispatch({
            type:'ordercg/fetch',
            payload:{code:'qerp.web.ws.asn.query',values:this.props.values}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
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
				console.log(values);
				console.log(this.state.formvalue);
				let data = this.state.formvalue;
				data.shippingFee = values.shippingFee;
				data.taxRate = values.taxRate;
				data.wsWarehouseId = values.wsWarehouseId;
				data.details = this.props.goodsInfo;
				data.type = "10";
				console.log(data);
                const result=GetServerData('qerp.web.ws.asn.save',data);
                result.then((res) => {
                    return res;
                }).then((json) => {
                    if(json.code=='0'){
						message.success('采购单创建成功');
						this.deleteTab();
						this.refreshList();
                    }else{
						message.error(json.message);
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
	
	//选择预计送达时间
	chooseArriveTime = (date, dateString) =>{
		this.state.formvalue.expectedTime=dateString;
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

	RadioChange = (e) =>{
		let formvalueTemp = this.state.formvalue;
		if(e.target.value=='20'){
			formvalueTemp.nothasFacepay = false;
			this.setState({
				formvalue:formvalueTemp
			})
		 }else{
			formvalueTemp.nothasFacepay = true;
			formvalueTemp.shippingFee = null;
		   	this.setState({
				formvalue:formvalueTemp,
			},function(){
				this.props.form.setFieldsValue({
					shippingFee:this.state.formvalue.shippingFee
				})
			})
		 }
	}

	//是否含税改变
	RadioChangeTaxRate = (e) =>{
		let formvalueTemp = this.state.formvalue;
		if(e.target.value=='1'){
			formvalueTemp.taxRateType = 1;
			formvalueTemp.taxRateDisabled = false;
			this.setState({
				formvalue:formvalueTemp,
			},function(){
				this.props.form.setFieldsValue({
					taxRate:String(this.state.formvalue.taxRate)
				})
			})
		 }else{
			formvalueTemp.taxRateType = 0;
			formvalueTemp.taxRateDisabled = true;
			formvalueTemp.taxRate = '';
			this.setState({
				formvalue:formvalueTemp,
			},function(){
				this.props.form.setFieldsValue({
					taxRate:String(this.state.formvalue.taxRate)
				})
			})
		 }
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
						initialValue:this.props.editInfo.name
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
				<FormItem
					label="预计到达时间"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					<DatePicker placeholder='请选择送达时间' 
								defaultValue={moment(this.props.editInfo.expectedTime, 'YYYY-MM-DD')} 
								onChange={this.chooseArriveTime.bind(this)}/>
				</FormItem>
				<FormItem
              		label="收货仓库"
              		labelCol={{ span: 3,offset: 1 }}
              		wrapperCol={{ span: 6 }}
            	>
					{getFieldDecorator('wsWarehouseId', {
						rules: [{ required: true, message: '请选择收货仓库' }],
						initialValue:String(this.props.editInfo.wsWarehouseId) 
					})(
						<Select placeholder="请选择收货仓库">
							{
								this.state.warehouses.map((item,index)=>{
									return (<Option value={String(item.wsWarehouseId)} key={index}>{item.name}</Option>)
								})
							}
						</Select>
              		)}
            	</FormItem>
				<FormItem
					label="物流费用"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('shippingFeeType', {
						rules: [{ required: true, message: '请选择物流费用' }],
						initialValue:String(this.state.formvalue.shippingFeeType)
					})(
						<RadioGroup onChange={this.RadioChange.bind(this)}>
							<Radio value="10">包邮</Radio>
							<Radio value="20">到付</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem
					label="到付金额"
					labelCol={{ span: 3,offset: 1}}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('shippingFee', {
						initialValue:this.state.shippingFee
					})(
						<Input placeholder="请输入到付金额" disabled={this.state.formvalue.nothasFacepay}/>
					)}
				</FormItem>
				<FormItem
					label="是否含税"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('taxRateType', {
						rules: [{ required: true, message: '请选择是否含税' }],
						initialValue:String(this.state.formvalue.taxRateType)
					})(
						<RadioGroup onChange={this.RadioChangeTaxRate.bind(this)}>
							<Radio value="1">是</Radio>
							<Radio value="0">否</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem
					label="含税税率"
					labelCol={{ span: 3,offset: 1}}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('taxRate', {
						initialValue:String(this.state.formvalue.taxRate)
					})(
						<Select  placeholder="请选择含税税率" disabled={this.state.formvalue.taxRateDisabled}>
							<Option value='0'>0%</Option>
							<Option value='3'>3%</Option>
							<Option value='6'>6%</Option>
							<Option value='11'>11%</Option>
							<Option value='17'>17%</Option>
						</Select>
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
    	if(this.props.data){
			  const payload={code:'qerp.web.ws.asn.detail',values:{'wsAsnId':this.props.data.wsAsnId}}
			  //请求信息
			this.initDateEdit(payload);
			this.state.formvalue = this.props.editInfo;
		}
		this.warehouseList();
  	}
}
function mapStateToProps(state) {
	const {goodsInfo,values,editInfo} = state.ordercg;
	console.log(editInfo);
    return {goodsInfo,values,editInfo};
}

const OrdercgEdit = Form.create()(OrdercgEditForm);
export default connect(mapStateToProps)(OrdercgEdit);