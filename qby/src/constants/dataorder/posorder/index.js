import {GetServerData} from '../../../services/services';
import { Button, Icon,Modal } from 'antd';
import { connect } from 'dva';
import Cardlist from '../../../components/card/cardlist';
import Cards from '../../../components/card/catds';
import EchartsTest from '../../../echarts/dataposorder';
import NP from 'number-precision'
import DataclassTable from './table';


class DataposorderIndex extends React.Component{
	state = {};
	getTopfetch=()=>{
		const values={}
		this.props.dispatch({
			type:'dataposorder/sellfetch',
			payload:{code:'qerp.web.rp.pos.order.query',values:values}
		})
	}
	desinfo=()=>{
		Modal.info({
			title: '字段说明',
			content: (
			<div className='lists'>
				<p>【销售订单数】：POS中产生的销售订单数量</p>
				<p>【会员订单数】：POS中产生会员积分的销售订单数量</p>
				<p>【充值订单数】：POS中产生的充值订单数量</p>
				<p>【退款订单数】：POS中产生的退款订单数量</p>
				<p>【毛销售额】：POS中产生的所有销售订单的订单金额总和</p>
				<p>【销售额】：POS中产生的所有销售订单的订单金额-POS中产生的退货订单的退款金额</p>
				<p>【会员销售额】：POS中所有产生会员积分的销售订单订单金额总和</p>
				<p>【充值金额】：POS中所产生的充值订单的充值总金额</p>
				<p>【退款金额】：POS中所产生的退货订单的退款总金额</p>
				<p>【同比上周】： 同比上周=（今日数据-上周今日整日数据）/上周今日整日数据</p>
			</div>
			),
			onOk() {},
		});
	}
	render(){
		return(
			<div>
				<div className='clearfix mb10'>
					<p className='fl'>数据更新于:{this.props.updateTime}</p>
					<p className='fr pointer' onClick={this.desinfo.bind(this)}>数据定义说明<Icon type="question-circle-o" style={{color:"#ED6531",marginLeft:"4px"}}/></p>	
				</div>
				<div><Cards data={this.props.datalist1}/></div>
				<div className='mt10'><Cards data={this.props.datalist2}/></div>
				<div style={{border:'1px solid #e8e8e8',padding:'20px',marginTop:'30px'}}>
					<EchartsTest type='1'/>
				</div>
				<div className='mt30'><DataclassTable/></div>
			</div>
		)
	}
	componentDidMount(){
		this.getTopfetch()
	}
}


function mapStateToProps(state) {
	const {updateTime,datalist1,datalist2} = state.dataposorder;
	return {updateTime,datalist1,datalist2};
}
export default connect(mapStateToProps)(DataposorderIndex);


