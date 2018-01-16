import {GetServerData} from '../../../services/services';
import { Button, Icon,Modal } from 'antd';
import { connect } from 'dva';
import Cardlist from '../../../components/card/cardlist';
import Cards from '../../../components/card/catds';
import EchartsTest from '../../../echarts/datagodes';
import NP from 'number-precision'


class DataposorderIndex extends React.Component{
	state = {};
	getTopfetch=()=>{
		const values={}
		this.props.dispatch({
			type:'datagodes/sellfetch',
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
				<Cards data={this.props.data}/>
                <Cardlist data={this.props.listdata}/>
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
	const {analysis,data,listdata,updateTime} = state.datagodes;
	console.log(listdata)
	return {analysis,data,listdata,updateTime};
}
export default connect(mapStateToProps)(DataposorderIndex);
