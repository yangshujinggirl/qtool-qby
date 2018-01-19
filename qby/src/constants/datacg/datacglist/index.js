import { Button, Icon,Modal } from 'antd';
import { connect } from 'dva';
import Cards from '../../../components/card/catds';
import DatacgTable from './table';
import NP from 'number-precision'

class DatacglistIndex extends React.Component{
	state = {};
	getTopfetch=()=>{
		const values={}
		this.props.dispatch({
			type:'datacg/sellfetch',
			payload:{code:'qerp.web.rp.proposal.query',values:values}
		})
	}
	gettablefetch=()=>{
		const values={}
		this.props.dispatch({
			type:'datacg/tablefetch',
			payload:{code:'qerp.web.rp.pd.purchase.list',values:values}
		})
	}
	desinfo=()=>{
		Modal.info({
			title: '字段说明',
			content: (
			<div className='lists'>
				<p>【本月采购额】：本月产生的采购订单的订单总额</p>
				<p>【本月采购商品数】：本月产生的采购订单中的商品总数量</p>
				<p>【本月采退】：本月产生的采退订单的订单总额</p>
				<p>【本月采退商品数】：本月产生的采退订单中的商品总数量</p>
				<p>【销售数量】：商品在Q掌柜中销售的数量（包含Q本营创建的订单、不含取消订单）</p>
				<p>【建议采购商品】：明星商品，建议采购的商品。可售库存/掌柜历史10天的销售量小于等于30%</p>
				<p>【同比上月】： 同比上月=（本月数据-上月数据）/上月数据</p>
			</div>
			),
			onOk() {},
		});
	}
	render(){
		return(
			<div>
				<div className='clearfix mb10'>
					<p className='fr pointer' onClick={this.desinfo.bind(this)}>定义数据说明<Icon type="question-circle-o" style={{color:"#ED6531"}}/></p>	
				</div>
				<Cards data={this.props.data}/>
				<div className='mt10'><DatacgTable/></div>
			</div>
		)
	}
	componentDidMount(){
		this.getTopfetch()
		this.gettablefetch()
	}
}


function mapStateToProps(state) {
	const {iRpPurchaseAnalysis,data} = state.datacg;
	return {iRpPurchaseAnalysis,data};
}
export default connect(mapStateToProps)(DatacglistIndex);

