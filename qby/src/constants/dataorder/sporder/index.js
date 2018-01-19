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
