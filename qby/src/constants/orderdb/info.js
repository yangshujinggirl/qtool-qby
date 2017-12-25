import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import Cardlist from '../../components/table/cardlist';


class OrderdbInfo extends React.Component{
	constructor(props) {
        super(props);
        this.column1 =  [{
            title: '商品编码',
            dataIndex: 'code',
          }, {
            title: '商品条码',
            dataIndex: 'barcode'
          }, {
            title: '商品名称',
            dataIndex: 'spuName',
            
          }, {
            title: '商品规格',
            dataIndex: 'pdSkuType',
            
          },{
            title: '调出数量',
            dataIndex: 'qty',
          },{
            title: '收货数量',
            dataIndex: 'recQty',
          }];


        this.column2 = [{
            title: '操作',
            dataIndex: 'operateName'
            }, {
            title: '操作时间',
            dataIndex: 'operateTime'
            }, {
            title: '操作人',
            dataIndex: 'operateUser'
            }];
    }

    
	infofetch=(spExchangeId)=>{
      //获取订单信息列表
			this.props.dispatch({
				type:'orderdb/infofetch',
				payload:{code:'qerp.web.sp.exchange.detail',values:{spExchangeId:spExchangeId}}
            }) 
    }
    
	render(){
		return(
			<div>
				<div className='mb10'><Cardlist cardtitle="调拨单信息" cardlist={this.props.headTit}/></div>
				<div className='mb10'>
					<EditableTable columns={this.column1} 
												 dataSource={this.props.details} 
												 title="调拨商品"
												footer={false}/>
				</div>
				<div className='mb10'>
					<EditableTable columns={this.column2} 
												 dataSource={this.props.orderLogs} 
												 title="调拨单日志"
												footer={false}/>
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.spExchangeId)
	}
}

function mapStateToProps(state) {
    const {headTit,details,orderLogs} = state.orderdb;
		return {headTit,details,orderLogs};
}
export default connect(mapStateToProps)(OrderdbInfo);

