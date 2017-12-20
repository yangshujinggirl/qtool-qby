import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
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

					this.column2 = [{
						title: '快递单号',
						dataIndex: 'expressCode',
					}, {
						title: '快递公司',
						dataIndex: 'expressCompany',
					}, {
						title: '快递费用',
						dataIndex: 'expressFee',
					}];

					this.column3 = [{
						title: '操作',
						dataIndex: 'operateName'
					}, {
						title: '操作时间',
						dataIndex: 'operateTime',
					}, {
						title: '操作人',
						dataIndex: 'operateUser'
					}];
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
		
		//分页方法
    pageChange=(page,pageSize)=>{
			this.initList(this.props.values,pageSize,Number(page-1))
		}
		//pagesize变化
		pageSizeChange=(current,size)=>{
					this.initList(this.props.values,size,0)
		}
    
	render(){
		return(
			<div>
				<div className='mb10'><Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/></div>
				<div className='mb10'>
					<EditableTable 
							columns={this.column1} 
							dataSource={this.props.detailsList} 
							footer={true}
							pageChange={this.pageChange.bind(this)}
							pageSizeChange={this.pageSizeChange.bind(this)}
							title={this.props.detailstitle}
						/>
				</div>
				<div className='mb10'>
					<EditableTable columns={this.column2} 
												 dataSource={this.props.expressList} 
												 title="物流信息"
												footer={false}/>
				</div>
				<div className='mb10'>
					<EditableTable columns={this.column3} 
												 dataSource={this.props.orderLogList} 
												 title="订单日志"
												footer={false}/>
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.spOrderId)
	}
}

function mapStateToProps(state) {
    const {detailsList,detailstitle,cardtitle,cardlist,expressList,orderLogList} = state.ordermd;
		return {detailsList,detailstitle,cardtitle,cardlist,expressList,orderLogList};
}
export default connect(mapStateToProps)(OrdermdInfo);

