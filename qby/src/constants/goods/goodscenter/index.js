	import '../../../style/goods.css';
	import {GetServerData} from '../../../services/services';
	import { Button,message,Modal,Table,Icon,Popconfirm,Input} from 'antd';
	import { connect } from 'dva';
	import { successdown } from '../../../utils/meth'
	import Goodlist from './goodslist';
	import Goodssearchform from './search';

	const poptext1='商品状态将变为上架状态，Q掌柜将会对外售卖，确认吗'
	const poptext2='商品状态将变为下架状态，Q掌柜将会对外售卖，确认吗'
	const poptext3='商品将会在Q掌柜首页每日上新栏目展示售卖，确认吗'
	const poptext4='商品将会停止在Q掌柜首页畅销尖货栏目展示售卖，在其他栏目继续展示售卖，确认吗'
	const poptext5='商品将会在Q掌柜首页畅销尖货栏目展示售卖，确认吗？'
	const poptext6='商品状态将变为上新状态，Q掌柜将会对外售卖，确认吗'


	// 测试table开始
	// class EditableCell extends React.Component {
	// 	state = {
	// 		value: this.props.value,
	// 		editable: false,
	// 	}
	// 	handleChange = (index) => {
	// 		console.log(index)
	// 		//根据信息展示弹窗
	// 	}
		
	// 	render() {
	// 		console.log(this)
	// 		const { value, editable } = this.state;
	// 		return (
	// 		<div className="editable-cell">
	// 				{

	// 				this.props.types=='1'?<span>{this.props.data}</span>:
	// 					this.props.data.map((item,index)=>{
	// 					return (
	// 						<span key={index}>
								

	// 							{
	// 								item.type=='2'?
	// 								<span onClick={this.handleChange.bind(this,index)}>{item.replacevalue}</span>:
	// 								item.replacevalue

	// 							}


						
	// 						</span>
	// 						)
	// 					})

	// 				}


	// 		</div>
	// 		);
	// 	}	}
		
	//以下为正式内容

	/*class EditableTable extends React.Component {
		constructor(props) {
			super(props);
			this.columns = [{
			title: 'name',
			dataIndex: 'des',
			width: '30%',
			render: (text, record) => (
					<EditableCell
					data={text}
					types={record.types}
					/>
				),
			}, {
			title: 'age',
			dataIndex: 'age',
			}, {
			title: 'address',
			dataIndex: 'address',
			}];
			
			this.state = {
				dataSource: [{
							key: '0',
							name: 'Edward King 0',
							age: '32',
							address: 'London, Park Lane no. 0',
							types:'2',
							des:[
							{
								name:"%s",
								type:"1",
								replacevalue:'修改商品编码'
							},{
								name:"%s",
								type:"1",
								replacevalue:'1234'
							},{
								name:"由",
								type:"1",
								replacevalue:'由'
							},{
								name:"%s",
								type:"2",
								replacevalue:'ph123'
							},{
								name:"改为",
								type:"1",
								replacevalue:'改为'
							},{
								name:"%s",
								type:"2",
								replacevalue:'ph456'
							}
						]

				},
			{
				key: '1',
				name: 'Edward King 1',
				age: '32',
				types:"1", //我的数据中没有url及商品描述信息（判断功能同上字段）
				address: 'London, Park Lane no. 1',
				des:'我修改了AAA'  //操作描述数据（判断功能同上字段）
			}],
			count: 2,
			};
		}

		
		render() {
			const { dataSource } = this.state;
			const columns = this.columns;
			return (
			<div>
				<Table bordered dataSource={dataSource} columns={columns} />
			</div>
			);
		}
		}
	*/
	//处理逻辑

	// 进入table页面请求数据,之后设置数据源：dataSource


	// 关于操作描述数据源的组成逻辑：
	// 1.判断当前是否含有url或者商品描述更改，如果没有，则直接执行format方法，把得到的值赋值给当前des,
	//如果包含url或者商品描述信息
	//	 则按照%s把给的模板字符串分离，%s按照顺序依次对应后端给出的字段，对应添加匹配项

	//测试table组件结束

	class GoodsIndex extends React.Component{
		state={
				visible: false,
				type:'10'
		}
		handleOk = (e) => {
					if(this.state.type=='10' || this.state.type=='20'){
						this.piSell(this.state.type)
						}
					if(this.state.type=='30' || this.state.type=='40'){
						this.pinNew(this.state.type)
					}
					if(this.state.type=='50' || this.state.type=='60'){
						this.pinHot(this.state.type)	
					}
		}
		handleCancel = (e) => {
					this.setState({
				visible: false
			})
		}
		showModal=(id)=>{
			this.setState({
				visible: true,
				count:id=='10'?poptext1:(id=='20'?poptext2:(id=='30'?poptext3:(id=='40'?poptext4:(id=='50'?poptext5:poptext6)))),
				type:id
			})
		}
		//批量售卖
		piSell=(state)=>{
			if(this.props.checkgood.length>0){
				let pdSpuIds=this.props.checkgood
				let values={
					pdSpuIds:pdSpuIds,
					status:state
				}
				const result=GetServerData('qerp.web.pd.spu.status',values)
				result.then((res) => {
					return res;
				}).then((json) => {
					const povisible=false
					if(json.code=='0'){
						this.props.dispatch({
							type:'goods/fetch',
							payload:{code:'qerp.web.pd.spu.query',values:this.props.values}
						})
						this.setState({
							visible:false
						})
					}
				})
			}
		}
		//批量上新
		pinNew=(state)=>{
			if(this.props.checkgood.length>0){
				let pdSpuIds=this.props.checkgood
				let values={
					pdSpuIds:pdSpuIds,
					isNew:(state==30?true:false)
				}
				const result=GetServerData('qerp.web.pd.spu.statusnew',values)
				result.then((res) => {
					return res;
				}).then((json) => {
					if(json.code=='0'){
						const povisible=false
						this.props.dispatch({
							type:'goods/fetch',
							payload:{code:'qerp.web.pd.spu.query',values:this.props.values}
						})
						this.setState({
							visible:false
						})
					}
				})

			}
		}
		//批量畅销
		pinHot=(state)=>{
			if(this.props.checkgood.length>0){
				let pdSpuIds=this.props.checkgood
				let values={
					pdSpuIds:pdSpuIds,
					isHot:(state=='50'?true:false)
				}
				const result=GetServerData('qerp.web.pd.spu.statushot',values)
				result.then((res) => {
					return res;
				}).then((json) => {
					if(json.code=='0'){
						const povisible=false
						this.props.dispatch({
							type:'goods/fetch',
							payload:{code:'qerp.web.pd.spu.query',values:this.props.values}
						})
						this.setState({
							visible:false
						})
					}
				})

			}
		}
		//新增商品
		addspus=()=>{
			const paneitem={title:'新增商品',key:'301000edit',componkey:'301000edit',data:{pdSpuId:null}}
			this.props.dispatch({
					type:'tab/firstAddTab',
					payload:paneitem
			})	
			this.props.dispatch({
				type:'goods/initgoodedit',
				payload:{}
				})	
		}

		hindceshi=()=>{

		}
		render(){
			return(
				<div>
					<Goodssearchform/>
					<div className='btn_boxs'>
						<Button type="primary" className='btn_lists' size='large' onClick={this.addspus.bind(this)}>新增商品</Button>
						<div className='btn_lists'><Button type="primary" size='large' onClick={this.showModal.bind(this,10)}>批量售卖</Button></div>
						<div className='btn_lists'><Button type="primary" size='large' onClick={this.showModal.bind(this,20)}>批量停售</Button></div>
						<div className='btn_lists'><Button type="primary" size='large' onClick={this.showModal.bind(this,30)}>批量上新</Button></div>
						<div className='btn_lists'><Button type="primary" size='large' onClick={this.showModal.bind(this,40)}>批量下新</Button></div>
						<div className='btn_lists'><Button type="primary" size='large' onClick={this.showModal.bind(this,50)}>批量畅销</Button></div>
						<div className='btn_lists'><Button type="primary" size='large' onClick={this.showModal.bind(this,60)}>批量下畅销</Button></div>
					</div>

					<Goodlist/>
					<Modal
						title='批量操作'
						visible={this.state.visible}
						onOk={this.handleOk}
						onCancel={this.handleCancel}
					>
						<div>{this.props.checkgood.length>0?this.state.count:'请选择商品'}</div>
					</Modal>
				</div>
			)
		}
	}
	function mapStateToProps(state) {
		const {checkgood,values} = state.goods;
			return {checkgood,values};
	}

	export default connect(mapStateToProps)(GoodsIndex);
