import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import EditableTableInfo from '../../components/table/table_info';
import Cardlist from '../../components/table/cardlist';
import CollectionsPage from './cancelOrderModal';

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
					}, {
						title: '备注',
						dataIndex: 'remark'
					}];
    }

    
	infofetch=(spOrderId)=>{
      //获取订单信息列表
			this.props.dispatch({
				type:'ordermd/infofetch',
				payload:{code:'qerp.web.sp.order.detail.page',values:{spOrderId:spOrderId,limit:"50",currentPage:"0"}}
			}) 
					//获取物流和订单日志列表
			this.props.dispatch({
				type:'ordermd/infofetchTwo',
				payload:{code:'qerp.web.sp.order.detail',values:{spOrderId:spOrderId}}
			}) 
		}
		
		//分页方法
    pageChange=(page,pageSize)=>{
			this.initList(pageSize,Number(page-1))
		}
		//pagesize变化
		pageSizeChange=(current,size)=>{
					this.initList(size,0)
		}

		//列表数据请求   
    initList=(limit,currentPage)=>{
			let values={spOrderId:this.props.data.spOrderId};
			values.limit=limit;
			values.currentPage=currentPage;
			this.props.dispatch({
					type:'ordermd/infofetch',
					payload:{code:'qerp.web.sp.order.detail.page',values:values}
			});
			this.props.dispatch({ type: 'tab/loding', payload:true});
		}
    
	render(){
		return(
			<div>
				{
					!this.props.isCancel 
					? null
					:<div style={{textAlign:'right',marginRight:"15px",marginBottom:'15px'}}>
						<CollectionsPage spOrderId={this.props.data.spOrderId}/>
					</div>
        }
				<div className='mb10'><Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/></div>
				<div className='mb10'>
					<EditableTable 
							columns={this.column1} 
							dataSource={this.props.detailsList} 
							title={this.props.detailstitle}
							footer={this.props.total1>50?true:false}
							pageChange={this.pageChange.bind(this)}
							pageSizeChange={this.pageSizeChange.bind(this)}
							total={Number(this.props.total1)}
							limit={Number(this.props.limit1)}
							current={Number(this.props.currentPage1)+1}
							bordered={true}
						/>
				</div>
				<div className='mb10'>
					<EditableTable columns={this.column2} 
												 dataSource={this.props.expressList} 
												 title="物流信息"
												 bordered={true}
												footer={false}/>
				</div>
				<div className='mb10'>
					<EditableTable columns={this.column3} 
												 dataSource={this.props.orderLogList} 
												 title="订单日志"
												 bordered={true}
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
    const {detailsList,detailstitle,cardtitle,cardlist,expressList,orderLogList,limit1,currentPage1,total1,isCancel} = state.ordermd;
		return {detailsList,detailstitle,cardtitle,cardlist,expressList,orderLogList,limit1,currentPage1,total1,isCancel};
}
export default connect(mapStateToProps)(OrdermdInfo);

