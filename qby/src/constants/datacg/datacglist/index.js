import {GetServerData} from '../../../services/services';
import { Button, Icon,Modal } from 'antd';
import { connect } from 'dva';
import Cardlist from '../../../components/card/cardlist';
import Cards from '../../../components/card/catds';
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
					<p className='fl'>数据更新于:{this.props.updateTime}</p>
					<p className='fr pointer' onClick={this.desinfo.bind(this)}>定义数据说明<Icon type="question-circle-o" style={{color:"#ED6531"}}/></p>	
				</div>
				<Cards data={this.props.data}/>
				<Cardlist data={this.props.listdata}/>
			</div>
		)
	}
	componentDidMount(){
		this.getTopfetch()
	}
}


function mapStateToProps(state) {
	const {analysis,data,listdata,updateTime} = state.datagodes;
	console.log(listdata)
	return {analysis,data,listdata,updateTime};
}
export default connect(mapStateToProps)(DatacglistIndex);

