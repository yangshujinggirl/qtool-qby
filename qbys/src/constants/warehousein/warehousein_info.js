import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import EditableTableInfo from '../../components/table/table_info';
import Cardlist from '../../components/table/cardlist';


class WarehouseinInfo extends React.Component{
	constructor(props) {
		super(props);
		this.columns1 = [ {
			title: '商品条码',
			dataIndex: 'pdBarcode',
		},{
			title: '商品名称',
			dataIndex: 'pdName',
		}, {
			title: '商品规格',
			dataIndex: 'pdSkuType',
		},{
			title: '预收数量',
			dataIndex: 'qty',
			
		},{
			title: '已收数量',
			dataIndex: 'qtyReceived',
		},{
			title: '差异',
			dataIndex: 'qtyDifference',
		}];
		this.columns2 = [{
			title: '操作',
			dataIndex: 'operateName',
			key: 'operateName'
		},{
			title: '操作时间',
			dataIndex: 'operateTime',
			key: 'operateTime'
		}, {
			title: '操作人',
			dataIndex: 'operateUser',
			key: 'operateUser'
		}];
}
	



infofetch=(wsAsnId)=>{
	this.props.dispatch({
		type:'wsin/infofetch',
		payload:{code:'qerp.web.ws.asn.detail',values:{wsAsnId:wsAsnId}}
	})
	this.props.dispatch({ type: 'tab/loding', payload:true}) 
}



	render(){
		return(
			<div>
				<div className='mb10'><Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/></div>
				<div className='mb10'><EditableTableInfo columns={this.columns1} data={this.props.details} title={this.props.detailstitle}/></div>
				<div className='mb10'><EditableTableInfo columns={this.columns2} data={this.props.logs} title={this.props.logstitle}/></div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.wsOrderId)

	}
	
}

function mapStateToProps(state) {
	console.log(state)
	const {cardtitle,cardlist,detailstitle,details,logstitle,logs} = state.wsin;
	return {cardtitle,cardlist,detailstitle,details,logstitle,logs};
}
export default connect(mapStateToProps)(WarehouseinInfo);

