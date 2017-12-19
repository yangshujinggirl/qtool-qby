import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import EditableTableInfo from '../../components/table/table_info';
import Cardlist from '../../components/table/cardlist';


class WsadjustInfo extends React.Component{
	constructor(props) {
		super(props);
		this.columns1 = [{
			title: '商品条码',
			dataIndex: 'pdSkuBarcode'
		}, {
			title: '商品名称',
			dataIndex: 'pdSpuName'
		}, {
			title: '规格',
			dataIndex: 'pdSkuDisplayName'
		}, {
			title: '批次',
			dataIndex: 'lotStr'
		}, {
			title: '库位',
			dataIndex: 'fromBinCode'
		},{
			title: '损益数量',
			dataIndex: 'qtyAdjust'
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
	



infofetch=(id)=>{
	this.props.dispatch({
		type:'adjust/infofetch',
		payload:{code:'qerp.web.ws.adjust.info',values:{wsAdjustId:id}}
	})
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
		this.infofetch(this.props.data.wsAdjustId)
	}
	
}

function mapStateToProps(state) {
	const {cardtitle,cardlist,detailstitle,details,logstitle,logs} = state.adjust;
	return {cardtitle,cardlist,detailstitle,details,logstitle,logs};
}
export default connect(mapStateToProps)(WsadjustInfo);

