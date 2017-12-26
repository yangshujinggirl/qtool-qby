import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import EditableTableInfo from '../../components/table/table_info';
import Cardlist from '../../components/table/cardlist';


class OrderposInfo extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            type:1
        }

        this.column1 = [{
            title: '商品名称',
            dataIndex: 'name',
          }, {
            title: '规格',
            dataIndex: 'displayName'
          }, {
            title: '商品编码',
            dataIndex: 'code',
          }, {
            title: '数量',
            dataIndex: 'qty',
          },{
            title: '零售价',
            dataIndex: 'price',
          },{
            title: '折扣',
            dataIndex: 'discount',
          },{
            title: '折后价',
            dataIndex: 'payPrice',
          }];
    }

    
	infofetch=(spOrderId,type)=>{
        if(type=='1'){
            //销售
            this.props.dispatch({
				type:'orderpos/infofetch1',
				payload:{code:'qerp.web.qpos.od.order.info',values:{odOrderId:spOrderId}}
			}) 
        }
        if(type=='2'){
            //充值
            this.props.dispatch({
				type:'orderpos/infofetch2',
				payload:{code:'qerp.web.sp.order.detail.page',values:{spOrderId:spOrderId}}
			}) 
    
        }
        if(type=='3'){
            //退货
            this.props.dispatch({
				type:'orderpos/infofetch3',
				payload:{code:'qerp.web.sp.order.detail.page',values:{spOrderId:spOrderId}}
			}) 
        }
	}
    
	render(){
		return(
			<div>
				<div className='mb10'><Cardlist cardtitle="订单信息" cardlist={this.props.cardlist}/></div>
				<div className='mb10'>
					<EditableTable columns={this.column1} 
												 dataSource={this.props.infoList} 
                                                 title="订单内容"
                                                 bordered={true}
												footer={false}/>
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.spOrderId,this.props.data.type)
	}
}

function mapStateToProps(state) {
    const {cardlist,infoList} = state.orderpos;
    return {cardlist,infoList};
}
export default connect(mapStateToProps)(OrderposInfo);

