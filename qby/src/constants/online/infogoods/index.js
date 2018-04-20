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
	const confirm = Modal.confirm;

	class OnlineGoodsIndex extends React.Component{
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
							type:'onlinegood/fetch',
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
							type:'onlinegood/fetch',
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
							type:'onlinegood/fetch',
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
			const paneitem={title:'新增商品',key:'802000edit',componkey:'802000edit',data:{pdSpuId:null}}
			this.props.dispatch({
					type:'tab/firstAddTab',
					payload:paneitem
			})	
			this.props.dispatch({
				type:'onlinegood/initgoodedit',
				payload:{}
			})	
		}
		render(){
			const rolelists=this.props.data.rolelists
			//增改商品
			const addorder=rolelists.find((currentValue,index)=>{
				return currentValue.url=="qerp.web.ec.pd.spu.save"
			})
			//导出数据
			const expontdata=rolelists.find((currentValue,index)=>{
				return currentValue.url=="qerp.web.sys.doc.task"
			})
			//售卖开关
			const newopen=rolelists.find((currentValue,index)=>{
				return currentValue.url=="qerp.web.pd.spu.status"
			})
		


			exportData = (type,data) => {
				const values={
					type:type,
					downloadParam:data,
				}
				const result=GetServerData('qerp.web.sys.doc.task',values);
				result.then((res) => {
					return res;
				}).then((json) => {
					if(json.code=='0'){
						var _dispatch=this.props.dispatch
						confirm({
							title: '数据已经进入导出队列',
							content: '请前往下载中心查看导出进度',
							cancelText:'稍后去',
							okText:'去看看',
							onOk() {
								const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
								_dispatch({
									type:'tab/firstAddTab',
									payload:paneitem
								});
								_dispatch({
									type:'downlaod/fetch',
									payload:{code:'qerp.web.sys.doc.list',values:{limit:16,currentPage:0}}
								});
							},
							onCancel() {
								
							},
						  });
					}
				})
			
			}
		
			return(
				<div>
					<Goodssearchform/>
					<div className='btn_boxs'>
						{
							addorder?<Button type="primary" className='btn_lists' size='large' onClick={this.addspus.bind(this)}>新增商品</Button>:null
						}
						{
							sellopen?<div className='btn_lists'><Button type="primary" size='large' onClick={this.exportData.bind(this,32,this.props.values)}>导出数据</Button></div>:null
						}
					</div>
					<Goodlist addorderobj={addorder} sellopenobj={sellopen}/>
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
		const {checkgood,values} = state.onlinegood;
			return {checkgood,values};
	}

	export default connect(mapStateToProps)(OnlineGoodsIndex);
