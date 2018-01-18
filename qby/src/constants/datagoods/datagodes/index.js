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
					<p className='fr pointer' onClick={this.desinfo.bind(this)}>定义数据说明<Icon type="question-circle-o" style={{color:"#ED6531"}}/></p>	
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
