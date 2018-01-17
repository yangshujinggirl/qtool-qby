import React from 'react';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col,AutoComplete,Cascader } from 'antd';
import GoodsListTable from './goodslist';
import Infomodel from './infomodal';
const FormItem = Form.Item;
const Option = Select.Option;

class OrdermdEditForm extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
            spShop:{},
            dataSources:[],
            dataSource:[],
            residences:[],
            selecttypes:true
        };
	}

	//修改数据初始化页面
  	// initDateEdit = (value) =>{
	// 	  //请求用户信息
  	// 	this.props.dispatch({type:'account/infofetch',payload:value})
    // 	this.props.dispatch({ type: 'tab/loding', payload:true})
	// }

	//删除当前tab
	// deleteTab=()=>{
	// 	const pane = eval(sessionStorage.getItem("pane"));
	// 	if(pane.length<=1){
	// 		return
	// 	}
	// 	if(this.props.data){
	// 		this.props.dispatch({
	// 			type:'tab/initDeletestate',
	// 			payload:'601000edit'+this.props.data.urUserId
	// 		  });
	// 	}else{
	// 		this.props.dispatch({
	// 			type:'tab/initDeletestate',
	// 			payload:'601000edit'
	// 		  });
	// 	}
	// }


	//初始化state
	// initState=()=>{
	// 	this.props.dispatch({
    //         type:'account/initState',
    //         payload:{}
	// 	})
    // }
    
	//保存
	handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
                let data = this.state.spShop;
                data.createType = values.createType;
                data.recAddress = values.recAddress;
                data.recName = values.recName;
                data.recTel = values.recTel;
                data.shopName = values.shopName;
                this.setState({
                    spShop:data
                },function(){
                    if(!this.state.spShop.spShopId){
                        message.error('请选择门店')
                    }else{
                        if(Number(this.state.spShop.qtySum)<1){
                            message.error('商品数量不能为0')
                        }else{
                            let value={
                                spOrder:this.state.spShop,
                                orderCodes:this.state.dataSource
                            }
                            this.showmodel(value)
                        }
                    }
                });
            }
        });
    }

    //删除当前tab
	deleteTab=()=>{
		const pane = eval(sessionStorage.getItem("pane"));
		if(pane.length<=1){
			return
		}
        this.props.dispatch({
            type:'tab/initDeletestate',
            payload:'201000edit'
        });
	}

	//刷新账号列表
	refreshList=()=>{
        let values = this.props.values;
        values.currentPage = "0";
		this.props.dispatch({
            type:'ordermd/fetch',
            payload:{code:'qerp.web.sp.order.query',values:values}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}

    showmodel=(data)=>{
        this.refs.models.showModal(data);
    }
    
    //智能搜索框搜索事件
    handleSearch = (value) => {
        let spShop=this.state.spShop;
        spShop.spShopId=null;
        let data={name:value};
        const result=GetServerData('qerp.web.sp.shop.list',data);
            result.then((res) => {
            return res;
        }).then((json) => {
                if(json.code=='0'){
                    let shopList=json.shops
                    let dataSources=[];
                    for(let i=0;i<shopList.length;i++){
                        dataSources.push({
                            text:shopList[i].name,
                            value:shopList[i].spShopId,
                            key:i
                        })
                    }
                    this.setState({
                        dataSources:dataSources,
                        spShop:spShop
                    });
                }
        })
    }

    //在选择的时候
    onSelect=(value)=>{
        let spShop=this.state.spShop;
        spShop.spShopId=value;
        let data={spShopId:value}
        const result=GetServerData('qerp.web.sp.shopname.query',data);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                spShop.recProvinceId=json.spShop.provinceId;
                spShop.recCityId=json.spShop.cityId;
                spShop.recDistrictId=json.spShop.districtId;
                spShop.recName=json.spShop.shopman;
                spShop.recTel=json.spShop.telephone;
                spShop.recAddress=json.spShop.address;
                this.setState({
                    spShop:spShop
                });
                this.props.form.setFieldsValue({
                    spAddressId:[String(json.spShop.provinceId),String(json.spShop.cityId),String(json.spShop.districtId)],
                    recAddress:json.spShop.address,
                    recTel:json.spShop.telephone,
                    recName:json.spShop.shopman,
                });
            }
        }) 
    }

    //门店城市
    cityschange=(value)=>{
        let SPshop=this.state.spShop
        SPshop.recProvinceId=value[0]
        SPshop.recCityId=value[1]
        SPshop.recDistrictId=value[2]
        SPshop.spAddressId=null;
        this.setState({
            spShop:SPshop
        });
    }

    Getdetail=(messages)=>{
        //计算
        var dataSource=messages
        var allnumber=0
        var allpay=0
        for(var i=0;i<dataSource.length;i++){
            allnumber=allnumber+Number(dataSource[i].qty)
            allpay=allpay+parseFloat(parseFloat(dataSource[i].retailPrice)*Number(dataSource[i].qty))
        }
        //更新到spShop
        var spShop=this.state.spShop
        spShop.qtySum=allnumber
        spShop.amountSum=allpay.toFixed(2);
        this.setState({
            allnumber:allnumber,
            amountSum:allpay.toFixed(2),
            spShop:spShop,
            dataSource:dataSource,
        },function(){
            if(this.state.selecttypes){
                this.props.form.setFieldsValue({
                    qtySum:this.state.allnumber,
                    amountSum:this.state.amountSum,
                });
            }else{
                this.props.form.setFieldsValue({
                    qtySum:this.state.allnumber,
                    amountSum:0,
                });
            }


            
        })
    }

    //选择创建类型的操作
    handleSelectChange=(value)=>{
        if(value==2){
            this.props.form.setFieldsValue({
                amountSum: '0',
            });
            var spShop=this.state.spShop;
            spShop.amountSum=0
            this.setState({
                spShop:spShop,
                selecttypes:false
            })
        }else{
            //重新计算订单金额
            var allnumber=0;
            var allpay=0;
            if(this.state.dataSource.length){
                for(var i=0;i<this.state.dataSource.length;i++){
                    allnumber=allnumber+Number(this.state.dataSource[i].qty)
                    allpay=allpay+parseFloat(parseFloat(this.state.dataSource[i].retailPrice)*Number(this.state.dataSource[i].qty))
                }
            }
            //更新到spShop
            var spShop=this.state.spShop;
            spShop.qtySum=allnumber;
            spShop.amountSum=allpay.toFixed(2);
            this.setState({
                spShop:spShop,
                selecttypes:true
            },function(){
                this.props.form.setFieldsValue({
                    qtySum:this.state.allnumber,
                    amountSum:this.state.amountSum,
                });
            })
        }  
    }

	//取消
	hindCancel=()=>{
		this.deleteTab()
		this.refreshList()
	}
    
  	render(){
        const { getFieldDecorator,getFieldProps } = this.props.form;
     	return(
          	<Form className="addUser-form show-table-form">
                <FormItem
              		label="创建类型"
              		labelCol={{ span: 3,offset: 1 }}
              		wrapperCol={{ span: 6 }}
            	>
					{getFieldDecorator('createType', {
						rules: [{ required: true, message: '请选择创建类型' }]
					})(
						<Select placeholder="请选择创建类型" onChange={this.handleSelectChange.bind(this)}>
							<Option value='1'>新店铺货</Option>
                            <Option value='2'>门店赠品</Option>
                            <Option value='3'>总部样品</Option>
                            <Option value='4'>办公物料</Option>
						</Select>
              		)}
            	</FormItem>
				<FormItem
					label="门店名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('shopName', {
						rules: [{ required: true, message: '请选择门店名称'}],
					})(
						<AutoComplete
                            dataSource={this.state.dataSources}
                            onSelect={this.onSelect}
                            onSearch={this.handleSearch}
                            placeholder='请选择门店名称'
                        />
					)}
				</FormItem>
				<FormItem
					label="门店城市"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('spAddressId', {
						rules: [{ type: 'array', required: true, message: '请选择所属城市' }],
					})(
						<Cascader 
                            placeholder="请选择所属城市" 
                            options={this.state.residences}
                            onChange={this.cityschange.bind(this)}
                        />
					)}
				</FormItem>
                <FormItem
					label="门店地址"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('recAddress', {
						rules: [{ required: true, message: '请输入门店地址' }],
					})(
						<Input placeholder="请输入职位"/>
					)}
				</FormItem>
                <FormItem
					label="收货电话"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('recTel', {
						rules: [{ required: true, message: '请输入收货电话' }],
					})(
						<Input placeholder="请输入收货电话"/>
					)}
				</FormItem>
                <FormItem
					label="收货人"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('recName', {
						rules: [{ required: true, message: '请输入收货人' }],
					})(
						<Input placeholder="请输入收货人"/>
					)}
				</FormItem>
                <FormItem
					label="商品信息"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 12 }}
				>
					{getFieldDecorator('details')(
						<GoodsListTable Getdetail={this.Getdetail.bind(this)}/>
					)}
				</FormItem>
                <FormItem
					label="商品数量"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('qtySum')(
						<Input disabled/>
					)}
				</FormItem>
                <FormItem
					label="订单总额"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('amountSum')(
						<Input disabled/>
					)}
				</FormItem>
            	<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
              		<Button className='mr30' onClick={this.hindCancel.bind(this)}>取消</Button>
              		<Button htmlType="submit" type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
            	</FormItem>
                <Infomodel ref='models' deleteTab={this.deleteTab.bind(this)} refreshList={this.refreshList.bind(this)}/> 
          	</Form>
      	)
  	}
  	componentDidMount(){
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
    const {tableList,total,limit,currentPage,values} = state.ordermd;
    return {tableList,total,limit,currentPage,values};
}

const OrdermdEdit = Form.create()(OrdermdEditForm);
export default connect(mapStateToProps)(OrdermdEdit);