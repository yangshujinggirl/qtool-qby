import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import Cardlist from '../../components/table/cardlist';

class OperateinoutExchangeInfo extends React.Component{
	constructor(props) {
        super(props);
        this.column = [{
            title: '商品条码',
            dataIndex: 'code'
        }, {
            title: '商品名称',
            dataIndex: 'name'
        },{
            title: '商品规格',
            dataIndex: 'displayName'
        },{
            title: '调拨数量',
            dataIndex: 'qty'
        },{
            title: '调拨总价',
            dataIndex: 'price'
        }];
        this.column1 = [{
          title: '操作记录',
          dataIndex: 'operateName'
        }, {
          title: '操作人',
          dataIndex: 'operateUser'
        },{
          title: '操作时间',
          dataIndex: 'operateTime'
        },{
          title: '备注',
          dataIndex: 'remark'
        }];
    }


	infofetch=(Id,No,type)=>{
      //获取订单信息列表
			this.props.dispatch({
				type:'operateinout/exchangeInfofetch',
        payload:{values:{Id:Id,keywords:No,type:type}}})
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
                          dataSource={this.props.exchangeLogList}
                          title="操作日志"
                          bordered={true}
                          footer={false}/>
        </div>
      </div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.Id,this.props.data.No,this.props.data.type)
	}
}

function mapStateToProps(state) {
    const {exchangeCardlist,exchangeList,exchangeLogList} = state.operateinout;
    return {exchangeCardlist,exchangeList,exchangeLogList};
}
export default connect(mapStateToProps)(OperateinoutExchangeInfo);

