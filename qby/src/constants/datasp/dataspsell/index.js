import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import Cardlist from '../../../components/card/cardlist';
import Cards from '../../../components/card/catds';
import EchartsTest from '../../../echarts/index1';
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
  	render(){
     	return(
        	<div>
				<Cards data={this.props.data}/>
                <Cardlist data={this.props.listdata}/>
				<div style={{border:'1px solid #e8e8e8',padding:'20px',marginTop:'30px'}}>
					<EchartsTest type='1'/>
					<DataspTable/>
				</div>
        	</div>
      	)
	  }
	componentDidMount(){
		// this.getTopfetch()
	}
}


function mapStateToProps(state) {
	const {shopSaleData,data,listdata,startRpDate,endRpDate} = state.dataspsell;
	return {shopSaleData,data,listdata,startRpDate,endRpDate};
}
export default connect(mapStateToProps)(DataspsellIndex);
