import React from 'react';
import {GetServerData} from '../../services/services';
import {deepcCloneObj} from '../../utils/commonFc';
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
			supplierList:[],
			warehouses:[],
			isEdit:false
    }
	}
	componentDidMount(){
		//请求仓库列表信息
		this.warehouseList();
		this.initPage();
	}
	initPage (){
		if(this.props.data.wsAsnId){
			const payload={code:'qerp.web.ws.asn.detail',values:{'wsAsnId':this.props.data.wsAsnId}}
			//请求信息
			this.initDateEdit(payload);
			this.setState({
				isEdit:true
			})
		};
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
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:'202000edit'+this.props.data.wsAsnId
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
		this.props.dispatch({
            type:'ordercg/fetch',
            payload:{code:'qerp.web.ws.asn.query',values:this.props.values}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true})
	}


	//初始化state
	initState=()=>{
		this.props.dispatch({
            type:'ordercg/initState',
            payload:{}
		})
    }

	//保存
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      if (!err) {
				let data = this.props.editInfo;
				data.shippingFee = values.shippingFee;
				data.taxRate = values.taxRate instanceof Array?"":values.taxRate;
				data.wsWarehouseId = values.wsWarehouseId;
				data.shippingFeeType = values.shippingFeeType;
				data.taxRateType = values.taxRateType;
				data.details = this.props.goodsInfo;
				data.type = "10";
				if(this.props.data){
					data.wsAsnId = this.props.data.wsAsnId;
				}
				if(data.pdSupplierId){
					const result=GetServerData('qerp.web.ws.asn.save',data);
	        result.then((res) => {
	            return res;
	        }).then((json) => {
	            if(json.code=='0'){
								if(this.props.data){
									message.success('采购单修改成功',.8);
								}else{
									message.success('采购单创建成功',.8);
								};
								this.deleteTab();
								this.refreshList();
								this.initState();
            	};
	        });
				}else{
					message.error('请选择正确的供应商名称')
				}
      };
		});
	}

	//取消
	hindCancel=()=>{
		this.deleteTab()
		this.refreshList()
    }

    //搜索供应商
    searchSupplier = (value) =>{
		let tempFormvalue = deepcCloneObj(this.props.editInfo);
		tempFormvalue.pdSupplierId = null;

			this.props.dispatch({
				type:'ordercg/syncEditInfo',
				payload:tempFormvalue
			})
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
		let tempFormvalue =deepcCloneObj(this.props.editInfo);
		tempFormvalue.pdSupplierId = value;
		this.props.dispatch({
			type:'ordercg/syncEditInfo',
			payload:tempFormvalue
		})
	}

	//选择预计送达时间
	chooseArriveTime = (date, dateString) =>{
		let tempFormvalue =deepcCloneObj(this.props.editInfo);
		tempFormvalue.expectedTime = dateString;

			this.props.dispatch({
				type:'ordercg/syncEditInfo',
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

	RadioChange = (e) =>{
		//10包邮 20到付
		let formvalueTemp =deepcCloneObj(this.props.editInfo);
		debugger
		if(e.target.value == '20'){
			this.props.dispatch({
				type:'ordercg/syncNothasFacepay',
				payload:false
			})
		 }else{
			formvalueTemp.shippingFee = undefined;
				this.props.form.setFieldsValue({
					shippingFee:formvalueTemp.shippingFee
				})
				this.props.dispatch({
					type:'ordercg/syncEditInfo',
					payload:formvalueTemp
				})
				this.props.dispatch({
					type:'ordercg/syncNothasFacepay',
					payload:true
				})
		 }
	}

	//是否含税改变
	RadioChangeTaxRate = (e) =>{
		let formvalueTemp = deepcCloneObj(this.props.editInfo);
		if(e.target.value=='1'){
			formvalueTemp.taxRateType = 1;
			this.props.form.setFieldsValue({
				taxRate:[]
			})
			this.props.dispatch({
				type:'ordercg/syncEditInfo',
				payload:formvalueTemp
			})
			this.props.dispatch({
				type:'ordercg/syncTaxRateDisabled',
				payload:false
			})
		 }else{
			formvalueTemp.taxRateType = 0;
			formvalueTemp.taxRate = [];
			this.props.form.setFieldsValue({
				taxRate:[]
			})
			this.props.dispatch({
				type:'ordercg/syncEditInfo',
				payload:formvalueTemp
			})
			this.props.dispatch({
				type:'ordercg/syncTaxRateDisabled',
				payload:true
			})
		 }
	}

  	render(){
		const { getFieldDecorator } = this.props.form;
		console.log(this.props)
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
					wrapperCol={{ span: 16 }}
				>
					{getFieldDecorator('details')(
							<GoodsInfoTable isEdit={this.state.isEdit?1:0}/>
					)}
				</FormItem>
				<FormItem
					label="预计到达时间"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					<DatePicker placeholder='请选择送达时间'
								value={this.props.editInfo.expectedTime?moment(this.props.editInfo.expectedTime, 'YYYY-MM-DD'):null}
								onChange={this.chooseArriveTime.bind(this)}/>
				</FormItem>
				<FormItem
              		label="收货仓库"
              		labelCol={{ span: 3,offset: 1 }}
              		wrapperCol={{ span: 6 }}
            	>
					{getFieldDecorator('wsWarehouseId', {
						rules: [{ required: true, message: '请选择收货仓库' }],
						initialValue:this.props.editInfo.wsWarehouseId
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
						initialValue:String(this.props.editInfo.shippingFeeType)
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
						initialValue:this.props.editInfo.shippingFee
					})(
						<Input placeholder="请输入到付金额" disabled={this.props.nothasFacepay}  autoComplete="off"/>
					)}
				</FormItem>
				<FormItem
					label="是否含税"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('taxRateType', {
						rules: [{ required: true, message: '请选择是否含税' }],
						initialValue:String(this.props.editInfo.taxRateType)
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
						initialValue:this.props.editInfo.taxRate
					})(
						<Select  placeholder="请选择含税税率" disabled={this.props.taxRateDisabled}>
							<Option value='0'>0%</Option>
							<Option value='3'>3%</Option>
							<Option value='6'>6%</Option>
							<Option value='10'>10%</Option>
							<Option value='11'>11%</Option>
							<Option value='16'>16%</Option>
							<Option value='17'>17%</Option>
						</Select>
					)}
				</FormItem>
            	<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
              		<Button className='mr30' onClick={this.hindCancel.bind(this)}>取消</Button>
              		<Button  type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
            	</FormItem>
          	</Form>
      	)
  	}

	  componentWillReceiveProps(){

	  }
}
function mapStateToProps(state) {
	const {goodsInfo,values,editInfo,nothasFacepay,taxRateDisabled} = state.ordercg;
    return {goodsInfo,values,editInfo,nothasFacepay,taxRateDisabled};
}

const OrdercgEdit = Form.create()(OrdercgEditForm);
export default connect(mapStateToProps)(OrdercgEdit);
