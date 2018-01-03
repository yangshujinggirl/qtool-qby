import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import EditableTableInfo from '../../components/table/table_info';
import Cardlist from '../../components/table/cardlist';


class ConsumptionInfo extends React.Component{
	constructor(props) {
        super(props);
        this.column1 = [{
            title: '订单号',
            dataIndex: 'orderNo'
          }, {
            title: '结算金额',
            dataIndex: 'amount'
          }, {
            title: '本次积分',
            dataIndex: 'point'
          },{
            title: '积分抵扣',
            dataIndex: 'discountPoint'
          },{
            title: '会员卡充值',
            dataIndex: 'cardCharge'
          },{
            title: '会员卡消费',
            dataIndex: 'cardConsume'
          },{
            title: '优惠金额',
            dataIndex: 'discountMoney'
          },{
            title: '抹零金额',
            dataIndex: 'reducAmount'
          },{
            title: '订单时间',
            dataIndex: 'createTime'
          },{
            title: '消费门店',
            dataIndex: 'shopName'
          }];
        }

      

    
	infofetch=(id)=>{
      //获取订单信息列表
			this.props.dispatch({
				type:'operatemember/infofetch',
				payload:{code:'qerp.web.qpos.mb.card.detail',values:{mbCardId:id}}
            }) 
    }
    
	render(){
		return(
			<div>
				<div className='mb10'><Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/></div>
				<div className='mb10'>
                    <EditableTable 
                        columns={this.column1} 
						dataSource={this.props.details} 
                        title="消费记录"
                        bordered={true}
					    footer={false}/>
				</div>
				
			</div>
		)
	}
	componentDidMount(){
		 this.infofetch(this.props.data.mbCardId)
	}
}

function mapStateToProps(state) {
    const {cardtitle,cardlist,details} = state.operatemember;
		return {cardtitle,cardlist,details};
}
export default connect(mapStateToProps)(ConsumptionInfo);

