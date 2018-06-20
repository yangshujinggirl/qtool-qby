import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import Cardlist from '../../components/table/cardlist';

class OperateinoutExchangeInfo extends React.Component{
	constructor(props) {
        super(props);
        this.column = [{
            title: '商品条码',
            dataIndex: 'orderNo'
        }, {
            title: '商品名称',
            dataIndex: 'orderAmount'
        },{
            title: '商品规格',
            dataIndex: 'receivedTypeStr'
        },{
            title: '调拨数量',
            dataIndex: 'receivedAmount'
        },{
            title: '调拨总价',
            dataIndex: 'amount'
        }];
        this.column1 = [{
          title: '操作记录',
          dataIndex: 'orderNo'
        }, {
          title: '操作人',
          dataIndex: 'orderAmount'
        },{
          title: '操作时间',
          dataIndex: 'receivedTypeStr'
        },{
          title: '备注',
          dataIndex: 'receivedAmount'
        }];
    }


	infofetch=(keywords)=>{
      //获取订单信息列表
			this.props.dispatch({
				type:'operateinout/exchangeInfofetch',
        payload:{code:'qerp.web.pos.money.detail',values:{keywords:keywords}}})
  }

	render(){
		return(
      <div>
        <div className='mb10'><Cardlist cardtitle="调拨信息" cardlist={this.props.exchangeCardlist}/></div>
        <div className='mb10'>
          <EditableTable  columns={this.column}
                          dataSource={this.props.exchangeList}
                          title="商品信息"
                          bordered={true}
                          footer={false}/>
        </div>
        <div className='mb10'>
          <EditableTable  columns={this.column1}
                          dataSource={this.props.exchangeInfoList}
                          title="操作日志"
                          bordered={true}
                          footer={false}/>
        </div>
      </div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.keywords)
	}
}

function mapStateToProps(state) {
    const {exchangeCardlist,exchangeList,exchangeInfoList} = state.operateinout;
    return {exchangeCardlist,exchangeList,exchangeInfoList};
}
export default connect(mapStateToProps)(OperateinoutExchangeInfo);

