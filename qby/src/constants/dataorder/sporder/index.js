import {GetServerData} from '../../../services/services';
import { Button, Icon,Modal } from 'antd';
import { connect } from 'dva';
import Cardlist from '../../../components/card/cardlist';
import Cards from '../../../components/card/catds';
import EchartsTest from '../../../echarts/datasporder';
import DataclassTable from './table';
import NP from 'number-precision'

class DatasporderIndex extends React.Component{
	state = {};
	getTopfetch=()=>{
		const values={}
		this.props.dispatch({
			type:'datasporder/sellfetch',
			payload:{code:'qerp.web.rp.shop.order.query',values:values}
		})
	}
	desinfo=()=>{
		Modal.info({
			title: '字段说明',
			content: (
			<div className='lists'>
				<p>【总订单数】：总体门店订单数（包含取消订单）</p>
				<p>【有效订单数】：未取消的门店订单数量 </p>
				<p>【预售订单数】：预售订单的数量</p>
				<p>【直邮订单数】：直邮订单的数量</p>
				<p>【取消订单数】：已经取消的门店订单数量</p>
				<p>【销售额】：全部门店订单销售总额</p>
				<p>【有效销售额】：未取消的门店订单的销售总额</p>
				<p>【预售销售额】：预售订单的订单金额总和</p>
				<p>【直邮销售额】：直邮订单的订单金额总和</p>
				<p>【取消订单额】：取消订单的订单金额总和</p>
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
	const {updateTime,datalist1,datalist2} = state.datasporder;
	return {updateTime,datalist1,datalist2};
}
export default connect(mapStateToProps)(DatasporderIndex);
