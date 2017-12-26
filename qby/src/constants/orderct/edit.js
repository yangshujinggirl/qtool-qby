import React from 'react';
import {GetServerData} from '../../services/services';
import {deepcCloneObj} from '../../utils/commonFc';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col,DatePicker,Radio,AutoComplete,Cascader } from 'antd';
import moment from 'moment';
import GoodsInfoTable from './goodsTable';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class OrderctEditForm extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
            dataSource:[],
            residences:[],
            //请求的仓库列表信息
            warehouses:[],
            taxRateDisabled:false
		}
	}

	//删除当前tab
	deleteTab=()=>{
		const pane = eval(sessionStorage.getItem("pane"));
		if(pane.length<=1){
			return
		}
        this.props.dispatch({
            type:'tab/initDeletestate',
            payload:'204000edit'
        });
	}

	//刷新列表
	refreshList=()=>{
		this.props.dispatch({
            type:'orderct/fetch',
            payload:{code:'qerp.web.sp.ctorder.query',values:this.props.values}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}


	//初始化state
	initState=()=>{
		this.props.form.resetFields();
    }

    onSelect=(value)=>{
        let tempFormvalue = this.props.formValue;
        tempFormvalue.supplierId = value;
        this.props.dispatch({
            type:'orderct/syncEditInfo',
            payload:tempFormvalue
        });
    }

    handleSearch = (value) => {
        let tempFormvalue = this.props.formValue;
        tempFormvalue.supplierId = null;
        this.props.dispatch({
            type:'orderth/syncEditInfo',
            payload:tempFormvalue
        });
        let values={name:value}
        const result=GetServerData('qerp.web.pd.supplier.list',values)
            result.then((res) => {
                return res;
            }).then((json) => {
                if(json.code=='0'){
                    const suppliers=json.suppliers
                    var valuess=[]
                    for(var i=0;i<suppliers.length;i++){
                        valuess.push({
                            text:suppliers[i].name,
                            value:suppliers[i].pdSupplierId
                        }) 
                    }
                    this.setState({
                        dataSource: valuess
                    });
                }
            })
    }

	//保存
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		    if (!err) {
                let data = values;
                data.details = this.props.goodsInfo;
                data.supplierId = this.props.formValue.supplierId;
                data.recProvinceId = values.recCity[0];
                data.recCityId = values.recCity[1];
                data.recDistrictId = values.recCity[2];
                console.log(data);
                 const result=GetServerData('qerp.web.sp.ctorder.save',data);
                result.then((res) => {
                    return res;
                }).then((json) => {
                    if(json.code=='0'){
						message.success('采退单创建成功');
						this.deleteTab();
						this.refreshList();
					    this.initState();
                    }else{
						message.error(json.message);
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
    
    RadioChangeTaxRate=(e)=>{
        if(e.target.value=='1'){
            this.setState({
                taxRateDisabled:false
            })
        }else{
            let tempFormvalue =  deepcCloneObj(this.props.formValue);
            tempFormvalue.taxRate = '';
            this.props.dispatch({
                type:'orderct/syncEditInfo',
                payload:tempFormvalue
            });
            this.setState({
                taxRateDisabled:true
            },function(){
                this.props.form.setFieldsValue({
                    taxRate:String(tempFormvalue.taxRate)
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
                        rules: [{ required: true, message: '请选择供应商名称'}],
                    })(
                        <AutoComplete
                            dataSource={this.state.dataSource}
                            onSelect={this.onSelect}
                            onSearch={this.handleSearch}
                            placeholder='请选择供应商名称'
                        />
                    )}
                </FormItem>
                <FormItem
					label="采购订单"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('wsAsnNo', {
						rules: [{ required: true, message: '请输入采购订单'}],
					})(
						<Input placeholder="请输入采购订单"/>
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
					label="退货原因"
					labelCol={{ span: 3,offset: 1}}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('reason', {
						rules: [{ required: true, message: '请输入退货原因' }],
					})(
						<Input placeholder="请输入退货原因"/>
					)}
				</FormItem>
                <FormItem
              		label="出货仓库"
              		labelCol={{ span: 3,offset: 1 }}
              		wrapperCol={{ span: 6 }}
            	>
					{getFieldDecorator('wsWarehouseId', {
						rules: [{ required: true, message: '请选择出货仓库' }]
					})(
						<Select placeholder="请选择出货仓库">
							{
								this.state.warehouses.map((item,index)=>{
									return (<Option value={String(item.wsWarehouseId)} key={index}>{item.name}</Option>)
								})
							}
						</Select>
              		)}
            	</FormItem>
                <FormItem
					label="是否含税"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('taxRateType', {
						rules: [{ required: true, message: '请选择是否含税' }],
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
					})(
						<Select  placeholder="请选择含税税率" disabled={this.state.taxRateDisabled}>
							<Option value='0'>0%</Option>
							<Option value='3'>3%</Option>
							<Option value='6'>6%</Option>
							<Option value='11'>11%</Option>
							<Option value='17'>17%</Option>
						</Select>
					)}
				</FormItem>
                <FormItem
					label="收货人"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('recName', {
						rules: [{ required: true, message: '请输入收货人' }]
					})(
						<Input placeholder="请输入收货人"/>
					)}
				</FormItem>
                <FormItem
					label="收货电话"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('recTelephone', {
						rules: [{ required: true, message: '请输入收货电话' }]
					})(
						<Input placeholder="请输入收货电话"/>
					)}
				</FormItem>
                <FormItem
					label="收货省市区"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('recCity', {
						rules: [{ type: 'array', required: true, message: '请选择收货省市区' }],
					})(
						<Cascader 
                            placeholder="请选择所属城市" 
                            options={this.state.residences}
                        />
					)}
				</FormItem>
                <FormItem
					label="详细地址"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('recAddress', {
						rules: [{ required: true, message: '请输入收货详细地址' }],
					})(
						<Input placeholder="请输入收货详细地址"/>
					)}
				</FormItem>
                <FormItem
					label="订单备注"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('remark', {
					})(
						<Input type="textarea" rows={4} placeholder="请输入订单备注"/>
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
        
        let result1=GetServerData('qerp.web.bs.region','');
        result1.then((res) => {
            return res;
        }).then((json) => {
            const data=json.bsRegions
            this.setState({
                residences:data
            })
        });

  	}
}
function mapStateToProps(state) {
    const {values,formValue,goodsInfo} = state.orderct;
    return {values,formValue,goodsInfo};
}

const OrderctEdit = Form.create()(OrderctEditForm);
export default connect(mapStateToProps)(OrderctEdit);