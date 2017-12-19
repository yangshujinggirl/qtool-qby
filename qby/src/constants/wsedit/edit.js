import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import { Form, Select, Input, Button ,message,Cascader} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class AddNewws extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			recProvinceId:null,
			recCityId:null,
			recDistrictId:null
		}
	}
	//保存
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  	if (!err) {
				if(this.props.data){
					values.wsWarehouseId=this.props.data.wsWarehouseId
				}
				values.recProvinceId=this.props.recProvinceId
				values.recCityId=this.props.recCityId
				values.recDistrictId=this.props.recDistrictId
				const value={warehouse:values}
				const result=GetServerData('qerp.web.ws.warehouse.save',value)
				result.then((res) => {
					return res;
				}).then((json) => {
					if(json.code=='0'){
						if(this.props.data){
							message.success('仓库信息修改成功',.8);
						}else{
							message.success('仓库新增成功',.8);
						}
						this.refresh()
						this.delete()
					}
				})
		  	}	
		});
	}

	//取消
	hindCancel=()=>{
		this.delete()
	}

	//删除当前tab
	delete=()=>{
		if(this.props.data){
			this.props.dispatch({
				type:'wsedit/delete',
				payload:'90000edit'+this.props.data.wsWarehouseId
			})
		}else{
			this.props.dispatch({
				type:'wsedit/delete',
				payload:'90000edit'
			})
		}
	}

	initAccountList=(limit,currentPage)=>{
        this.props.dispatch({
            type:'wsedit/fetch',
            payload:{code:'qerp.web.ws.warehouse.query',values:{}}
		})
	}

	//刷新首页
	refresh=()=>{
		this.initAccountList()
	}

	//城市请求
	citylist=()=>{
		this.props.dispatch({
            type:'IndexPage/cityfetch',
            payload:{code:'qerp.web.ws.bs.region',values:{}}
        })
	}

	//city change
	citysChange=(value)=>{
		this.props.dispatch({
            type:'wsedit/city',
            payload:value
        })
	}
	initDateEdit=()=>{
		this.props.dispatch({
            type:'wsedit/infofetch',
            payload:{code:'qerp.web.ws.warehouse.detail',values:{wsWarehouseId:this.props.data.wsWarehouseId}}
		})
	}

  	render(){
    	const { getFieldDecorator } = this.props.form;
     	return(
          	<Form className="ws-wrapperform">
				<FormItem
					label="仓库名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: '请输入仓库名称' }],
						initialValue:this.props.warehouse.name
					})(
						<Input placeholder="请输入仓库名称"/>
					)}
				</FormItem>
				<FormItem
					label="仓库类型"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('wsType', {
						rules: [{ required: true, message: '请选择仓库类型' }],
						initialValue:this.props.warehouse.wsType
					})(
						<Select placeholder="请选择仓库类型">
							<Option value="10">自有仓库</Option>
							<Option value="20">样品仓</Option>
						</Select>
					)}
				</FormItem>
				<FormItem
					label="仓库状态"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('status', {
						rules: [{ required: true, message: '请选择仓库状态' }],
						initialValue:this.props.warehouse.status
					})(
						<Select placeholder="请选择仓库状态">
							<Option value="1">启用</Option>
							<Option value="0">禁用</Option>
						</Select>
					)}
				</FormItem>
				<FormItem
					label="收货人"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('recName', {
						rules: [{ required: true, message: '请输入收货人' }],
						initialValue:this.props.warehouse.recName
					})(
						<Input placeholder="请输入收货人"/>
					)}
				</FormItem>
				<FormItem
					label="收货电话"
					labelCol={{ span: 3,offset: 1}}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('recTelephone', {
						rules: [{ required: true, message: '请输入收货电话' }],
						initialValue:this.props.warehouse.recTelephone
					})(
						<Input placeholder="请输入收货电话"/>
					)}
				</FormItem>
            	<FormItem
              		label="仓库城市"
              		labelCol={{ span: 3,offset: 1 }}
              		wrapperCol={{ span: 6 }}
            	>
					{getFieldDecorator('cityadress', {
						rules: [{ required: true, message: '请选择仓库城市' }],
						initialValue:[this.props.warehouse.recProvinceId,this.props.warehouse.recCityId,this.props.warehouse.recDistrictId]
					})(
						
						<Cascader 
							placeholder="请选择仓库城市" 
							options={this.props.citylist}
							onChange={this.citysChange.bind(this)}
							allowClear={false}
						/>
              		)}
            	</FormItem>
				<FormItem
					label="详细地址"
					labelCol={{ span: 3,offset: 1}}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('recAddress', {
						rules: [{ required: true, message: '请输入详细地址' }],
						initialValue:this.props.warehouse.recAddress
					})(
						<Input placeholder="请输入详细地址"/>
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
		this.citylist()
    	if(this.props.data){
			this.initDateEdit()
		}
  	}
}
function mapStateToProps(state) {
	const {warehouse,recProvinceId,recCityId,recDistrictId} = state.wsedit;
	const {citylist}=state.IndexPage;
    return {citylist,warehouse,recProvinceId,recCityId,recDistrictId};
}

const Addws = Form.create()(AddNewws);
export default connect(mapStateToProps)(Addws);