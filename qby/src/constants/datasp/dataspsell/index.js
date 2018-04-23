import {GetServerData} from '../../../services/services';
import { Button, Icon ,Modal} from 'antd';
import { connect } from 'dva';
import Cardlist from '../../../components/card/cardlist';
import Cards from '../../../components/card/catds';
import EchartsTest from '../../../echarts/datasp';
import DataspTable from './table';
import NP from 'number-precision'

class DataspsellIndex extends React.Component{
	state = {};
	getTopfetch=()=>{
		const values=null
		this.props.dispatch({
			type:'dataspsell/sellfetch',
            payload:{code:'qerp.web.rp.shop.sale.data.query',values:values}
		})
	}

	hindent=(index)=>{
		const datasouce=[]
		this.props.dispatch({
			type:'dataspsell/initdatasouce',
			payload:datasouce
	  	})
		if(index==1){
			const paneitem={title:'门店排行',key:'702000edit1',data:{id:'1'},componkey:'702000edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
		if(index==2){
			const paneitem={title:'学习门店',key:'702000edit2',data:{id:'2'},componkey:'702000edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
		if(index==3){
			const paneitem={title:'指导门店',key:'702000edit3',data:{id:'3'},componkey:'702000edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
		if(index==4){
			const paneitem={title:'注意门店',key:'702000edit4',data:{id:'4'},componkey:'702000edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
	}
	desinfo=()=>{
		Modal.info({
			title: '字段说明',
			content: (
			<div className='lists'>
				<p>【毛销售额】：POS产生的所有订单的订单金额总和 </p>
				<p>【销售额】：POS毛销售额-POS退款金额</p>
				<p>【净收款】：微信+支付宝+现金+银联</p>
				<p>【昨日毛利率】：（昨日销售额-昨日总销售成本）/昨日销售额</p>
				<p>【销售成本】：数据跟随POS数据销售成本定义</p>
				<p>【门店排行榜】：门店按照POS销售额进行排序</p>
				<p>【学习门店】：明星门店，建议学习。历史7天销售金额/历史7天进货金额大约等于30%，且历史7天POS销售金额大于15000的门店</p>
				<p>【指导门店】：门店销售情况较差的门店。历史7天销售金额/历史7天进货金额小于等于100%，且历史7天POS销售金额小于5000的门店</p>
				<p>【注意门店】：门店持续不进货，需要注意门店。历史3天门店无门店订单产生，且门店状态为开业中状态</p>
				<p>【掌柜销售额】：门店生成的门店订单订单金额总和（去除取消订单）</p>
				<p>【掌柜销售数量】：门店生成的门店订单商品数量总和（去除取消订单）</p>
				<p>【POS销售额】：门店POS销售订单订单金额总和-门店POS退货订单订单金额总和</p>
				<p>【POS净收款】：门店实际发生的金钱流变化</p>
				<p>【POS销售数量】：门店POS销售订单商品数量总和-门店POS退货订单商品数量总和</p>
				<p>【历史7天】：如果今日为2017年11月10日，历史7日为2017年11月4日-2017年11月10日</p>
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
				<Cards data={this.props.data}/>
                <Cardlist data={this.props.listdata} hindent={this.hindent.bind(this)}/>
				<div style={{border:'1px solid #e8e8e8',padding:'20px',marginTop:'30px'}}>
					<EchartsTest type='1'/>
					<DataspTable/>
				</div>
        	</div>
      	)
	  }
	componentDidMount(){
		this.getTopfetch()
	}
}


function mapStateToProps(state) {
	const {shopSaleData,data,listdata,updateTime} = state.dataspsell;
	return {shopSaleData,data,listdata,updateTime};
}
export default connect(mapStateToProps)(DataspsellIndex);
