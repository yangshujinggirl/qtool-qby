import { Icon,Modal } from 'antd';
import { connect } from 'dva';
import Cardlist from '../../../components/card/cardlist';
import Cards from '../../../components/card/catds';
import EchartsTest from '../../../echarts/datagodes';

class DatagodesIndex extends React.Component{
	getTopfetch=()=>{
		const values={}
		this.props.dispatch({
			type:'datagodes/sellfetch',
            payload:{code:'qerp.web.rp.pd.analysis.query',values:values}
		})
	}
	desinfo=()=>{
		Modal.info({
			title: '字段解释',
			content: (
			  <div className='lists'>
				<p>【掌柜销售金额】：掌柜产生的所有订单总金额 （去除取消订单）</p>
				<p>【掌柜销售数量】：掌柜销售出的商品的总数量（去掉取消订单）</p>
				<p>【POS销售金额】：POS产生的所有门店销售总金额（去除退货）</p>
				<p>【POS销售数量】：POS产生的所有门店销售数量（去除退货）</p>
				<p>【同比上周】： 同比上周=（今日数据-上周今日整日数据）/上周今日整日数据</p>
				<p>【门店热销商品】：在POS上历史7天销售数量大于等于100的商品</p>
				<p>【掌柜热销商品】：在掌柜中历史7天销售数量大于等于100的商品</p>
				<p>【建议采购商品】：明星商品，建议采购的商品。可售库存/掌柜历史10天的销售量小于等于30%</p>
				<p>【滞销商品】：销售较差，不受欢迎的商品。掌柜历史10天的销售量/可售库存小于等于20%</p>

			  </div>
			),
			onOk() {},
		  });
	}

	// pos热销
	hindent=(index)=>{
		const datasouce=[]
		const updateTimes=null
		this.props.dispatch({
			type:'datagodes/datasouce',
			payload:{datasouce,updateTimes}
	  	})
		if(index==1){
			const paneitem={title:'pos热销',key:'703002edit1',data:{id:'1'},componkey:'703002edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
		if(index==2){
			const paneitem={title:'掌柜热销',key:'703002edit2',data:{id:'2'},componkey:'703002edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
		if(index==3){
			const paneitem={title:'建议采购',key:'703002edit3',data:{id:'3'},componkey:'703002edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
		if(index==4){
			const paneitem={title:'掌柜滞销',key:'703002edit4',data:{id:'4'},componkey:'703002edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
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
				</div>
        	</div>
      	)
	  }
	componentDidMount(){
		this.getTopfetch()
	}
}


function mapStateToProps(state) {
	const {data,listdata,updateTime} = state.datagodes;
	return {data,listdata,updateTime};
}
export default connect(mapStateToProps)(DatagodesIndex);
