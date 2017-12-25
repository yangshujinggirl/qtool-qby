import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import EditableTableInfo from '../../components/table/table_info';
import Cardlist from '../../components/table/cardlist';


class OrdercgInfo extends React.Component{
	constructor(props) {
        super(props);
        this.column1 = [{
            title: '商品名称',
            dataIndex: 'pdName'
          }, {
            title: '规格',
            dataIndex: 'pdSkuType'
          }, {
            title: '商品编码',
            dataIndex: 'pdCode'
          },{
            title: '采购数量',
            dataIndex: 'qty'
          },{
            title: '已收数量',
            dataIndex: 'qtyReceived'
          },{
            title: '单价',
            dataIndex: 'price'
          },{
            title: '总价',
            dataIndex: 'amount'
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

    
	infofetch=(wsAsnId)=>{
      //获取订单信息列表
			this.props.dispatch({
				type:'ordercg/infofetch',
				payload:{code:'qerp.web.ws.asn.detail',values:{wsAsnId:wsAsnId}}
            }) 
    }
    
	render(){
		return(
			<div>
				<div className='mb10'><Cardlist cardtitle={this.props.headTitle} cardlist={this.props.headTit}/></div>
				<div className='mb10'>
					<EditableTable columns={this.column1} 
												 dataSource={this.props.details} 
												 title="采购商品"
												footer={false}/>
				</div>
				<div className='mb10'>
					<EditableTable columns={this.column2} 
												 dataSource={this.props.logs} 
												 title="采购单日志"
												footer={false}/>
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.wsAsnId)
	}
}

function mapStateToProps(state) {
    const {headTitle,headTit,details,logs} = state.ordercg;
		return {headTitle,headTit,details,logs};
}
export default connect(mapStateToProps)(OrdercgInfo);

