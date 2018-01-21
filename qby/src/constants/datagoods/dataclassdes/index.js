import {GetServerData} from '../../../services/services';
import { Button, Icon,Modal } from 'antd';
import { connect } from 'dva';
import EchartsTest from '../../../echarts/classdes';
import DataclassTable from './table';
import NP from 'number-precision'
const confirm = Modal.confirm;



class DataclassdesIndex extends React.Component{
	state = {};
	desinfo=()=>{
		Modal.info({
			title: '字段说明',
			content: (
			  <div className='lists'>
				<p>【掌柜销售数量】：该分类在掌柜中销售的数量（包含Q本营创建的门店订单，不含取消订单）</p>
				<p>【掌柜销售数量占比】：该分类在掌柜中销售的数量在全部分类销售数量中占比 </p>
				<p>【掌柜销售金额】：该分类在掌柜中销售的总金金额（包含Q本营创建的门店订单，不含取消订单）</p>
				<p>【掌柜销售金额占比】：该分类在掌柜中销售的总金额在全部分类销售的总金额中占比</p>
				<p>【POS销售数量】：该分类在POS中销售的数量（只计算销售订单）</p>
				<p>【POS销售数量占比】：该分类在POS销售的数量在全部分类销售数量中占比 </p>
				<p>【POS销售金额】：该分类在POS中销售的总金金额（只计算销售订单）</p>
				<p>【POS销售金额占比】：该分类在POS中销售的总金额在全部分类销售的总金额中占比</p>
			  </div>
			),
			onOk() {},
		  });
	}
	//导出数据
	exportData = (type,data) => {
		const values={
			type:type,
			downloadParam:data,
		}
		const result=GetServerData('qerp.web.sys.doc.task',values);
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				var _dispatch=this.props.dispatch
				confirm({
					title: '数据已经进入导出队列',
					content: '请前往下载中心查看导出进度',
					cancelText:'稍后去',
					okText:'去看看',
					onOk() {
						const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
						_dispatch({
							type:'tab/firstAddTab',
							payload:paneitem
						});
						_dispatch({
							type:'downlaod/fetch',
							payload:{code:'qerp.web.sys.doc.list',values:{limit:15,currentPage:0}}
						});
					},
					onCancel() {
						
					},
	  			});
			}
		})
	
	}
  	render(){
     	return(
        	<div>
				<div className='clearfix mb10'>
					<p className='fl'>数据更新于:{this.props.updateTime}</p>
					<p className='fr pointer' onClick={this.desinfo.bind(this)}>数据定义说明<Icon type="question-circle-o" style={{color:"#ED6531",marginLeft:"4px"}}/></p>	
				</div>
				<div style={{border:'1px solid #e8e8e8',padding:'20px',marginTop:'30px'}}>
					<EchartsTest type='1'/>
					<Button 
						type="primary" 
						size='large'
						className='mt20 mb15'
						onClick={this.exportData.bind(this,30,this.props.values)}
					>
						导出数据
					</Button>
					<DataclassTable/>
				</div>
        	</div>
      	)
	  }
	
}


function mapStateToProps(state) {
	const {analysis,data,listdata,updateTime,values} = state.dataclassdes;
	return {analysis,data,listdata,updateTime,values};
}
export default connect(mapStateToProps)(DataclassdesIndex);



