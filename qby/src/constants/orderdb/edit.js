import React from 'react';
import {GetServerData} from '../../services/services';
import {deepcCloneObj} from '../../utils/commonFc';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Modal, Row, Col,DatePicker,Radio,AutoComplete,Cascader} from 'antd';
import moment from 'moment';
import GoodsInfoTable from './goodsTable';
import MyUpload from './upload';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class OrderdbEditForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
            //请求的仓库列表信息
            warehouses:[],
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
            payload:'206000edit'
        });
	}

	//刷新列表
	refreshList=()=>{
		this.props.dispatch({
            type:'orderdb/fetch',
            payload:{code:'qerp.web.sp.exchange.query',values:this.props.values}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}


	//初始化state
	initState=()=>{
		this.props.form.resetFields();
    }

	//保存
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		    if (!err) {
                const results=this.checkrule();
                if(results==false){
                    message.error('商品编码和调出数量不能为空',.8); 
                    return 
                }
                // id判断
                if(values.outwsWarehouseId==values.callwsWarehouseId){
                    message.error('调出仓库与调入仓库不能相同',.8); 
                    return
                }
                values.details=this.props.goodsInfo;
                const result=GetServerData('qerp.web.sp.exchange.save',values);
                result.then((res) => {
                    return res;
                }).then((json) => {
                    if(json.code=='0'){
						message.success('订单创建成功',.8);
						this.deleteTab();
						this.refreshList();
					    //  this.initState();
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

    //校验商品编码和调出数量是否为空
    checkrule=()=>{
        var iswaring=true
        let temDataSource = this.props.goodsInfo;
        for(var i=0;i<temDataSource.length;i++){
            if(temDataSource[i].code==null || temDataSource[i].code== undefined || temDataSource[i].code== '' ){
                temDataSource[i].codeline=false
                iswaring=false
            }

            if(temDataSource[i].qty==null || temDataSource[i].qty== undefined || temDataSource[i].qty== ''){
                temDataSource[i].qtyline=false
                iswaring=false
            }
        }

        if(iswaring){
            return true
        }else{
            this.props.dispatch({
                type:'orderdb/syncGoodsInfo',
                payload:temDataSource
            })
            return false
        }
	}
	
	// 下载导入模板
    ZaiSpuExcel=()=>{
        window.open('../../static/msorder.xlsx')
    }

  	render(){
		const { getFieldDecorator } = this.props.form;
     	return(
			<div>
				<MyUpload/> 
				<Button type="primary" 
						onClick={this.ZaiSpuExcel.bind(this)} 
						style={{position:'absolute',right:'15px',top:'24px',zIndex:"1000"}}>下载导入模板</Button>
				<Form className="addUser-form">
				<FormItem
						label="调出仓库"
						labelCol={{ span: 3,offset: 1 }}
						wrapperCol={{ span: 6 }}
					>
						{getFieldDecorator('outwsWarehouseId', {
							rules: [{ required: true, message: '请选择调出仓库' }]
						})(
							<Select placeholder="请选择调出仓库">
								{
									this.state.warehouses.map((item,index)=>{
										return (<Option value={String(item.wsWarehouseId)} key={index}>{item.name}</Option>)
									})
								}
							</Select>
						)}
					</FormItem>
					<FormItem
						label="调入仓库"
						labelCol={{ span: 3,offset: 1 }}
						wrapperCol={{ span: 6 }}
					>
						{getFieldDecorator('callwsWarehouseId', {
							rules: [{ required: true, message: '请选择调入仓库' }]
						})(
							<Select placeholder="请选择调入仓库">
								{
									this.state.warehouses.map((item,index)=>{
										return (<Option value={String(item.wsWarehouseId)} key={index}>{item.name}</Option>)
									})
								}
							</Select>
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
						label="调拨原因"
						labelCol={{ span: 3,offset: 1}}
						wrapperCol={{ span: 6 }}
					>
						{getFieldDecorator('reason', {
							rules: [{min:5,message: '请选择5-100字调拨原因',max:100,required:true},],
						})(
							<TextArea rows={4} placeholder="请选择5-100字调拨原因" autoComplete="off"/>
						)}
					</FormItem>
					<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
						<Button className='mr30' onClick={this.hindCancel.bind(this)}>取消</Button>
						<Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
					</FormItem>
				</Form>
			</div>
      	)
  	}
  	componentDidMount(){
    	//请求仓库列表信息
        this.warehouseList();
  	}
}
function mapStateToProps(state) {
    const {values,formValue,goodsInfo} = state.orderdb;
    return {values,formValue,goodsInfo};
}

const OrderdbEdit = Form.create()(OrderdbEditForm);
export default connect(mapStateToProps)(OrderdbEdit);