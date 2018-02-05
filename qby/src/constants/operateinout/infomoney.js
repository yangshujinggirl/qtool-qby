import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import Cardlist from '../../components/table/cardlist';


class OperateinoutMoneyInfo extends React.Component{
	constructor(props) {
        super(props);
        this.column = [{
            title: '订单号',
            dataIndex: 'orderNo'
        }, {
            title: '订单金额',
            dataIndex: 'orderAmount'
        },{
            title: '收款方式',
            dataIndex: 'receivedTypeStr'
        },{
            title: '收款金额',
            dataIndex: 'receivedAmount'
        },{
            title: '结算金额',
            dataIndex: 'amount'
        },{
            title: '收款时间',
            dataIndex: 'createTime'
        }];
    }

    
	infofetch=(spShopId,type,dayTime,spMoneyDetailId)=>{
      //获取订单信息列表
			this.props.dispatch({
				type:'operateinout/moneyInfofetch',
				payload:{code:'qerp.web.pos.money.detail',values:{spShopId:spShopId,type:type,dayTime:dayTime,spMoneyDetailId:spMoneyDetailId}}
            }) 
    }
    
	render(){
		return(
			<div>
				<div className='mb10'><Cardlist cardtitle="对账信息" cardlist={this.props.moneycardlist}/></div>
				<div className='mb10'>
					<EditableTable  columns={this.column} 
                                    dataSource={this.props.moneyinfoList}
                                    title="对账记录"
                                    bordered={true}
                                    footer={false}/>
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.spShopId,this.props.data.type,this.props.data.dayTime,this.props.data.spMoneyDetailId)
	}
}

function mapStateToProps(state) {
    const {moneycardlist,moneyinfoList} = state.operateinout;
    return {moneycardlist,moneyinfoList};
}
export default connect(mapStateToProps)(OperateinoutMoneyInfo);

