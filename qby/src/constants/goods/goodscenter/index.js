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
		render(){
			const rolelists=this.props.data.rolelists
			// //增改商品
			const addorder=rolelists.find((currentValue,index)=>{
				return currentValue.remark=="qerp.web.ws.asn.save"
			})
			//售卖开关
			const sellopen=rolelists.find((currentValue,index)=>{
				return currentValue.remark=="qerp.web.sys.doc.tasks"
			})
			//批量上新
			const newopen=rolelists.find((currentValue,index)=>{
				return currentValue.remark=="qerp.web.sp.order.print"
			})
			//批量畅销
			const hotopen=rolelists.find((currentValue,index)=>{
				return currentValue.remark=="qerp.web.ws.asn.payStatus"
			})
			


			return(
				<div>
					<Goodssearchform/>
					<div className='btn_boxs'>
						{
							addorder?<Button type="primary" className='btn_lists' size='large' onClick={this.addspus.bind(this)}>新增商品</Button>:null
						}
						{
							sellopen?<div className='btn_lists'><Button type="primary" size='large' onClick={this.showModal.bind(this,10)}>批量售卖</Button></div>:null


						}
						{
							sellopen?<div className='btn_lists'><Button type="primary" size='large' onClick={this.showModal.bind(this,20)}>批量停售</Button></div>:null
						}
						{
							newopen?<div className='btn_lists'><Button type="primary" size='large' onClick={this.showModal.bind(this,30)}>批量上新</Button></div>:null

						}
						{
							newopen?<div className='btn_lists'><Button type="primary" size='large' onClick={this.showModal.bind(this,40)}>批量下新</Button></div>:null
						}
						{
							hotopen?<div className='btn_lists'><Button type="primary" size='large' onClick={this.showModal.bind(this,50)}>批量畅销</Button></div>:null
						}
						{
							hotopen?<div className='btn_lists'><Button type="primary" size='large' onClick={this.showModal.bind(this,60)}>批量下畅销</Button></div>:null
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
		const {checkgood,values} = state.goods;
			return {checkgood,values};
	}

	export default connect(mapStateToProps)(GoodsIndex);
