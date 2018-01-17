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
			title: 'This is a notification message',
			content: (
			<div>
				<p>some messages...some messages...</p>
				<p>some messages...some messages...</p>
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

