import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import EditableTableInfo from '../../components/table/table_info';
import Cardlist from '../../components/table/cardlist';

class OrdercgInfo extends React.Component{
	constructor(props) {
        super(props);
        this.column1 = [
			{
        	title: '商品名称',
        	dataIndex: 'pdName'
			},
			{
        	title: '规格',
        	dataIndex: 'pdSkuType'
			},
			{
        	title: '商品编码',
        	dataIndex: 'pdCode'
			},
			{
        	title: '创建时间',
        	dataIndex: 'createTime'
			},
			{
        	title: '采购数量',
        	dataIndex: 'qty'
			},
			{
        	title: '已收数量',
        	dataIndex: 'qtyReceived'
	  	},
			{
					title: '单价',
					dataIndex: 'price'
			},
			{
					title: '总价',
					dataIndex: 'amount'
			}
		];
    this.column2 = [
			{
        	title: '操作',
        	dataIndex: 'operateName'
			},
			{
        	title: '操作时间',
        	dataIndex: 'operateTime'
			},
			{
        	title: '操作人',
        	dataIndex: 'operateUser'
			},
			{
        	title: '备注',
        	dataIndex: 'remark'
			}
		];
		this.column3 = [
			{
        	title: '发票号',
        	dataIndex: 'invoiceCode'
			},
			{
        	title: '发票金额',
        	dataIndex: 'invoiceAmount'
			},
			{
        	title: '添加人',
        	dataIndex: 'userName'
			},
			{
        	title: '添加时间',
        	dataIndex: 'createTime'
			}
		];
  }
	componentDidMount(){
		this.infofetch(this.props.data.wsAsnId)
	}
    //获取订单信息列表
	infofetch=(wsAsnId)=>{
		this.props.dispatch({
			type:'ordercg/infofetch',
			payload:{code:'qerp.web.ws.asn.detail',values:{wsAsnId:wsAsnId}}
		})
  }
	render(){
		console.log(this.props)
		return(
			<div>
				<div className='mb10'>
					<Cardlist cardtitle={this.props.headTitle} cardlist={this.props.headTit}/>
				</div>
				<div className='mb10'>
					<EditableTable
						columns={this.column1}
						dataSource={this.props.details}
            title="采购商品"
            bordered={true}
						footer={false}
					/>
				</div>
				<div className='mb10'>
					<EditableTable
						columns={this.column3}
						dataSource={this.props.invoices}
            title="发票信息"
            bordered={true}
						footer={false}/>
				</div>
				<div className='mb10'>
					<EditableTable
						columns={this.column2}
						dataSource={this.props.logs}
            title="采购单日志"
            bordered={true}
						footer={false}/>
				</div>
			</div>
		)
	}

}

function mapStateToProps(state) {
    const {headTitle,headTit,details,logs,invoices} = state.ordercg;
	return {headTitle,headTit,details,logs,invoices};
}
export default connect(mapStateToProps)(OrdercgInfo);
