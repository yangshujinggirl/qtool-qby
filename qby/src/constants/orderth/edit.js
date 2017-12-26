import React from 'react';
import {GetServerData} from '../../services/services';
import {deepcCloneObj} from '../../utils/commonFc';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col,DatePicker,Radio} from 'antd';
import moment from 'moment';
import GoodsInfoTable from './goodsTable';
const FormItem = Form.Item;
const Option = Select.Option;

class OrderthEditForm extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			warehouses:[]
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

	//保存
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		    if (!err) {
				let data = values;
				data.expectedTime = this.props.formValue.expectedTime;
				data.type = '20';
                data.details = this.props.goodsInfo;
                if(this.props.data){
                    data.wsAsnId = this.props.data.wsAsnId;
                }
                const result=GetServerData('qerp.web.ws.asn.save',data);
                result.then((res) => {
                    return res;
                }).then((json) => {
                    if(json.code=='0'){
						if(this.props.data){
							message.success('退货单修改成功');
						}else{
							message.success('退货单创建成功');
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


  	render(){
		const { getFieldDecorator } = this.props.form;
     	return(
          	<Form className="addUser-form addcg-form">
                <FormItem
					label="订单编号"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('spOrderNo', {
						rules: [{ required: true, message: '请输入订单编号'}],
						initialValue:this.props.formValue.spOrderNo
					})(
						<Input placeholder="请输入订单编号" onBlur={this.spOrderNoblue.bind(this)}/>
					)}
				</FormItem>
                <FormItem
					label="门店名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('supplier', {
						initialValue:this.props.formValue.supplier
					})(
						<Input disabled/>
					)}
				</FormItem>
                <FormItem
					label="商品信息"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span:16 }}
				>
                    <GoodsInfoTable/>
				</FormItem>
                <FormItem
					label="预计到达时间"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					<DatePicker placeholder='请选择送达时间' 
								value={this.props.formValue.expectedTime?moment(this.props.formValue.expectedTime, 'YYYY-MM-DD'):null} 
								onChange={this.chooseArriveTime.bind(this)}/>
				</FormItem>
                <FormItem
              		label="收货仓库"
              		labelCol={{ span: 3,offset: 1 }}
              		wrapperCol={{ span: 6 }}
            	>
					{getFieldDecorator('wsWarehouseId', {
						rules: [{ required: true, message: '请选择收货仓库' }],
						initialValue:this.props.formValue.wsWarehouseId
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
					label="退货原因"
					labelCol={{ span: 3,offset: 1}}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('reason', {
						rules: [{ required: true, message: '请输入退货原因' }],
						initialValue:this.props.formValue.reason
					})(
						<Input placeholder="请输入退货原因"/>
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
		this.warehouseList();
    	if(this.props.data){
			  const payload={code:'qerp.web.ws.asn.detail',values:{'wsAsnId':this.props.data.wsAsnId,'needReturnQty':1}}
			  //请求表单信息
			this.initDateEdit(payload)
		}
  	}
}
function mapStateToProps(state) {
    const {values,formValue,goodsInfo} = state.orderth;
    console.log(goodsInfo);
    return {values,formValue,goodsInfo};
}

const OrderthEdit = Form.create()(OrderthEditForm);
export default connect(mapStateToProps)(OrderthEdit);