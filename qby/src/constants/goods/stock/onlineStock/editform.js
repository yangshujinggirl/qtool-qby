import { Form, Select, Input, Button ,message} from 'antd';
import EditableTable from '../../../../components/table/tablebasic'
import {GetServerData} from '../../../../services/services';
const FormItem = Form.Item;
const Option = Select.Option;
import { connect } from 'dva';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.columns=[{
			title: '商品名称',
			dataIndex: 'name'
			}, {
			title: '商品规格',
			dataIndex: 'displayName'
			},{
			title: '在售库存',
			dataIndex: 'qty'
			},{
			title: '订单占用库存',
			dataIndex: 'qtyOnhold'
			},{
			title: '芳星库存',
			dataIndex: 'stock_num',
			}]
			this.columns2=[{
				title: '商品名称',
				dataIndex: 'name'
				}, {
				title: '商品规格',
				dataIndex: 'displayName'
				},{
				title: '在售库存',
				dataIndex: 'qty'
				},{
				title: '订单占用库存',
				dataIndex: 'qtyOnhold'
				}]
			this.state = {
				isinfo:false
			}
	}

handleSubmit = (e) => {
	e.preventDefault();
	this.props.form.validateFields((err, values) => {
	if (!err) {
		const result=GetServerData('qerp.web.pd.inv.online.change',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				const ishindok=true
				const code=json.pdSku!=null?json.pdSku.code:json.pdSpu.code
				const name=json.pdSpu.name
				const pdtypes=json.pdSku!=null ? (json.pdSku.pdType2Val == null ? json.pdSku.pdType1Val.name : json.pdSku.pdType1Val.name+json.pdSku.pdType2Val.name) : '';
				const qty=json.qty
				const afterQty=json.afterQty
				message.success('售卖库存修改成功',.8)
				const changedatasouce=this.props.changedatasouce.slice(0)
				changedatasouce.unshift(
					{
						code:code,
						name:name,
						pdtypes:pdtypes,
						qty:qty,
						afterQty:afterQty
					}
				)
				this.props.dispatch({
					type:'onlineStock/stocktablechenge',
					payload:changedatasouce
				})
				this.props.dispatch({
					type:'onlineStock/stocktablechengeok',
					payload:ishindok
				})
			}
		})
	}
	});
}

hindkeyup=(e)=>{
	if(e.keyCode=='13'){
		this.handleSubmit(e)
	}
}

handleEnt=(e)=>{
	if(e.keyCode=='13'){
		const values={
			code:e.target.value
		}
		const result=GetServerData('qerp.web.pd.spu.online.invinfo',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				this.setState({
					isinfo:true,
					stock_num:json.stock_num
				},function(){
					const datasoucedata=[]
					const datasouce={}
					if (json.pdSku != null && json.pdSku.pdSkuId > 0) {
						if (json.pdSku.pdType1Val != null) {
							if (json.pdSku.pdType2Val != null) {
								datasouce.specification = json.pdSku.pdType1Val.name + '/' + json.pdSku.pdType2Val.name;
							} else {
								datasouce.specification = json.pdSku.pdType1Val.name
							};
						} else if (json.pdSku.pdType2Val != null) {
							datasouce.specification = json.pdSku.pdType2Val.name
						};
					};
						datasouce.name=json.pdSpu.name //名字
						datasouce.qty=json.qty //在售
						datasouce.qtyOnhold=json.qtyOnhold //占用库存
						datasouce.displayName=json.displayName //占用库存
						if(json.stock_num){
							datasouce.stock_num=json.stock_num;
						}
						datasoucedata.push(datasouce)
						this.props.dispatch({
							type:'onlineStock/stocktableinfo',
							payload:datasoucedata
						})
				});
			}else{
				this.props.form.resetFields(['code'])
			};
		})
	}
}

render() {
	const { getFieldDecorator } = this.props.form;
	return (
	<Form>
		<FormItem
		label="商品编码"
		labelCol={{ span: 6 }}
		wrapperCol={{ span: 6 }}
		>
		{getFieldDecorator('code', {
			rules: [{ required: true, message: '请输入商品编码' }],
		})(
			<Input placeholder='请输入商品编码' onKeyUp={this.handleEnt.bind(this)} autoComplete="off"/>
		)}
		</FormItem>
		<FormItem
		>
		{
			this.state.isinfo?
			<EditableTable columns={this.state.stock_num?this.columns:this.columns2} dataSource={this.props.datasoucedata} bordered={true}/>
			:null
		}
		</FormItem>
		<FormItem
			label="增减库存"
			labelCol={{ span: 6 }}
			wrapperCol={{ span: 6 }}
		>
		{getFieldDecorator('delta', {
			rules: [{ required: true, message: '请输入增减库存' }],
		})(
			<Input placeholder='请输入增减库存' onKeyUp={this.hindkeyup.bind(this)} autoComplete="off"/>
		)}
		</FormItem>
		<FormItem
			wrapperCol={{ span: 12, offset: 6 }}
		>
		<Button type="primary" onClick={this.handleSubmit.bind(this)}>
			确定
		</Button>
		</FormItem>
	</Form>
	);
}
}

const WrappedApp = Form.create()(App);

function mapStateToProps(state) {
	const {datasoucedata,changedatasouce,ishindok} = state.onlineStock;
	return {datasoucedata,changedatasouce,ishindok};
}
export default connect(mapStateToProps)(WrappedApp);
