import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
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
			const paneitem={title:'门店排行',key:'703000edit1',data:{id:'1'},componkey:'703000edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
		if(index==2){
			const paneitem={title:'学习门店',key:'703000edit2',data:{id:'2'},componkey:'703000edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
		if(index==3){
			const paneitem={title:'指导门店',key:'703000edit3',data:{id:'3'},componkey:'703000edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
		if(index==4){
			const paneitem={title:'注意门店',key:'703000edit4',data:{id:'4'},componkey:'703000edit'}
			this.props.dispatch({
				  type:'tab/firstAddTab',
				  payload:paneitem
			})
		}
	}

  	render(){
     	return(
        	<div>
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
	const {shopSaleData,data,listdata} = state.dataspsell;
	return {shopSaleData,data,listdata};
}
export default connect(mapStateToProps)(DataspsellIndex);
