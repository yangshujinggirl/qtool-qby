import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';
import EditableTableInfo from '../../components/table/table_info';
import Cardlist from '../../components/table/cardlist';


class OrdermdInfo extends React.Component{
	constructor(props) {
        super(props);
        this.column1 = [{
            title: '商品名称',
            dataIndex: 'spuName'
          }, {
            title: '规格',
            dataIndex: 'pdSkuType'
          }, {
            title: '商品编码',
            dataIndex: 'spuCode'
          }, {
            title: '预定数量',
            dataIndex: 'qty'
          },{
            title: '单价',
            dataIndex: 'retailPrice'
          },{
            title: '总价',
            dataIndex: 'amount'
          }];
		// this.columns1 = [{
		// 	title: '商品条码',
		// 	dataIndex: 'pdBarcode'
		// },{
		// 	title: '商品名称',
		// 	dataIndex: 'pdName'
		// }, {
		// 	title: '商品规格',
		// 	dataIndex: 'pdSkuType'
		// },{
		// 	title: '预收数量',
		// 	dataIndex: 'qty'
		// },{
		// 	title: '已收数量',
		// 	dataIndex: 'qtyReceived'
		// },{
		// 	title: '差异',
		// 	dataIndex: 'qtyDifference'
		// }];
		// this.columns2 = [{
		// 	title: '操作',
		// 	dataIndex: 'operateName'
		// },{
		// 	title: '操作时间',
		// 	dataIndex: 'operateTime'
		// }, {
		// 	title: '操作人',
		// 	dataIndex: 'operateUser'
		// }];
    }

    
	infofetch=(spOrderId)=>{
        //获取订单信息列表
		this.props.dispatch({
			type:'ordermd/infofetch',
			payload:{code:'qerp.web.sp.order.detail.page',values:{spOrderId:spOrderId}}
        }) 
        //获取物流和订单日志列表
        this.props.dispatch({
			type:'ordermd/infofetchTwo',
			payload:{code:'qerp.web.sp.order.detail',values:{spOrderId:spOrderId}}
		}) 
    }
    
	render(){
		return(
			<div>
				{/* <div className='mb10'><Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/></div> */}
				<div className='mb10'><EditableTableInfo columns={this.column1} data={this.props.detailsList} title={this.props.detailstitle}/></div>
				{/* <div className='mb10'><EditableTableInfo columns={this.columns2} data={this.props.logs} title={this.props.logstitle}/></div> */}
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.spOrderId)
	}
}

function mapStateToProps(state) {
    const {detailsList,detailstitle} = state.ordermd;
    console.log(detailsList);
	return {detailsList,detailstitle};
}
export default connect(mapStateToProps)(OrdermdInfo);

