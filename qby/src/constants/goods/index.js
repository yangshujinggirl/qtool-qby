import {GetServerData} from '../../services/services';
import {GetLodop} from '../../utils/print';
import { Button,message} from 'antd';
import { connect } from 'dva';

import Goodlist from './goodslist';
import '../../style/goods.css';
import Goodssearchform from './search';
import EditableTable from '../../components/table/tablebasic';
import Appmodel from '../../components/model/modelbasic';












class GoodsIndex extends React.Component{
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
				if(json.code=='0'){
					this.props.dispatch({
						type:'goods/fetch',
						payload:{code:'qerp.web.pd.spu.query',values:this.props.values}
					})
				}
			})

		}

	}
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
					this.props.dispatch({
						type:'goods/fetch',
						payload:{code:'qerp.web.pd.spu.query',values:this.props.values}
					})
				}
			})

		}

	}
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
					this.props.dispatch({
						type:'goods/fetch',
						payload:{code:'qerp.web.pd.spu.query',values:this.props.values}
					})
				}
			})

		 }

	}

	render(){

		return(
			<div>
				<Goodssearchform/>
				<div className='btn_boxs'>
					<div className='btn_lists'><Appmodel title='批量操作' text='批量售卖' count={this.props.checkgood.length>0?'商品状态将变为上架状态，Q掌柜将会对外售卖，确认吗?':'请选择商品'} hindClick={this.piSell.bind(this,10)}/></div>
					<div className='btn_lists'><Appmodel title='批量操作' text='批量停售' count={this.props.checkgood.length>0?'商品状态将变为下架状态，Q掌柜将会对外售卖，确认吗?':'请选择商品'} hindClick={this.piSell.bind(this,20)}/></div>
					<div className='btn_lists'><Appmodel title='批量操作' text='批量上新' count={this.props.checkgood.length>0?'商品将会在Q掌柜首页每日上新栏目展示售卖，确认吗？':'请选择商品'} hindClick={this.pinNew.bind(this,30)}/></div>
					<div className='btn_lists'><Appmodel title='批量操作' text='批量下新' count={this.props.checkgood.length>0?'商品将会停止在Q掌柜首页畅销尖货栏目展示售卖，在其他栏目继续展示售卖，确认吗？':'请选择商品'} hindClick={this.pinNew.bind(this,40)}/></div>
					<div className='btn_lists'><Appmodel title='批量操作' text='批量畅销' count={this.props.checkgood.length>0?'商品将会在Q掌柜首页畅销尖货栏目展示售卖，确认吗？':'请选择商品'} hindClick={this.pinHot.bind(this,50)}/></div>
					<div className='btn_lists'><Appmodel title='批量操作' text='批量下畅销' count={this.props.checkgood.length>0?'商品状态将变为上新状态，Q掌柜将会对外售卖，确认吗?':'请选择商品'} hindClick={this.pinHot.bind(this,60)}/></div>
					<Button type="primary" className='btn_lists'>新增商品</Button>
				</div>
				<Goodlist/>
			</div>
		)
	}
}
function mapStateToProps(state) {
	const {checkgood,values} = state.goods;
	console.log(checkgood)
    return {checkgood,values};
}

export default connect(mapStateToProps)(GoodsIndex);
